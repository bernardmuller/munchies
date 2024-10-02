import apiRoutes from "../../routes";
import { httpRequest } from "../../httpRequest";
import { z } from "zod";
import {Ingredient} from "@/lib/http/client/ingredients/getAllIngredients";

const createItemSchema = z.object({
  ingredientId: z.string(),
});

export type CreateItem = z.infer<typeof createItemSchema>;

export async function createItem({
  grocerylistId,
  data,
  accessToken,
}: {
  grocerylistId: string;
  data: Ingredient;
  accessToken: string;
}) {
  return await httpRequest<void, CreateItem>(
    apiRoutes.createGrocerylistItem(grocerylistId),
    "POST",
    {
      ingredientId: data.id
    } as CreateItem,
    {
      accessToken: accessToken,
    },
  );
}
