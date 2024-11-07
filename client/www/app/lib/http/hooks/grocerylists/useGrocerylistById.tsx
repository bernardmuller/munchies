import { useQuery } from "@tanstack/react-query";
import { keys } from "@/lib/http/keys";
import { useAuth } from "@clerk/tanstack-start";
import {getGrocerylistById} from "@/lib/http/client/grocerylists/getGrocerylistById";
import {ONE_DAY_IN_MS} from "@/lib/constants";

type Props = {
  id: string;
};

export default function useGrocerylistById({ id }: Props) {
  const { getToken } = useAuth();
  const token = getToken({ template: import.meta.env.VITE_CLERK_JWT_TEMPLATE ?? "default" }).then((t) => t?.toString());
  return useQuery({
    queryKey: keys.getGrocerylistById(id),
    queryFn: async () => {
      const response = await getGrocerylistById((await token) as string, id);
      if (!response.data) return null;
      return response.data;
    },
    enabled: !!token,
    staleTime: ONE_DAY_IN_MS
  });
}
