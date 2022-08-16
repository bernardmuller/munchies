import { Request, Response } from 'express';
import { login, register } from './actions';

const endpoints = [
  {
    method: 'post',
    path: '/auth/login',
    handler: async (req: Request, res: Response) => {
      const { emailAddress, password } = req.body;
      if (!emailAddress || !password)
        throw new Error("'emailAddress' and 'password' required");
      const token = await login({
        emailAddress,
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
      const { emailAddress, password } = req.body;
      if (!emailAddress || !password)
        throw new Error("'emailAddress' and 'password' required");
      const response = await register({
        emailAddress,
        password,
      });
      return res.send(response);
    },
    authenticate: false,
  },
];

export default endpoints;
