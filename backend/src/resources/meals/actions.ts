import { db } from '../../db/db';
import {
  createNotFoundMessage,
  createSuccessMessage,
  getUuid,
} from '../../shared/utils';
import { MealModel } from '../../../prisma/zod';
import { getIngredients } from '../ingredients/actions';
import { NotFoundError } from '../../shared/errors';

export const createMeal = async (data: { id?: string }) => {
  const mealData = { ...data, id: data.id || getUuid() };

  const res = await db.meal.create({ data: mealData });
  const newMeal = MealModel.parse(res);
  return newMeal;
};

export const getMeals = async (params?: { filters?: { id?: string } }) => {
  if (params?.filters?.id) {
    let uniqueMeal = await db.meal.findUnique({
      where: { id: params.filters.id },
    });
    const ingredientRows = await db.mealIngredient.findMany({
      where: { mealId: params.filters.id },
      include: { ingredient: true },
    });
    let mealObj = {
      ...uniqueMeal,
      ingredients: [],
    };
    ingredientRows.forEach((ing) => {
      return mealObj.ingredients.push(ing.ingredient);
    });
    return mealObj;
  }
  const rows = await db.meal.findMany();
  const meals = rows.map((row) => MealModel.parse(row));
  return meals;
};

export const updateMeal = async (
  id: string,
  data: {
    name?: string;
    directions?: string;
    cuisine?: string;
    URL?: string;
    image?: string;
    prepTime?: number;
    cookTime?: number;
    readyIn?: number;
    rating?: string;
    notes?: string;
  },
) => {
  const meal = await getMeals({ filters: { id } });

  if (!meal) {
    throw new NotFoundError();
  }

  const updatedMealData = await db.meal.update({
    where: { id },
    data: {
      ...data,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const updatedMeal = MealModel.parse(updatedMealData);

  return updatedMeal;
};

export const deleteMeal = async (id: string) => {
  const user = await getMeals({ filters: { id } });
  if (!user) throw new Error('Meal not found');

  await db.meal.delete({
    where: {
      id,
    },
  });
  return createSuccessMessage();
};

export const deleteMeals = async () => {
  await db.meal.deleteMany();
};

export const addIngredientToMeal = async ({
  mealId,
  ingredientId,
}: {
  mealId: string;
  ingredientId: string;
}) => {
  const meal = await getMeals({ filters: { id: mealId } });
  if (!meal) throw new NotFoundError('Meal not found.');

  const ingredient = await getIngredients({ filters: { id: ingredientId } });
  if (!ingredient) throw new NotFoundError('Ingredient not found.');

  await db.mealIngredient.create({
    data: {
      id: getUuid(),
      mealId,
      ingredientId,
    },
  });

  const mealIngredients = await db.mealIngredient.findMany();

  return createSuccessMessage();
};

export const removeIngredientFromMeal = async ({
  mealId,
  ingredientId,
}: {
  mealId: string;
  ingredientId: string;
}) => {
  const meal = await getMeals({ filters: { id: mealId } });
  if (!meal) throw new NotFoundError('Meal not found.');

  const ingredient = await getIngredients({ filters: { id: ingredientId } });
  if (!ingredient) throw new NotFoundError('Ingredient not found.');

  const mealIngredient = await db.mealIngredient.findFirst({
    where: { AND: [{ mealId }, { ingredientId }] },
  });
  await db.mealIngredient.delete({ where: { id: mealIngredient?.id } });

  return createSuccessMessage();
};
