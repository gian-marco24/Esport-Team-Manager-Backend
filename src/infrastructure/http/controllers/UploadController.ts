import { Request, Response } from 'express';
import { cloudinary, isCloudinaryConfigured } from '../../config/cloudinary.js';

export class UploadController {
  static async uploadImage(req: Request, res: Response): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({ success: false, message: 'No se envió ninguna imagen.' });
        return;
      }

      if (!isCloudinaryConfigured) {
        res.status(400).json({
          success: false,
          message:
            'Cloudinary credentials not set in backend/.env. Please configure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in backend/.env to upload screenshot URLs.',
        });
        return;
      }

      // Upload file buffer directly to Cloudinary
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'urs_gamara_screenshots',
          resource_type: 'image',
        },
        (error, result) => {
          if (error || !result) {
            console.error('Cloudinary stream error:', error);
            res.status(500).json({
              success: false,
              message: error?.message || 'Error al subir la imagen a Cloudinary.',
            });
            return;
          }

          res.status(200).json({
            success: true,
            url: result.secure_url,
            public_id: result.public_id,
            format: result.format,
            bytes: result.bytes,
          });
        }
      );

      uploadStream.end(req.file.buffer);
    } catch (error: unknown) {
      console.error('UploadController error:', error);
      const message = error instanceof Error ? error.message : 'Error interno del servidor.';
      res.status(500).json({ success: false, message });
    }
  }
}
