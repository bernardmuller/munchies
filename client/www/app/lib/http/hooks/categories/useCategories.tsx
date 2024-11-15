import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/lib/http/client/categories/getAllCategories";
import { keys } from "@/lib/http/keys";
import { useAuth } from "@clerk/tanstack-start";
import {ONE_DAY_IN_MS} from "@/lib/constants";

const categoriesQueryfn = async (token: string) => {
  const response = await getAllCategories(token);
  if (!response.data) return null;
  return response.data;
}

export default function useCategories() {
  const {getToken} = useAuth();
  const token = getToken({template: import.meta.env.VITE_CLERK_JWT_TEMPLATE ?? "default"}).then((t) => t?.toString());
  const query = useQuery({
    queryKey: keys.categories,
    queryFn: async () => categoriesQueryfn((await token)!),
    enabled: !!token,
    staleTime: ONE_DAY_IN_MS
  });
  return {
    ...query,
    queryFn: categoriesQueryfn
  }
}