import { db } from '../../db/db';
import { createSuccessMessage, getUuid } from '../../shared/utils';
import { mealsModel } from '../../../prisma/zod';
import { getIngredients } from '../ingredients/actions';
import { NotFoundError } from '../../shared/errors';
import { ingredients, meals } from '@prisma/client';

type CreateMealArgs = Pick<
  meals,
  | 'name'
  | 'directions'
  | 'cuisine'
  | 'URL'
  | 'image'
  | 'prepTime'
  | 'cookTime'
  | 'readyIn'
  | 'rating'
  | 'notes'
  | 'createdBy'
> & {
  ingredients: ingredients[];
  directions: string[];
};

export const createMeal = async (data: CreateMealArgs) => {
  if (!data.ingredients) throw new Error('No name provided');
  const mealData = {
    name: data.name,
    readyIn: data?.readyIn,
    prepTime: data.prepTime,
    cookTime: data.cookTime,
    cuisine: data.cuisine,
    URL: data.URL,
    image: data.image,
    rating: data.rating,
    notes: data.notes,
    id: getUuid(),
    directions: data.directions,
    createdBy: data.createdBy,
  };

  const res = await db.meals.create({ data: mealData });

  for (const ingredient of data.ingredients) {
    await db.meal_ingredients.create({
      data: {
        id: getUuid(),
        mealId: res.id,
        ingredientId: ingredient.id,
      },
    });
  }

  return res;
};

export const getMeals = async () => {
  const rows = await db.meals.findMany({
    where: {
      deleted: false,
    },
    include: { ingredients: true },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return rows;
};

export const getMealsByUserId = async (id: string) => {
  if (!id) throw new Error('No user id provided');
  const rows = await db.meals.findMany({
    where: { createdBy: id, deleted: false },
    include: {
      ingredients: {
        include: { ingredient: true },
      },
    },
  });
  return rows;
};

export const getMeal = async (id: string) => {
  let uniqueMeal = await db.meals.findUnique({
    where: { id: id },
  });
  if (!uniqueMeal || uniqueMeal.deleted)
    throw new NotFoundError('Meal not found');

  const mealIngredients = await db.meal_ingredients.findMany({
    where: { mealId: id },
    include: { ingredient: true },
  });

  return {
    ...uniqueMeal,
    ingredients: mealIngredients.map((ing) => {
      return { ...ing.ingredient, mealId: uniqueMeal?.id! };
    }),
  };
};

export const updateMeal = async (
  id: string,
  data: {
    name?: string;
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
  const meal = await getMeal(id);

  // if (data.updatedBy !== meal.createdBy)
  //   throw new Error('You are not authorized to update this meal.');

  if (!meal) {
    throw new NotFoundError();
  }

  const updatedMealData = await db.meals.update({
    where: { id },
    data: {
      ...data,
      createdBy: meal.createdBy,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const updatedMeal = mealsModel.parse(updatedMealData);

  return updatedMeal;
};

export const deleteMeal = async (id: string) => {
  const meal = await getMeal(id);
  if (!meal) throw new Error('Meal not found');

  const updatedMealData = await db.meals.update({
    where: { id },
    data: {
      deleted: true,
    },
  });

  return updatedMealData;
};

export const deleteMeals = async () => {
  await db.meals.deleteMany();
};

export const addIngredientToMeal = async ({
  mealId,
  ingredientId,
}: {
  mealId: string;
  ingredientId: string;
}) => {
  const meal = await getMeal(mealId);
  if (!meal) throw new NotFoundError('Meal not found.');

  const ingredient = await getIngredients({ filters: { id: ingredientId } });
  if (!ingredient) throw new NotFoundError('Ingredient not found.');

  const existingMealIngredient = await db.meal_ingredients.findFirst({
    where: { AND: [{ mealId }, { ingredientId }] },
  });

  // if (existingMealIngredient)

  // throw new Error('Ingredient already exists in meal.');

  await db.meal_ingredients.create({
    data: {
      id: getUuid(),
      mealId,
      ingredientId,
    },
  });

  const mealIngredients = await db.meal_ingredients.findMany();

  return createSuccessMessage();
};

export const removeIngredientFromMeal = async ({
  mealId,
  ingredientId,
}: {
  mealId: string;
  ingredientId: string;
}) => {
  const meal = await getMeal(mealId);
  if (!meal) throw new NotFoundError('Meal not found.');

  const ingredient = await getIngredients({ filters: { id: ingredientId } });
  if (!ingredient) throw new NotFoundError('Ingredient not found.');

  const mealIngredient = await db.meal_ingredients.findFirst({
    where: { AND: [{ mealId }, { ingredientId }] },
  });
  await db.meal_ingredients.delete({ where: { id: mealIngredient?.id } });

  return createSuccessMessage();
};

export const addQuantityToMealIngredient = async ({
  mealId,
  ingredientId,
  quantity,
}: {
  mealId: string;
  ingredientId: string;
  quantity: string;
}) => {
  const meal = await getMeal(mealId);
  if (!meal) throw new NotFoundError('Meal not found.');

  const ingredient = await getIngredients({ filters: { id: ingredientId } });
  if (!ingredient) throw new NotFoundError('Ingredient not found.');

  const mealIngredient = await db.meal_ingredients.findFirst({
    where: { AND: [{ mealId }, { ingredientId }] },
  });
  await db.meal_ingredients.update({
    where: { id: mealIngredient?.id },
    data: { quantity },
  });

  return createSuccessMessage();
};

export const addDirectionToMeal = async ({
  mealId,
  direction,
}: {
  mealId: string;
  direction: string;
}) => {
  const meal = await getMeal(mealId);
  if (!meal) throw new NotFoundError('Meal not found.');

  const directions = [...meal.directions, direction];

  await db.meals.update({
    where: { id: mealId },
    data: {
      directions: directions,
    },
  });

  return createSuccessMessage();
};

export const removeDirectionFromMeal = async ({
  mealId,
  directionIndex,
}: {
  mealId: string;
  directionIndex: number;
}) => {
  const meal = await getMeal(mealId);
  if (!meal) throw new NotFoundError('Meal not found.');

  const directions = meal.directions.filter(
    (_, index) => index !== directionIndex,
  );

  await db.meals.update({
    where: { id: mealId },
    data: {
      directions: directions,
    },
  });

  return createSuccessMessage();
};
