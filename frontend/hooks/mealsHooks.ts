import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addDirectionToMeal,
  createMeal,
  fetchMeal,
  fetchMeals,
  removeDirectionFromMeal,
  updateMeal,
} from '../pages/api/meals';

export const useMealsData = () => {
  return useQuery(['meals'], fetchMeals);
};

export const useMealData = (id: string) => {
  const { data, isLoading, isSuccess, isError, isFetching } = useQuery([`meal-${id}`], () =>
    fetchMeal(id),
  );
  return { data, isLoading, isSuccess, isError, isFetching };
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
  return useMutation(updateMeal);
};

export const useAddDirectionToMeal = (mealId: string) => {
  const queryClient = useQueryClient();
  return useMutation(addDirectionToMeal, {
    onSuccess: () => {
      queryClient.invalidateQueries([`meal-${mealId}`]);
    },
  });
};

export const useRemoveDirectionFromMeal = (mealId: string) => {
  const queryClient = useQueryClient();
  return useMutation(removeDirectionFromMeal, {
    onSuccess: () => {
      queryClient.invalidateQueries([`meal-${mealId}`]);
    },
  });
};
