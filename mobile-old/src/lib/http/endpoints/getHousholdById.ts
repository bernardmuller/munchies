import { z } from "zod";
import { routes } from "src/lib/http/routes";
import { httpRequest } from "src/lib/http/httpClient";
import { grocerylistSchema } from "./getAllGrocerylists";

const householdSchema = z.object({
	id: z.string(),
	createdBy: z.string(),
	createdAt: z.string(),
	members: z.array(
		z.object({
			id: z.string(),
			firstName: z.string(),
			lastName: z.string(),
			email: z.string(),
			householdId: z.string(),
		})
	),
	grocerylist: grocerylistSchema.nullable(),
});

export type Household = z.infer<typeof householdSchema>;

export async function getHouseholdById(id: string) {
	return httpRequest<Household, null>(routes.getHouseholdById(id), "GET");
}
