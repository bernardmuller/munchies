import { fetchIngredients } from "@/api/endpoints/ingredients";
import Ingredients from "./Ingredients";

export default async function IngredientsPage() {
  const ingredients = await fetchIngredients({});
  return <Ingredients data={ingredients} />;
}
