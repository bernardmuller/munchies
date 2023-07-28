import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	fetchMenus,
	fetchMenu,
	removeMealFromMenu,
	updateMenu,
	addMealToMenu,
	createMenu,
	fetchCurrentMenu,
} from "@/api/endpoints/menus";
import { useRouter } from "next/navigation";
// import useToast from "./useToast";

export const useMenusData = () => {
	const {
		data,
		isLoading,
		isSuccess,
		isError,
		isFetching,
		refetch,
		isRefetching,
	} = useQuery([`menus`], fetchMenus);
	return {
		data,
		isLoading,
		isSuccess,
		isError,
		isFetching,
		refetch,
		isRefetching,
	};
};

export const useMenuData = (id: string) => {
	const { data, isLoading, isSuccess, isError, isFetching } = useQuery(
		[`menu-${id}`],
		() => fetchMenu(id)
	);
	return { data, isLoading, isSuccess, isError, isFetching };
};

export const useCreateMealplan = () => {
	const queryClient = useQueryClient();
	const router = useRouter();
	return useMutation(createMenu, {
		onSuccess: () => {
			queryClient.invalidateQueries(["currentMenu"]);
			queryClient.invalidateQueries(["menus"]);
			router.push("/home");
		},
	});
};

export const useUpdateMenu = ({ menuId }: { menuId: string }) => {
	const queryClient = useQueryClient();
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
		onSuccess: () => {},
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
		onSuccess: () => {},
	});
};

export const useRemoveMealFromMenu = ({ menuId }: { menuId: string }) => {
	const queryClient = useQueryClient();

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
		},
	});
};

export const useCurrentMenuData = () => {
	return useQuery(["currentMenu"], () => fetchCurrentMenu());
};
