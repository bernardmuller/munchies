import { PrismaClient } from '@prisma/client';
import { requireEnvVar } from './utils';
import { ingredientsList } from './seeds/ingredients';
import { v4 as uuidv4 } from 'uuid';

export const DATABASE_URL = requireEnvVar('DATABASE_URL');

export const db = new PrismaClient({
  datasources: { db: { url: DATABASE_URL } },
});

const seedDB = async () => {
  console.log('Seeding DB');
  for (const ingredient of ingredientsList) {
    await db.ingredient.create({
      data: {
        id: uuidv4(),
        name: ingredient.name,
      },
    });
    console.log(`Created ingredient ${ingredient.name}`);
  }
};

seedDB().then(() => {
  console.log('DB seeded');
});
