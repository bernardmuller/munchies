import axios from "axios";
import { requireBaseURL, requireHeaders } from "../shared/utils";

export async function checkItem(id: string) {
	return await axios({
		method: "POST",
		url: `${requireBaseURL()}/items/${id}/check`,
		headers: await requireHeaders(),
	}).then((response) => response.data);
}

export async function unCheckItem(id: string) {
	return await axios({
		method: "POST",
		url: `${requireBaseURL()}/items/${id}/unCheck`,
		headers: await requireHeaders(),
	}).then((response) => response.data);
}
