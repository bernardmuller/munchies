import * as z from "zod"
import { CompleteMealIngredient, RelatedMealIngredientModel, CompleteItem, RelatedItemModel } from "./index"

export const IngredientModel = z.object({
  id: z.string(),
  name: z.string(),
  categoryId: z.number().int(),
  createdAt: z.date(),
  createdBy: z.string().nullish(),
  mealId: z.string().nullish(),
})

export interface CompleteIngredient extends z.infer<typeof IngredientModel> {
  meal: CompleteMealIngredient[]
  item: CompleteItem[]
}

/**
 * RelatedIngredientModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedIngredientModel: z.ZodSchema<CompleteIngredient> = z.lazy(() => IngredientModel.extend({
  meal: RelatedMealIngredientModel.array(),
  item: RelatedItemModel.array(),
}))
