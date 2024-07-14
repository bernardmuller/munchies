import {
	InvalidateQueryFilters,
	QueryFilters,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import {
	addDirectionToMeal,
	addIngredientToMeal,
	createMeal,
	fetchMeal,
	fetchMeals,
	removeDirectionFromMeal,
	removeIngredientFromMeal,
	updateMeal,
} from "../api/meals";
import useToast from "./useToast";

export const useMealsData = () => {
	const {
		data,
		isLoading,
		isSuccess,
		isError,
		isFetching,
		isRefetching,
		refetch,
	} = useQuery({
		queryKey: ["meals"],
		queryFn: fetchMeals,
	});
	return {
		data,
		isLoading,
		isSuccess,
		isError,
		isFetching,
		isRefetching,
		refetch,
	};
};

export const useMealData = (id: string) => {
	const { data, isLoading, isSuccess, isError, isFetching } = useQuery({
		queryKey: [`meal-${id}`],
		queryFn: () => fetchMeal(id),
	});
	return { data, isLoading, isSuccess, isError, isFetching };
};

export const useAddMeal = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createMeal,
		onSuccess: () => {
			return queryClient.invalidateQueries([
				"meals",
			] as InvalidateQueryFilters);
		},
	});
};

export const useUpdateMeal = ({ mealId }: { mealId: string }) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: any) => updateMeal({ id: mealId, data }),
		onMutate: async ({ data }) => {
			await queryClient.cancelQueries([`meal-${mealId}`] as QueryFilters);
			const previousMeal = queryClient.getQueryData([
				`meal-${mealId}`,
			]) as any;
			queryClient.setQueryData([`meal-${mealId}`], {
				...previousMeal,
				...data,
			});
			return { previousMeal };
		},
		onSettled: () => {
			queryClient.invalidateQueries([
				`meal-${mealId}`,
			] as InvalidateQueryFilters);
		},
	});
};

export const useRemoveDirectionFromMeal = ({
	mealId,
	directionIndex,
}: {
	mealId: string;
	directionIndex: number;
}) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (directionIndex: number) =>
			removeDirectionFromMeal({ mealId, directionIndex }),
		onMutate: async () => {
			await queryClient.cancelQueries([`meal-${mealId}`] as QueryFilters);
			const previousMeal = queryClient.getQueryData([
				`meal-${mealId}`,
			]) as any;
			queryClient.setQueryData([`meal-${mealId}`], {
				...previousMeal,
				directions: previousMeal.directions.filter(
					(direction: any, index: number) => index !== directionIndex
				),
			});
			return { previousMeal };
		},
		onError: (err, variables, context) => {
			queryClient.setQueryData([`meal-${mealId}`], context?.previousMeal);
		},
		onSettled: () => {
			queryClient.invalidateQueries([
				`meal-${mealId}`,
			] as InvalidateQueryFilters);
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
	return useMutation({
		mutationFn: (direction: string) =>
			addDirectionToMeal({ mealId, newDirection }),
		onMutate: async () => {
			await queryClient.cancelQueries([`meal-${mealId}`] as QueryFilters);
			const previousMeal = queryClient.getQueryData([
				`meal-${mealId}`,
			]) as any;
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
			queryClient.invalidateQueries([
				`meal-${mealId}`,
			] as InvalidateQueryFilters);
		},
	});
};

export const useAddIngredientToMeal = ({ mealId }: { mealId: string }) => {
	const queryClient = useQueryClient();
	const toast = useToast();

	return useMutation({
		mutationFn: (ingredient: any) =>
			addIngredientToMeal({ mealId, ingredient }),
		onSuccess: () => {
			queryClient.invalidateQueries([
				`meal-${mealId}`,
			] as InvalidateQueryFilters);
			toast.show({
				title: "Ingredient added successfully",
				placement: "top",
			});
		},
		onMutate: async ({
			mealId,
			ingredient,
		}: {
			mealId: string;
			ingredient: any;
		}) => {
			await queryClient.cancelQueries([`meal-${mealId}`] as QueryFilters);
			const previousMeal = queryClient.getQueryData([
				`meal-${mealId}`,
			]) as any;

			queryClient.setQueryData([`meal-${mealId}`], {
				...previousMeal,
				ingredients: [...previousMeal.ingredients, ingredient],
			});
			return { previousMeal };
		},
		onError: (err, variables, context) => {
			queryClient.setQueryData([`meal-${mealId}`], context?.previousMeal);
		},
		onSettled: () => {
			queryClient.invalidateQueries([
				`meal-${mealId}`,
			] as InvalidateQueryFilters);
		},
	});
};

export const useRemoveIngredientFromMeal = ({ mealId }: { mealId: string }) => {
	const queryClient = useQueryClient();
	const toast = useToast();

	return useMutation({
		mutationFn: (ingredientId: string) =>
			removeIngredientFromMeal({ mealId, ingredientId }),
		onSuccess: () => {
			queryClient.invalidateQueries([
				`meal-${mealId}`,
			] as InvalidateQueryFilters);
			toast.show({
				title: "Ingredient removed successfully",
				placement: "top",
			});
		},
		onMutate: async () => {
			await queryClient.cancelQueries([`meal-${mealId}`] as QueryFilters);
			const previousMeal = queryClient.getQueryData([
				`meal-${mealId}`,
			]) as any;
			// queryClient.setQueryData([`meal-${mealId}`], {
			// 	...previousMeal,
			// 	ingredients: previousMeal.ingredients.filter(
			// 		(ingredient: any) => {
			// 			if (ingredient.id !== data.ingredientId)
			// 				return ingredient;
			// 		}
			// 	),
			// });
			return { previousMeal };
		},
		onError: (err, variables, context) => {
			queryClient.setQueryData([`meal-${mealId}`], context?.previousMeal);
		},
		onSettled: () => {
			queryClient.invalidateQueries([
				`meal-${mealId}`,
			] as InvalidateQueryFilters);
		},
	});
};
