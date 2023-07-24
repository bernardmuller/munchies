import axios from "axios";
import { requireBaseURL } from "@/shared/utils";

const processAxiosErrorResponse = (res: any) => {
	return {
		ok: res.status < 300,
		status: res?.status,
		message: res?.data?.error?.message || "No response.",
	};
};

export async function login(loginInputs: { email: string; password: string }) {
	try {
		const response = await axios.post(`${requireBaseURL()}/auth/login`, {
			email: loginInputs.email.toLowerCase(),
			password: loginInputs.password,
		});
		if (response.data.token) {
			return response?.data;
		}
	} catch (err: any) {
		// return processAxiosErrorResponse(err.response);
		console.log(err);
	}
}

export async function authenticate(inputs: { token: string }) {
	try {
		const response = await axios.post(
			`${requireBaseURL()}/auth/authenticate`,
			inputs
		);
		return response.data;
	} catch (err: any) {
		return processAxiosErrorResponse(err.response);
	}
}
