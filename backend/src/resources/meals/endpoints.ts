import { Request, Response } from 'express';
import {
  addIngredientToMeal,
  createMeal,
  deleteMeal,
  getMeals,
  removeIngredientFromMeal,
  updateMeal,
} from './actions';

const endpoints = [
  {
    method: 'post',
    path: '/meals',
    handler: async (req: Request, res: Response) => {
      const meal = await createMeal({});
      return res.send(meal);
    },
    authenticate: true,
  },
  {
    method: 'get',
    path: '/meals',
    handler: async (req: Request, res: Response) => {
      const meals = await getMeals();
      return res.send(meals);
    },
    authenticate: true,
  },
  {
    method: 'get',
    path: '/meals/:id',
    handler: async (req: Request, res: Response) => {
      const { id } = req.params;
      const meal = await getMeals({ filters: { id } });
      return res.send(meal);
    },
    authenticate: true,
  },
  {
    method: 'put',
    path: '/meals/:id',
    handler: async (req: Request, res: Response) => {
      const { id } = req.params;
      const params = req.body;
      console.log(params);
      const meal = await updateMeal(id, params);
      return res.send(meal);
    },
    authenticate: true,
  },
  {
    method: 'delete',
    path: '/meals/:id',
    handler: async (req: Request, res: Response) => {
      const { id } = req.params;
      const meal = await deleteMeal(id);
      return res.send(meal);
    },
    authenticate: true,
  },
  {
    method: 'post',
    path: '/meals/:id/ingredients/add',
    handler: async (req: Request, res: Response) => {
      const { id } = req.params;
      const meal = await addIngredientToMeal({
        mealId: id,
        ingredientId: req.body.ingredientId,
      });
      return res.send(meal);
    },
    authenticate: true,
  },
  {
    method: 'post',
    path: '/meals/:id/ingredients/remove',
    handler: async (req: Request, res: Response) => {
      const { id } = req.params;
      const meal = await removeIngredientFromMeal({
        mealId: id,
        ingredientId: req.body.ingredientId,
      });
      return res.send(meal);
    },
    authenticate: true,
  },
];

export default endpoints;
