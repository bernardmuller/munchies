import { fetchIngredients } from "@/api/endpoints/ingredients";
import Ingredients from "./Ingredients";
import { getAllCategories } from "@/lib/http/client/categories/getAllCategories";

export default async function IngredientsPage() {
  const ingredients = await fetchIngredients({});
  const categories = await getAllCategories();
  return (
    <Ingredients ingredients={ingredients} categories={categories.data!} />
  );
}
