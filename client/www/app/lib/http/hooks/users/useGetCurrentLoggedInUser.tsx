import {QueryFilters, useQuery, useQueryClient} from "@tanstack/react-query";
import {keys} from "@/lib/http/keys";
import {useAuth} from "@clerk/tanstack-start";
import {getCurrentLoggedInUser} from "@/lib/http/client/users/getCurrentLoggedInUser";
import {ONE_DAY_IN_MS} from "@/lib/constants";

export default function useGetCurrentLoggedInUser() {
  const {getToken} = useAuth();
  const token = getToken({ template: import.meta.env.VITE_CLERK_JWT_TEMPLATE ?? "default" }).then((t) => t?.toString());
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: keys.currentUser,
    queryFn: async () => {
      const response = await getCurrentLoggedInUser((await token) as string);
      if(!response.data) return null;
      return response.data;
    },
    enabled: !!token,
    staleTime: ONE_DAY_IN_MS
  });

  const prefetch = async () => {
    if (!token) return;
    await queryClient.cancelQueries(keys.currentUser as QueryFilters);
    return await queryClient.prefetchQuery({
      queryKey: keys.currentUser,
      queryFn: async () => {
        const response = await getCurrentLoggedInUser((await token) as string);
        if(!response.data) return null;
        return response.data;
      },
    })
  };

  return {...query, prefetch};
}