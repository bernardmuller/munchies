import { createItem } from "@/api/endpoints/items";
import { useMutation } from "@tanstack/react-query";

export const useCreateItem = () => {
	return useMutation({
		mutationFn: createItem,
		mutationKey: ["createItem"],
	});
};
