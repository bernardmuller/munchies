import {InvalidateQueryFilters, QueryFilters, useMutation, useQueryClient} from "@tanstack/react-query";
import { keys } from "@/lib/http/keys";
import { useAuth } from "@clerk/tanstack-start";
<<<<<<< HEAD
=======
import {useToast} from "@/components/ui/use-toast";
>>>>>>> a53984d (feat: add http endpoint consumer hooks)
import {checkOrUncheckItem} from "@/lib/http/client/items/checkOrUncheckItem";
import {GroceryList} from "@/lib/http/client/grocerylists/getLatestGrocerylistByUserId";

export default function useCheckOrUncheckHouseholdItem() {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  return useMutation({
    mutationKey: keys.checkItem,
    mutationFn: async (id: string) => {
      const token = await getToken({ template: import.meta.env.VITE_CLERK_JWT_TEMPLATE ?? "default" }).then((t) => t?.toString());
      return checkOrUncheckItem({itemId: id, accessToken: token! });
    },
    onMutate: async (id: string) => {
      await queryClient.cancelQueries(keys.latestGrocerylistByHouseholdId as QueryFilters);
      const prev = queryClient.getQueryData(keys.latestGrocerylistByHouseholdId) as GroceryList;

      if (prev && prev.items) {
        queryClient.setQueryData(keys.latestGrocerylistByHouseholdId, {
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
<<<<<<< HEAD
      queryClient.invalidateQueries([
        ...keys.latestGrocerylistByUserId,
        ...keys.latestGrocerylistByHouseholdId,
      ] as InvalidateQueryFilters);
=======
      queryClient.invalidateQueries(keys.latestGrocerylistByUserId as InvalidateQueryFilters);
      queryClient.invalidateQueries(keys.latestGrocerylistByHouseholdId as InvalidateQueryFilters);
>>>>>>> a53984d (feat: add http endpoint consumer hooks)
    },
  });
}
