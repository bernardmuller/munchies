import { z } from "zod";
import { httpRequest } from "../httpClient";
import { routes } from "../routes";

const itemSchema = z.object({
	id: z.string(),
	check: z.boolean(),
	typeId: z.number().int(),
	description: z.string().nullish(),
	groceryListId: z.string(),
	ingredientId: z.string().nullish(),
	createdAt: z.string(),
});

const grocerylistSchema = z.object({
	items: z.array(itemSchema),
	createdAt: z.string(),
	id: z.string(),
	menuId: z.string().nullable(),
	createdBy: z.string().nullable(),
});

export type Item = z.infer<typeof itemSchema>;
export type Grocerylist = z.infer<typeof grocerylistSchema>;

export async function getAllGrocerylists() {
	return httpRequest<Grocerylist[], null>(routes.grocerylists(), "GET");
}
