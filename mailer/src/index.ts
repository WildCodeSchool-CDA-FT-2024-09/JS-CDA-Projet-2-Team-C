import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const serverPort = process.env.PORT;

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  console.info(req.body);
  res.send('Hello World!');
});

app.listen(serverPort, () => {
  console.info(`Listening on port ${serverPort}`);
});
