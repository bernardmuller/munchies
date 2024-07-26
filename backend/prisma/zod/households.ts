import * as z from "zod"
import { Completeusers, RelatedusersModel, Completemenus, RelatedmenusModel, Completehousehold_invites, Relatedhousehold_invitesModel, Completegrocerylists, RelatedgrocerylistsModel } from "./index"

export const householdsModel = z.object({
  id: z.string(),
  createdBy: z.string(),
  createdAt: z.date(),
})

export interface Completehouseholds extends z.infer<typeof householdsModel> {
  users: Completeusers[]
  menus: Completemenus[]
  HouseholdInvite: Completehousehold_invites[]
  Grocerylist: Completegrocerylists[]
}

/**
 * RelatedhouseholdsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedhouseholdsModel: z.ZodSchema<Completehouseholds> = z.lazy(() => householdsModel.extend({
  users: RelatedusersModel.array(),
  menus: RelatedmenusModel.array(),
  HouseholdInvite: Relatedhousehold_invitesModel.array(),
  Grocerylist: RelatedgrocerylistsModel.array(),
}))
