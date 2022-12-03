import { z } from 'zod';
import { compare, hash, genSalt } from 'bcryptjs';
import {
  isValidPassword,
  createJwtToken,
  getUuid,
  tradeTokenForUser,
} from '../../shared/utils';
import { db } from '../../db/db';
import { UserModel } from '../../../prisma/zod';
import { createUser, getUser, getUsers } from '../users/actions';
import { AuthenticationError } from 'shared/errors';

export const login = async (data: { email: string; password: string }) => {
  const user = await db.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) throw new Error('Invalid email and/or password');

  const isPasswordValid = await compare(data.password, user.password);
  if (!isPasswordValid) throw new Error('Invalid email and/or password');

  // const session = await db.session.create({
  //   data: {
  //     id: getUuid(),
  //     userId: user.id,
  //   },
  // });

  const token = createJwtToken({
    userId: user.id,
    // sessionId: session.id,
  });

  return { token };
};

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type Schema = z.infer<typeof registerSchema>;
type User = z.infer<typeof UserModel>;

export const register = async (data: { email: string; password: string }) => {
  const existingUser = await db.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) throw new Error('User with that email already exists.');
  if (!data.password) throw new Error('Provide a valid password.');

  isValidPassword(data?.password);

  const salt = await genSalt(10);
  const passwordHash = await hash(data.password, salt);

  const userData: Schema = registerSchema.parse({
    email: data.email,
    password: passwordHash,
  });

  const newUser: User = await createUser(userData);
  return newUser;
};

export const swapTokenForUser = async (token: string) => {
  if (!token) throw new AuthenticationError('no authorization token provided');

  const user = await tradeTokenForUser(token.split(' ')[1]);
  const dbUser = await getUser(user.id);
  if (!dbUser) throw new Error('User not found');
  if (dbUser) {
    console.log(dbUser);
  }

  return dbUser;
};
