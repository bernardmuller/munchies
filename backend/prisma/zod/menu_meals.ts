import * as z from "zod"
import { Completemenus, RelatedmenusModel, Completemeals, RelatedmealsModel } from "./index"

export const menu_mealsModel = z.object({
  id: z.string(),
  menuId: z.string(),
  mealId: z.string(),
})

export interface Completemenu_meals extends z.infer<typeof menu_mealsModel> {
  menu: Completemenus
  meal: Completemeals
}

/**
 * Relatedmenu_mealsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const Relatedmenu_mealsModel: z.ZodSchema<Completemenu_meals> = z.lazy(() => menu_mealsModel.extend({
  menu: RelatedmenusModel,
  meal: RelatedmealsModel,
}))
