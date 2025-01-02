import nodemailer, { Transporter } from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS } = process.env;

const transporter: Transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: Number(MAIL_PORT), // Ensure the port is a number
  secure: false,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS
  }
});

export default transporter;
