import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { upload } from './utils/uploadFile.utils';
import { addAttachment } from './utils/addAttachment.utils';
import { verifyCookie } from './utils/auth.utils';

dotenv.config();
const { UPLOAD_HOST, UPLOAD_PORT } = process.env;

const app = express();
app.use(express.json());

// TODO : this is weak because it grants access to all static files for any secretary or doctor. 
// Improving this is needed for security reasons, we could maybe include the role into the JWT payload ? 
app.use(verifyCookie)

// Serve static files
app.use('/attachments', express.static(path.join(__dirname, 'attachments')));

// POST attachments
app.post('/document',verifyCookie, upload, async (req, res) => {
  try {

    // retreive filePath from upload middleware
    let filePath = "";
    const basePath = "/attachments/";
    if (req.file) {
      const { filename } = req.file;
      filePath = `${basePath}${filename}`; // this is the path that the front end will need to fetch
    }

    // retrieve cookie from the request to forward it to the core api
    const cookie = req.headers.cookie;

    // retrieve other fields from the request body
    const { fileDisplayName, note, consultationId } = req.body;

    const result = await addAttachment(
      fileDisplayName,
      filePath,
      note,
      consultationId,
      cookie as string
    );

    console.info(result);

    res.status(201).send('Document uploaded');
  } catch {
    res.status(400).send('Invalid input');
  }
});

app.listen(UPLOAD_PORT, () => {
  console.info(`Upload service listening on http://${UPLOAD_HOST}:${UPLOAD_PORT}`);
});
