import {InvalidateQueryFilters, useMutation, useQueryClient} from "@tanstack/react-query";
import { keys } from "@/lib/http/keys";
import { createHousehold } from "../../client/households/createHousehold";
import { useAuth } from "@clerk/tanstack-start";

export default function useCreateHousehold() {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  return useMutation({
    mutationKey: ["create-household"],
    mutationFn: async () => {
      const token = await getToken({ template: import.meta.env.VITE_CLERK_JWT_TEMPLATE ?? "default" }).then((t) => t?.toString());
      return createHousehold({ accessToken: token! });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(keys.currentUserHouseholdDetails as InvalidateQueryFilters);
    },
  });
}