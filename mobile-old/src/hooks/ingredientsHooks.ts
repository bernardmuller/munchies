import {
	InvalidateQueryFilters,
	QueryFilters,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import {
	createIngredient,
	fetchIngredient,
	fetchIngredients,
	updateIngredient,
} from "../api/ingredients";
import { addIngredientToMeal, removeIngredientFromMeal } from "../api/meals";
import useToast from "./useToast";
import { getAllIngredients } from "src/lib/http/endpoints/getAllIngredients";

export const useIngredientsData = () => {
	return useQuery({
		queryKey: ["ingredients"],
		queryFn: () => getAllIngredients(),
	});
};

export const useIngredientData = (id: string) => {
	const { data, isLoading, isSuccess, isError, isFetching } = useQuery({
		queryKey: [`ingredient-${id}`],
		queryFn: () => fetchIngredient(id),
	});
	return { data, isLoading, isSuccess, isError, isFetching };
};

export const useCreateIngredient = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createIngredient,
		onSuccess: () => {
			return queryClient.invalidateQueries([
				"ingredients",
			] as InvalidateQueryFilters);
		},
	});
};

export const useAddIngredient = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: addIngredientToMeal,
		onSuccess: () => {
			return queryClient.invalidateQueries([
				"ingredients",
			] as InvalidateQueryFilters);
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
	return useMutation({
		mutationFn: (data: any) => updateIngredient({ id: ingredientId, data }),
		onMutate: async ({ data }) => {
			await queryClient.cancelQueries([
				`ingredient-${ingredientId}`,
			] as QueryFilters);
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
			queryClient.invalidateQueries([
				`ingredients`,
			] as InvalidateQueryFilters);
			queryClient.invalidateQueries([
				`ingredients-${ingredientId}`,
			] as InvalidateQueryFilters);
		},
	});
};
