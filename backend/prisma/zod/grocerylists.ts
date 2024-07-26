import * as z from "zod"
import { Completemenus, RelatedmenusModel, Completeitems, RelateditemsModel, Completehouseholds, RelatedhouseholdsModel } from "./index"

export const grocerylistsModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  createdBy: z.string().nullish(),
  menuId: z.string().nullish(),
  householdId: z.string().nullish(),
})

export interface Completegrocerylists extends z.infer<typeof grocerylistsModel> {
  menu?: Completemenus | null
  Item: Completeitems[]
  household?: Completehouseholds | null
}

/**
 * RelatedgrocerylistsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedgrocerylistsModel: z.ZodSchema<Completegrocerylists> = z.lazy(() => grocerylistsModel.extend({
  menu: RelatedmenusModel.nullish(),
  Item: RelateditemsModel.array(),
  household: RelatedhouseholdsModel.nullish(),
}))
