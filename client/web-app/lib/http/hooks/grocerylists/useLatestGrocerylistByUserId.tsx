import { useQuery } from "@tanstack/react-query";
import {
  getAllIngredients,
  type Ingredient,
} from "@/lib/http/client/ingredients/getAllIngredients";
import { keys } from "@/lib/http/keys";
import { useAuth } from "@clerk/nextjs";

type Props = {
  initialData: any;
  userId: string;
};

export default function useLatestGrocerylistByUserId({ initialData, userId }: Props) {
  const { getToken } = useAuth();
  const token = getToken({ template: "1_HOUR" }).then((t) => t?.toString());
  return useQuery({
    queryKey: keys.latestGrocerylistByUserId(userId),
    queryFn: async () => {
      const response = await getLatestGrocerylistByUserId((await token) as string, userId);
      if (!response.data) return initialData;
      return response.data;
    },
    initialData,
    enabled: !!token,
  });
}
