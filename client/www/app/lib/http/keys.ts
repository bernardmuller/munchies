export const keys = {
  categories: ["categories"],
  createIngredient: ["create-ingredient"],
  ingredients: ["ingredients"],
  deleteIngredient: ["delete-ingredient"],
  currentUserHouseholdDetails: ["household"],
  latestGrocerylistByUserId: ["grocerylist", "user"],
  latestGrocerylistByHouseholdId: ["grocerylist", "household"],
  createItem: ["create-item"],
  checkItem: ["check-item"],
  createList: ["create-list"],
  getGrocerylistById: (id: string) => ["grocerylist", id],
  currentUser: ["current-logged-in-user"]
};
