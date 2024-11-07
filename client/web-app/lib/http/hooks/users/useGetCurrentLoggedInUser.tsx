import {useQuery, useQueryClient} from "@tanstack/react-query";
import {keys} from "@/lib/http/keys";
import {useAuth} from "@clerk/nextjs";
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

  const prefetch = queryClient.prefetchQuery({
    queryKey: keys.currentUser,
    queryFn: async () => {
      const response = await getCurrentLoggedInUser((await token) as string);
      return response.data;
    },
  });

  return {...query, prefetch};
}