import { uploadFile, getFileUrl, deleteFile } from '@/lib/aws-s3.js';
import prisma from '@/lib/prisma.js';
import { generateFileName } from '@/utils/generate-file-name.js';

class PaintingController {
  // Create Painting
  async createPainting(req: any, res: any) {
    try {
      const file = req.file;
      const thumbnail = generateFileName(); // Thumbnail name
      const imageName = generateFileName(); // Main image name

      // Retrieve additional fields from request body
      const title = req.body.title;
      const caption = req.body.caption;
      const description = req.body.description;
      const price = parseFloat(req.body.price);
      const yearCreated = req.body.yearCreated;
      const genre = req.body.genre ? req.body.genre.split(',') : []; // Assume genres are sent as comma-separated values
      const creator = req.body.creator;

      if (!file || !file.buffer || !file.mimetype) {
        return res.status(400).json({ error: 'File is required.' });
      }

      // Upload image to S3
      await uploadFile(file.buffer, imageName, file.mimetype);

      // Store painting data in the database
      await prisma.painting.create({
        data: {
          title,
          thumbnail,
          imageName,
          caption: caption || '',
          description: description || '',
          price: isNaN(price) ? 0 : price,
          yearCreated: yearCreated || 'Unknown',

          creator: creator || 'Unknown',
          featuredImageUrl: await getFileUrl(imageName), // Store S3 URL for the image
          imageDimensions: {
            height: file.size.height, // Assuming height and width are available in file metadata
            width: file.size.width,
          },
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

  // Get All Paintings
  async getPaintings(req: any, res: any) {
    try {
      const paintings = await prisma.painting.findMany();
      const paintingsWithImageUrl = await Promise.all(
        paintings.map(async (painting: any) => {
          const imageUrl = await getFileUrl(painting.imageName); // Get the S3 URL
          return { ...painting, imageUrl };
        }),
      );

      return res
        .status(200)
        .json({ Response: { ok: true }, data: paintingsWithImageUrl });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: 'An error occurred while fetching paintings.' });
    }
  }

  // Get Painting by ID
  async getPaintingById(req: any, res: any) {
    const id = Number(req.params.id);

    try {
      const painting = await prisma.painting.findUnique({
        where: { id },
      });

      if (!painting) {
        return res
          .status(404)
          .json({ Response: { ok: false, message: 'Painting not found' } });
      }

      const imageUrl = await getFileUrl(painting.imageName); // Get the S3 URL

      return res
        .status(200)
        .json({ Response: { ok: true }, data: { ...painting, imageUrl } });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ Response: { ok: false, message: 'Internal Server Error' } });
    }
  }

  // Update Painting
  async updatePainting(req: any, res: any) {
    const id = Number(req.params.id);
    const { title, caption, description, price, yearCreated, creator } =
      req.body;

    try {
      const painting = await prisma.painting.findUnique({
        where: { id },
      });

      if (!painting) {
        return res
          .status(404)
          .json({ Response: { ok: false, message: 'Painting not found' } });
      }

      const updatedData: any = {
        title: title || painting.title,
        caption: caption || painting.caption,
        description: description || painting.description,
        price: price !== undefined ? parseFloat(price) : painting.price,
        yearCreated: yearCreated || painting.yearCreated,
        creator: creator || painting.creator,
      };

      // If a new file is uploaded, handle the file upload and update the image
      if (req.file) {
        const newImageName = generateFileName();
        await uploadFile(req.file.buffer, newImageName, req.file.mimetype);
        updatedData.imageName = newImageName;

        // Delete the old image from S3
        await deleteFile(painting.imageName);
      }

      await prisma.painting.update({
        where: { id },
        data: updatedData,
      });

      return res.status(200).json({ Response: { ok: true } });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ Response: { ok: false, message: 'Internal Server Error' } });
    }
  }

  // Delete Painting
  async deletePainting(req: any, res: any) {
    const id = Number(req.params.id);

    try {
      const painting = await prisma.painting.findUnique({
        where: { id },
      });

      if (!painting) {
        return res
          .status(404)
          .json({ Response: { ok: false, message: 'Painting not found' } });
      }

      await prisma.painting.delete({ where: { id } });
      await deleteFile(painting.imageName); // Delete image from S3

      return res.status(200).json({ Response: { ok: true } });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ Response: { ok: false, message: 'Internal Server Error' } });
    }
  }
}

export default PaintingController;
