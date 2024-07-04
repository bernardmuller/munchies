import { z } from "zod";
import { httpRequest } from "../httpClient";
import { routes } from "../routes";

const ingredientSchema = z.object({
	id: z.string(),
	name: z.string(),
	categoryId: z.number().int(),
	createdAt: z.date(),
	createdBy: z.string().nullish(),
	mealId: z.string().nullish(),
});

export type Ingredient = z.infer<typeof ingredientSchema>;

export async function getAllIngredients() {
	return httpRequest<Ingredient[], null>(routes.getAllIngredients(), "GET");
}
