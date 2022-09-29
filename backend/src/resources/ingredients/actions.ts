import { db } from '../../db/db';
import { getUuid } from '../../shared/utils';
import { IngredientModel } from '../../../prisma/zod';

interface IOptions {
  skip: number;
  take: number;
  orderBy: {
    name: string;
  };
  where?: {
    name: {
      contains: string;
    };
  };
}

export const createIngredient = async (data: { id?: string; name: string }) => {
  const IngredientData = { ...data, id: data.id || getUuid() };

  const res = await db.ingredient.create({ data: IngredientData });
  const newIngredient = IngredientModel.parse(res);
  return newIngredient;
};

export const getIngredients = async (params?: {
  filters?: { id?: string };
  offset?: number;
  limit?: number;
  searchTerm?: string;
}) => {
  if (params?.filters?.id) {
    const row = await db.ingredient.findUnique({
      where: { id: params.filters.id },
    });
    if (!row) throw new Error(`Could not find`);
    const Ingredient = IngredientModel.parse(row);
    return Ingredient;
  }

  let options: any = {
    skip: params?.offset || 0,
    take: params?.limit || 10,
    orderBy: {
      name: 'asc',
    },
  };

  if (params?.searchTerm && params?.searchTerm !== '') {
    options = {
      ...options,
      where: {
        name: {
          contains: params?.searchTerm,
        },
      },
    };
  }

  const rows = await db.ingredient.findMany({ ...options });
  const Ingredients = rows.map((row) => IngredientModel.parse(row));
  return Ingredients;
};

export const deleteIngredient = async (id: string) => {
  const ingredient = await getIngredients({ filters: { id } });
  if (!ingredient) throw new Error('Ingredient not found');

  await db.ingredient.delete({
    where: {
      id,
    },
  });
};

export const deleteAllIngredients = async () => {
  await db.ingredient.deleteMany();
};

export const updateIngredient = async (
  id: string,
  data: { id?: string; name: string },
) => {
  const Ingredient = await getIngredients({ filters: { id } });
  if (!Ingredient) {
    throw new Error('Ingredient not found');
  }

  const updatedIngredientData = await db.ingredient.update({
    where: { id },
    data: { ...data },
  });

  const updatedIngredient = IngredientModel.parse(updatedIngredientData);

  return updatedIngredient;
};
