import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/app/lib/http/client/categories/getAllCategories";
import type { Category } from "@/app/lib/http/client/categories/getAllCategories";
import { keys } from "@/app/lib/http/keys";
import { useAuth } from "@clerk/nextjs";

type Props = {
  initialData: Category[];
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
  });
}
