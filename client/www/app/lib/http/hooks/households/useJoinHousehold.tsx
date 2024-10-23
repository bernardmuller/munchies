import { useMutation, useQueryClient } from "@tanstack/react-query";
import { keys } from "@/app/lib/http/keys";
import { joinHousehold } from "../../client/households/joinHousehold";
import { useAuth } from "@clerk/nextjs";

export default function useJoinHousehold() {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  return useMutation({
    mutationKey: ["join-household"],
    mutationFn: async ({ householdId }: { householdId: string }) => {
      const token = await getToken({ template: import.meta.env.VITE_CLERK_JWT_TEMPLATE ?? "default" }).then((t) =>
        t?.toString(),
      );
      return joinHousehold({ householdId, accessToken: token! });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(keys.currentUserHouseholdDetails);
    },
  });
}
