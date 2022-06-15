import * as z from "zod"

export const knex_migrations_lockModel = z.object({
  index: z.number().int(),
  is_locked: z.number().int().nullish(),
})
