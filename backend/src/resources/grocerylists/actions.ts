import { db } from '../../db/db';
import { getUuid } from '../../shared/utils';
import { GrocerylistModel } from '../../../prisma/zod';

export const createGrocerylist = async (data: {
  id?: string;
  menuId?: string;
}) => {
  const grocerylistData = { ...data, id: data?.id || getUuid() };

  const res = await db.grocerylist.create({ data: grocerylistData });
  const newGrocerylist = GrocerylistModel.parse(res);
  return newGrocerylist;
};

export const getGrocerylists = async (params?: {
  filters?: { id?: string; menuId?: string };
}) => {
  if (params?.filters?.id) {
    const row = await db.grocerylist.findUnique({
      where: { id: params?.filters?.id },
    });
    if (!row) throw new Error('Could not find grocerylist');
    const grocerylist = GrocerylistModel.parse(row);
    return grocerylist;
  }
  if (params?.filters?.menuId) {
    const row = await db.grocerylist.findUnique({
      where: { menuId: params?.filters?.menuId },
    });
    if (!row) throw new Error('Could not find grocerylist');
    const grocerylist = GrocerylistModel.parse(row);
    return grocerylist;
  }
  const rows = await db.grocerylist.findMany();
  const Grocerylists = rows.map((row) => GrocerylistModel.parse(row));
  return Grocerylists;
};

export const updateGrocerylist = async (
  id: string,
  data: { menuId: string },
) => {
  const grocerylist = await getGrocerylists({ filters: { id } });
  if (!grocerylist) {
    throw new Error('User not found');
  }

  const updatedGrocerylistData = await db.grocerylist.update({
    where: { id },
    data,
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const updatedGrocerylist = GrocerylistModel.parse(updatedGrocerylistData);

  return updatedGrocerylist;
};

export const deleteGrocerylist = async (id: string) => {
  const grocerylist = await getGrocerylists({ filters: { id } });
  if (!grocerylist) throw new Error('User not found');

  await db.grocerylist.delete({
    where: {
      id,
    },
  });
};

export const deleteGrocerylists = async () => {
  await db.grocerylist.deleteMany();
};
