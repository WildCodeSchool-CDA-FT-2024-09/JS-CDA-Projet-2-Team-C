import dotenv from 'dotenv';
import transporter from './transporter.service';

dotenv.config();
const { MAIL_FROM } = process.env;

interface MailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

interface MailResponse {
  success: boolean;
  message: string;
}

// Send mail function
export const sendMail = async ({
  to,
  subject,
  text
}: MailOptions): Promise<MailResponse> => {
  try {
    const info = await transporter.sendMail({
      from: MAIL_FROM,
      to,
      subject,
      text
    });

    console.log('Email sent:', info.messageId);
    return { success: true, message: 'Email sent'};
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Failed to send email'};
  }
};
