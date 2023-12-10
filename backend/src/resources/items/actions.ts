import { db } from '../../db/db';
import { getUuid } from '../../shared/utils';
import { ItemModel } from '../../../prisma/zod';

export const createItem = async (data: {
  ingredientId: string;
  grocerylistId: string;
  typeId?: number;
}) => {
  const itemData = { ...data, typeId: data.typeId || 1, id: getUuid() };

  const res = await db.item.create({
    data: {
      groceryListId: itemData.grocerylistId,
      ingredientId: itemData.ingredientId,
      typeId: itemData.typeId,
      id: itemData.id,
    },
  });
  const newItem = ItemModel.parse(res);
  return newItem;
};

export const getItems = async (params?: { filters?: { id?: string } }) => {
  if (params?.filters?.id) {
    const row = await db.item.findUnique({ where: { id: params.filters.id } });
    const Item = ItemModel.parse(row);
    return Item;
  }
  const rows = await db.item.findMany();
  const Items = rows.map((row) => ItemModel.parse(row));
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

  const updatedItemData = await db.item.update({
    where: { id },
    data: { ...data },
  });

  const updatedItem = ItemModel.parse(updatedItemData);

  return updatedItem;
};

export const deleteItem = async (id: string) => {
  const Item = await getItems({ filters: { id } });
  if (!Item) throw new Error('Item not found');

  await db.item.delete({
    where: {
      id,
    },
  });

  return { message: 'item deleted successfully' };
};

export const deleteAllItems = async () => {
  await db.item.deleteMany();
};

export const checkItem = async (id: string) => {
  const item = await getItems({ filters: { id } });
  if (!item) {
    throw new Error('Item not found');
  }

  const updatedItem = await db.item.update({
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

  const updatedItem = await db.item.update({
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
  const item = await db.item.create({
    data: {
      id: getUuid(),
      description: description,
      typeId: 2,
    },
  });

  return item;
};
