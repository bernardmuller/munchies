import httpClient from "../httpClient";

export async function checkItem(id: string) {
	return await httpClient
		.post(`/items/${id}/check`)
		.then((response) => response.data);
}

export async function unCheckItem(id: string) {
	return await httpClient
		.post(`/items/${id}/unCheck`)
		.then((response) => response.data);
}

export async function createItem(newItemData: {
	grocerylistId: string;
	description: string;
}) {
	return await httpClient
		.post(`/items`, newItemData)
		.then((response) => response.data);
}
