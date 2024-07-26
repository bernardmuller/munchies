import * as z from "zod"
import { Completesessions, RelatedsessionsModel, Completehouseholds, RelatedhouseholdsModel, Completehousehold_invites, Relatedhousehold_invitesModel } from "./index"

export const usersModel = z.object({
  id: z.string(),
  email: z.string(),
  password: z.string(),
  firstname: z.string().nullish(),
  lastname: z.string().nullish(),
  dateofbirth: z.date().nullish(),
  role: z.string().nullish(),
  bio: z.string().nullish(),
  image: z.string().nullish(),
  status: z.string().nullish(),
  createdat: z.date(),
  updatedat: z.date(),
  householdid: z.string().nullish(),
})

export interface Completeusers extends z.infer<typeof usersModel> {
  session: Completesessions[]
  household?: Completehouseholds | null
  Householdinvite: Completehousehold_invites[]
}

/**
 * RelatedusersModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedusersModel: z.ZodSchema<Completeusers> = z.lazy(() => usersModel.extend({
  session: RelatedsessionsModel.array(),
  household: RelatedhouseholdsModel.nullish(),
  Householdinvite: Relatedhousehold_invitesModel.array(),
}))
