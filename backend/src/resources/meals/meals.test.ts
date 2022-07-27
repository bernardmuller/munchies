// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
import test from 'ava';
import {
  createIngredient,
  deleteAllIngredients,
  getIngredients,
  updateIngredient,
  deleteIngredient,
} from './actions';

test('createIngredient > creates Ingredient', async (t) => {
  await deleteAllIngredients();
  const ingredient = await createIngredient({
    name: 'New Ingredient',
  });
  t.truthy(ingredient.id);
  t.is(ingredient.name, 'New Ingredient');
});

test('getIngredients > gets Ingredients', async (t) => {
  await deleteAllIngredients();
  const newIngredient = await createIngredient({
    name: 'New Ingredient',
  });
  const ingredient = await getIngredients({
    filters: { id: newIngredient.id },
  });
  t.truthy(ingredient);
});

test('updateIngredient > updates Ingredient', async (t) => {
  await deleteAllIngredients();
  const ingredient = await createIngredient({
    name: 'New Ingredient',
  });
  t.is(ingredient.name, 'New Ingredient');
  t.truthy(ingredient.id);

  const updatedIngredient = await updateIngredient(ingredient.id, {
    name: 'Test Ingredient',
  });
  t.is(updatedIngredient.name, 'Test Ingredient');
  t.is(updatedIngredient.id, ingredient.id);
});

test('deleteIngredient > deletes Ingredient', async (t) => {
  const ingredient = await createIngredient({
    name: 'New Ingredient',
  });
  t.truthy(ingredient.id);
  t.is(ingredient.name, 'New Ingredient');

  const deletedIngredient = await deleteIngredient(ingredient.id);
  t.falsy(deletedIngredient);
});
