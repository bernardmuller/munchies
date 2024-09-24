import Grocerylists from "./Grocerylists";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {getLatestGrocerylistByUserId} from "@/lib/http/client/grocerylists/getLatestGrocerylistByUserId";

export default async function IngredientsPage() {
  const { getToken } = auth();
  const token = await getToken({ template: "1_HOUR" }).then((t) =>
    t?.toString(),
  );

  if (!token) {
    redirect(`/sign-in`);
  }

  const userGrocerylistResponse = await getLatestGrocerylistByUserId(token!);

  if (
    !userGrocerylistResponse.ok && userGrocerylistResponse.status >= 500
  ) {
    redirect("/something-went-wrong");
  }

  if (!userGrocerylistResponse?.data) return null;
  return (
    <Grocerylists
      grocerylists={{
        myGrocerylist: userGrocerylistResponse?.data!,
        myHouseholdGrocerylist: {},
      }}
    />
  );
}
