import * as z from "zod"
import { Completemenu_meals, Relatedmenu_mealsModel, Completemeal_ingredients, Relatedmeal_ingredientsModel } from "./index"

export const mealsModel = z.object({
  id: z.string(),
  name: z.string().nullish(),
  seasons: z.string().nullish(),
  directions: z.string().array(),
  cuisine: z.string().nullish(),
  image: z.string().nullish(),
  URL: z.string().nullish(),
  prepTime: z.number().int().nullish(),
  cookTime: z.number().int().nullish(),
  readyIn: z.number().int().nullish(),
  rating: z.string().nullish(),
  notes: z.string().nullish(),
  deleted: z.boolean().nullish(),
  createdAt: z.date(),
  createdBy: z.string().nullish(),
})

export interface Completemeals extends z.infer<typeof mealsModel> {
  menu: Completemenu_meals[]
  ingredients: Completemeal_ingredients[]
}

/**
 * RelatedmealsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedmealsModel: z.ZodSchema<Completemeals> = z.lazy(() => mealsModel.extend({
  menu: Relatedmenu_mealsModel.array(),
  ingredients: Relatedmeal_ingredientsModel.array(),
}))
