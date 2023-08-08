import dotenv from 'dotenv';
import path from 'path';

export const loadEnv = () => {
  dotenv.config({ path: path.join(__dirname, '../../.env.test') });
};
