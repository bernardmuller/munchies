import { db } from '../../db/db';
import { getUuid } from '../../shared/utils';
import { MealModel, MenuModel } from '../../../prisma/zod';
import { createGrocerylist } from '../grocerylists/actions';
import { getMeals } from '../meals/actions';
import { createItem } from '../items/actions';
import { Meal } from '@prisma/client';
import { NotFoundError } from '../../shared/errors';

export const createMenu = async (data: { id?: string }) => {
  const menuData = { name: 'New Menu', id: data?.id || getUuid() };

  const res = await db.menu.create({ data: menuData });

  await createGrocerylist({ menuId: res.id });

  const newMenu = MenuModel.parse(res);
  return newMenu;
};

export const getMenus = async (params?: { filters?: { id?: string } }) => {
  if (params?.filters?.id) {
    const uniqueMenu = await db.menu.findUnique({
      where: { id: params.filters.id },
    });
    const menuMeals = await db.menuMeals.findMany({
      where: { menuId: uniqueMenu?.id },
    });

    let temp: any[] = [];
    for (const menuMeal of menuMeals) {
      const dbMeal = await getMeals({ filters: { id: menuMeal.mealId } });
      if (!dbMeal) {
        throw new NotFoundError();
      }
      temp.push(dbMeal);
    }

    // Replace map with https://www.npmjs.com/package/p-map
    const meals = await Promise.all(
      menuMeals.map(async (menuMeal) => {
        const dbMeal = await getMeals({ filters: { id: menuMeal.mealId } });
        if (!dbMeal) {
          throw new NotFoundError();
        }
        return dbMeal;
      }),
    );

    return {
      ...uniqueMenu,
      meals: temp,
    };
  }
  const rows = await db.menu.findMany();
  const menus = rows.map((row) => MenuModel.parse(row));
  return menus;
};

export const updateMenu = async (
  id: string,
  data: { name?: string; startDate?: Date; endDate?: Date },
) => {
  const menu = await getMenus({ filters: { id } });
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
  const menu = await getMenus({ filters: { id } });
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

export const addMealtoMenu = async ({
  mealId,
  menuId,
}: {
  mealId: string;
  menuId: string;
}) => {
  const newMenuMeal = await db.menuMeals.create({
    data: {
      id: getUuid(),
      mealId: mealId,
      menuId: menuId,
    },
  });
  return newMenuMeal;
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
  const dbMenu = await getMenus({ filters: { id: menuId } });
  if (!dbMenu) return { message: `No menu found with id: ${menuId}` };

  const grocerylist = await db.grocerylist.findFirst({
    where: {
      menuId: menuId,
    },
  });

  if (!grocerylist) throw new Error(`No grocerylist found for menu: ${menuId}`);

  for (const meal of meals) {
    const dbMeal = await getMeals({ filters: { id: meal.id } });
    if (!dbMeal) throw new Error(`No meal with id ${meal.id} found`);

    await addMealtoMenu({ menuId: menuId, mealId: meal.id });

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
