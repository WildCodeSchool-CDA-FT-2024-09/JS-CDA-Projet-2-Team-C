import {
  hashPassword,
  verifyPassword,
  generateToken,
  verifyToken,
  setTokenCookie,
  clearCookie
} from './auth.utils';
// import { User } from '../modules/user/user.entity';
import * as argon2 from 'argon2';
// import * as jwt from 'jsonwebtoken';

describe('auth.utils', () => {
  const mockUser = {
    id: 'b15ec4d0-7c7e-4f14-a1a6-0047f6ed4ca8',
    email: 'test@example.com'
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
      const token = generateToken(mockUser.id);
      expect(token).toBeDefined();
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid token', () => {
      const token = generateToken(mockUser.id);
      const decoded = verifyToken(token);
      expect(decoded).toMatchObject({ id: mockUser.id });
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
      const token = generateToken(mockUser.id);
      setTokenCookie(res, token);
      expect(res.setHeader).toHaveBeenCalledTimes(1);
      const [name, cookieValue] = res.setHeader.mock.calls[0];
      expect(name).toBe('Set-Cookie');
      expect(cookieValue).toContain('medagendatoken=' + token);
      expect(cookieValue).toContain('HttpOnly');
      expect(cookieValue).toContain('Secure');
      expect(cookieValue).toContain('SameSite=Strict');
    });
  });

  describe('clearCookie', () => {
    it('should clear a token cookie', () => {
      const res = {
        setHeader: jest.fn()
      };
      clearCookie(res);
      expect(res.setHeader).toHaveBeenCalledWith(
        'Set-Cookie',
        expect.stringContaining('expires=Thu, 01 Jan 1970 00:00:00')
      );
    });
  });
});
