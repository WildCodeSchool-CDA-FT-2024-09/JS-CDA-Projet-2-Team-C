import * as dotenv from 'dotenv';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import { User } from '../modules/user/user.entity';

dotenv.config();

export async function hashPassword(password: string): Promise<string> {
  return await argon2.hash(password);
}

export async function verifyPassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return await argon2.verify(hashedPassword, plainPassword);
}

export function generateToken(user: User): string {
  const { JWT_SECRET } = process.env;
  if (!JWT_SECRET) {
    throw new Error('Server error: Missing JWT_SECRET');
  }

  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

export function setTokenCookie(
  res: { setHeader: (key: string, value: string) => void },
  token: string
): void {
  res.setHeader(
    'Set-Cookie',
    `token=${token}; HttpOnly; Secure; SameSite=Strict; expires=${new Date(
      Date.now() + 1000 * 60 * 60 * 24
    ).toUTCString()}, Max-Age=${60 * 60 * 24}`
  );
}
