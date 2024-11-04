import { useQuery } from "@tanstack/react-query";
import { keys } from "@/lib/http/keys";
import { useAuth } from "@clerk/tanstack-start";
import {getLatestGrocerylistByUserId} from "@/lib/http/client/grocerylists/getLatestGrocerylistByUserId";

type Props = {
  initialData: any;
};

export default function useLatestGrocerylistByUserId({ initialData }: Props) {
  const { getToken } = useAuth();
  const token = getToken({ template: import.meta.env.VITE_CLERK_JWT_TEMPLATE ?? "default" }).then((t) => t?.toString());
  return useQuery({
    queryKey: keys.latestGrocerylistByUserId,
    queryFn: async () => {
      const response = await getLatestGrocerylistByUserId((await token) as string);
      if (!response.data) return initialData;
      return response.data;
    },
    initialData,
    enabled: !!token,
  });
}
