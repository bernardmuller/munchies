import { useQuery } from "@tanstack/react-query";
import { keys } from "@/lib/http/keys";
import { useAuth } from "@clerk/tanstack-start";
import {getLatestGrocerylistByHouseholdId} from "@/lib/http/client/grocerylists/getLatestGrocerylistByHouseholdId";
import {ONE_DAY_IN_MS} from "@/lib/constants";

type Props = {
  initialData: any;
};

export default function useLatestGrocerylistByHouseholdId({ initialData }: Props) {
  const { getToken } = useAuth();
  const token = getToken({ template: import.meta.env.VITE_CLERK_JWT_TEMPLATE ?? "default" }).then((t) => t?.toString());
  return useQuery({
    queryKey: keys.latestGrocerylistByHouseholdId,
    queryFn: async () => {
      const response = await getLatestGrocerylistByHouseholdId((await token) as string);
      if (!response.data) return initialData;
      return response.data;
    },
    initialData,
    enabled: !!token,
    staleTime: ONE_DAY_IN_MS
  });
}
