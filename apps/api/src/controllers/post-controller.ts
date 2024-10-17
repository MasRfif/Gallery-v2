import { uploadFile, getFileUrl, deleteFile } from '@/lib/aws-s3.js';
import prisma from '@/lib/prisma.js';
import { generateFileName } from '@/utils/generate-file-name.js';

class PaintingController {
  async createPainting(req: any, res: any) {
    try {
      const file = req.file;
      const thumbnail = generateFileName();
      const imageName = generateFileName();
      const caption = req.body.caption;
      const description = req.body.description;
      const price = parseFloat(req.body.price);

      if (!file || !file.buffer || !file.mimetype) {
        return res.status(400).json({ error: 'File is required.' });
      }

      await uploadFile(file.buffer, imageName, file.mimetype);
      await prisma.painting.create({
        data: {
          thumbnail,
          imageName,
          caption: caption || '',
          description: description || '',
          price: isNaN(price) ? 0 : price,
        },
      });

      return res.status(201).json({ response: { ok: true } });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: 'An error occurred while creating the painting.' });
    }
  }

  async getPaintings(req: any, res: any) {
    const post = await prisma.painting.findMany();
    const postWithImageUrl = await Promise.all(
      post.map(async (post: any) => {
        const imageUrl = await getFileUrl(post.imageName);
        return { ...post, imageUrl };
      }),
    );

    return res
      .status(200)
      .json({ Response: { ok: true }, data: postWithImageUrl });
  }

  async getPaintingById(req: any, res: any) {
    const id = Number(req.params.id);
    const post = await prisma.painting.findUnique({
      where: { id },
    });

    return res.status(200).json({ Response: { ok: true }, data: post });
  }

  async deletePainting(req: any, res: any) {
    const id = Number(req.params.id);
    const post = await prisma.painting.findUnique({
      where: { id },
    });

    await prisma.painting.delete({ where: { id } });
    await deleteFile(post?.imageName!);

    return res.status(200).json({ Response: { ok: true } });
  }
}

export default PaintingController;
