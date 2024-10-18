import Ingredients from "./Ingredients";
import { getAllCategories } from "@/lib/http/client/categories/getAllCategories";
import { auth } from "@clerk/nextjs/server";
import { getAllIngredients } from "@/lib/http/client/ingredients/getAllIngredients";
import { redirect } from "next/navigation";
import {getLatestGrocerylistByUserId} from "@/lib/http/client/grocerylists/getLatestGrocerylistByUserId";
import {getLatestGrocerylistByHouseholdId} from "@/lib/http/client/grocerylists/getLatestGrocerylistByHouseholdId";

export default async function IngredientsPage() {
  const { getToken } = auth();
  const token = await getToken({ template: process.env.NEXT_PUBLIC_CLERK_JWT_TEMPLATE ?? "default" }).then((t) =>
    t?.toString(),
  ).catch(() => redirect(`/sign-in`));

  const ingredients = await getAllIngredients(token!);
  const categories = await getAllCategories(token!);
  const userGrocerylistResponse = await getLatestGrocerylistByUserId(token!);
  const householdGrocerylistResponse = await getLatestGrocerylistByHouseholdId(token!);

  if (
    !ingredients.ok ||
    (!categories.ok && ingredients.status >= 500) ||
    categories.status >= 500 ||
    !userGrocerylistResponse.ok && userGrocerylistResponse.status >= 500 ||
    !householdGrocerylistResponse.ok && householdGrocerylistResponse.status >= 500
  ) {
    redirect("/something-went-wrong");
  }

  if (!ingredients.data || !categories.data) return null;
  return (
    <Ingredients
      ingredients={ingredients.data!}
      categories={categories.data!}
      grocerylistId={userGrocerylistResponse?.data?.id!}
      householdGrocerylistId={householdGrocerylistResponse?.data?.id!}
    />
  );
}
