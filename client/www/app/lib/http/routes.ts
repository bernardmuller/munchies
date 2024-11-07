const apiRoutes = {
  getAllCategories: () => {
    return `${import.meta.env.VITE_API_BASE_URL}/categories`;
  },
  ingredients: () => {
    return `${import.meta.env.VITE_API_BASE_URL}/ingredients`;
  },
  deleteIngredient: (id: string) => {
    return `${import.meta.env.VITE_API_BASE_URL}/ingredients/${id}`;
  },
  getCurrentUserHouseholdDetails: () => {
    return `${import.meta.env.VITE_API_BASE_URL}/households/current`;
  },
  households: () => {
    return `${import.meta.env.VITE_API_BASE_URL}/households`;
  },
  joinHousehold: () => {
    return `${import.meta.env.VITE_API_BASE_URL}/households/join`;
  },
  leaveHousehold: () => {
    return `${import.meta.env.VITE_API_BASE_URL}/households/leave`;
  },
  latestGrocerylistByUserId: () => {
    return `${import.meta.env.VITE_API_BASE_URL}/grocerylists/user`;
  },
  latestGrocerylistByHouseholdId: () => {
    return `${import.meta.env.VITE_API_BASE_URL}/grocerylists/household`;
  },
  createGrocerylistItem: (id: string) => {
    return `${import.meta.env.VITE_API_BASE_URL}/grocerylists/${id}/add`;
  },
  checkItem: (id: string) => {
    return `${import.meta.env.VITE_API_BASE_URL}/items/${id}/check`;
  },
  createList: () => {
    return `${import.meta.env.VITE_API_BASE_URL}/grocerylists`;
  },
  getGrocerylistById: (id: string) => {
    return `${import.meta.env.VITE_API_BASE_URL}/grocerylists/${id}`;
  },
  deleteItem: (id: string) => {
    return `${import.meta.env.VITE_API_BASE_URL}/items/${id}`;
  },
  getCurrentLoggedInUser: () => {
    return `${import.meta.env.VITE_API_BASE_URL}/users/current`;
  },
};

export default apiRoutes;
