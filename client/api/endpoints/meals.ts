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
//
// export async function fetchMeal(id: string) {
// 	return await axios({
// 		method: "GET",
// 		url: `${requireBaseURL()}/meals/${id}`,
// 		headers: await requireHeaders(),
// 	}).then((response) => response.data);
// }
//
// export async function updateMeal({ id, data }: { id: string; data: any }) {
// 	return await axios({
// 		method: "PUT",
// 		url: `${requireBaseURL()}/meals/${id}`,
// 		headers: await requireHeaders(),
// 		data: data,
// 	}).then((response) => response.data);
// }
//
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
