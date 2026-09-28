import { Router } from 'express';
import { uploadMiddleware } from '../middlewares/upload.middleware.js';
import { UploadController } from '../controllers/UploadController.js';

const router = Router();

router.post('/image', uploadMiddleware.single('image'), UploadController.uploadImage);

export default router;
