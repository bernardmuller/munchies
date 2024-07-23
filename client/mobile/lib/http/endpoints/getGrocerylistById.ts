import { z } from "zod";
import { httpRequest } from "../httpClient";
import { routes } from "../routes";
import { Grocerylist } from "./getAllGrocerylists";

export async function getGrocerylistById(id: string) {
	return httpRequest<Grocerylist, null>(routes.getGrocerylistById(id), "GET");
}
