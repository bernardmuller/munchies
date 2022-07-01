import * as z from "zod"
import { CompleteMenu, RelatedMenuModel, CompleteMeal, RelatedMealModel } from "./index"

export const Menu_MealsModel = z.object({
  id: z.string(),
  menuId: z.string(),
  mealId: z.string(),
})

export interface CompleteMenu_Meals extends z.infer<typeof Menu_MealsModel> {
  menu: CompleteMenu
  meal: CompleteMeal
}

/**
 * RelatedMenu_MealsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMenu_MealsModel: z.ZodSchema<CompleteMenu_Meals> = z.lazy(() => Menu_MealsModel.extend({
  menu: RelatedMenuModel,
  meal: RelatedMealModel,
}))
