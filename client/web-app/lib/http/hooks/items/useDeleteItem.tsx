import {useMutation, useQueryClient} from "@tanstack/react-query";
import {keys} from "@/lib/http/keys";
import {useAuth} from "@clerk/nextjs";
import {useToast} from "@/components/ui/use-toast";
import {GroceryList} from "@/lib/http/client/grocerylists/getLatestGrocerylistByUserId";
import {deleteItem} from "@/lib/http/client/items/deleteItem";

export default function useDeleteItem(grocerylistId: string) {
  const queryClient = useQueryClient();
  const {getToken} = useAuth();
  const {toast} = useToast();
  return useMutation({
    mutationKey: ["delete-item"],
    mutationFn: async (id: string) => {
      const token = await getToken({template: process.env.NEXT_PUBLIC_CLERK_JWT_TEMPLATE ?? "default"}).then((t) => t?.toString());
      return deleteItem({id, accessToken: token!});
    },
    onMutate: async (id: string) => {
      await queryClient.cancelQueries(keys.latestGrocerylistByUserId);
      await queryClient.cancelQueries(keys.latestGrocerylistByHouseholdId);
      await queryClient.cancelQueries(keys.getGrocerylistById(grocerylistId));
      const prev = await queryClient.getQueryData(keys.getGrocerylistById(grocerylistId)) as GroceryList;

      queryClient.setQueryData(keys.getGrocerylistById(grocerylistId), {
        ...prev,
        items: prev.items.filter(item => item.item_id !== id)
      });

      return {prev};
    },
    onSuccess: () => {
      queryClient.invalidateQueries(keys.latestGrocerylistByUserId);
      queryClient.invalidateQueries(keys.latestGrocerylistByHouseholdId);
      queryClient.invalidateQueries(keys.getGrocerylistById(grocerylistId));
    },
  });
}
