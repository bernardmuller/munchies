import {QueryFilters, useQuery, useQueryClient} from "@tanstack/react-query";
import {keys} from "@/lib/http/keys";
import {useAuth} from "@clerk/tanstack-start";
import {getCurrentLoggedInUser} from "@/lib/http/client/users/getCurrentLoggedInUser";

export default function useGetCurrentLoggedInUser() {
  const {getToken} = useAuth();
  const token = getToken({template: "1_HOUR"}).then((t) => t?.toString());
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: keys.currentUser,
    queryFn: async () => {
      const response = await getCurrentLoggedInUser((await token) as string);
      return response.data;
    },
    enabled: !!token,
  });

  const prefetch = async () => {
    if (!token) return;
    await queryClient.cancelQueries(keys.currentUser as QueryFilters);
    return await queryClient.prefetchQuery({
      queryKey: keys.currentUser,
      queryFn: async () => {
        const response = await getCurrentLoggedInUser((await token) as string);
        return response.data;
      },
    })
  };

  return {...query, prefetch};
}