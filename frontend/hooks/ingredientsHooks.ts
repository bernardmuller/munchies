import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createIngredient, fetchIngredients } from 'pages/api/ingredients';

export const useIngredientsData = () => {
  return useQuery(['ingredients'], fetchIngredients);
};

export const useAddIngredient = () => {
  const queryClient = useQueryClient();
  return useMutation(createIngredient, {
    onSuccess: () => {
      return queryClient.invalidateQueries(['ingredients']);
    },
  });
};
