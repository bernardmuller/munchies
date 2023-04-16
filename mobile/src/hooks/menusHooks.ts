import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	fetchMenus,
	fetchMenu,
	removeMealFromMenu,
	updateMenu,
	addMealToMenu,
} from "../api/menus";
import useToast from "./useToast";
import Toast from "../components/Toast";
import { useMealData } from "./mealsHooks";

export const useMenusData = () => {
	return useQuery(["menus"], fetchMenus);
};

export const useMenuData = (id: string) => {
	const { data, isLoading, isSuccess, isError, isFetching } = useQuery(
		[`menu-${id}`],
		() => fetchMenu(id)
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
export const useUpdateMenu = ({ menuId }: { menuId: string }) => {
	const queryClient = useQueryClient();
	const toast = useToast();
	return useMutation(updateMenu, {
		onMutate: async ({ data }) => {
			await queryClient.cancelQueries([`menu-${menuId}`]);
			const previousMenu = queryClient.getQueryData([
				`menu-${menuId}}`,
			]) as any;
			queryClient.setQueryData([`menu-${menuId}}`], {
				...previousMenu,
				...data,
			});
			return { previousMenu };
		},
		onSettled: () => {
			queryClient.invalidateQueries([`menu-${menuId}}`]);
			toast.show({
				title: "Mealplan updated successfully",
				placement: "top",
				variant: "success",
			});
		},
	});
};
//
// export const useRemoveMealFromMenu = ({ mealId, menuId }: { mealId: string; menuId: string }) => {
//   const queryClient = useQueryClient();
//   return useMutation(removeMealFromMenu, {
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
export const useAddMealToMenu = ({ menuId }: { menuId: string }) => {
	const queryClient = useQueryClient();

	const toast = useToast();
	return useMutation(addMealToMenu, {
		onMutate: async (newMeal) => {
			console.log("MUTATE", newMeal);
			console.log("NEW MEAL", newMeal);
			await queryClient.cancelQueries([`menu-${menuId}`]);
			const previousMenu = queryClient.getQueryData([
				`menu-${menuId}`,
			]) as any;
			queryClient.setQueryData([`menu-${menuId}`], {
				...previousMenu,
				meals: [...previousMenu.meals],
			});
			return { previousMenu };
		},
		onError: (err, variables, context) => {
			queryClient.setQueryData([`menu-${menuId}`], context?.previousMenu);
		},
		onSettled: () => {
			queryClient.invalidateQueries([`menu-${menuId}`]);
		},
		onSuccess: () => {
			toast.show({
				title: "Meal added to mealplan successfully",
				placement: "top",
			});
		},
	});
};
