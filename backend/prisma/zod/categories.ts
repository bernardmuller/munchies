import * as z from "zod"

export const categoriesModel = z.object({
  id: z.number().int(),
  name: z.string(),
})
