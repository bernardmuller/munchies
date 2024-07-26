import { z } from 'zod';
import { compare, hash, genSalt } from 'bcryptjs';
import {
  isValidPassword,
  createJwtToken,
  tradeTokenForUser,
} from '../../shared/utils';
import { db } from '../../db/db';
import { usersModel } from '../../../prisma/zod';
import { createUser, getUser } from '../users/actions';
import { AuthenticationError } from '../../shared/errors';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginData = z.infer<typeof loginSchema>;

export const login = async (data: LoginData) => {
  loginSchema.parse(data);
  const user = await db.users.findUnique({
    where: {
      email: data.email,
    },
  });
  if (!user) throw new Error('Invalid email and/or password');
  const isPasswordValid = await compare(data.password, user.password);
  if (!isPasswordValid) throw new Error('Invalid email and/or password');
  const token = await createJwtToken({
    user,
  });
  return { token };
};

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstname: z.string().min(1),
  lastname: z.string().min(1),
});

type User = z.infer<typeof usersModel>;

type RegisterData = z.infer<typeof registerSchema>;

export const register = async (data: RegisterData) => {
  const existingUser = await db.users.findFirst({
    where: {
      email: data.email,
    },
  });
  if (existingUser) throw new Error('User with that email already exists.');
  if (!data.password) throw new Error('Please provide a valid password.');
  isValidPassword(data?.password);
  const salt = await genSalt(10);
  const passwordHash = await hash(data.password, salt);
  const newUser: User = await createUser({
    ...data,
    password: passwordHash,
  });
  return newUser;
};

export const authenticate = async (token: string) => {
  if (!token) throw new AuthenticationError('no authorization token provided');

  const user = await tradeTokenForUser(token.split(' ')[1]);
  const dbUser = await getUser(user.id);
  if (!dbUser) throw new Error('User not found');

  return dbUser;
};
