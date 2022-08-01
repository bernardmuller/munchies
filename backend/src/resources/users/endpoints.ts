import { Request, Response } from 'express';
import { getUsers } from './actions';

const endpoints = [
  {
    method: 'get',
    path: '/users',
    handler: async (req: Request, res: Response) => {
      const users = await getUsers();
      return res.send(users);
    },
    authenticate: true,
  },
  {
    method: 'get',
    path: '/users/:id',
    handler: async (req: Request, res: Response) => {
      const { id } = req.params;
      const user = await getUsers({ filters: { id } });
      return res.send(user);
    },
    authenticate: true,
  },
];

export default endpoints;
