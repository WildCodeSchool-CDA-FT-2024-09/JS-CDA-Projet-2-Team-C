import express from 'express';
import dotenv from 'dotenv';
import { sendMail } from './utils/mailer.util';

dotenv.config();
const { MAILER_PORT } = process.env;

const app = express();
app.use(express.json());

app.post('/send-mail', async (req, res) => {
  try {
    const { to, subject, text } = req.body;
    if (!to || !subject || !text) throw new Error();

    const mailOptions = req.body;
    const { success } = await sendMail(mailOptions);

    if (success) {
      res.sendStatus(201);
    } else {
      res.sendStatus(500);
    }
  } catch {
    res.status(400).send('Invalid input');
  }
});

app.listen(MAILER_PORT, () => {
  console.info(`Listening on port ${MAILER_PORT}`);
});
