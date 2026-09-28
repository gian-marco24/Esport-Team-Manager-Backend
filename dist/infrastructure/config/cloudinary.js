import { v2 as cloudinary } from 'cloudinary';
import { cloudName, cloudApiKey, cloudApiSecret } from '../../config.js';
export const isCloudinaryConfigured = Boolean(cloudName &&
    cloudName !== 'tu_cloud_name' &&
    cloudApiKey &&
    cloudApiKey !== 'tu_api_key' &&
    cloudApiSecret &&
    cloudApiSecret !== 'tu_api_secret');
if (isCloudinaryConfigured) {
    cloudinary.config({
        cloud_name: cloudName,
        api_key: cloudApiKey,
        api_secret: cloudApiSecret,
        secure: true,
    });
    console.log('☁️ Cloudinary SDK configured successfully.');
}
else {
    console.info('ℹ️ Cloudinary credentials not configured in backend/.env - Running image service in fallback mode.');
}
export { cloudinary };
//# sourceMappingURL=cloudinary.js.map