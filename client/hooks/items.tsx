import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkItem, unCheckItem } from "@/api/endpoints/items";

export const useCheckItem = (groceryListId: string) => {
	const queryClient = useQueryClient();
	return useMutation(checkItem, {
		onSuccess: () => {
			return queryClient.invalidateQueries([`list-${groceryListId}`]);
		},
	});
};

export const useUnCheckItem = (groceryListId: string) => {
	const queryClient = useQueryClient();
	return useMutation(unCheckItem, {
		onMutate: async (item: any) => {},
		onSuccess: () => {
			return queryClient.invalidateQueries([`list-${groceryListId}`]);
		},
	});
};
