import axios from "axios";
import httpClient from "../httpClient";
// import { requireBaseURL, requireHeaders } from "../shared/utils";

export async function createIngredient(newIngredientData: {
	name: string;
	categoryId: number;
}) {
	return await httpClient
		.post(`/ingredients`, newIngredientData)
		.then((response) => {
			return response.data;
		});
}

export async function fetchIngredients({
	page,
	searchTerm,
	limit,
}: {
	page?: string;
	searchTerm?: string;
	limit?: string;
}) {
	return await httpClient
		.get(
			`/ingredients?&searchTerm=${searchTerm || ""}&limit=${
				limit || 10
			}&page=${page || 0}}`
		)
		.then((response) => response.data);
}

// export async function fetchIngredient(id: string) {
// 	return await axios({
// 		method: "GET",
// 		url: `${requireBaseURL()}/ingredients/${id}`,
// 		headers: await requireHeaders(),
// 	}).then((response) => response.data);
// }
//
// export async function updateIngredient({
// 	id,
// 	data,
// }: {
// 	id: string;
// 	data: any;
// }) {
// 	return await axios({
// 		method: "PUT",
// 		url: `${requireBaseURL()}/ingredients/${id}`,
// 		headers: await requireHeaders(),
// 		data: data,
// 	}).then((response) => response.data);
// }
