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

export const useRemoveDirectionFromMeal = ({
  mealId,
  directionIndex,
}: {
  mealId: string;
  directionIndex: number;
}) => {
  const queryClient = useQueryClient();
  return useMutation(removeDirectionFromMeal, {
    onMutate: async () => {
      await queryClient.cancelQueries([`meal-${mealId}`]);
      const previousMeal = queryClient.getQueryData([`meal-${mealId}`]) as any;
      queryClient.setQueryData([`meal-${mealId}`], {
        ...previousMeal,
        directions: previousMeal.directions.filter(
          (direction: any, index: number) => index !== directionIndex,
        ),
      });
      return { previousMeal };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData([`meal-${mealId}`], context?.previousMeal);
    },
    onSettled: () => {
      queryClient.invalidateQueries([`meal-${mealId}`]);
    },
  });
};

export const useAddDirectionToMeal = ({
  mealId,
  newDirection,
}: {
  mealId: string;
  newDirection: string;
}) => {
  const queryClient = useQueryClient();
  return useMutation(addDirectionToMeal, {
    onMutate: async () => {
      await queryClient.cancelQueries([`meal-${mealId}`]);
      const previousMeal = queryClient.getQueryData([`meal-${mealId}`]) as any;
      queryClient.setQueryData([`meal-${mealId}`], {
        ...previousMeal,
        directions: [...previousMeal.directions, newDirection],
      });
      return { previousMeal };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData([`meal-${mealId}`], context?.previousMeal);
    },
    onSettled: () => {
      queryClient.invalidateQueries([`meal-${mealId}`]);
    },
  });
};
