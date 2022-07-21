/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Grocerylist, Menu } from '@prisma/client';
import test from 'ava';
import { getGrocerylists } from '../grocerylists/actions';
import {
  createMenu,
  getMenus,
  updateMenu,
  deleteAllMenus,
  deleteMenu,
} from './actions';

test('createMenu creates menu and creates grocerylist', async (t) => {
  await deleteAllMenus();
  const menu = await createMenu({});
  t.truthy(menu.id);
  t.is(menu.name, 'New Menu');
});

// test('getMenus >  gets menus', async (t) => {
//   await deleteAllMenus();
//   const newMenu = await createMenu({});
//   const [menus] = await getMenus();
//   t.truthy(menus);
//   // t.is(menus.name, 'New Menu');
// });

// test('updateUser updates user', async (t) => {
//   await deleteAllMenus()
//   const user = await createMenu({
//     emailAddress: 'j@r.com',
//     firstName: 'George',
//     password: 'Tester@123',
//   })
//   t.is(user.firstName, 'George')
//   t.truthy(user.id)

//   const updatedUser = await updateUser(user.id, {firstName: 'Jack'})
//   t.is(updatedUser.firstName, 'Jack')
//   t.is(updatedUser.id, user.id)
// })

// test('deleteMenu deletes menu and deletes grocerylist linked to it', async (t) => {
//   const menu = await createMenu({});
//   t.truthy(menu.id);
//   t.is(menu.name, 'New Menu');

//   const grocerylist = await getGrocerylists({
//     filters: { menuId: menu.id },
//   });
//   t.truthy(grocerylist);

//   const deletedMenu = await deleteMenu(menu.id);
//   t.truthy(deletedMenu.message);
//   t.is(deletedMenu.message, 'Menu deleted successfully');

//   // const deletedGrocerylist = await getGrocerylists({
//   //   filters: { id: grocerylist.id },
//   // });
//   // t.falsy(deletedGrocerylist);
// });
