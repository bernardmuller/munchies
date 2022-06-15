import * as z from "zod"

export const untitled_tableModel = z.object({
  id: z.number().int(),
})
