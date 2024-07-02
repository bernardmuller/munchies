import { useQuery } from "@tanstack/react-query";
import { fetchGrocerylist, fetchGrocerylists } from "../api/grocerylists";

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
