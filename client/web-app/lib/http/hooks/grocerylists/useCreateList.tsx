import { useMutation, useQueryClient } from "@tanstack/react-query";
import { keys } from "@/lib/http/keys";
import { useAuth } from "@clerk/nextjs";
import {createList, CreateList} from "@/lib/http/client/grocerylists/createList";

export default function useCreateList() {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  return useMutation({
    mutationKey: keys.createList,
    mutationFn: async (data: CreateList) => {
      const token = await getToken({ template: "1_HOUR" }).then((t) => t?.toString());
      return createList({ data, accessToken: token! });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(keys.latestGrocerylistByUserId);
      queryClient.invalidateQueries(keys.latestGrocerylistByHouseholdId);
    },
  });
}
