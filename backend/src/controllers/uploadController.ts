import { Request, Response } from 'express';

// @desc    Upload image(s) to Cloudinary
// @route   POST /api/upload
export const uploadImage = async (req: Request, res: Response) => {
  try {
    console.log('📥 POST /api/upload - Processing image upload...');

    // ✅ NEW CHECK (only uses req.files)
    if (!req.files || (req.files as any[]).length === 0) {
      console.log('❌ No files provided');
      return res.status(400).json({
        success: false,
        error: 'Please provide image file(s) in the "files" field',
      });
    }

    // ✅ Always handle multiple files
    const files = req.files as any[];
    const urls = files.map((file) => file.path); // Cloudinary URLs

    console.log(`✅ ${urls.length} images uploaded successfully`);

    res.status(200).json({
      success: true,
      urls,
      message: `${urls.length} images uploaded successfully`,
    });

  } catch (error: any) {
    console.error('❌ Error uploading image:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message,
    });
  }
};
