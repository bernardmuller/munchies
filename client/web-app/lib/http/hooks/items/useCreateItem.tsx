import { useMutation, useQueryClient } from "@tanstack/react-query";
import { keys } from "@/lib/http/keys";
import { useAuth } from "@clerk/nextjs";
import {CreateItem, createItem} from "@/lib/http/client/items/createItem";
import {useToast} from "@/components/ui/use-toast";

export default function useCreateItem(grocerylistId: string) {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const {toast} = useToast();
  return useMutation({
    mutationKey: keys.createItem,
    mutationFn: async (data: CreateItem) => {
      if(!grocerylistId) return;
      const token = await getToken().then((t) => t?.toString());
      return createItem({grocerylistId, data, accessToken: token! });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(keys.latestGrocerylistByUserId);
      queryClient.invalidateQueries(keys.latestGrocerylistByHouseholdId);
      toast({
        variant: "success",
        title: "Success",
        description: "Item added to grocery list.",
      });
    },
  });
}
