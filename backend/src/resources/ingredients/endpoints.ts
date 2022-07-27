import { Request, Response } from 'express';
import {
  createIngredient,
  deleteIngredient,
  getIngredients,
  updateIngredient,
} from './actions';

const endpoints = [
  {
    method: 'POST',
    path: '/ingredients',
    handler: async (req: Request, res: Response) => {
      const ingredient = await createIngredient({ ...req.body });
      return res.send(ingredient);
    },
    authenticate: true,
  },
  {
    method: 'GET',
    path: '/ingredients',
    handler: async (req: Request, res: Response) => {
      const ingredients = await getIngredients();
      return res.send(ingredients);
    },
    authenticate: true,
  },
  {
    method: 'GET',
    path: '/ingredients/:id',
    handler: async (req: Request, res: Response) => {
      const { id } = req.params;
      const ingredient = await getIngredients({ filters: { id } });
      return res.send(ingredient);
    },
    authenticate: true,
  },
  {
    method: 'PUT',
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
    method: 'DELETE',
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
