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
};

export default apiRoutes;
