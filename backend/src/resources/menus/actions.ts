import { db } from '../../db/db';
import { getUuid } from '../../shared/utils';
import { MealModel, MenuModel } from '../../../prisma/zod';
import { createGrocerylist } from '../grocerylists/actions';
import { getMeal } from '../meals/actions';
import { createItem } from '../items/actions';
import { Meal } from '@prisma/client';
import { NotFoundError } from '../../shared/errors';

export const createMenu = async (data: {
  id?: string;
  createdBy: string;
  meals: { id: string }[];
  extraItems?: { id: string }[];
}) => {
  const existingMenus = await db.menu.findMany({
    where: { createdBy: data.createdBy },
  });
  for (const menu of existingMenus) {
    await archiveMenu(menu.id);
  }

  const menuData = {
    name: `Mealplan ${new Date().getFullYear().toString()}`,
    createdBy: data.createdBy,
    id: data?.id || getUuid(),
  };

  const res = await db.menu.create({ data: menuData });

  const newGroceryList = await createGrocerylist({
    menuId: res.id,
    createdBy: data.createdBy,
  });
  const updatedMenu = await db.menu.update({
    where: { id: res.id },
    data: { grocerylistId: newGroceryList.id },
  });

  for (const meal of data.meals) {
    await addMealToMenu({ menuId: res.id, mealId: meal.id });
  }

  if (data.extraItems) {
    for (const ingredient of data.extraItems) {
      await createItem({
        ingredientId: ingredient.id,
        grocerylistId: newGroceryList.id,
        typeId: 2,
      });
    }
  }

  const newMenu = MenuModel.parse(updatedMenu);
  return newMenu;
};

export const getMenus = async () => {
  return await db.menu.findMany({
    include: {
      meals: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const getMenusByUserId = async (userId: string) => {
  return await db.menu.findMany({
    where: {
      createdBy: userId,
    },
    include: {
      meals: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const getMenu = async (id: string) => {
  const uniqueMenu = await db.menu.findUnique({
    where: { id },
  });
  if (!uniqueMenu) throw new NotFoundError('Menu not found');
  const menuMeals = await db.menuMeals.findMany({
    where: { menuId: uniqueMenu?.id },
  });

  const meals = await Promise.all(
    menuMeals.map(async (menuMeal) => {
      const dbMeal = await getMeal(menuMeal.mealId);
      if (!dbMeal) {
        throw new NotFoundError();
      }
      return dbMeal;
    }),
  );

  return {
    ...uniqueMenu,
    meals: meals,
  };
};

export const updateMenu = async (
  id: string,
  data: { name?: string; startDate?: Date; endDate?: Date },
) => {
  const menu = await getMenu(id);
  if (!menu) {
    throw new Error('Menu not found');
  }

  const updatedMenuData = await db.menu.update({
    where: { id },
    data: { name: data.name, startDate: data.startDate, endDate: data.endDate },
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const updatedMenu = MenuModel.parse(updatedMenuData);

  return updatedMenu;
};

export const deleteMenu = async (id: string) => {
  const menu = await getMenus();
  if (!menu) throw new Error('User not found');

  await db.menu.delete({
    where: {
      id,
    },
  });

  await db.grocerylist.delete({
    where: {
      menuId: id,
    },
  });

  return { message: 'Menu deleted successfully' };
};

export const deleteAllMenus = async () => {
  await db.menu.deleteMany();
};

export const removeMealfromMenu = async ({
  mealId,
  menuId,
}: {
  mealId: string;
  menuId: string;
}) => {
  const menuMeal = await db.menuMeals.findFirst({
    where: {
      AND: [
        {
          menuId: menuId,
        },
        { mealId: mealId },
      ],
    },
  });
  if (!menuMeal) return { message: 'No menu_meal found' };
  await db.menuMeals.delete({ where: { id: menuMeal?.id } });
  return { message: 'meal removed successfully' };
};

export const addMealslistToMenu = async ({
  meals,
  menuId,
}: {
  meals: Meal[];
  menuId: string;
}) => {
  const dbMenu = await getMenus();
  if (!dbMenu) return { message: `No menu found with id: ${menuId}` };

  const grocerylist = await db.grocerylist.findFirst({
    where: {
      menuId: menuId,
    },
  });

  if (!grocerylist) throw new Error(`No grocerylist found for menu: ${menuId}`);

  for (const meal of meals) {
    const dbMeal = await getMeal(meal.id);
    if (!dbMeal) throw new Error(`No meal with id ${meal.id} found`);

    await addMealToMenu({ menuId: menuId, mealId: meal.id });

    const mealIngredients = await db.ingredient.findMany({
      where: {
        mealId: meal.id,
      },
    });

    if (mealIngredients.length > 0) {
      for (const ingredient of mealIngredients) {
        await createItem({
          ingredientId: ingredient.id,
          grocerylistId: grocerylist?.id,
        });
      }
    }
  }
};

export const addMealToMenu = async ({
  mealId,
  menuId,
}: {
  mealId: string;
  menuId: string;
}) => {
  const dbMenu = await getMenu(menuId);

  if (!dbMenu) return { message: `No menu found with id: ${menuId}` };

  const grocerylist = await db.grocerylist.findFirst({
    where: {
      menuId: menuId,
    },
  });

  const dbMeal = await getMeal(mealId);
  if (!dbMeal) throw new Error(`No meal with id ${mealId} found`);

  const existing = await db.menuMeals.findFirst({
    where: {
      AND: [{ mealId: mealId }, { menuId: menuId }],
    },
  });

  if (existing !== null) throw new Error('Meal already exists in menu');

  const newMealMenu = await db.menuMeals.create({
    data: {
      id: getUuid(),
      mealId: mealId,
      menuId: menuId,
    },
  });

  if (dbMeal.ingredients.length > 0 && grocerylist) {
    for (const ingredient of dbMeal.ingredients) {
      await createItem({
        ingredientId: ingredient.id,
        grocerylistId: grocerylist.id,
      });
    }
  }
  return {
    ...newMealMenu,
  };
};

export const archiveMenu = async (id: string) => {
  const menu = await db.menu.findUnique({
    where: { id },
  });
  if (!menu) throw new Error('Menu not found');

  const archivedMenu = await db.menu.update({
    where: { id },
    data: { archived: true },
  });

  return archivedMenu;
};

export const getCurrentMenu = async (userId: any) => {
  const menu = await db.menu.findFirst({
    where: {
      AND: [{ archived: false }, { createdBy: userId }],
    },
  });
  if (!menu)
    return {
      data: {},
      message: 'No current menu found',
    };

  const menuMeals = await db.menuMeals.findMany({
    where: { menuId: menu?.id },
  });

  const meals = await Promise.all(
    menuMeals.map(async (menuMeal) => {
      const dbMeal = await db.meal.findUnique({
        where: {
          id: menuMeal.mealId,
        },
        include: {
          ingredients: true,
        },
      });
      if (!dbMeal) {
        throw new NotFoundError();
      }
      return dbMeal;
    }),
  );

  const returnData = {
    ...menu,
    meals: meals,
    grocerylist: await db.grocerylist.findUnique({
      where: {
        id: menu?.grocerylistId as string,
      },
      include: {
        Item: true,
      },
    }),
  };

  return returnData;
};
