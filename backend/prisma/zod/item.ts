import * as z from "zod"
import { CompleteGrocerylist, RelatedGrocerylistModel, CompleteIngredient, RelatedIngredientModel } from "./index"

export const ItemModel = z.object({
  id: z.string(),
  check: z.boolean(),
  typeId: z.number().int(),
  description: z.string().nullish(),
  groceryListId: z.string(),
  ingredientId: z.string().nullish(),
})

export interface CompleteItem extends z.infer<typeof ItemModel> {
  groceryList: CompleteGrocerylist
  ingredient?: CompleteIngredient | null
}

/**
 * RelatedItemModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedItemModel: z.ZodSchema<CompleteItem> = z.lazy(() => ItemModel.extend({
  groceryList: RelatedGrocerylistModel,
  ingredient: RelatedIngredientModel.nullish(),
}))
