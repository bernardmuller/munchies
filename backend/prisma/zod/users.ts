import * as z from "zod"

export const usersModel = z.object({
  id: z.string(),
  emailAddress: z.string(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
  dateOfBirth: z.date().nullish(),
})
