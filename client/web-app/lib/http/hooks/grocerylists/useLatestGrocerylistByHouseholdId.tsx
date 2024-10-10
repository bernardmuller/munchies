import { useQuery } from "@tanstack/react-query";
import { keys } from "@/lib/http/keys";
import { useAuth } from "@clerk/nextjs";
import {getLatestGrocerylistByHouseholdId} from "@/lib/http/client/grocerylists/getLatestGrocerylistByHouseholdId";

type Props = {
  initialData: any;
};

export default function useLatestGrocerylistByHouseholdId({ initialData }: Props) {
  const { getToken } = useAuth();
  const token = getToken({ template: "1_HOUR" }).then((t) => t?.toString());
  return useQuery({
    queryKey: keys.latestGrocerylistByHouseholdId,
    queryFn: async () => {
      const response = await getLatestGrocerylistByHouseholdId((await token) as string);
      if (!response.data) return initialData;
      return response.data;
    },
    initialData,
    enabled: !!token,
  });
}
