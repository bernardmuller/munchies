import axios from "axios";
import { requireBaseURL, requireHeaders } from "../shared/utils";

export async function createMenu() {
	return await axios({
		method: "POST",
		url: `${requireBaseURL()}/menus`,
		headers: await requireHeaders(),
	}).then((response) => {
		console.log("createMenu", response.data);
		return response.data;
	});
}

export async function fetchMenus() {
	return await axios({
		method: "GET",
		url: `${requireBaseURL()}/menus`,
		headers: await requireHeaders(),
	}).then((response) => response.data);
}

export async function fetchMenu(id: string) {
	return await axios({
		method: "GET",
		url: `${requireBaseURL()}/menus/${id}`,
		headers: await requireHeaders(),
	}).then((response) => response.data);
}

export async function updateMenu({ id, data }: { id: string; data: any }) {
	return await axios({
		method: "PUT",
		url: `${requireBaseURL()}/menus/${id}`,
		headers: await requireHeaders(),
		data: data,
	}).then((response) => response.data);
}

export async function addMealToMenu({
	meal,
	menuId,
}: {
	meal: any;
	menuId: string;
}) {
	return await axios({
		method: "POST",
		url: `${requireBaseURL()}/menus/${menuId}/meals/add`,
		headers: await requireHeaders(),
		data: { mealId: meal.id },
	}).then((response) => {
		console.log("addMealToMenu", JSON.stringify(response, null, 2));
		return response.data;
	});
}

export async function removeMealFromMenu({
	mealId,
	menuId,
}: {
	mealId: string;
	menuId: string;
}) {
	return await axios({
		method: "POST",
		url: `${requireBaseURL()}/menus/${menuId}/meals/remove`,
		headers: await requireHeaders(),
		data: { mealId: mealId },
	}).then((response) => {
		console.log("removeMealFromMenu", response);
		return response.data;
	});
}
