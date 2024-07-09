import {
	InvalidateQueryFilters,
	QueryFilters,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { checkItem, createItem, unCheckItem } from "../api/items";
import { Grocerylist, Item } from "src/lib/http/endpoints/getAllGrocerylists";
import { Toast } from "native-base";
import { Household } from "src/lib/http/endpoints/getHousholdById";

export const useCheckItem = (groceryListId: string) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: checkItem,
		onSuccess: () => {
			return queryClient.invalidateQueries([
				"newest-grocerylist",
				"current-user-household",
			] as InvalidateQueryFilters);
		},
	});
};

export const useUnCheckItem = (groceryListId: string) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: unCheckItem,
		onMutate: async (item: any) => {},
		onSuccess: () => {
			return queryClient.invalidateQueries([
				"newest-grocerylist",
				"current-user-household",
			] as InvalidateQueryFilters);
		},
	});
};

export const useCreateItem = (grocerylistId: string) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createItem,
		mutationKey: ["createItem"],
		onMutate: async ({ check, name }) => {
			queryClient.cancelQueries(["newest-grocerylist"] as QueryFilters);
			const prevGrocerylist = queryClient.getQueryData([
				"newest-grocerylist",
			]) as Grocerylist | undefined;

			if (!prevGrocerylist || !prevGrocerylist.items) {
				console.log(
					"prevGrocerylist or prevGrocerylist.items is undefined"
				);
				return;
			}

			const newItems = [
				...prevGrocerylist.items,
				{
					check: false,
					id: Math.random().toString(),
					typeId: 1,
					name: name,
					groceryListId: grocerylistId,
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString(),
					description: "Temporary description",
					createdBy: "",
					ingredientId: "",
				},
			];

			const newGrocerylist = {
				...prevGrocerylist,
				items: newItems,
			};

			queryClient.setQueryData([`grocerylist`], newGrocerylist);
			return newGrocerylist;
		},
		onSuccess: () => {
			Toast.show({
				title: "Item added to grocerylist",
				duration: 1000,
			});
			return queryClient.invalidateQueries([
				"newest-grocerylist",
				"current-user-household",
			] as InvalidateQueryFilters);
		},
	});
};

export const useCreateHouseholdItem = (grocerylistId: string) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createItem,
		mutationKey: ["createItem"],
		onMutate: async ({ check, name }) => {
			queryClient.cancelQueries([
				"current-user-household",
			] as QueryFilters);
			const prevHousehold = queryClient.getQueryData([
				"current-user-household",
			]) as Household | undefined;

			if (!prevHousehold || !prevHousehold.grocerylist?.items) {
				console.log(
					"prevGrocerylist or prevGrocerylist.items is undefined"
				);
				return;
			}

			const newItems = [
				...prevHousehold.grocerylist?.items,
				{
					check: false,
					id: Math.random().toString(),
					typeId: 1,
					name: name,
					groceryListId: grocerylistId,
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString(),
					description: "Temporary description",
					createdBy: "",
					ingredientId: "",
				},
			];

			const newGrocerylist = {
				...prevHousehold.grocerylist,
				items: newItems,
			};

			queryClient.setQueryData(
				["current-user-household"],
				newGrocerylist
			);
			return newGrocerylist;
		},
		onSuccess: () => {
			Toast.show({
				title: "Item added to grocerylist",
				duration: 1000,
			});
			return queryClient.invalidateQueries([
				"current-user-household",
			] as InvalidateQueryFilters);
		},
	});
};
