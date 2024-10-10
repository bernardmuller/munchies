import { useMutation, useQueryClient } from "@tanstack/react-query";
import { keys } from "@/lib/http/keys";
import { useAuth } from "@clerk/nextjs";
import {useToast} from "@/components/ui/use-toast";
import {checkOrUncheckItem} from "@/lib/http/client/items/checkOrUncheckItem";
import {GroceryList} from "@/lib/http/client/grocerylists/getLatestGrocerylistByUserId";

export default function useCheckOrUncheckItem() {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const {toast} = useToast();
  return useMutation({
    mutationKey: keys.checkItem,
    mutationFn: async (id: string) => {
      const token = await getToken({ template: "1_HOUR" }).then((t) => t?.toString());
      return checkOrUncheckItem({itemId: id, accessToken: token! });
    },
    onMutate: async (id: string) => {
      await queryClient.cancelQueries(keys.latestGrocerylistByUserId);
      const prev = queryClient.getQueryData(keys.latestGrocerylistByUserId) as GroceryList;

      if (prev && prev.items) {
        queryClient.setQueryData(keys.latestGrocerylistByUserId, {
          ...prev,
          items: prev.items.map((item) => {
            if (item.item_id === id) {
              return { ...item, check: !item.check };
            }
            return item;
          })
        });
      }

      return { prev };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(keys.latestGrocerylistByUserId);
      queryClient.invalidateQueries(keys.latestGrocerylistByHouseholdId);
    },
  });
}
