import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	fetchMenus,
	fetchMenu,
	removeMealFromMenu,
	updateMenu,
	addMealToMenu,
	createMenu,
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

export const useCreateMenu = () => {
	const queryClient = useQueryClient();
	return useMutation(createMenu, {
		onSuccess: () => {
			return queryClient.invalidateQueries(["menus"]);
		},
	});
};

export const useUpdateMenu = ({ menuId }: { menuId: string }) => {
	const queryClient = useQueryClient();
	const toast = useToast();
	return useMutation(updateMenu, {
		onMutate: async ({ data }) => {
			await queryClient.cancelQueries([`menu-${menuId}`]);
			const previousMenu = queryClient.getQueryData([
				`menu-${menuId}}`,
			]) as any;
			queryClient.setQueryData([`menu-${menuId}`], {
				...previousMenu,
				...data,
			});
			return { previousMenu };
		},
		onSuccess: () => {
			toast.show({
				title: "Mealplan updated successfully",
				placement: "top",
				variant: "success",
			});
		},
		onSettled: () => {
			queryClient.invalidateQueries([`menus`]);
			queryClient.invalidateQueries([`menu-${menuId}`]);
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
		onMutate: async ({ menuId, meal }) => {
			await queryClient.cancelQueries([`menu-${menuId}`]);
			const previousMenu = queryClient.getQueryData([
				`menu-${menuId}`,
			]) as any;

			queryClient.setQueryData([`menu-${menuId}`], {
				...previousMenu,
				meals: [...previousMenu.meals, meal],
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

export const useRemoveMealFromMenu = ({ menuId }: { menuId: string }) => {
	const queryClient = useQueryClient();

	const toast = useToast();
	return useMutation(removeMealFromMenu, {
		onMutate: async ({ menuId, mealId }) => {
			await queryClient.cancelQueries([`menu-${menuId}`]);
			const previousMenu = queryClient.getQueryData([
				`menu-${menuId}`,
			]) as any;
			queryClient.setQueryData([`menu-${menuId}`], {
				...previousMenu,
				meals: previousMenu.meals.filter((meal: any) => {
					if (meal.id !== mealId) return meal;
				}),
			});
			return { previousMenu };
		},
		onError: (err, variables, context) => {
			queryClient.setQueryData([`menu-${menuId}`], context?.previousMenu);
		},
		onSuccess: () => {
			queryClient.invalidateQueries([`menu-${menuId}`]);
			toast.show({
				title: "Meal removed from mealplan successfully",
				placement: "top",
			});
		},
	});
};
