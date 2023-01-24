import { db } from '../../db/db';
import { getUuid } from '../../shared/utils';
import { UserModel } from '../../../prisma/zod';
import { NotFoundError } from '../../shared/errors';

export const createUser = async (data: {
  id?: string;
  email: string;
  firstName?: string;
  password: string;
}) => {
  const userData = { ...data, id: data.id || getUuid() };

  const res = await db.user.create({ data: userData });
  const newUser = UserModel.parse(res);
  return newUser;
};

export const getUsers = async () => {
  const rows = await db.user.findMany();
  const users = rows.map((row) => UserModel.parse(row));
  return users;
};

export const getUser = async (id: string) => {
  if (!id) throw new Error('No id provided');
  const user = await db.user.findUnique({ where: { id } });
  if (!user) throw new Error(`User with id: ${id} not found`);
  return user;
};

export const updateUser = async (
  id: string,
  data: {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    householdId?: string | null;
  },
) => {
  const user = await getUsers();
  if (!user) {
    throw new Error('User not found');
  }

  const updatedUserData = await db.user.update({
    where: { id },
    data,
  });

  const updatedUser = UserModel.parse(updatedUserData);
  return updatedUser;
};

export const deleteUser = async (id: string) => {
  const user = await getUsers();
  if (!user) throw new Error('User not found');

  await db.user.delete({
    where: {
      id,
    },
  });
  return { message: 'User deleted successfully' };
};

export const deleteAllUsers = async () => {
  await db.user.deleteMany();
};
