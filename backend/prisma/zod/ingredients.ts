import * as z from "zod"
import { Completemeal_ingredients, Relatedmeal_ingredientsModel, Completeitems, RelateditemsModel } from "./index"

export const ingredientsModel = z.object({
  id: z.string(),
  name: z.string(),
  categoryId: z.number().int(),
  createdAt: z.date(),
  createdBy: z.string().nullish(),
  mealId: z.string().nullish(),
})

export interface Completeingredients extends z.infer<typeof ingredientsModel> {
  meal: Completemeal_ingredients[]
  item: Completeitems[]
}

/**
 * RelatedingredientsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedingredientsModel: z.ZodSchema<Completeingredients> = z.lazy(() => ingredientsModel.extend({
  meal: Relatedmeal_ingredientsModel.array(),
  item: RelateditemsModel.array(),
}))
