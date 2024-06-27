import axios from "axios";
import { requireBaseURL, requireHeaders } from "../shared/utils";

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
