import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
	const { data, isLoading, isSuccess, isError, isFetching } = useQuery(
		[`meal-${id}`],
		() => fetchMeal(id)
	);
	return { data, isLoading, isSuccess, isError, isFetching };
};

export const useAddMeal = () => {
	const queryClient = useQueryClient();
	return useMutation(createMeal, {
		onSuccess: () => {
			return queryClient.invalidateQueries(["meals"]);
		},
	});
};

export const useUpdateMeal = ({ mealId }: { mealId: string }) => {
	const queryClient = useQueryClient();
	return useMutation(updateMeal, {
		onMutate: async ({ data }) => {
			await queryClient.cancelQueries([`meal-${mealId}`]);
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
			queryClient.invalidateQueries([`meal-${mealId}`]);
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
	return useMutation(removeDirectionFromMeal, {
		onMutate: async () => {
			await queryClient.cancelQueries([`meal-${mealId}`]);
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
			queryClient.invalidateQueries([`meal-${mealId}`]);
		},
	});
};

export const useAddIngredientToMeal = ({ mealId }: { mealId: string }) => {
	const queryClient = useQueryClient();
	const toast = useToast();

	return useMutation(addIngredientToMeal, {
		onSuccess: () => {
			queryClient.invalidateQueries([`meal-${mealId}`]);
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
			await queryClient.cancelQueries([`meal-${mealId}`]);
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
			queryClient.invalidateQueries([`meal-${mealId}`]);
		},
	});
};

export const useRemoveIngredientFromMeal = ({ mealId }: { mealId: string }) => {
	const queryClient = useQueryClient();
	const toast = useToast();

	return useMutation(removeIngredientFromMeal, {
		onSuccess: () => {
			queryClient.invalidateQueries([`meal-${mealId}`]);
			toast.show({
				title: "Ingredient removed successfully",
				placement: "top",
			});
		},
		onMutate: async ({
			mealId,
			ingredientId,
		}: {
			mealId: string;
			ingredientId: string;
		}) => {
			await queryClient.cancelQueries([`meal-${mealId}`]);
			const previousMeal = queryClient.getQueryData([
				`meal-${mealId}`,
			]) as any;
			queryClient.setQueryData([`meal-${mealId}`], {
				...previousMeal,
				ingredients: previousMeal.ingredients.filter(
					(ingredient: any) => {
						if (ingredient.id !== ingredientId) return ingredient;
					}
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
