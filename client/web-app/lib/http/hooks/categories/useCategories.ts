import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { keys } from "@/lib/http/keys";
import { type Person } from "@/lib/http/client/types";
import { getBuyerSellerById } from "@/lib/http/client/my-account/getBuyerSellerById";

type Props = {
  initialData: Person;
};

export default function useGetBuyerSellerById({ initialData }: Props) {
  const session = useSession();
  const userId = session?.data?.user?.id;
  const { isLoading, isError, data } = useQuery<Person>({
    queryKey: [keys.buyerSeller(userId!)],
    queryFn: () => {
      return getBuyerSellerById(
        userId?.toString()!,
        session.data?.onboardingApiAccessToken!,
      ).then((response) => {
        if (!response.data) return initialData;
        return response.data;
      });
    },
    initialData,
    enabled: !!userId,
  });

  return { isLoading, isError, data };
}
