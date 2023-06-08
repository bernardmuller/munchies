import axios from "axios";
import { requireBaseURL, requireHeaders } from "../shared/utils";

export async function checkItem(id: string) {
	console.log("checkItem", id);
	return await axios({
		method: "POST",
		url: `${requireBaseURL()}/items/${id}/check`,
		headers: await requireHeaders(),
	})
		.then((response) => response.data)
		.catch((error) => {
			console.log(error);
		});
}

export async function unCheckItem(id: string) {
	return await axios({
		method: "POST",
		url: `${requireBaseURL()}/items/${id}/unCheck`,
		headers: await requireHeaders(),
	}).then((response) => response.data);
}
