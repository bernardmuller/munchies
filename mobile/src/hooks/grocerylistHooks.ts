import { useQuery } from "@tanstack/react-query";
import { fetchGrocerylists } from "../api/grocerylists";

export const useGrocerylistsData = () => {
  return useQuery(["grocerylists"], () => fetchGrocerylists());
};


