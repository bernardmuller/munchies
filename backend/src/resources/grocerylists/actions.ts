import { db } from '../../db/db';
import { getUuid } from '../../shared/utils';
import { GrocerylistModel } from '../../../prisma/zod';

export const createGrocerylist = async (data: { menuId?: string }) => {
  const grocerylistData = { ...data, id: getUuid() };

  const res = await db.grocerylist.create({ data: grocerylistData });

  const newGrocerylist = GrocerylistModel.parse(res);
  return newGrocerylist;
};

export const getGrocerylists = async () => {
  const rows = await db.grocerylist.findMany({
    include: { menu: true },
  });
  const Grocerylists = rows.map((row) => GrocerylistModel.parse(row));
  return Grocerylists;
};

export const getGrocerylist = async (id: string) => {
  const row = await db.grocerylist.findUnique({
    where: { id },
  });
  const menu = await db.menu.findUnique({
    where: { id: row.menuId },
  });
  if (!row) throw new Error('Could not find grocerylist');
  const items = await db.item.findMany({
    where: { groceryListId: id },
    include: { ingredient: true },
  });
  const grocerylist = GrocerylistModel.parse(row);
  return { ...grocerylist, menu: menu, items };
};

export const getGrocerylistByMenuId = async (menuId: string) => {
  const row = await db.grocerylist.findUnique({
    where: { menuId },
  });
  if (!row) throw new Error('Could not find grocerylist');
  const grocerylist = GrocerylistModel.parse(row);
  return grocerylist;
};

export const updateGrocerylist = async (
  id: string,
  data: { menuId: string },
) => {
  const grocerylist = await getGrocerylist(id);
  if (!grocerylist) {
    throw new Error('User not found');
  }

  const updatedGrocerylistData = await db.grocerylist.update({
    where: { id },
    data: { ...data },
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const updatedGrocerylist = GrocerylistModel.parse(updatedGrocerylistData);

  return updatedGrocerylist;
};

export const deleteGrocerylist = async (id: string) => {
  const grocerylist = await getGrocerylist(id);
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

// export const addExtraItem = async ({
//   grocerylistId,
//   description,
// }: {
//   grocerylistId: string;
//   description: string;
// }) => {
// await .create({data : {}})
// };
//
async function createMenuMealAndGroceryItems(
  mealId: string,
  menuId: string,
): Promise<void> {
  // create menu_meal
  const menuMeal = await db.menuMeals.create({
    mealId: mealId,
    menuId: menuId,
  });

  // get menu's grocery list ID
  const menu = await db.menu.findByPk(menuId);
  const groceryListId = menu.groceryListId;

  // loop through meal_ingredients
  const mealIngredients = await db.meal_ingredient.findAll({
    where: {
      mealId,
    },
  });

  for (const mealIngredient of mealIngredients) {
    // create grocery item
    const groceryItem = await db.grocery_item.create({
      name: mealIngredient.name,
      quantity: mealIngredient.quantity,
    });

    // add item to grocery list
    await db.grocerylist_item.create({
      groceryListId,
      itemId: groceryItem.id,
    });
  }
}
