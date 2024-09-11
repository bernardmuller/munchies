import apiRoutes from "../../routes";
import { httpRequest } from "../../httpRequest";
import { z } from "zod";

const ingredientSchema = z.object({
  id: z.string(),
  name: z.string(),
  categoryId: z.string(),
});

export type Ingredient = z.infer<typeof ingredientSchema>;

export async function getAllIngredients() {
  return await httpRequest<Ingredient[], void>(
    apiRoutes.ingredients(),
    "GET",
    undefined,
    {
      accessToken: "",
    },
  );
}
