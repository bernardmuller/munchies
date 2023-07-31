import { Request, Response } from 'express';
import {
  addDirectionToMeal,
  addIngredientToMeal,
  addQuantityToMealIngredient,
  createMeal,
  deleteMeal,
  getMeal,
  getMeals,
  getMealsByUserId,
  removeDirectionFromMeal,
  removeIngredientFromMeal,
  updateMeal,
} from './actions';

const endpoints = [
  {
    method: 'post',
    path: '/meals',
    handler: async (req: Request, res: Response) => {
      const meal = await createMeal({
        createdBy: res.locals.userId,
        name: req.body.name,
        directions: req.body.directions,
        cuisine: req.body.cuisine,
        URL: req.body.URL,
        image: req.body.image,
        prepTime: req.body.prepTime,
        cookTime: req.body.cookTime,
        readyIn: req.body.readyIn,
        rating: req.body.rating,
        notes: req.body.notes,
        ingredients: req.body.ingredients,
      });
      return res.send(meal);
    },
    authenticate: true,
  },
  {
    method: 'get',
    path: '/meals',
    handler: async (req: Request, res: Response) => {
      const meals = await getMealsByUserId(res.locals.userId);
      return res.send(meals);
    },
    authenticate: true,
  },
  {
    method: 'get',
    path: '/meals/:id',
    handler: async (req: Request, res: Response) => {
      const { id } = req.params;
      const meal = await getMeal(id);
      return res.send(meal);
    },
    authenticate: true,
  },
  {
    method: 'put',
    path: '/meals/:id',
    handler: async (req: Request, res: Response) => {
      const { id } = req.params;
      const params = {
        name: req.body.name,
        directions: req.body.directions,
        cuisine: req.body.cuisine,
        URL: req.body.URL,
        image: req.body.image,
        prepTime: req.body.prepTime,
        cookTime: req.body.cookTime,
        readyIn: req.body.readyIn,
        rating: req.body.rating,
        notes: req.body.notes,
        updatedBy: res.locals.userId,
      };

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
      console.log('req.body', req.body);
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
  {
    method: 'put',
    path: '/meals/:id/ingredients/addQuantity',
    handler: async (req: Request, res: Response) => {
      const { id } = req.params;
      const meal = await addQuantityToMealIngredient({
        mealId: id,
        ingredientId: req.body.ingredientId,
        quantity: req.body.quantity,
      });
      return res.send(meal);
    },
    authenticate: true,
  },
  {
    method: 'put',
    path: '/meals/:id/directions/add',
    handler: async (req: Request, res: Response) => {
      const { id } = req.params;
      const meal = await addDirectionToMeal({
        mealId: id,
        direction: req.body.direction,
      });
      return res.send(meal);
    },
    authenticate: true,
  },
  {
    method: 'put',
    path: '/meals/:id/directions/remove',
    handler: async (req: Request, res: Response) => {
      const { id } = req.params;
      const meal = await removeDirectionFromMeal({
        mealId: id,
        directionIndex: req.body.directionIndex,
      });
      return res.send(meal);
    },
    authenticate: true,
  },
];

export default endpoints;
