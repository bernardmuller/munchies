import { Request, Response } from 'express';
import {
  checkItem,
  createItem,
  deleteItem,
  getItems,
  unCheckItem,
  updateItem,
} from './actions';

const endpoints = [
  {
    method: 'post',
    path: '/items',
    handler: async (req: Request, res: Response) => {
      const { ingredientId, grocerylistId } = req.body;
      const item = await createItem({ ingredientId, grocerylistId });
      return res.send(item);
    },
    authenticate: true,
  },
  {
    method: 'get',
    path: '/items',
    handler: async (req: Request, res: Response) => {
      const items = await getItems();
      return res.send(items);
    },
    authenticate: true,
  },
  {
    method: 'get',
    path: '/items/:id',
    handler: async (req: Request, res: Response) => {
      const { id } = req.params;
      const item = await getItems({ filters: { id } });
      return res.send(item);
    },
    authenticate: true,
  },
  {
    method: 'put',
    path: '/items/:id',
    handler: async (req: Request, res: Response) => {
      const { id } = req.params;
      const params = {
        ingredientId: req.body.ingredientId,
        typeId: req.body.typeId,
      };
      const item = await updateItem(id, params);
      return res.send(item);
    },
    authenticate: true,
  },
  {
    method: 'delete',
    path: '/items/:id',
    handler: async (req: Request, res: Response) => {
      const { id } = req.params;
      const item = await deleteItem(id);
      return res.send(item);
    },
    authenticate: true,
  },
  {
    method: 'post',
    path: '/items/:id/check',
    handler: async (req: Request, res: Response) => {
      console.log('check');
      const { id } = req.params;
      const item = await checkItem(id);
      return res.send(item);
    },
    authenticate: true,
  },
  {
    method: 'post',
    path: '/items/:id/unCheck',
    handler: async (req: Request, res: Response) => {
      console.log('uncheck');
      const { id } = req.params;
      const item = await unCheckItem(id);
      return res.send(item);
    },
    authenticate: true,
  },
];

export default endpoints;
