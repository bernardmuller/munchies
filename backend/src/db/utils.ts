import dotenv from 'dotenv';
dotenv.config();

export const requireEnvVar = (key: string) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`No environment variable found with key: ${key}`);
  }
  return value;
};
