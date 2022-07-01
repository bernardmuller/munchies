import * as z from "zod"
import { CompleteMenu, RelatedMenuModel, CompleteMeal, RelatedMealModel } from "./index"

export const MenuMealsModel = z.object({
  id: z.string(),
  menuId: z.string(),
  mealId: z.string(),
})

export interface CompleteMenuMeals extends z.infer<typeof MenuMealsModel> {
  menu: CompleteMenu
  meal: CompleteMeal
}

/**
 * RelatedMenuMealsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMenuMealsModel: z.ZodSchema<CompleteMenuMeals> = z.lazy(() => MenuMealsModel.extend({
  menu: RelatedMenuModel,
  meal: RelatedMealModel,
}))
