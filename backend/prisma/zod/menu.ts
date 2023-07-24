import * as z from "zod"
import { CompleteHousehold, RelatedHouseholdModel, CompleteMenuMeals, RelatedMenuMealsModel, CompleteGrocerylist, RelatedGrocerylistModel } from "./index"

export const MenuModel = z.object({
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

export interface CompleteMenu extends z.infer<typeof MenuModel> {
  Household?: CompleteHousehold | null
  meals: CompleteMenuMeals[]
  Grocerylist?: CompleteGrocerylist | null
}

/**
 * RelatedMenuModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMenuModel: z.ZodSchema<CompleteMenu> = z.lazy(() => MenuModel.extend({
  Household: RelatedHouseholdModel.nullish(),
  meals: RelatedMenuMealsModel.array(),
  Grocerylist: RelatedGrocerylistModel.nullish(),
}))
