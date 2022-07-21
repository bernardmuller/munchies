// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
import test from 'ava';
import { getUuid } from '../../shared/utils';
import { createIngredient } from '../ingredients/actions';
import {
  createItem,
  deleteAllItems,
  getItems,
  updateItem,
  deleteItem,
} from './actions';

test('createItem > creates Item', async (t) => {
  await deleteAllItems();
  const ingredient = await createIngredient({
    name: 'New Ingredient',
  });
  const item = await createItem({ ingredientId: ingredient.id, typeId: 1 });
  t.truthy(item.id);
});

test('getItems > gets Items', async (t) => {
  await deleteAllItems();
  const ingredient = await createIngredient({
    name: 'New Ingredient',
  });
  const newItem = await createItem({ ingredientId: ingredient.id, typeId: 1 });

  const item = await getItems({
    filters: { id: newItem.id },
  });
  t.truthy(item);
});

test('updateItem > updates Item', async (t) => {
  await deleteAllItems();
  const ingredient = await createIngredient({
    name: 'New Ingredient',
  });
  const item = await createItem({ ingredientId: ingredient.id, typeId: 1 });

  t.truthy(item.id);

  const updatedItem = await updateItem(item.id, {
    ingredientId: ingredient.id,
    typeId: 2,
  });
  t.is(updatedItem.typeId, 2);
});

test('deleteItem > deletes Item', async (t) => {
  const item = await createItem({ ingredientId: getUuid(), typeId: 1 });
  t.truthy(item.id);

  const deletedItem = await deleteItem(item.id);
  t.truthy(deletedItem.message);
});
