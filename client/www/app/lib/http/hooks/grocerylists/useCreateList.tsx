import { useMutation, useQueryClient } from "@tanstack/react-query";
import { keys } from "@/app/lib/http/keys";
import { useAuth } from "@clerk/nextjs";
import {createList, CreateList} from "@/app/lib/http/client/grocerylists/createList";

export default function useCreateList() {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  return useMutation({
    mutationKey: keys.createList,
    mutationFn: async (data: CreateList) => {
      const token = await getToken({ template: process.env.NEXT_PUBLIC_CLERK_JWT_TEMPLATE ?? "default" }).then((t) => t?.toString());
      return createList({ data, accessToken: token! });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(keys.latestGrocerylistByUserId);
      queryClient.invalidateQueries(keys.latestGrocerylistByHouseholdId);
    },
  });
}
