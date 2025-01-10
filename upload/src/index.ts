import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const serverPort = process.env.PORT;

const app = express();
app.use(express.json());

app.post('/document', async (req, res) => {
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
