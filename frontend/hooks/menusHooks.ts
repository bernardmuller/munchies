import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchMenus, fetchMenu } from '../pages/api/menus';

export const useMenusData = () => {
  return useQuery(['menus'], fetchMenus);
};

export const useMenuData = (id: string) => {
  const { data, isLoading, isSuccess, isError, isFetching } = useQuery([`menu-${id}`], () =>
    fetchMenu(id),
  );
  return { data, isLoading, isSuccess, isError, isFetching };
};
// export const useAddMeal = () => {
//   const queryClient = useQueryClient();
//   return useMutation(createMeal, {
//     onSuccess: () => {
//       return queryClient.invalidateQueries(['meals']);
//     },
//   });
// };
//
// export const useUpdateMenu = () => {
//   return useMutation(updateMeal);
// };
//
// export const useRemoveDirectionFromMeal = ({
//   mealId,
//   directionIndex,
// }: {
//   mealId: string;
//   directionIndex: number;
// }) => {
//   const queryClient = useQueryClient();
//   return useMutation(removeDirectionFromMeal, {
//     onMutate: async () => {
//       await queryClient.cancelQueries([`meal-${mealId}`]);
//       const previousMeal = queryClient.getQueryData([`meal-${mealId}`]) as any;
//       queryClient.setQueryData([`meal-${mealId}`], {
//         ...previousMeal,
//         directions: previousMeal.directions.filter(
//           (direction: any, index: number) => index !== directionIndex,
//         ),
//       });
//       return { previousMeal };
//     },
//     onError: (err, variables, context) => {
//       queryClient.setQueryData([`meal-${mealId}`], context?.previousMeal);
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries([`meal-${mealId}`]);
//     },
//   });
// };
//
// export const useAddDirectionToMeal = ({
//   mealId,
//   newDirection,
// }: {
//   mealId: string;
//   newDirection: string;
// }) => {
//   const queryClient = useQueryClient();
//   return useMutation(addDirectionToMeal, {
//     onMutate: async () => {
//       await queryClient.cancelQueries([`meal-${mealId}`]);
//       const previousMeal = queryClient.getQueryData([`meal-${mealId}`]) as any;
//       queryClient.setQueryData([`meal-${mealId}`], {
//         ...previousMeal,
//         directions: [...previousMeal.directions, newDirection],
//       });
//       return { previousMeal };
//     },
//     onError: (err, variables, context) => {
//       queryClient.setQueryData([`meal-${mealId}`], context?.previousMeal);
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries([`meal-${mealId}`]);
//     },
//   });
// }
