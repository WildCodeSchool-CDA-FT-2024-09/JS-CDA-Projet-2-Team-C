import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import setCookie from 'set-cookie-parser';

dotenv.config();

const { JWT_SECRET } = process.env;

// This method checks for validity of a JWT contained in a cookie
// TODO : add the user role inside the JWT payload and check for it here
export const verifyCookie = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string | null = null;

    if (req.headers.cookie) {
      console.info('cookie found in headers');
      const cookie = setCookie.parse(req.headers.cookie, { map: true });
      token = cookie?.medagendatoken.value;
    } else {
      throw new Error('Unauthorized');
    }

    if (!JWT_SECRET) {
      console.info('JWT_SECRET not found in environment variables');
      throw new Error('JWT_SECRET not found in environment variables');
    }

    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET as string);
      if (!decoded) {
        throw new Error('Unauthorized');
      }
    } else {
      throw new Error('Unauthorized');
    }
    next();
  } catch (err) {
    res
      .status(401)
      .send("Vous n'êtes pas autorisé à accéder à réaliser cette action.");
  }
};
