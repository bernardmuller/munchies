import axios from "axios";
import { requireBaseURL, requireHeaders } from "../shared/utils";

export async function createIngredient(newIngredientData: { name: string }) {
	return await axios({
		method: "POST",
		url: `${requireBaseURL()}/ingredients`,
		headers: await requireHeaders(),
		data: newIngredientData,
	}).then((response) => response.data);
}

export async function fetchIngredients({
	page,
	searchTerm,
}: {
	page?: string;
	searchTerm?: string;
}) {
	return await axios({
		method: "GET",
		url: `${requireBaseURL()}/ingredients?&searchTerm=${
			searchTerm || ""
		}&limit=10`,
		headers: await requireHeaders(),
	}).then((response) => response.data);
}

export async function fetchIngredient(id: string) {
	return await axios({
		method: "GET",
		url: `${requireBaseURL()}/meals/${id}`,
		headers: await requireHeaders(),
	}).then((response) => response.data);
}

export async function updateIngredient({
	id,
	data,
}: {
	id: string;
	data: any;
}) {
	return await axios({
		method: "PUT",
		url: `${requireBaseURL()}/meals/${id}`,
		headers: await requireHeaders(),
		data: data,
	}).then((response) => response.data);
}
