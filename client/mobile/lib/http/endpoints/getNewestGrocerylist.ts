import { z } from "zod";
import { httpRequest } from "../httpClient";
import { routes } from "../routes";
import { Grocerylist } from "./getAllGrocerylists";

export async function getNewestGrocerylist() {
	return await httpRequest<Grocerylist, null>(
		routes.getNewestGrocerylist(),
		"GET"
	);
}
