import * as z from "zod"
import { Completemeals, RelatedmealsModel, Completeingredients, RelatedingredientsModel } from "./index"

export const meal_ingredientsModel = z.object({
  id: z.string(),
  mealId: z.string(),
  ingredientId: z.string(),
  quantity: z.string().nullish(),
})

export interface Completemeal_ingredients extends z.infer<typeof meal_ingredientsModel> {
  meal: Completemeals
  ingredient: Completeingredients
}

/**
 * Relatedmeal_ingredientsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const Relatedmeal_ingredientsModel: z.ZodSchema<Completemeal_ingredients> = z.lazy(() => meal_ingredientsModel.extend({
  meal: RelatedmealsModel,
  ingredient: RelatedingredientsModel,
}))
