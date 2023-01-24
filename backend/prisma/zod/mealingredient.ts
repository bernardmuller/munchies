import * as z from "zod"
import { CompleteMeal, RelatedMealModel, CompleteIngredient, RelatedIngredientModel } from "./index"

export const MealIngredientModel = z.object({
  id: z.string(),
  mealId: z.string(),
  ingredientId: z.string(),
  quantity: z.string().nullish(),
})

export interface CompleteMealIngredient extends z.infer<typeof MealIngredientModel> {
  meal: CompleteMeal
  ingredient: CompleteIngredient
}

/**
 * RelatedMealIngredientModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMealIngredientModel: z.ZodSchema<CompleteMealIngredient> = z.lazy(() => MealIngredientModel.extend({
  meal: RelatedMealModel,
  ingredient: RelatedIngredientModel,
}))
