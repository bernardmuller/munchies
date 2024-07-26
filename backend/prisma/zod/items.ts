import * as z from "zod"
import { Completegrocerylists, RelatedgrocerylistsModel, Completeingredients, RelatedingredientsModel, Completelistings, RelatedlistingsModel } from "./index"

export const itemsModel = z.object({
  id: z.string(),
  check: z.boolean(),
  typeId: z.number().int(),
  description: z.string().nullish(),
  createdAt: z.date(),
  createdBy: z.string().nullish(),
  groceryListId: z.string(),
  ingredientId: z.string().nullish(),
})

export interface Completeitems extends z.infer<typeof itemsModel> {
  groceryList: Completegrocerylists
  ingredient?: Completeingredients | null
  Listing: Completelistings[]
}

/**
 * RelateditemsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelateditemsModel: z.ZodSchema<Completeitems> = z.lazy(() => itemsModel.extend({
  groceryList: RelatedgrocerylistsModel,
  ingredient: RelatedingredientsModel.nullish(),
  Listing: RelatedlistingsModel.array(),
}))
