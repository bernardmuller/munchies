import { Request, Response } from 'express';
import {
  addMealToMenu,
  createMenu,
  deleteMenu,
  getMenu,
  getMenus,
  removeMealfromMenu,
  updateMenu,
} from './actions';

const endpoints = [
  {
    method: 'post',
    path: '/menus',
    handler: async (req: Request, res: Response) => {
      const menu = await createMenu(req.body);
      return res.send(menu);
    },
    authenticate: true,
  },
  {
    method: 'get',
    path: '/menus',
    handler: async (req: Request, res: Response) => {
      const menus = await getMenus();
      return res.send(menus);
    },
    authenticate: true,
  },
  {
    method: 'get',
    path: '/menus/:id',
    handler: async (req: Request, res: Response) => {
      const { id } = req.params;
      const menu = await getMenu(id);
      return res.send(menu);
    },
    authenticate: true,
  },
  {
    method: 'put',
    path: '/menus/:id',
    handler: async (req: Request, res: Response) => {
      const { id } = req.params;
      const menu = await updateMenu(id, req.body);
      return res.send(menu);
    },
    authenticate: true,
  },
  {
    method: 'delete',
    path: '/menus/:id',
    handler: async (req: Request, res: Response) => {
      const { id } = req.params;
      const menu = await deleteMenu(id);
      return res.send(menu);
    },
    authenticate: true,
  },
  {
    method: 'post',
    path: '/menus/:id/meals/add',
    handler: async (req: Request, res: Response) => {
      const { id } = req.params;
      if (!id || !req.body.mealId)
        return res.status(400).send({ message: 'Missing required fields' });
      const menu = await addMealToMenu({ menuId: id, mealId: req.body.mealId });
      return res.send(menu);
    },
    authenticate: true,
  },
  {
    method: 'post',
    path: '/menus/:id/meals/remove',
    handler: async (req: Request, res: Response) => {
      const { id } = req.params;
      const menu = await removeMealfromMenu({
        menuId: id,
        mealId: req.body.mealId,
      });
      return res.send(menu);
    },
    authenticate: true,
  },
];

export default endpoints;
