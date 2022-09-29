import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createIngredient, fetchIngredients } from 'pages/api/ingredients';
import { addIngredientToMeal } from 'pages/api/meals';

export const useIngredientsData = () => {
  return useQuery(['ingredients'], () => fetchIngredients({}));
};

export const useAddIngredient = () => {
  const queryClient = useQueryClient();
  return useMutation(createIngredient, {
    onSuccess: () => {
      return queryClient.invalidateQueries(['ingredients']);
    },
  });
};

export const useAddIngredientToMeal = () => {
  const queryClient = useQueryClient();
  return useMutation(addIngredientToMeal, {});
};
