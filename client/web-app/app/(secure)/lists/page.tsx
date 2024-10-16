import Grocerylists from "./Grocerylists";
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {getLatestGrocerylistByUserId} from "@/lib/http/client/grocerylists/getLatestGrocerylistByUserId";
import {getLatestGrocerylistByHouseholdId} from "@/lib/http/client/grocerylists/getLatestGrocerylistByHouseholdId";
import {getCurrentLoggedInUser} from "@/lib/http/client/users/getCurrentLoggedInUser";
import {getAllCategories} from "@/lib/http/client/categories/getAllCategories";

export default async function GrocerylistsPage() {
  const {getToken} = auth();
  const token = await getToken().then((t) =>
    t?.toString(),
  ).catch(() => redirect(`/sign-in`));

  if (!token) {
    redirect(`/sign-in`);
  }

  const userGrocerylistResponse = await getLatestGrocerylistByUserId(token!);
  const householdGrocerylistResponse = await getLatestGrocerylistByHouseholdId(token!);
  const currentUser = await getCurrentLoggedInUser(token!);
  const categoriesResponse = await getAllCategories(token!)

  if (
    !userGrocerylistResponse.ok && userGrocerylistResponse.status >= 500 ||
    !householdGrocerylistResponse.ok && householdGrocerylistResponse.status >= 500
  ) {
    redirect("/something-went-wrong");
  }

  if (!userGrocerylistResponse?.data) return null;
  return (
    <div className="w-full min-h-[50vh] ">
      {/*<h2 className="mb-6 text-xl font-semibold">Shopping Lists</h2>*/}
      <Grocerylists
        currentUser={currentUser}
        grocerylists={{
          myGrocerylist: userGrocerylistResponse?.data!,
          myHouseholdGrocerylist: householdGrocerylistResponse?.data!,
        }}
        categories={categoriesResponse.data ?? []}
      />
    </div>
  );
}
