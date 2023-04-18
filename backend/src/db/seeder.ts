import { PrismaClient } from '@prisma/client';
import { requireEnvVar } from './utils';

export const DATABASE_URL = requireEnvVar('DATABASE_URL');

export const db = new PrismaClient({
  datasources: { db: { url: DATABASE_URL } },
});

const seedDB = async () => {};

seedDB().then(() => {});
