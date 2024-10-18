import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createIngredient } from "@/lib/http/client/ingredients/createIngredient";
import { keys } from "@/lib/http/keys";
import { useAuth } from "@clerk/nextjs";
import { Ingredient } from "../../client/ingredients/createIngredient";

export default function useCreateIngredient() {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  return useMutation({
    mutationKey: keys.createIngredient,
    mutationFn: async (data: Ingredient) => {
      const token = await getToken({ template: process.env.NEXT_PUBLIC_CLERK_JWT_TEMPLATE ?? "default" }).then((t) => t?.toString());
      return createIngredient({ data, accessToken: token! });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(keys.ingredients);
    },
  });
}
