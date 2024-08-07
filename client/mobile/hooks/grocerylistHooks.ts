import {
	InvalidateQueryFilters,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import {
	createGrocerylist,
	fetchGrocerylist,
	fetchGrocerylists,
} from "../api/grocerylists";
import { getAllGrocerylists } from "@/lib/http/endpoints/getAllGrocerylists";
import { getGrocerylistById } from "@/lib/http/endpoints/getGrocerylistById";
import { getNewestGrocerylist } from "@/lib/http/endpoints/getNewestGrocerylist";

export const useGrocerylistsData = () => {
	return useQuery({
		queryKey: ["grocerylists"],
		queryFn: fetchGrocerylists,
	});
};

export const useGrocerylistData = (id: string) => {
	return useQuery({
		queryKey: [`list-${id}`],
		queryFn: () => fetchGrocerylist(id),
	});
};

export const useCreateGrocerylist = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createGrocerylist,
		mutationKey: ["createGrocerylist"],
		onSuccess: () => {
			// Toast.show({
			// 	title: "Grocerylist created",
			// 	duration: 3000,
			// });
			queryClient.invalidateQueries([
				"grocerylists",
			] as InvalidateQueryFilters);
		},
	});
};

export const useGrocerylists = () => {
	return useQuery({
		queryKey: ["grocerylists"],
		queryFn: getAllGrocerylists,
	});
};

export const useGrocerylistById = (id: string) => {
	return useQuery({
		queryKey: ["grocerylist", [id]],
		queryFn: () => getGrocerylistById(id),
	});
};

export const useNewestGrocerylist = () => {
	return useQuery({
		queryKey: ["newest-grocerylist"],
		queryFn: () => getNewestGrocerylist(),
	});
};
