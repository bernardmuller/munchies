import { useQuery } from "@tanstack/react-query";
import { keys } from "@/app/lib/http/keys";
import { useAuth } from "@clerk/nextjs";
import {getLatestGrocerylistByUserId} from "@/app/lib/http/client/grocerylists/getLatestGrocerylistByUserId";
import {getGrocerylistById} from "@/app/lib/http/client/grocerylists/getGrocerylistById";

type Props = {
  initialData: any;
  id: string;
};

export default function useGrocerylistById({ initialData, id }: Props) {
  const { getToken } = useAuth();
  const token = getToken({ template: process.env.NEXT_PUBLIC_CLERK_JWT_TEMPLATE ?? "default" }).then((t) => t?.toString());
  return useQuery({
    queryKey: keys.getGrocerylistById(id),
    queryFn: async () => {
      const response = await getGrocerylistById((await token) as string, id);
      if (!response.data) return initialData;
      return response.data;
    },
    initialData,
    enabled: !!token,
  });
}
