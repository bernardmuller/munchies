import axios from "axios";
import httpClient from "../httpClient";

export async function createMeal(data: any) {
	return await httpClient
		.post(`/meals`, data)
		.then((response) => response.data);
}

export async function fetchMeals() {
	return await httpClient.get(`/meals`).then((response) => response.data);
}

export async function fetchMeal(id: string) {
	return await httpClient
		.get(`/meals/${id}`)
		.then((response) => response.data);
}

export async function updateMeal({ id, data }: { id: string; data: any }) {
	return await httpClient
		.put(`/meals/${id}`, data)
		.then((response) => response.data);
}

export async function deleteMeal(id: string) {
	return await httpClient
		.delete(`/meals/${id}`)
		.then((response) => response.data);
}

export async function UploadImage(formData: FormData) {
	try {
		const response = await fetch(
			"https://api.cloudinary.com/v1_1/munchiesapp/image/upload",
			{
				method: "POST",
				body: formData,
			}
		);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error uploading the image: ", error);
	}
}

// export async function addIngredientToMeal({
// 	mealId,
// 	ingredient,
// }: {
// 	mealId: string;
// 	ingredient: any;
// }) {
// 	return await axios({
// 		method: "POST",
// 		url: `${requireBaseURL()}/meals/${mealId}/ingredients/add`,
// 		headers: await requireHeaders(),
// 		data: { ingredientId: ingredient },
// 	}).then((response) => response.data);
// }
//
// export async function removeIngredientFromMeal({
// 	mealId,
// 	ingredientId,
// }: {
// 	mealId: string;
// 	ingredientId: string;
// }) {
// 	return await axios({
// 		method: "POST",
// 		url: `${requireBaseURL()}/meals/${mealId}/ingredients/remove`,
// 		headers: await requireHeaders(),
// 		data: { ingredientId: ingredientId },
// 	}).then((response) => response.data);
// }
//
// export async function addDirectionToMeal({
// 	mealId,
// 	newDirection,
// }: {
// 	mealId: string;
// 	newDirection: string;
// }) {
// 	return await axios({
// 		method: "PUT",
// 		url: `${requireBaseURL()}/meals/${mealId}/directions/add`,
// 		// headers: requireHeaders(),
// 		data: { direction: newDirection },
// 	}).then((response) => response.data);
// }
//
// export async function removeDirectionFromMeal({
// 	mealId,
// 	directionIndex,
// }: {
// 	mealId: string;
// 	directionIndex: number;
// }) {
// 	return await axios({
// 		method: "PUT",
// 		url: `${requireBaseURL()}/meals/${mealId}/directions/remove`,
// 		// headers: requireHeaders(),
// 		data: { directionIndex: directionIndex },
// 	}).then((response) => response.data);
// }
