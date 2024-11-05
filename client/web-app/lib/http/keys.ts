export const keys = {
  categories: ["categories"],
  createIngredient: ["create-ingredient"],
  ingredients: ["ingredients"],
  deleteIngredient: ["delete-ingredient"],
  currentUserHouseholdDetails: ["current-user-household-details"],
  latestGrocerylistByUserId: ["latest-grocerylist-user"],
  latestGrocerylistByHouseholdId: ["latest-grocerylist-household"],
  createItem: ["create-item"],
  checkItem: ["check-item"],
  createList: ["create-list"],
  getGrocerylistById: (id: string) => ["get-grocerylist-by-id", id],
  currentUser: ["current-logged-in-user"]
};
