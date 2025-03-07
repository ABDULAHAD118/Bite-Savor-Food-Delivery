import multer from 'multer';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

const storage = multer.memoryStorage();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({
    storage,
    limits: { fileSize: 2.5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Only JPEG images are allowed'));
        }
    },
}).single('image');

export const uploadImageMiddleware = (req, res, next) => {
    upload(req, res, async (err) => {
        if (err) {
            if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ error: 'File size exceeds 2.5 MB' });
            }
            return res.status(400).json({ error: err.message });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        try {
            const result = await cloudinary.uploader.upload_stream(
                { folder: '/images' },
                (error, result) => {
                    if (error) {
                        return res.status(500).json({ error: 'Cloudinary upload failed' });
                    }
                    req.imageURL = result?.url;
                    next();
                }
            );
            result.end(req.file.buffer);
        }
        catch (error) {
            return res.status(500).json({ message: 'Failed to upload image', error: error.message });
        }
    });
};