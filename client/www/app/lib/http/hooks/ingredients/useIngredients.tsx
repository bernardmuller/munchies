import { useQuery } from "@tanstack/react-query";
import {
  getAllIngredients,
} from "@/lib/http/client/ingredients/getAllIngredients";
import { keys } from "@/lib/http/keys";
import { useAuth } from "@clerk/tanstack-start";
import {ONE_DAY_IN_MS} from "@/lib/constants";

export default function useIngredients() {
  const { getToken } = useAuth();
  const token = getToken({ template: import.meta.env.VITE_CLERK_JWT_TEMPLATE ?? "default" }).then((t) => t?.toString());
  return useQuery({
    queryKey: keys.ingredients,
    queryFn: async () => {
      const response = await getAllIngredients((await token) as string);
      if (!response.data) return null;
      return response.data;
    },
    enabled: !!token,
    staleTime: ONE_DAY_IN_MS
  });
}
