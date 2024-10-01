import { useMutation, useQueryClient } from "@tanstack/react-query";
import { keys } from "@/lib/http/keys";
import { useAuth } from "@clerk/nextjs";
import {CreateItem, createItem} from "@/lib/http/client/items/createItem";
import {useToast} from "@/components/ui/use-toast";
import {GroceryItem, GroceryList} from "@/lib/http/client/grocerylists/getLatestGrocerylistByUserId";
import {Ingredient} from "@/lib/http/client/ingredients/getAllIngredients";
import ingredients from "@/app/(secure)/mealplans/new/Ingredients";

export default function useCreateItem(grocerylistId: string) {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const {toast} = useToast();
  return useMutation({
    mutationKey: keys.createItem as string[],
    mutationFn: async (data: CreateItem) => {
      if(!grocerylistId) return;
      const token = await getToken().then((t) => t?.toString());
      return createItem({grocerylistId, data, accessToken: token! });
    },
    onMutate: async (item: Ingredient) => {
      await queryClient.cancelQueries(keys.latestGrocerylistByUserId);
      await queryClient.cancelQueries(keys.latestGrocerylistByHouseholdId);
      await queryClient.cancelQueries(keys.getGrocerylistById(grocerylistId));
      const prev = queryClient.getQueryData(keys.getGrocerylistById(grocerylistId)) as GroceryList;

      if (prev && prev.items) {
        queryClient.setQueryData(keys.latestGrocerylistByHouseholdId, {
          ...prev,
          items: prev.items.concat({
            item_id: item.id,
            check: false,
            name: item.name,
          }),
        });
      }

      return { prev };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(keys.latestGrocerylistByUserId);
      queryClient.invalidateQueries(keys.latestGrocerylistByHouseholdId);
      queryClient.invalidateQueries(keys.getGrocerylistById(grocerylistId));
      // toast({
      //   variant: "success",
      //   title: "Success",
      //   description: "Item added to grocery list.",
      // });
    },
  });
}
