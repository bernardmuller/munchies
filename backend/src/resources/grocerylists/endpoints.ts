import { Request, Response } from 'express';
import {
  createGrocerylist,
  deleteGrocerylist,
  getGrocerylists,
  getGrocerylist,
  updateGrocerylist,
} from './actions';

const endpoints = [
  {
    method: 'post',
    path: '/grocerylists',
    handler: async (req: Request, res: Response) => {
      const grocerylist = await createGrocerylist({ ...req.body });
      return res.send(grocerylist);
    },
    authenticate: true,
  },
  {
    method: 'get',
    path: '/grocerylists',
    handler: async (req: Request, res: Response) => {
      const grocerylists = await getGrocerylists();
      return res.send(grocerylists);
    },
    authenticate: true,
  },
  {
    method: 'get',
    path: '/grocerylists/:id',
    handler: async (req: Request, res: Response) => {
      const { id } = req.params;
      const grocerylist = await getGrocerylist(id);

      return res.send(grocerylist);
    },
    authenticate: true,
  },
  {
    method: 'put',
    path: '/grocerylists/:id',
    handler: async (req: Request, res: Response) => {
      const { id } = req.params;
      const params = {
        grocerylistId: req.body.grocerylistId,
        menuId: req.body.menuId,
      };
      const grocerylist = await updateGrocerylist(id, params);
      return res.send(grocerylist);
    },
    authenticate: true,
  },
  {
    method: 'delete',
    path: '/grocerylists/:id',
    handler: async (req: Request, res: Response) => {
      const { id } = req.params;
      const grocerylist = await deleteGrocerylist(id);
      return res.send(grocerylist);
    },
    authenticate: true,
  },
];

export default endpoints;
