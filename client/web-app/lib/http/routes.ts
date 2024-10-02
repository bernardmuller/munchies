const apiRoutes = {
  getAllCategories: () => {
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`;
  },
  ingredients: () => {
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}/ingredients`;
  },
  deleteIngredient: (id: string) => {
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}/ingredients/${id}`;
  },
  getCurrentUserHouseholdDetails: () => {
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}/households/current`;
  },
  households: () => {
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}/households`;
  },
  joinHousehold: () => {
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}/households/join`;
  },
  leaveHousehold: () => {
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}/households/leave`;
  },
  latestGrocerylistByUserId: () => {
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}/grocerylists/user`;
  },
  latestGrocerylistByHouseholdId: () => {
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}/grocerylists/household`;
  },
  createGrocerylistItem: (id: string) => {
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}/grocerylists/${id}/add`;
  },
  checkItem: (id: string) => {
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}/items/${id}/check`;
  },
  createList: () => {
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}/grocerylists`;
  },
  getGrocerylistById: (id: string) => {
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}/grocerylists/${id}`;
  },
  deleteItem: (id: string) => {
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}/items/${id}`;
  },
};

export default apiRoutes;
