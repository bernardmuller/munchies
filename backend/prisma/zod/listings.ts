import * as z from "zod"
import { Completeitems, RelateditemsModel } from "./index"

export const listingsModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  itemId: z.string(),
  price: z.string(),
})

export interface Completelistings extends z.infer<typeof listingsModel> {
  item: Completeitems
}

/**
 * RelatedlistingsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedlistingsModel: z.ZodSchema<Completelistings> = z.lazy(() => listingsModel.extend({
  item: RelateditemsModel,
}))
