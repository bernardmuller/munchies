import apiRoutes from "../../routes";
import { httpRequest } from "../../httpRequest";
import { z } from "zod";

const ingredientSchema = z.object({
  name: z.string(),
  categoryId: z.string(),
});

export type Ingredient = z.infer<typeof ingredientSchema>;

export async function createIngredient({
  data,
  accessToken,
}: {
  data: Ingredient;
  accessToken: string;
}) {
  return await httpRequest<Ingredient, Ingredient>(
    apiRoutes.ingredients(),
    "POST",
    data,
    {
      accessToken: accessToken,
    },
  );
}
