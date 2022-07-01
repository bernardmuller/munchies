import * as z from "zod"
import { CompleteMenu, RelatedMenuModel, CompleteGrocerylistItem, RelatedGrocerylistItemModel } from "./index"

export const GrocerylistModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  menuId: z.string(),
})

export interface CompleteGrocerylist extends z.infer<typeof GrocerylistModel> {
  menu: CompleteMenu
  items?: CompleteGrocerylistItem | null
}

/**
 * RelatedGrocerylistModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedGrocerylistModel: z.ZodSchema<CompleteGrocerylist> = z.lazy(() => GrocerylistModel.extend({
  menu: RelatedMenuModel,
  items: RelatedGrocerylistItemModel.nullish(),
}))
