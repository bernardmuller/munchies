import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import ManageGrocerylist from "@/app/(secure)/lists/[id]/ManageGrocerylist";
import {getGrocerylistById} from "@/lib/http/client/grocerylists/getGrocerylistById";
import {GroceryList} from "@/lib/http/client/grocerylists/getLatestGrocerylistByUserId";
import {getAllIngredients, Ingredient} from "@/lib/http/client/ingredients/getAllIngredients";

export default async function GrocerylistsPage({ params }: { params: { id: string } }) {
  const {getToken} = auth();
  const token = await getToken({template: "1_HOUR"}).then((t) =>
    t?.toString(),
  ).catch(() => redirect(`/sign-in`));

  if (!token) {
    redirect(`/sign-in`);
  }

  const grocerylistResponse = await getGrocerylistById(token!, params.id);
  const ingredientsResponse = await getAllIngredients(token!);

  if (
    !grocerylistResponse.ok && grocerylistResponse.status >= 500
  ) {
    redirect("/something-went-wrong");
  }

  if (!grocerylistResponse?.data) return null;
  return (
    <div className="w-full min-h-[50vh] ">
      {/*<h2 className="mb-6 text-xl font-semibold">Shopping Lists</h2>*/}
      <ManageGrocerylist
        grocerylist={grocerylistResponse?.data as GroceryList}
        ingredients={ingredientsResponse?.data as Ingredient[]}
      />
    </div>
  );
}
