import { useQuery } from "@tanstack/react-query";
import { fetchGrocerylist } from "@/api/endpoints/grocerylists";

// export const useGrocerylistsData = () => {
// 	return useQuery(["grocerylists"], () => fetchGrocerylists());
// };

export const useGrocerylistData = (id: string) => {
	return useQuery([`list-${id}`], () => fetchGrocerylist(id));
};
