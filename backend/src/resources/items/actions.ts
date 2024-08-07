import { db } from '../../db/db';
import { getUuid } from '../../shared/utils';
import { itemsModel } from '../../../prisma/zod';

export const createItem = async (data: {
  ingredientId: string;
  grocerylistId: string;
  typeId?: number;
  createdBy: string;
}) => {
  const itemData = {
    typeId: data.typeId || 1,
    id: getUuid(),
    createdAt: new Date(),
    createdBy: data.createdBy,
    groceryListId: data.grocerylistId,
    ingredientId: data.ingredientId,
  };

  const res = await db.items.create({
    data: itemData,
  });
  const newItem = itemsModel.parse(res);
  return newItem;
};

export const getItems = async (params?: { filters?: { id?: string } }) => {
  if (params?.filters?.id) {
    const row = await db.items.findUnique({ where: { id: params.filters.id } });
    const Item = itemsModel.parse(row);
    return Item;
  }
  const rows = await db.items.findMany();
  const Items = rows.map((row) => itemsModel.parse(row));
  return Items;
};

export const updateItem = async (
  id: string,
  data: { id?: string; ingredientId: string; typeId: number },
) => {
  const Item = await getItems({ filters: { id } });
  if (!Item) {
    throw new Error('Item not found');
  }

  const updatedItemData = await db.items.update({
    where: { id },
    data: { ...data },
  });

  const updatedItem = itemsModel.parse(updatedItemData);

  return updatedItem;
};

export const deleteItem = async (id: string) => {
  const Item = await getItems({ filters: { id } });
  if (!Item) throw new Error('Item not found');

  await db.items.delete({
    where: {
      id,
    },
  });

  return { message: 'item deleted successfully' };
};

export const deleteAllItems = async () => {
  await db.items.deleteMany();
};

export const checkItem = async (id: string) => {
  const item = await getItems({ filters: { id } });
  if (!item) {
    throw new Error('Item not found');
  }

  const updatedItem = await db.items.update({
    where: { id },
    data: { check: true },
  });

  return updatedItem;
};

export const unCheckItem = async (id: string) => {
  const item = await getItems({ filters: { id } });
  if (!item) {
    throw new Error('Item not found');
  }

  const updatedItem = await db.items.update({
    where: { id },
    data: { check: false },
  });

  return updatedItem;
};

export const createExtraItem = async ({
  description,
}: {
  description: string;
}) => {
  const item = await db.items.create({
    // @ts-ignore
    data: {
      id: getUuid(),
      description: description,
      typeId: 2,
    },
  });

  return item;
};
