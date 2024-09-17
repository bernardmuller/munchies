import Ingredients from "./Ingredients";
import { getAllCategories } from "@/lib/http/client/categories/getAllCategories";
import { auth } from "@clerk/nextjs/server";
import { getAllIngredients } from "@/lib/http/client/ingredients/getAllIngredients";
import { redirect } from "next/navigation";

export default async function IngredientsPage() {
  const { getToken } = auth();
  const token = await getToken({ template: "1_HOUR" }).then((t) =>
    t?.toString(),
  );

  if (!token) {
    redirect(`/sign-in`);
  }

  const ingredients = await getAllIngredients(token!);
  const categories = await getAllCategories(token!);

  if (!ingredients.data || !categories.data) return null;
  return (
    <Ingredients
      ingredients={ingredients.data!}
      categories={categories.data!}
    />
  );
}
