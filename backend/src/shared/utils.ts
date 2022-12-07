import { v4 as uuid } from 'uuid';
import isStrongPassword from 'validator/lib/isStrongPassword';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { getUser, getUsers } from '../resources/users/actions';
import { requireEnvVar } from '../db/utils';
import { z } from 'zod';
import { AuthenticationError } from './errors';
import { NextFunction, Request, Response } from 'express';
import { router } from '../http/routes';

declare namespace Express {
  export interface Request {
    currentUser?: string;
  }
}

export const getUuid = () => {
  return uuid();
};

export const isValidPassword = (str: string) => {
  const score: boolean = isStrongPassword(str);
  if (!score)
    throw new Error(
      'Password not strong enough. Requires: Minlength(7), Special Char, Integer, 1 Lowercase, 1 Uppercase.',
    );
};

export const createJwtToken = ({
  userId,
}: // sessionId,
{
  userId: string;
  // sessionId: string;
}) => {
  return jwt.sign(
    {
      userId,
      // sessionId,
    },
    requireEnvVar('JWT_SECRET'),
    {
      expiresIn: 60 * 60 * 24 * 7,
    },
  );
};

export const decodeToken = (token: string) => {
  const promise = new Promise<JwtPayload>((resolve, reject) => {
    jwt.verify(token, requireEnvVar('JWT_SECRET'), (err, decoded) => {
      if (err) {
        reject(`Error decoding token: ${err}`);
      }
      // const decodedToken = decodeObject.parse(decoded)
      // return {userId: decoded?.userId, sessionId: decoded?.sessionId}
      resolve(decoded as JwtPayload);
    });
  });

  return promise;
};

export const tradeTokenForUser = async (authToken: string) => {
  const decoded = await decodeToken(authToken);
  const user = await getUsers({ filters: { id: decoded?.userId } });
  if (!user) throw new Error('User not found');
  return decoded?.userId;
};

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers['authorization']!;
  if (!token) throw new AuthenticationError('no authorization token provided');

  const user = await tradeTokenForUser(token.split(' ')[1]);
  const dbUser = await getUser(user.id);
  if (!dbUser) throw new Error('User not found');
  if (dbUser) {
    console.log(dbUser);
  }

  res.locals.userId = user;

  next();
};

export const createSuccessMessage = () => {
  return { message: 'Action completed successfully.' };
};

export const createNotFoundMessage = () => {
  return { message: 'Not found.' };
};

export const extractRequestOrigin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const origin = req.headers.origin;
  console.log(origin);

  next();
};
