import { useQuery } from "@tanstack/react-query";
import {
  getAllIngredients,
  type Ingredient,
} from "@/lib/http/client/ingredients/getAllIngredients";
import { keys } from "@/lib/http/keys";

type Props = {
  initialData: Ingredient[];
};

export default function useIngredients({ initialData }: Props) {
  return useQuery({
    queryKey: keys.ingredients,
    queryFn: async () => {
      const response = await getAllIngredients();
      if (!response.data) return initialData;
      return response.data;
    },
    initialData,
  });
}
