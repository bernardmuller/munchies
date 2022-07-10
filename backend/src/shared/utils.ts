import { v4 as uuid } from 'uuid';
import isStrongPassword from 'validator/lib/isStrongPassword';
import jwt from 'jsonwebtoken';
import { getUsers } from '../resources/users/actions';
import { requireEnvVar } from '../db/utils';
import { z } from 'zod';
import { AuthenticationError } from './errors';

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
  sessionId,
}: {
  userId: string;
  sessionId: string;
}) => {
  return jwt.sign({ userId, sessionId }, requireEnvVar('JWT_SECRET'), {
    expiresIn: '60 minutes',
  });
};

// const decodeObject = z.object({
//   userId: z.string(),
//   sessionId: z.string(),
//   iat: z.number().optional(),
//   exp: z.number().optional(),
// })

// type DecodedToken = z.infer<typeof decodeObject>

export const decodeToken = (token: string) => {
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
  return user;
};

export const authenticateUser = async (req, res, next) => {
  const token = req.headers['Authorization'];
  if (token) throw new AuthenticationError('no authorization token provided');

  const user = tradeTokenForUser(token);
  if (!user) throw new Error('User not found');
};
