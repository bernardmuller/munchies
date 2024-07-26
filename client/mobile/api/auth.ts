import axios from "axios";
import { requireBaseURL, requireHeaders } from "../shared/utils";

const processAxiosErrorResponse = (res: any) => {
	return {
		ok: res.status < 300,
		status: res?.status,
		message: res?.data?.error?.message || "No response.",
	};
};

export async function login(loginInputs: { email: string; password: string }) {
	try {
		console.log("LOGIN INPUTS => ", loginInputs);
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

type RegisterUserInputs = {
	userId: string;
};

export async function registerUser({ userId }: RegisterUserInputs) {
	return await axios({
		method: "POST",
		// TODO: Change this to the correct URL
		url: `http://192.168.8.160:8001/users/register`,
		headers: await requireHeaders(),
		data: {
			userId,
		},
	}).then((response) => response.data);
}
