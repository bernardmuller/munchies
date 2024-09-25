import apiRoutes from "../../routes";
import { httpRequest } from "../../httpRequest";
import { z } from "zod";

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
  data: CreateItem;
  accessToken: string;
}) {
  return await httpRequest<void, CreateItem>(
    apiRoutes.createGrocerylistItem(grocerylistId),
    "POST",
    data,
    {
      accessToken: accessToken,
    },
  );
}
