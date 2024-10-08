import apiRoutes from "../../routes";
import { httpRequest } from "../../httpRequest";
import { z } from 'zod';

const groceryItemSchema = z.object({
  item_id: z.string(),
  check: z.boolean(),
  name: z.string(),
  ingredient_id: z.string(),
  category_id: z.string(),
});

const groceryListSchema = z.object({
  id: z.string(),
  householdId: z.string().nullable(),
  mealplanID: z.string().nullable(),
  createdBy: z.string(),
  items: z.array(groceryItemSchema),
  createdAt: z.string()
});

export type GroceryItem = z.infer<typeof groceryItemSchema>;
export type GroceryList = z.infer<typeof groceryListSchema>;

export async function getLatestGrocerylistByUserId(token: string) {
  return await httpRequest<GroceryList, void>(
    apiRoutes.latestGrocerylistByUserId(),
    "GET",
    undefined,
    {
      accessToken: token,
    },
  );
}
