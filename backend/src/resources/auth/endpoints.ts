import { Request, Response } from 'express';
import { authenticate, login, register } from './actions';

const endpoints = [
  {
    method: 'post',
    path: '/auth/login',
    handler: async (req: Request, res: Response) => {
      const { email, password } = req.body;
      if (!email || !password)
        throw new Error("'Email' and 'Password' required");
      const token = await login({
        email,
        password,
      });
      return res.send(token);
    },
    authenticate: false,
  },
  {
    method: 'post',
    path: '/auth/register',
    handler: async (req: Request, res: Response) => {
      const { email, password, firstname, lastname } = req.body;
      if (!email || !password)
        throw new Error("'Email' and 'Password' required");
      const response = await register({
        email,
        password,
        firstname,
        lastname,
      });
      return res.send(response);
    },
    authenticate: false,
  },
  {
    method: 'post',
    path: '/auth/authenticate',
    handler: async (req: Request, res: Response) => {
      const { token } = req.body;
      if (!token)
        throw new Error('No token provided, please login to get a token.');
      const response = await authenticate(token);
      return res.status(200).send({ message: response });
    },
    authenticate: false,
  },
  // NOTE: This endpoint is not implemented yet
  //       DO NOT uncomment, it will create a vulnerability
  //
  // {
  //   method: 'post',
  //   path: '/auth/forgot-password',
  //   handler: async (req: Request, res: Response) => {
  //     const { email } = req.body;
  //     if (!email) throw new Error('No email provided');
  //     const response = await forgotPassword(email);
  //     return res.status(200).send({ message: response });
  //   },
  //   authenticate: false,
  // },
];

export default endpoints;
