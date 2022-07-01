import * as z from "zod"
import { CompleteGrocerylist, RelatedGrocerylistModel, CompleteMenuMeals, RelatedMenuMealsModel } from "./index"

export const MenuModel = z.object({
  id: z.string(),
  name: z.string().nullish(),
  startDate: z.date().nullish(),
  endDate: z.date().nullish(),
  createdAt: z.date(),
})

export interface CompleteMenu extends z.infer<typeof MenuModel> {
  grocerylist?: CompleteGrocerylist | null
  meals: CompleteMenuMeals[]
}

/**
 * RelatedMenuModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMenuModel: z.ZodSchema<CompleteMenu> = z.lazy(() => MenuModel.extend({
  grocerylist: RelatedGrocerylistModel.nullish(),
  meals: RelatedMenuMealsModel.array(),
}))
