import * as z from "zod"

export const knex_migrationsModel = z.object({
  id: z.number().int(),
  name: z.string().nullish(),
  batch: z.number().int().nullish(),
  migration_time: z.date().nullish(),
})
