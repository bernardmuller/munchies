import * as z from "zod"
import { Completehouseholds, RelatedhouseholdsModel, Completemenu_meals, Relatedmenu_mealsModel, Completegrocerylists, RelatedgrocerylistsModel } from "./index"

export const menusModel = z.object({
  id: z.string(),
  name: z.string().nullish(),
  startDate: z.date().nullish(),
  endDate: z.date().nullish(),
  createdAt: z.date(),
  householdId: z.string().nullish(),
  createdBy: z.string().nullish(),
  archived: z.boolean().nullish(),
  grocerylistId: z.string().nullish(),
})

export interface Completemenus extends z.infer<typeof menusModel> {
  Household?: Completehouseholds | null
  meals: Completemenu_meals[]
  Grocerylist?: Completegrocerylists | null
}

/**
 * RelatedmenusModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedmenusModel: z.ZodSchema<Completemenus> = z.lazy(() => menusModel.extend({
  Household: RelatedhouseholdsModel.nullish(),
  meals: Relatedmenu_mealsModel.array(),
  Grocerylist: RelatedgrocerylistsModel.nullish(),
}))
