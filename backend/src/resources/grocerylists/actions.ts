import { db } from '../../db/db';
import { getUuid } from '../../shared/utils';
import { grocerylistsModel } from '../../../prisma/zod';

export const createGrocerylist = async (data: {
  createdBy: string;
  householdId: string;
}) => {
  const grocerylistData = { id: getUuid(), ...data };

  const res = await db.grocerylists
    .create({ data: grocerylistData })
    .catch((err) => {
      console.log('err: ', err);
      throw new Error('Could not create grocerylist');
    });

  return res;
};

export const getGrocerylists = async () => {
  const rows = await db.grocerylists.findMany({
    include: { menu: true },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return rows;
};

export const getGrocerylistsByUserId = async (userId: string) => {
  const rows = await db.grocerylists.findMany({
    where: { createdBy: userId },
    include: { menu: true },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return rows;
};

export const getGrocerylist = async (id: string) => {
  const row = await db.grocerylists.findUnique({
    where: { id },
  });
  const menu = await db.menus.findUnique({
    where: { id: row?.menuId as string },
  });
  if (!row) throw new Error('Could not find grocerylist');
  const items = await db.items.findMany({
    where: { groceryListId: id },
    include: { ingredient: true },
  });
  const grocerylist = grocerylistsModel.parse(row);
  return { ...grocerylist, menu: menu, items };
};

export const getGrocerylistByMenuId = async (menuId: string) => {
  const row = await db.grocerylists.findUnique({
    where: { menuId },
  });
  if (!row) throw new Error('Could not find grocerylist');
  const grocerylist = grocerylistsModel.parse(row);
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

  const updatedGrocerylistData = await db.grocerylists.update({
    where: { id },
    data: { ...data },
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const updatedGrocerylist = grocerylistsModel.parse(updatedGrocerylistData);

  return updatedGrocerylist;
};

export const deleteGrocerylist = async (id: string) => {
  const grocerylist = await getGrocerylist(id);
  if (!grocerylist) throw new Error('User not found');

  await db.grocerylists.delete({
    where: {
      id,
    },
  });
};

export const deleteGrocerylists = async () => {
  await db.grocerylists.deleteMany();
};

export const getNewestGrocerylist = async (userId: string) => {
  const grocerylist = await db.grocerylists
    .findFirst({
      orderBy: {
        createdAt: 'desc',
      },
      where: { AND: { createdBy: userId, householdId: null } },
    })
    .catch((err) => {
      console.log('err: ', err);
      throw new Error('Could not find newest grocerylist');
    });
  if (!grocerylist) throw new Error('Could not find newest grocerylist');
  const items = await db.items
    .findMany({
      where: { groceryListId: grocerylist.id },
      include: { ingredient: true },
    })
    .catch((err) => {
      console.log('err: ', err);
      throw new Error('Could not find items');
    });
  return { ...grocerylist, items };
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
// async function createMenuMealAndGroceryItems(
//   mealId: string,
//   menuId: string,
// ): Promise<void> {
//   // create menu_meal
//   const menuMeal = await db.menusMeals.create({
//     mealId: mealId,
//     menuId: menuId,
//   });

//   // get menu's grocery list ID
//   const menu = await db.menus.findByPk(menuId);
//   const groceryListId = menu.groceryListId;

//   // loop through meal_ingredients
//   const mealIngredients = await db.meal_ingredient.findAll({
//     where: {
//       mealId,
//     },
//   });

//   for (const mealIngredient of mealIngredients) {
//     // create grocery item
//     const groceryItem = await db.grocery_item.create({
//       name: mealIngredient.name,
//       quantity: mealIngredient.quantity,
//     });

//     // add item to grocery list
//     await db.grocerylists_item.create({
//       groceryListId,
//       itemId: groceryItem.id,
//     });
//   }
// }
