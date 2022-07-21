import { v4 as uuid } from 'uuid';
import isStrongPassword from 'validator/lib/isStrongPassword';
import jwt from 'jsonwebtoken';
import { getUsers } from '../resources/users/actions';
import { requireEnvVar } from '../db/utils';
import { z } from 'zod';
import { AuthenticationError } from './errors';
import { NextFunction, Request } from 'express';
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
      expiresIn: '60 minutes',
    },
  );
};

export const decodeToken = function (token: string): any {
  return jwt.verify(token, requireEnvVar('JWT_SECRET'), (err, decoded) => {
    if (err) throw new AuthenticationError(`Error decoding token: ${err}`);
    // const decodedToken = decodeObject.parse(decoded)
    // return {userId: decoded?.userId, sessionId: decoded?.sessionId}
    return decoded;
  });
};

export const tradeTokenForUser = async (authToken: string) => {
  const decoded = decodeToken(authToken);
  const user = await getUsers({ filters: { id: decoded.userId } });
  if (!user) throw new Error('User not found');
  return decoded.userId;
};

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers['authorization']!;
  if (!token) throw new AuthenticationError('no authorization token provided');

  const user = await tradeTokenForUser(token.split(' ')[1]);
  if (!user) throw new Error('User not found');

  next();
};
