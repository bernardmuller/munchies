import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {getLatestGrocerylistByUserId} from "@/lib/http/client/grocerylists/getLatestGrocerylistByUserId";
import {getLatestGrocerylistByHouseholdId} from "@/lib/http/client/grocerylists/getLatestGrocerylistByHouseholdId";
import {getAllCategories} from "@/lib/http/client/categories/getAllCategories";
import Grocerylists from "@/app/(secure)/lists/Grocerylists";

const getPageData = async () => {
  const {getToken} = auth();
  const token = await getToken({template: process.env.NEXT_PUBLIC_CLERK_JWT_TEMPLATE ?? "default"}).then((t) =>
    t?.toString(),
  ).catch(() => redirect(`/sign-in`));

  if (!token) {
    redirect(`/sign-in`);
  }

  const userGrocerylistResponse = await getLatestGrocerylistByUserId(token!);
  const householdGrocerylistResponse = await getLatestGrocerylistByHouseholdId(token!);
  // const currentUser = await getCurrentLoggedInUser(token!);
  const categoriesResponse = await getAllCategories(token!)

  if (
    !userGrocerylistResponse.ok && userGrocerylistResponse.status < 200 || userGrocerylistResponse.status >= 300
  ) {
    redirect("/something-went-wrong");
  }

  return {userGrocerylistResponse, householdGrocerylistResponse, categoriesResponse};
}

export const ListsSection = async () => {
  const {userGrocerylistResponse, householdGrocerylistResponse, categoriesResponse} = await getPageData();
  return (
    <Grocerylists
      grocerylists={{
        myGrocerylist: userGrocerylistResponse?.data!,
        myHouseholdGrocerylist: householdGrocerylistResponse?.data!,
      }}
      categories={categoriesResponse.data ?? []}
    />
  )
}