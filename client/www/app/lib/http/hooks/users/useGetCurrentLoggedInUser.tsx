import {useQuery} from "@tanstack/react-query";
import {useAuth} from "@clerk/tanstack-start";
import {getCurrentLoggedInUser, User} from "@/lib/http/client/users/getCurrentLoggedInUser";
import {getItem, setItem} from "@/lib/data-store";

type Props = {
  initialData: User | null;
};

export default function useGetCurrentLoggedInUser() {
  const {getToken} = useAuth();
  const token = getToken({template: "1_HOUR"}).then((t) => t?.toString());

  return useQuery({
    queryKey: ["current-logged-in-user"],
    queryFn: async () => {
      const datastoreUser = getItem("user")
      if (!datastoreUser) {
        const response = await getCurrentLoggedInUser((await token) as string);
        setItem("user", response.data)
        return response.data;
      }
      return datastoreUser
    },
    // initialData,
    enabled: !!token,
  });
}
