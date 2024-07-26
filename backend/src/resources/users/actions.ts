import { db } from '../../db/db';
import { getUuid } from '../../shared/utils';
import { usersModel } from '../../../prisma/zod';
import { NotFoundError } from '../../shared/errors';

export const createUser = async (data: {
  id?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
}) => {
  const userData = { ...data, id: data.id || getUuid() };

  const res = await db.users.create({ data: userData });
  const newUser = usersModel.parse(res);
  return newUser;
};

export const getUsers = async () => {
  const rows = await db.users.findMany();
  const users = rows.map((row) => usersModel.parse(row));
  return users;
};

export const getUser = async (id: string) => {
  if (!id) throw new Error('No id provided');
  const user = await db.users.findUnique({ where: { id } });
  if (!user) throw new Error(`User with id: ${id} not found`);
  return user;
};

export const updateUser = async (
  id: string,
  data: {
    firstname?: string;
    lastname?: string;
    dateofbirth?: Date;
    householdid?: string | null;
  },
) => {
  const user = await getUsers();
  if (!user) {
    throw new Error('User not found');
  }

  const updatedUserData = await db.users.update({
    where: { id },
    data,
  });

  const updatedUser = usersModel.parse(updatedUserData);
  return updatedUser;
};

export const deleteUser = async (id: string) => {
  const user = await getUsers();
  if (!user) throw new Error('User not found');

  await db.users.delete({
    where: {
      id,
    },
  });
  return { message: 'User deleted successfully' };
};

export const deleteAllUsers = async () => {
  await db.users.deleteMany();
};
