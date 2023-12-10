import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkItem, unCheckItem } from "@/api/endpoints/items";
type Item = {
	id: string;
	check: boolean;
	typeId: number;
	description: null | string;
	groceryListId: string;
	ingredientId: string;
};

type Ingredient = {
	id: string;
	mealId: string;
	ingredientId: string;
	quantity: null | number;
};

type Meal = {
	id: string;
	name: string;
	seasons: null | string[];
	directions: string[];
	cuisine: null | string;
	image: string;
	URL: null | string;
	prepTime: number;
	cookTime: number;
	readyIn: number;
	rating: null | number;
	notes: null | string;
	deleted: boolean;
	createdAt: string;
	createdBy: string;
	ingredients: Ingredient[];
};

type MenuObj = {
	id: string;
	name: string;
	startDate: null | string;
	endDate: null | string;
	createdAt: string;
	householdId: null | string;
	createdBy: string;
	archived: boolean;
	grocerylistId: string;
	meals: Meal[];
	grocerylist: {
		id: string;
		createdAt: string;
		createdBy: string;
		menuId: string;
		Item: Item[];
	};
};

export const useCheckItem = (groceryListId: string) => {
	const queryClient = useQueryClient();
	return useMutation(checkItem, {
		onMutate: async (item) => {
			// Cancel any outgoing refetches (so they don't overwrite our optimistic update)
			await queryClient.cancelQueries([`currentMenu`]);

			await queryClient.setQueryData(
				[`list-${groceryListId}`],
				(old: any) => {
					old?.items?.map((itm: any) => {
						if (itm.id === item) {
							itm.check = true;
						}
					});
					return old;
				}
			);
		},
		onSuccess: () => {
			return queryClient.invalidateQueries([`currentMenu`]);
		},
	});
};

export const useUnCheckItem = (groceryListId: string) => {
	const queryClient = useQueryClient();
	return useMutation(unCheckItem, {
		onMutate: async (item: any) => {
			// Cancel any outgoing refetches (so they don't overwrite our optimistic update)
			await queryClient.cancelQueries([`currentMenu`]);

			await queryClient.setQueryData(
				[`list-${groceryListId}`],
				(old: any) => {
					old?.items?.map((itm: any) => {
						if (itm.id === item) {
							itm.check = false;
						}
					});
					return old;
				}
			);
		},
		onSuccess: () => {
			return queryClient.invalidateQueries([`currentMenu`]);
		},
	});
};
