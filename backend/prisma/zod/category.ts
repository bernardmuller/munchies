import * as z from "zod"

export const CategoryModel = z.object({
  id: z.number().int(),
  name: z.string(),
})
