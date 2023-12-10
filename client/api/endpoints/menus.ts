import httpClient from "../httpClient";
import apiRoutes from "../routes";
import { MealPlan } from "@/types";
import { z } from "zod";

const mealDTO = z.object({
	id: z.string(),
});

const ingredientDTO = z.object({
	id: z.string(),
});

const createMenuDTO = z.object({
	meals: z.array(mealDTO),
	extraItems: z.array(ingredientDTO),
});

type CreateMenuDTO = z.infer<typeof createMenuDTO>;

export async function createMenu(data: CreateMenuDTO) {
	const reqData = createMenuDTO.parse(data);

	return await httpClient.post(`/menus`, reqData).then((response) => {
		return response.data;
	});
}

// export async function fetchMenus() {
// 	return await axios({
// 		method: "GET",
// 		url: `${requireBaseURL()}/menus`,
// 		headers: await requireHeaders(),
// 	}).then((response) => response.data);
// }
//
// export async function fetchMenu(id: string) {
// 	return await axios({
// 		method: "GET",
// 		url: `${requireBaseURL()}/menus/${id}`,
// 		headers: await requireHeaders(),
// 	}).then((response) => response.data);
// }
//
// export async function updateMenu({ id, data }: { id: string; data: any }) {
// 	return await axios({
// 		method: "PUT",
// 		url: `${requireBaseURL()}/menus/${id}`,
// 		headers: await requireHeaders(),
// 		data: data,
// 	}).then((response) => response.data);
// }
//
// export async function addMealToMenu({
// 	meal,
// 	menuId,
// }: {
// 	meal: any;
// 	menuId: string;
// }) {
// 	return await axios({
// 		method: "POST",
// 		url: `${requireBaseURL()}/menus/${menuId}/meals/add`,
// 		headers: await requireHeaders(),
// 		data: { mealId: meal.id },
// 	}).then((response) => {
// 		return response.data;
// 	});
// }
//
// export async function removeMealFromMenu({
// 	mealId,
// 	menuId,
// }: {
// 	mealId: string;
// 	menuId: string;
// }) {
// 	return await axios({
// 		method: "POST",
// 		url: `${requireBaseURL()}/menus/${menuId}/meals/remove`,
// 		headers: await requireHeaders(),
// 		data: { mealId: mealId },
// 	}).then((response) => {
// 		return response.data;
// 	});
// }
//
export async function fetchCurrentMenu() {
	return await httpClient.get(apiRoutes.getCurrentMenu).then((res) => {
		return res.data;
	});
}
