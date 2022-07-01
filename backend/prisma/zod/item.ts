import * as z from "zod"
import { CompleteGrocerylistItem, RelatedGrocerylistItemModel, CompleteIngredient, RelatedIngredientModel } from "./index"

export const ItemModel = z.object({
  id: z.string(),
  check: z.boolean(),
  grocerylistId: z.string(),
  ingredientId: z.string(),
})

export interface CompleteItem extends z.infer<typeof ItemModel> {
  grocerylist: CompleteGrocerylistItem[]
  ingredient: CompleteIngredient
}

/**
 * RelatedItemModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedItemModel: z.ZodSchema<CompleteItem> = z.lazy(() => ItemModel.extend({
  grocerylist: RelatedGrocerylistItemModel.array(),
  ingredient: RelatedIngredientModel,
}))
