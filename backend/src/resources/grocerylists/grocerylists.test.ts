// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
import test from 'ava';
import {
  createGrocerylist,
  deleteGrocerylists,
  getGrocerylists,
  updateGrocerylist,
  deleteGrocerylist,
} from './actions';

test('createGrocerylist > creates Grocerylist', async (t) => {
  await deleteGrocerylists();
  const grocerylist = await createGrocerylist({});
  t.truthy(grocerylist.id);
});

test('getGrocerylists > gets Grocerylists', async (t) => {
  await deleteGrocerylists();
  const newGrocerylist = await createGrocerylist({});
  const grocerylist = await getGrocerylists({
    filters: { id: newGrocerylist.id },
  });
  t.truthy(grocerylist);
});

test('deleteGrocerylist > deletes Grocerylist', async (t) => {
  const grocerylist = await createGrocerylist({});
  t.truthy(grocerylist.id);

  const deletedGrocerylist = await deleteGrocerylist(grocerylist.id);
  t.falsy(deletedGrocerylist);
});
