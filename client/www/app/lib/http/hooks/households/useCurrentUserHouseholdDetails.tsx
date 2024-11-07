import { useQuery } from "@tanstack/react-query";
import { getCurrentUserHouseholdDetails } from "@/lib/http/client/households/getCurrentUserHouseholdDetails";
import type { Household } from "@/lib/http/client/households/getCurrentUserHouseholdDetails";
import { keys } from "@/lib/http/keys";
import { useAuth } from "@clerk/tanstack-start";
import {ONE_DAY_IN_MS} from "@/lib/constants";

export default function useCurrentUserHouseholdDetails() {
  const { getToken } = useAuth();
  const token = getToken({ template: import.meta.env.VITE_CLERK_JWT_TEMPLATE ?? "default" }).then((t) => t?.toString());
  return useQuery({
    queryKey: keys.currentUserHouseholdDetails,
    queryFn: async () => {
      const response = await getCurrentUserHouseholdDetails(
        (await token) as string,
      );
      if (!response.data) return null;
      return response.data;
    },
    enabled: !!token,
    staleTime: ONE_DAY_IN_MS
  });
}
