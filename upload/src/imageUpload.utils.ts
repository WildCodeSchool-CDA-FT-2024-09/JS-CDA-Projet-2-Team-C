import path from 'path';
import multer from 'multer';
import { RequestHandler } from 'express';

const uploadsFolderPath = path.join(
  __dirname,
  '../attachments/'
);

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, uploadsFolderPath);
  },
  filename(_req, file, cb) {
    cb(
      null,
      // TODO : find a consensus here, how should security be taken into account ? 
      `${path.parse(file.originalname).name}-${Date.now()}${path.extname(file.originalname)}`
    );
  }
});

// check the uploaded file type for security reasons
const upload :RequestHandler = multer({
  storage,
  // this line limits the file size
  // TODO : find a correct size
  limits: { fileSize: 1000000 },
  fileFilter: (_req, file, cb) => {
    if (
      // these checks make sure that only these file types are allowed
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Invalid mime type'));
    }
    return null;
  }
}).array('attachments',10); // 10 files max

export { upload };
