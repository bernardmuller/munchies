import * as z from "zod"
import { CompleteMenu, RelatedMenuModel, CompleteItem, RelatedItemModel } from "./index"

export const GrocerylistModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  createdBy: z.string().nullish(),
  menuId: z.string().nullish(),
})

export interface CompleteGrocerylist extends z.infer<typeof GrocerylistModel> {
  menu?: CompleteMenu | null
  Item: CompleteItem[]
}

/**
 * RelatedGrocerylistModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedGrocerylistModel: z.ZodSchema<CompleteGrocerylist> = z.lazy(() => GrocerylistModel.extend({
  menu: RelatedMenuModel.nullish(),
  Item: RelatedItemModel.array(),
}))
