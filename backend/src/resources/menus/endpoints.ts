import { Request, Response } from 'express';
import {
  addMealtoMenu,
  createMenu,
  deleteMenu,
  getMenus,
  removeMealfromMenu,
  updateMenu,
} from './actions';

const endpoints = [
  {
    method: 'post',
    path: '/menus',
    handler: async (req: Request, res: Response) => {
      const menu = await createMenu({});
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
      const menu = await getMenus({ filters: { id } });
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
      const menu = await addMealtoMenu({ menuId: id, mealId: req.body.mealId });
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
