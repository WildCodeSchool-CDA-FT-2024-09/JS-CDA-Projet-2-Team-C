import express from 'express';
import dotenv from 'dotenv';
import { upload } from './imageUpload.utils';
import { addAttachment } from './coreapiConnexion.utils';

dotenv.config();
const { UPLOAD_PORT } = process.env;

const app = express();
app.use(express.json());

// TODO - Verify wether the user is authenticated before allowing the upload
// TODO - Add a utils to send requests to coreAPI

app.post('/document', upload, async (req, res) => {
  try {
    console.info('received a post request');

    const { fileDisplayName, filePath, note, consultationId } = req.body;
    const cookie = req.headers.cookie;

    console.log(cookie, fileDisplayName, filePath, note, consultationId)

    const result = await addAttachment(
      fileDisplayName,
      "/file.tst",
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
  console.info(`Listening on port ${UPLOAD_PORT}`);
});
