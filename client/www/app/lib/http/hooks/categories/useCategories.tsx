import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/lib/http/client/categories/getAllCategories";
import type { Category } from "@/lib/http/client/categories/getAllCategories";
import { keys } from "@/lib/http/keys";
import { useAuth } from "@clerk/tanstack-start";

type Props = {
  initialData: Category[] | null;
};

export default function useCategories({ initialData }: Props) {
  const { getToken } = useAuth();
  const token = getToken({ template: import.meta.env.VITE_CLERK_JWT_TEMPLATE ?? "default" }).then((t) => t?.toString());
  return useQuery({
    queryKey: keys.categories,
    queryFn: async () => {
      const response = await getAllCategories((await token) as string);
      if (!response.data) return initialData;
      return response.data;
    },
    initialData,
    enabled: !!token,
    staleTime: 86400000
  });
}
