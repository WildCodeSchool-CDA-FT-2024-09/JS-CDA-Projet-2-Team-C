import * as dotenv from 'dotenv';

dotenv.config();

const { MAILER_HOST, MAILER_PORT } = process.env;

export async function sendPasswordByEmail(
  email: string,
  password: string
): Promise<boolean> {
  try {
    const response = await fetch(
      `http://${MAILER_HOST}:${MAILER_PORT}/send-mail`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: email,
          subject: 'Un compte a été créé pour vous',
          text: `Un compte à été créé pour vous, Contactez le chef de service pour obtenir le lien vers l'application, votre mot de passe est : ${password}, ne le communiquez à personne.`
        })
      }
    );
    return response.ok;
  } catch {
    return false;
  }
}
