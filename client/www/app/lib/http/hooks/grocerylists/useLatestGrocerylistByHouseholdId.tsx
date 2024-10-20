import { useQuery } from "@tanstack/react-query";
import { keys } from "@/app/lib/http/keys";
import { useAuth } from "@clerk/nextjs";
import {getLatestGrocerylistByHouseholdId} from "@/app/lib/http/client/grocerylists/getLatestGrocerylistByHouseholdId";

type Props = {
  initialData: any;
};

export default function useLatestGrocerylistByHouseholdId({ initialData }: Props) {
  const { getToken } = useAuth();
  const token = getToken({ template: process.env.NEXT_PUBLIC_CLERK_JWT_TEMPLATE ?? "default" }).then((t) => t?.toString());
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
