import userEndpoints from '../resources/users/endpoints';
import authEndpoints from '../resources/auth/endpoints';
import menuEndpoints from '../resources/menus/endpoints';
import mealEndpoints from '../resources/meals/endpoints';
import itemEndpoints from '../resources/items/endpoints';
import ingredientEndpoints from '../resources/ingredients/endpoints';
import householdEndpoints from '../resources/households/endpoints';
// import grocerylistEndpoints from '../resources/grocerylists/endpoints';

export const endpoints = [
  ...userEndpoints,
  ...menuEndpoints,
  ...mealEndpoints,
  ...itemEndpoints,
  ...ingredientEndpoints,
  //   ...grocerylistEndpoints,
  ...authEndpoints,
  ...householdEndpoints,
];
