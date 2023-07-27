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
	const {
		data,
		isLoading,
		isSuccess,
		isError,
		isFetching,
		isRefetching,
		refetch,
	} = useQuery(["ingredients"], () => fetchIngredients({}));
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
