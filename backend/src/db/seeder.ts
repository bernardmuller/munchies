import { PrismaClient } from '@prisma/client';
import { requireEnvVar } from './utils';
import { ingredientsList } from './seeds/ingredients';
import {
  createIngredient,
  deleteAllIngredients,
} from '../resources/ingredients/actions';

export const DATABASE_URL = requireEnvVar('DATABASE_URL');

export const db = new PrismaClient({
  datasources: { db: { url: DATABASE_URL } },
});

const seedDB = async () => {
  await deleteAllIngredients();
  for (const item of ingredientsList) {
    await createIngredient({ name: item.name.toLowerCase() });
    console.log(item.name + ' added.');
  }
};

seedDB().then(() => {
  console.log('Database seeded with ingredients.');
});
