import { Request, Response } from 'express';
import {
  createIngredient,
  deleteIngredient,
  getIngredients,
  updateIngredient,
} from './actions';

const endpoints = [
  {
    method: 'post',
    path: '/ingredients',
    handler: async (req: Request, res: Response) => {
      const ingredient = await createIngredient({ ...req.body });
      return res.send(ingredient);
    },
    authenticate: true,
  },
  {
    method: 'get',
    path: '/ingredients',
    handler: async (req: Request, res: Response) => {
      const limit = parseInt(req.query.limit as string);
      const offset = parseInt(req.query.page as string) * limit - limit;
      const ingredients = await getIngredients({
        offset: offset,
        limit: limit,
      });
      return res.send(ingredients);
    },
    authenticate: true,
  },
  {
    method: 'get',
    path: '/ingredients/:id',
    handler: async (req: Request, res: Response) => {
      const { id } = req.params;
      const ingredient = await getIngredients({ filters: { id } });
      return res.send(ingredient);
    },
    authenticate: true,
  },
  {
    method: 'put',
    path: '/ingredients/:id',
    handler: async (req: Request, res: Response) => {
      const { id } = req.params;
      const params = {
        ingredientId: req.body.ingredientId,
        typeId: req.body.typeId,
      };
      const ingredient = await updateIngredient(id, params);
      return res.send(ingredient);
    },
    authenticate: true,
  },
  {
    method: 'delete',
    path: '/ingredients/:id',
    handler: async (req: Request, res: Response) => {
      const { id } = req.params;
      const ingredient = await deleteIngredient(id);
      return res.send(ingredient);
    },
    authenticate: true,
  },
];

export default endpoints;
