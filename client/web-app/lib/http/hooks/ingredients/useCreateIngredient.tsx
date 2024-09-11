import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createIngredient } from "@/lib/http/client/ingredients/createIngredient";
import { keys } from "@/lib/http/keys";

export default function useCreateIngredient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: keys.createIngredient,
    mutationFn: createIngredient,
    onSuccess: () => {
      queryClient.invalidateQueries(keys.ingredients);
    },
  });
}
