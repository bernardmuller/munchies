import * as z from "zod"
import { CompleteItem, RelatedItemModel } from "./index"

export const ListingModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  itemId: z.string(),
  price: z.string(),
})

export interface CompleteListing extends z.infer<typeof ListingModel> {
  item: CompleteItem
}

/**
 * RelatedListingModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedListingModel: z.ZodSchema<CompleteListing> = z.lazy(() => ListingModel.extend({
  item: RelatedItemModel,
}))
