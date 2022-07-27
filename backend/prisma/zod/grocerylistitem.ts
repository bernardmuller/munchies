import * as z from "zod"
import { CompleteGrocerylist, RelatedGrocerylistModel } from "./index"

export const GrocerylistItemModel = z.object({
  id: z.string(),
  grocerylistId: z.string(),
})

export interface CompleteGrocerylistItem extends z.infer<typeof GrocerylistItemModel> {
  grocerylist: CompleteGrocerylist
}

/**
 * RelatedGrocerylistItemModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedGrocerylistItemModel: z.ZodSchema<CompleteGrocerylistItem> = z.lazy(() => GrocerylistItemModel.extend({
  grocerylist: RelatedGrocerylistModel,
}))
