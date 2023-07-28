import httpClient from "../httpClient";
import { GroceryList } from "@/types";

// export async function fetchGrocerylists() {
// 	return await axios({
// 		method: "GET",
// 		url: `${requireBaseURL()}/grocerylists`,
// 		headers: await requireHeaders(),
// 	})
// 		.then((response) => response.data)
// 		.catch((err) => console.log(err));
// }

export async function fetchGrocerylist(id: string) {
	if (!id) return;
	return await httpClient.get(`/grocerylists/${id}`).then((response) => {
		return response.data as GroceryList;
	});
}
