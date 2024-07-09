import * as z from "zod"
import { CompleteUser, RelatedUserModel, CompleteMenu, RelatedMenuModel, CompleteHouseholdInvite, RelatedHouseholdInviteModel, CompleteGrocerylist, RelatedGrocerylistModel } from "./index"

export const HouseholdModel = z.object({
  id: z.string(),
  createdBy: z.string(),
  createdAt: z.date(),
})

export interface CompleteHousehold extends z.infer<typeof HouseholdModel> {
  users: CompleteUser[]
  menus: CompleteMenu[]
  HouseholdInvite: CompleteHouseholdInvite[]
  Grocerylist: CompleteGrocerylist[]
}

/**
 * RelatedHouseholdModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedHouseholdModel: z.ZodSchema<CompleteHousehold> = z.lazy(() => HouseholdModel.extend({
  users: RelatedUserModel.array(),
  menus: RelatedMenuModel.array(),
  HouseholdInvite: RelatedHouseholdInviteModel.array(),
  Grocerylist: RelatedGrocerylistModel.array(),
}))
