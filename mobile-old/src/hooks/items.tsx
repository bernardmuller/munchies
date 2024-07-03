import {
	InvalidateQueryFilters,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { checkItem, createItem, unCheckItem } from "../api/items";

export const useCheckItem = (groceryListId: string) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: checkItem,
		onSuccess: () => {
			return queryClient.invalidateQueries([
				`grocerylist`,
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
				`grocerylist`,
			] as InvalidateQueryFilters);
		},
	});
};

export const useCreateItem = (grocerylistId: string) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createItem,
		mutationKey: ["createItem"],
		onSuccess: () => {
			return queryClient.invalidateQueries([
				`grocerylist`,
			] as InvalidateQueryFilters);
		},
	});
};
