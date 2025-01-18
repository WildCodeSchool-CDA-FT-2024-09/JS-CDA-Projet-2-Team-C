import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import setCookie from 'set-cookie-parser';

// This method checks for validity of a JWT contained in a cookie
// the parameter req.user.sub contains the user id from the database

dotenv.config();

const { JWT_SECRET } = process.env;

export const verifyCookie = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string | null = null;

    if (req.headers.cookie) {
      const cookie = setCookie.parse(req.headers.cookie, { map: true });
      token = cookie?.medagendatoken.value;
    }

    if (!JWT_SECRET) {
      console.info('JWT_SECRET not found in environment variables');
      throw new Error('JWT_SECRET not found in environment variables');
    }

    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET as string);
      console.log(decoded)
      if (!decoded) {
        res
          .status(401)
          .send("Vous n'êtes pas autorisé à accéder à réaliser cette action.");
      }
    } else {
      res
        .status(401)
        .send("Vous n'êtes pas autorisé à accéder à réaliser cette action.");
    }
    next();
  } catch (err) {
    res
      .status(401)
      .send("Vous n'êtes pas autorisé à accéder à réaliser cette action.");
  }
};
