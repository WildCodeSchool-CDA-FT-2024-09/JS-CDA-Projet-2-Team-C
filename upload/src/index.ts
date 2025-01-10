import express from 'express';
import dotenv from 'dotenv';
import { upload } from './imageUpload.utils';

dotenv.config();
const serverPort = process.env.PORT;

const app = express();
app.use(express.json());

// TODO - Verify wether the user is authenticated before allowing the upload
// TODO - Add a utils to send requests to coreAPI

app.post('/document', upload, async (req, res) => {
  try {
    console.info('received a post request');
    

    res.status(201).send('Document uploaded');
  } catch {
    res.status(400).send('Invalid input');
  }
});

app.listen(serverPort, () => {
  console.info(`Listening on port ${serverPort}`);
});
