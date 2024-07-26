import * as z from "zod"
import { Completehouseholds, RelatedhouseholdsModel, Completeusers, RelatedusersModel } from "./index"

export const household_invitesModel = z.object({
  id: z.string(),
  createdBy: z.string(),
  createdAt: z.date(),
  householdId: z.string(),
  userId: z.string(),
})

export interface Completehousehold_invites extends z.infer<typeof household_invitesModel> {
  household: Completehouseholds
  user: Completeusers
}

/**
 * Relatedhousehold_invitesModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const Relatedhousehold_invitesModel: z.ZodSchema<Completehousehold_invites> = z.lazy(() => household_invitesModel.extend({
  household: RelatedhouseholdsModel,
  user: RelatedusersModel,
}))
