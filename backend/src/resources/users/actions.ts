import { db } from '../../db/db';
import { getUuid } from '../../shared/utils';
import { UserModel } from '../../../prisma/zod';

export const createUser = async (data: {
  id?: string;
  emailAddress: string;
  firstName?: string;
  password: string;
}) => {
  const userData = { ...data, id: data.id || getUuid() };

  const res = await db.user.create({ data: userData });
  const newUser = UserModel.parse(res);
  return newUser;
};

export const getUsers = async (params?: { filters?: { id?: string } }) => {
  if (params?.filters?.id) {
    const row = await db.user.findUnique({ where: { id: params.filters.id } });
    const user = UserModel.parse(row);
    return user;
  }
  const rows = await db.user.findMany();
  const users = rows.map((row) => UserModel.parse(row));
  return users;
};

export const updateUser = async (
  id: string,
  data: { firstName?: string; lastName?: string; dateOfBirth?: Date },
) => {
  const user = await getUsers({ filters: { id } });
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
  const user = await getUsers({ filters: { id } });
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
