import { useQuery } from "@tanstack/react-query";
import { getCurrentUserHouseholdDetails } from "@/lib/http/client/households/getCurrentUserHouseholdDetails";
import type { Household } from "@/lib/http/client/households/getCurrentUserHouseholdDetails";
import { keys } from "@/lib/http/keys";
import { useAuth } from "@clerk/nextjs";

type Props = {
  initialData: Household;
};

export default function useCurrentUserHouseholdDetails({ initialData }: Props) {
  const { getToken } = useAuth();
  const token = getToken().then((t) => t?.toString());
  return useQuery({
    queryKey: keys.currentUserHouseholdDetails,
    queryFn: async () => {
      const response = await getCurrentUserHouseholdDetails(
        (await token) as string,
      );
      if (!response.data) return initialData;
      return response.data;
    },
    initialData,
    enabled: !!token,
  });
}
