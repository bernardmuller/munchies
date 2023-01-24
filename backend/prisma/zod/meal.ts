import * as z from "zod"
import { CompleteMenuMeals, RelatedMenuMealsModel, CompleteMealIngredient, RelatedMealIngredientModel } from "./index"

export const MealModel = z.object({
  id: z.string(),
  name: z.string().nullish(),
  seasons: z.string().nullish(),
  directions: z.string().array(),
  cuisine: z.string().nullish(),
  image: z.string().nullish(),
  URL: z.string().nullish(),
  prepTime: z.number().int().nullish(),
  cookTime: z.number().int().nullish(),
  readyIn: z.number().int().nullish(),
  rating: z.string().nullish(),
  notes: z.string().nullish(),
  createdAt: z.date(),
  createdBy: z.string().nullish(),
})

export interface CompleteMeal extends z.infer<typeof MealModel> {
  menu?: CompleteMenuMeals | null
  ingredients: CompleteMealIngredient[]
}

/**
 * RelatedMealModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMealModel: z.ZodSchema<CompleteMeal> = z.lazy(() => MealModel.extend({
  menu: RelatedMenuMealsModel.nullish(),
  ingredients: RelatedMealIngredientModel.array(),
}))
