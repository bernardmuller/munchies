import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createIngredient, fetchIngredients } from "../api/ingredients";
import { addIngredientToMeal, removeIngredientFromMeal } from "../api/meals";

export const useIngredientsData = () => {
	return useQuery(["ingredients"], () => fetchIngredients({}));
};

export const useAddIngredient = () => {
	const queryClient = useQueryClient();
	return useMutation(createIngredient, {
		onSuccess: () => {
			return queryClient.invalidateQueries(["ingredients"]);
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
