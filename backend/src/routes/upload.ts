// import express from 'express';
// import multer from 'multer';
// import { storage } from '../config/cloudinary';
// import { uploadImage } from '../controllers/uploadController';

// const router = express.Router();

// const upload = multer({ storage });

// // 👈 CHANGE: Use upload.array('files', 10) instead of upload.single('file')
// // This will process an array of files under the field name "files"
// router.post('/', upload.array('files', 10), uploadImage);

// export default router;
import express from 'express';
import multer from 'multer';
import { storage } from '../config/cloudinary';
import { uploadImage } from '../controllers/uploadController';

const router = express.Router();

// Limit file size to 4MB per file
const upload = multer({ 
  storage,
  limits: {
    fileSize: 4 * 1024 * 1024, // 4MB in bytes
  },
  fileFilter: (req, file, cb) => {
    // Accept images and PDFs only
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only images and PDF files are allowed!'));
    }
  }
});

// Add a GET endpoint to check if upload service is available
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Upload endpoint is ready. Use POST request with multipart/form-data.',
    maxFiles: 10,
    maxFileSize: '4MB per file',
    supportedFormats: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'pdf'],
    fieldName: 'files',
  });
});

// Upload multiple files (max 10, each max 4MB)
router.post('/', upload.array('files', 10), uploadImage);

// Error handler for multer errors
router.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({
        success: false,
        error: 'File too large',
        message: 'Each file must be less than 4MB. Please compress your images before uploading.',
      });
    }
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
  
  if (err) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
  
  next();
});

export default router;