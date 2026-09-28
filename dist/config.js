import dotenv from 'dotenv';
dotenv.config();
const { PORT, FRONTEND_URL, NODE_ENV, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
export const port = Number(PORT) || 5000;
export const frontendUrl = FRONTEND_URL || 'http://localhost:5173';
export const nodeEnv = NODE_ENV || 'development';
export const cloudName = CLOUDINARY_CLOUD_NAME || 'tu_cloud_name';
export const cloudApiKey = CLOUDINARY_API_KEY || 'tu_api_key';
export const cloudApiSecret = CLOUDINARY_API_SECRET || 'tu_api_secret';
//# sourceMappingURL=config.js.map