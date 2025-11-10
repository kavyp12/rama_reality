// // src/config/cloudinary.ts

// import { v2 as cloudinary } from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import dotenv from 'dotenv'; // <-- ADD THIS LINE

// dotenv.config(); // <-- ADD THIS LINE

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const testCloudinary = async () => {
//   if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
//     console.error('CLOUDINARY: Missing env variables');
//     return;
//   }

//   try {
//     const result = await cloudinary.api.ping();
//     if (result.status === 'ok') {
//       console.log('CLOUDINARY: Connected & API Key Working');
//     } else {
//       console.error('CLOUDINARY: Connected but ping failed');
//     }
//   } catch (error: any) {
//     if (error.error?.http_code === 401) {
//       console.error('CLOUDINARY: API Key Invalid or Expired (401 Unauthorized)');
//     } else if (error.error?.http_code === 400) {
//       console.error('CLOUDINARY: Invalid Request (check cloud_name)');
//     } else {
//       console.error('CLOUDINARY: Connection Failed:', error.message);
//     }
//   }
// };

// testCloudinary();

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => ({
//     folder: 'replica-elegance',
//     allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'pdf'],
//     transformation: [{ width: 1920, height: 1080, crop: 'limit' }],
//   }),
// });

// export { cloudinary, storage };


// src/config/cloudinary.ts

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const testCloudinary = async () => {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error('CLOUDINARY: Missing env variables');
    return;
  }

  try {
    const result = await cloudinary.api.ping();
    if (result.status === 'ok') {
      console.log('CLOUDINARY: Connected & API Key Working');
    } else {
      console.error('CLOUDINARY: Connected but ping failed');
    }
  } catch (error: any) {
    if (error.error?.http_code === 401) {
      console.error('CLOUDINARY: API Key Invalid or Expired (401 Unauthorized)');
    } else if (error.error?.http_code === 400) {
      console.error('CLOUDINARY: Invalid Request (check cloud_name)');
    } else {
      console.error('CLOUDINARY: Connection Failed:', error.message);
    }
  }
};

testCloudinary();

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    // Check if file is PDF
    const isPDF = file.mimetype === 'application/pdf';
    
    return {
      folder: 'replica-elegance',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'pdf'],
      // Only apply transformation to images, not PDFs
      // ⭐ REMOVED size limits from transformation
      transformation: isPDF ? undefined : [
        { 
          quality: 'auto:good',
          fetch_format: 'auto'
        }
      ],
      // ⭐ Let Cloudinary handle any size
      resource_type: 'auto',
    };
  },
});

export { cloudinary, storage };