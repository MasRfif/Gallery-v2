import express from 'express';
import { uploader } from '@/middlewares/uploader-middleware.js';
import PaintingController from '@/controllers/post-controller.js';

const router = express.Router();
const upload = uploader();
const paintingController = new PaintingController();

router.get('/api/v1', (req: any, res: any) => {
  return res.status(200).json({ message: 'Welcome to the Base' });
});

router.post('/post', upload.single('image'), paintingController.createPainting);
router.put(
  '/post/:id',
  upload.single('image'),
  paintingController.updatePainting,
);
router.get('/posts', paintingController.getPaintings);
router.get('/posts/:id', paintingController.getPaintingById);
router.delete('posts/:id', paintingController.deletePainting);

export default router;
