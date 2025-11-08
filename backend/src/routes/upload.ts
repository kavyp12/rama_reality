import express from 'express';
import multer from 'multer';
import { storage } from '../config/cloudinary';
import { uploadImage } from '../controllers/uploadController';

const router = express.Router();

const upload = multer({ storage });

// 👈 CHANGE: Use upload.array('files', 10) instead of upload.single('file')
// This will process an array of files under the field name "files"
router.post('/', upload.array('files', 10), uploadImage);

export default router;