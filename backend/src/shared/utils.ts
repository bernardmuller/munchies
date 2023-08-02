import { v4 as uuid } from 'uuid';
import isStrongPassword from 'validator/lib/isStrongPassword';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { getUser } from '../resources/users/actions';
import { requireEnvVar } from '../db/utils';
import { AuthenticationError } from './errors';
import { NextFunction, Request, Response } from 'express';
import { add, formatISO } from 'date-fns';
import { User } from '@prisma/client';

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

export const createJwtToken = async ({ user }: { user: User }) => {
  const ONE_DAY = 60 * 60 * 24;
  const tomorrow = add(new Date(), { days: 1 });
  const expiryDate = formatISO(tomorrow);

  const token = jwt.sign(
    {
      username: `${user.firstName} ${user.lastName}`,
      userId: user.id,
      expiresAt: expiryDate,
    },
    requireEnvVar('JWT_SECRET'),
    {
      expiresIn: ONE_DAY,
    },
  );
  return token;
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

  const user = await getUser(decoded?.userId);

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
  const dbUser = await getUser(user);

  if (!dbUser) throw new Error('User not found');

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
  next();
};
