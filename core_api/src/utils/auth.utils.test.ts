import {
  hashPassword,
  verifyPassword,
  generateToken,
  verifyToken,
  setTokenCookie
} from './auth.utils';
// import { User } from '../modules/user/user.entity';
import * as argon2 from 'argon2';
// import * as jwt from 'jsonwebtoken';

describe('auth.utils', () => {
  const mockUser = {
    id: 1,
    email: 'test@example.com',
    role: 'user'
    // ...other properties if any...
  };

  describe('hashPassword', () => {
    it('should hash a password', async () => {
      const password = 'password123';
      const hashedPassword = await hashPassword(password);
      expect(hashedPassword).toBeDefined();
      expect(await argon2.verify(hashedPassword, password)).toBe(true);
    });
  });

  describe('verifyPassword', () => {
    it('should verify a password', async () => {
      const password = 'password123';
      const hashedPassword = await hashPassword(password);
      const isValid = await verifyPassword(password, hashedPassword);
      expect(isValid).toBe(true);
    });

    it('should return false for an invalid password', async () => {
      const password = 'password123';
      const hashedPassword = await hashPassword(password);
      const isValid = await verifyPassword('wrongpassword', hashedPassword);
      expect(isValid).toBe(false);
    });
  });

  describe('generateToken', () => {
    it('should generate a JWT token', () => {
      const token = generateToken(mockUser);
      expect(token).toBeDefined();
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid token', () => {
      const token = generateToken(mockUser);
      const decoded = verifyToken(token);
      expect(decoded).toMatchObject({ id: mockUser.id, email: mockUser.email });
    });

    it('should return null for an invalid token', () => {
      const decoded = verifyToken('invalidtoken');
      expect(decoded).toBeNull();
    });
  });

  describe('setTokenCookie', () => {
    it('should set a token cookie', () => {
      const res = {
        setHeader: jest.fn()
      };
      const token = generateToken(mockUser);
      setTokenCookie(res, token);
      expect(res.setHeader).toHaveBeenCalledWith(
        'Set-Cookie',
        expect.stringContaining('medagendatoken=')
      );
    });
  });
});
