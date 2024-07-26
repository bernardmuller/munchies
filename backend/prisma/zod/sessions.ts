import * as z from "zod"
import { Completeusers, RelatedusersModel } from "./index"

export const sessionsModel = z.object({
  id: z.string(),
  userId: z.string(),
})

export interface Completesessions extends z.infer<typeof sessionsModel> {
  user: Completeusers
}

/**
 * RelatedsessionsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedsessionsModel: z.ZodSchema<Completesessions> = z.lazy(() => sessionsModel.extend({
  user: RelatedusersModel,
}))
