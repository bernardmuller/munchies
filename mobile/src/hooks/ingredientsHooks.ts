import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	createIngredient,
	fetchIngredient,
	fetchIngredients,
	updateIngredient,
} from "../api/ingredients";
import { addIngredientToMeal, removeIngredientFromMeal } from "../api/meals";
import useToast from "./useToast";

export const useIngredientsData = () => {
	return useQuery(["ingredients"], () => fetchIngredients({}));
};

export const useIngredientData = (id: string) => {
	const { data, isLoading, isSuccess, isError, isFetching } = useQuery(
		[`ingredient-${id}`],
		() => fetchIngredient(id)
	);
	return { data, isLoading, isSuccess, isError, isFetching };
};

export const useCreateIngredient = () => {
	const queryClient = useQueryClient();
	return useMutation(createIngredient, {
		onSuccess: () => {
			return queryClient.invalidateQueries(["ingredients"]);
		},
	});
};

export const useAddIngredient = () => {
	const queryClient = useQueryClient();
	return useMutation(createIngredient, {
		onSuccess: () => {
			return queryClient.invalidateQueries(["ingredients"]);
		},
	});
};

export const useUpdateIngredient = ({
	ingredientId,
}: {
	ingredientId: string;
}) => {
	const queryClient = useQueryClient();
	const toast = useToast();
	return useMutation(updateIngredient, {
		onMutate: async ({ data }) => {
			await queryClient.cancelQueries([`ingredient-${ingredientId}`]);
			const previousIngredient = queryClient.getQueryData([
				`ingredient-${ingredientId}}`,
			]) as any;
			queryClient.setQueryData([`ingredient-${ingredientId}`], {
				...previousIngredient,
				...data,
			});
			return { previousIngredient };
		},
		onSuccess: () => {
			toast.show({
				title: "Ingredient updated successfully",
				placement: "top",
				variant: "success",
			});
		},
		onSettled: () => {
			queryClient.invalidateQueries([`ingredients`]);
			queryClient.invalidateQueries([`ingredients-${ingredientId}`]);
		},
	});
};

export const useAddIngredientToMeal = ({
	mealId,
	ingredient,
}: {
	mealId: string;
	ingredient: any;
}) => {
	const queryClient = useQueryClient();
	return useMutation(addIngredientToMeal, {
		onSuccess: () => {
			queryClient.invalidateQueries([`meal-${mealId}`]);
		},
		onMutate: async () => {
			await queryClient.cancelQueries([`meal-${mealId}`]);
			const previousMeal = queryClient.getQueryData([
				`meal-${mealId}`,
			]) as any;
			console.log("optimistic update => ", ingredient);
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

export const useRemoveIngredientFromMeal = () => {
	const queryClient = useQueryClient();
	return useMutation(removeIngredientFromMeal, {});
};
