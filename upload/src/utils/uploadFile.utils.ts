import path from 'path';
import multer from 'multer';
import { RequestHandler } from 'express';

const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB

const uploadsFolderPath = path.join(__dirname, '../../attachments/');

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, uploadsFolderPath);
  },
  filename(_req, file, cb) {
    cb(
      null,
      // TODO : add the uploader's uuid here for later access control
      `${path.parse(file.originalname).name}-${Date.now()}${path.extname(file.originalname)}`
    );
  }
});

// check the uploaded file type for security reasons
const upload: RequestHandler = multer({
  storage,
  limits: { fileSize: FILE_SIZE_LIMIT },
  fileFilter: (_req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'application/pdf'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Invalid mime type, only JPG, JPEG, PNG and PDF are allowed'));
    }
    return null;
  }
}).single('file'); // 1 file max per request

export { upload };
