import { useQuery } from "@tanstack/react-query";
import { fetchGrocerylist, fetchGrocerylists } from "../api/grocerylists";

export const useGrocerylistsData = () => {
	return useQuery(["grocerylists"], () => fetchGrocerylists());
};

export const useGrocerylistData = (id: string) => {
	const { data, isLoading, isSuccess, isError, isFetching } = useQuery(
		[`list-${id}`],
		() => fetchGrocerylist(id)
	);
	return { data, isLoading, isSuccess, isError, isFetching };
};
