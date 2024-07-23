import {
	InvalidateQueryFilters,
	QueryFilters,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import {
	fetchMenus,
	fetchMenu,
	removeMealFromMenu,
	updateMenu,
	addMealToMenu,
	createMenu,
	fetchCurrentMenu,
} from "../api/menus";
import useToast from "./useToast";

export const useMenusData = () => {
	return useQuery({
		queryKey: ["menus"],
		queryFn: fetchMenus,
	});
};

export const useMenuData = (id: string) => {
	return useQuery({
		queryKey: [`menu-${id}`],
		queryFn: () => fetchMenu(id),
	});
};

export const useCreateMenu = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createMenu,
		onSuccess: () => {
			queryClient.invalidateQueries([
				"currentMenu",
			] as InvalidateQueryFilters);
			return queryClient.invalidateQueries([
				"menus",
			] as InvalidateQueryFilters);
		},
	});
};

export const useUpdateMenu = ({ menuId }: { menuId: string }) => {
	const queryClient = useQueryClient();
	const toast = useToast();
	return useMutation({
		mutationFn: (data: any) => updateMenu({ id: menuId, data }),
		onMutate: async ({ data }) => {
			await queryClient.cancelQueries([`menu-${menuId}`] as QueryFilters);
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
			queryClient.invalidateQueries([`menus`] as InvalidateQueryFilters);
			queryClient.invalidateQueries([
				`menu-${menuId}`,
			] as InvalidateQueryFilters);
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
	return useMutation({
		mutationFn: (meal: any) => addMealToMenu({ meal, menuId }),
		onMutate: async ({ menuId, meal }) => {
			await queryClient.cancelQueries([`menu-${menuId}`] as QueryFilters);
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
			queryClient.invalidateQueries([
				`menu-${menuId}`,
			] as InvalidateQueryFilters);
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
	return useMutation({
		mutationFn: (mealId: string) => removeMealFromMenu({ mealId, menuId }),
		onMutate: async () => {
			await queryClient.cancelQueries([`menu-${menuId}`] as QueryFilters);
			const previousMenu = queryClient.getQueryData([
				`menu-${menuId}`,
			]) as any;
			// queryClient.setQueryData([`menu-${menuId}`], {
			// 	...previousMenu,
			// 	meals: previousMenu.meals.filter((meal: any) => {
			// 		if (meal.id !== mealId) return meal;
			// 	}),
			// });
			return { previousMenu };
		},
		onError: (err, variables, context) => {
			queryClient.setQueryData([`menu-${menuId}`], context?.previousMenu);
		},
		onSuccess: () => {
			queryClient.invalidateQueries([
				`menu-${menuId}`,
			] as InvalidateQueryFilters);
			toast.show({
				title: "Meal removed from mealplan successfully",
				placement: "top",
			});
		},
	});
};

export const useCurrentMenuData = () => {
	return useQuery({
		queryKey: ["currentMenu"],
		queryFn: fetchCurrentMenu,
	});
};
