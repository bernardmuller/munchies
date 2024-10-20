import { useMutation, useQueryClient } from "@tanstack/react-query";
import { keys } from "@/app/lib/http/keys";
import { deleteIngredient } from "../../client/ingredients/deleteIngredient";
import { useAuth } from "@clerk/nextjs";

export default function useDeleteIngredient() {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  return useMutation({
    mutationKey: keys.deleteIngredient,
    mutationFn: async (id: string) => {
      const token = await getToken({ template: process.env.NEXT_PUBLIC_CLERK_JWT_TEMPLATE ?? "default" }).then((t) => t?.toString());
      return deleteIngredient({ id, accessToken: token! });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(keys.ingredients);
    },
  });
}
