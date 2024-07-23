import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	UploadImage,
	createMeal,
	deleteMeal,
	fetchMeal,
	fetchMeals,
	updateMeal,
} from "@/api/endpoints/meals";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export const useMealsData = () => {
	return useQuery({
		queryKey: ["meals"],
		queryFn: fetchMeals,
	});
};

export const useMealData = (id: string) => {
	return useQuery([`meal-${id}`], () => fetchMeal(id));
};

export const useCreateMeal = () => {
	const queryClient = useQueryClient();
	const router = useRouter();
	return useMutation(createMeal, {
		onSuccess: () => {
			queryClient.invalidateQueries(["meals"]);
			router.push("/home");
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

export const useDeleteMeal = (mealId: string) => {
	const queryClient = useQueryClient();
	return useMutation(deleteMeal, {
		onSuccess: () => {
			queryClient.invalidateQueries(["meals"]);
		},
	});
};

export const useUploadMealImage = () => {
	return useMutation(UploadImage);
};

// export const useRemoveDirectionFromMeal = ({
// 	mealId,
// 	directionIndex,
// }: {
// 	mealId: string;
// 	directionIndex: number;
// }) => {
// 	const queryClient = useQueryClient();
// 	return useMutation(removeDirectionFromMeal, {
// 		onMutate: async () => {
// 			await queryClient.cancelQueries([`meal-${mealId}`]);
// 			const previousMeal = queryClient.getQueryData([
// 				`meal-${mealId}`,
// 			]) as any;
// 			queryClient.setQueryData([`meal-${mealId}`], {
// 				...previousMeal,
// 				directions: previousMeal.directions.filter(
// 					(direction: any, index: number) => index !== directionIndex
// 				),
// 			});
// 			return { previousMeal };
// 		},
// 		onError: (err, variables, context) => {
// 			queryClient.setQueryData([`meal-${mealId}`], context?.previousMeal);
// 		},
// 		onSettled: () => {
// 			queryClient.invalidateQueries([`meal-${mealId}`]);
// 		},
// 	});
// };
//
// export const useAddDirectionToMeal = ({
// 	mealId,
// 	newDirection,
// }: {
// 	mealId: string;
// 	newDirection: string;
// }) => {
// 	const queryClient = useQueryClient();
// 	return useMutation(addDirectionToMeal, {
// 		onMutate: async () => {
// 			await queryClient.cancelQueries([`meal-${mealId}`]);
// 			const previousMeal = queryClient.getQueryData([
// 				`meal-${mealId}`,
// 			]) as any;
// 			queryClient.setQueryData([`meal-${mealId}`], {
// 				...previousMeal,
// 				directions: [...previousMeal.directions, newDirection],
// 			});
// 			return { previousMeal };
// 		},
// 		onError: (err, variables, context) => {
// 			queryClient.setQueryData([`meal-${mealId}`], context?.previousMeal);
// 		},
// 		onSettled: () => {
// 			queryClient.invalidateQueries([`meal-${mealId}`]);
// 		},
// 	});
// };
//
// export const useAddIngredientToMeal = ({ mealId }: { mealId: string }) => {
// 	const queryClient = useQueryClient();
//
// 	return useMutation(addIngredientToMeal, {
// 		onSuccess: () => {
// 			queryClient.invalidateQueries([`meal-${mealId}`]);
// 		},
// 		onMutate: async ({
// 			mealId,
// 			ingredient,
// 		}: {
// 			mealId: string;
// 			ingredient: any;
// 		}) => {
// 			await queryClient.cancelQueries([`meal-${mealId}`]);
// 			const previousMeal = queryClient.getQueryData([
// 				`meal-${mealId}`,
// 			]) as any;
//
// 			queryClient.setQueryData([`meal-${mealId}`], {
// 				...previousMeal,
// 				ingredients: [...previousMeal.ingredients, ingredient],
// 			});
// 			return { previousMeal };
// 		},
// 		onError: (err, variables, context) => {
// 			queryClient.setQueryData([`meal-${mealId}`], context?.previousMeal);
// 		},
// 		onSettled: () => {
// 			queryClient.invalidateQueries([`meal-${mealId}`]);
// 		},
// 	});
// };
//
// export const useRemoveIngredientFromMeal = ({ mealId }: { mealId: string }) => {
// 	const queryClient = useQueryClient();
//
// 	return useMutation(removeIngredientFromMeal, {
// 		onSuccess: () => {
// 			queryClient.invalidateQueries([`meal-${mealId}`]);
// 		},
// 		onMutate: async ({
// 			mealId,
// 			ingredientId,
// 		}: {
// 			mealId: string;
// 			ingredientId: string;
// 		}) => {
// 			await queryClient.cancelQueries([`meal-${mealId}`]);
// 			const previousMeal = queryClient.getQueryData([
// 				`meal-${mealId}`,
// 			]) as any;
// 			queryClient.setQueryData([`meal-${mealId}`], {
// 				...previousMeal,
// 				ingredients: previousMeal.ingredients.filter(
// 					(ingredient: any) => {
// 						if (ingredient.id !== ingredientId) return ingredient;
// 					}
// 				),
// 			});
// 			return { previousMeal };
// 		},
// 		onError: (err, variables, context) => {
// 			queryClient.setQueryData([`meal-${mealId}`], context?.previousMeal);
// 		},
// 		onSettled: () => {
// 			queryClient.invalidateQueries([`meal-${mealId}`]);
// 		},
// 	});
// };
