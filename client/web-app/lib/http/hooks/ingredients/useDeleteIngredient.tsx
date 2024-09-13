import { useMutation, useQueryClient } from "@tanstack/react-query";
import { keys } from "@/lib/http/keys";
import { deleteIngredient } from "../../client/ingredients/deleteIngredient";

export default function useDeleteIngredient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: keys.deleteIngredient,
    mutationFn: deleteIngredient,
    onSuccess: () => {
      queryClient.invalidateQueries(keys.ingredients);
    },
  });
}
