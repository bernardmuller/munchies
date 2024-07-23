import axios from "axios";
import { requireBaseURL, requireHeaders } from "../shared/utils";
import { z } from "zod";
import { Grocerylist } from "@/lib/http/endpoints/getAllGrocerylists";
import { routes } from "@/lib/http/routes";
import { httpRequest } from "@/lib/http/httpClient";

export async function fetchGrocerylists() {
	return await axios({
		method: "GET",
		url: `${requireBaseURL()}/grocerylists`,
		headers: await requireHeaders(),
	})
		.then((response) => response.data)
		.catch((err) => console.log(err));
}

export async function fetchGrocerylist(id: string) {
	return await axios({
		method: "GET",
		url: `${requireBaseURL()}/grocerylists/${id}`,
		headers: await requireHeaders(),
	})
		.then((response) => response.data)
		.catch((err) => console.log(err));
}

export async function createGrocerylist({
	householdId,
}: {
	householdId: string | null;
}) {
	return httpRequest<
		Grocerylist,
		{
			householdId: string | null;
		}
	>(routes.grocerylists(), "POST", {
		householdId,
	});
}
