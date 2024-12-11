import express from 'express';
import dotenv from 'dotenv';
import { sendMail } from './mailer.util';

dotenv.config();
const serverPort = process.env.PORT;

const app = express();
app.use(express.json());

app.post('/', async (req, res) => {
  try{

    const {to, subject, text}= req.body
    if (!to || !subject || !text) throw new Error

    const mailOptions = req.body
    await sendMail(mailOptions)

    res.sendStatus(201);
  } catch {
    res.status(400).send("Invalid input")
  }
  
  
});

app.listen(serverPort, () => {
  console.info(`Listening on port ${serverPort}`);
});
