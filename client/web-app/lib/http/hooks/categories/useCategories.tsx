import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/lib/http/client/categories/getAllCategories";
import type { Category } from "@/lib/http/client/categories/getAllCategories";
import { keys } from "@/lib/http/keys";

type Props = {
  initialData: Category[];
};

export default function useCategories({ initialData }: Props) {
  return useQuery({
    queryKey: keys.categories,
    queryFn: async () => {
      const response = await getAllCategories();
      if (!response.data) return initialData;
      return response.data;
    },
    initialData,
  });
}
