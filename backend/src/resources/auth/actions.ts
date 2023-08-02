import { z } from 'zod';
import { compare, hash, genSalt } from 'bcryptjs';
import {
  isValidPassword,
  createJwtToken,
  tradeTokenForUser,
} from '../../shared/utils';
import { db } from '../../db/db';
import { UserModel } from '../../../prisma/zod';
import { createUser, getUser } from '../users/actions';
import { AuthenticationError } from '../../shared/errors';
import nodemailer from 'nodemailer';
import { requireEnvVar } from '../../db/utils';

export const login = async (data: { email: string; password: string }) => {
  const user = await db.user.findUnique({
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

  console.log('token', token);

  return { token };
};

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type Schema = z.infer<typeof registerSchema>;
type User = z.infer<typeof UserModel>;

export const register = async (data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
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

export const authenticate = async (token: string) => {
  if (!token) throw new AuthenticationError('no authorization token provided');

  const user = await tradeTokenForUser(token.split(' ')[1]);
  const dbUser = await getUser(user.id);
  if (!dbUser) throw new Error('User not found');

  return dbUser;
};

export const forgotPassword = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) throw new Error('User not found');

  const token = await createJwtToken({
    user,
  });

  const resetPasswordLink = `${requireEnvVar(
    'BASE_URL',
  )}/reset-password?token=${token}`;

  await sendEmail(
    email,
    'Reset Password',
    `Please use the following link to reset your password: ${resetPasswordLink}}`,
  ).catch((error) => console.error(error));

  return 'Email sent';
};

export const resetPassword = async (data: {
  token: string;
  password: string;
}) => {
  const user = await tradeTokenForUser(data.token);
  if (!user) throw new Error('User not found');

  const salt = await genSalt(10);
  const passwordHash = await hash(data.password, salt);

  const updatedUser = await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: passwordHash,
    },
  });

  return updatedUser;
};

const transporterConfig: nodemailer.TransportOptions = {
  host: 'smtp.forwardemail.net',
  port: 465,
  secure: true,
  auth: {
    user: requireEnvVar('EMAIL_ADDRESS'),
    pass: 'REPLACE-WITH-YOUR-GENERATED-PASSWORD',
  },
};

const transporter = nodemailer.createTransport(transporterConfig);

async function sendEmail(
  to: string,
  subject: string,
  text: string,
): Promise<void> {
  try {
    const mailOptions: nodemailer.SendMailOptions = {
      from: requireEnvVar('EMAIL_ADDRESS'),
      to,
      subject,
      text,
    };

    console.log('Sending email: ', mailOptions);

    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent: ', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
