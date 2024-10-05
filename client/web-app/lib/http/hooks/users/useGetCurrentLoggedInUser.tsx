import { useQuery } from "@tanstack/react-query";
import { keys } from "@/lib/http/keys";
import { useAuth } from "@clerk/nextjs";
import {getLatestGrocerylistByUserId} from "@/lib/http/client/grocerylists/getLatestGrocerylistByUserId";
import {getGrocerylistById} from "@/lib/http/client/grocerylists/getGrocerylistById";
import {getCurrentLoggedInUser, User} from "@/lib/http/client/users/getCurrentLoggedInUser";

type Props = {
  initialData: User | null;
};

export default function useGetCurrentLoggedInUser() {
  const { getToken } = useAuth();
  const token = getToken({template: "1_HOUR"}).then((t) => t?.toString());

  return useQuery({
    queryKey: ["current-logged-in-user"],
    queryFn: async () => {
      console.log(await token);
      const response = await getCurrentLoggedInUser((await token) as string);
      // if (!response.data) return initialData;
      return response.data;
    },
    // initialData,
    enabled: !!token,
  });
}
