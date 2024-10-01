import { useQuery } from "@tanstack/react-query";
import { keys } from "@/lib/http/keys";
import { useAuth } from "@clerk/nextjs";
import {getLatestGrocerylistByUserId} from "@/lib/http/client/grocerylists/getLatestGrocerylistByUserId";

type Props = {
  initialData: any;
  userId: string;
};

export default function useLatestGrocerylistByUserId({ initialData, userId }: Props) {
  const { getToken } = useAuth();
  const token = getToken({ template: "1_HOUR" }).then((t) => t?.toString());
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
