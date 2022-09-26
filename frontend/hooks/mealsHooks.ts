import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createMeal,
  fetchMeal,
  fetchMeals,
  updateMeal,
} from '../pages/api/meals';

export const useMealsData = () => {
  return useQuery(['meals'], fetchMeals);
};

export const useMealData = (id: string) => {
  return useQuery([`meal-${id}`], () => fetchMeal(id));
};

export const useAddMeal = () => {
  const queryClient = useQueryClient();
  return useMutation(createMeal, {
    onSuccess: () => {
      return queryClient.invalidateQueries(['meals']);
    },
  });
};

export const useUpdateMeal = () => {
  const queryClient = useQueryClient();
  return useMutation(updateMeal, {
    onSuccess: () => {
      return queryClient.invalidateQueries(['meals']);
    },
  });
};
