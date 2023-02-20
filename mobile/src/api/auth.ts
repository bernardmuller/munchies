import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { requireBaseURL } from "../shared/utils";

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
			await AsyncStorage.setItem("@token", response.data.token);
			return response.data;
		}
	} catch (err: any) {
		console.log(err);
		// return processAxiosErrorResponse(err.response);
	}
}

export async function authenticate(inputs: { token: string }) {
	try {
		const response = await axios.post(
			`${requireBaseURL()}/auth/authenticate`,
			inputs
		);
		if (response) {
			console.log("authenticate: ", response.data);
		}
		return response.data;
	} catch (err: any) {
		return processAxiosErrorResponse(err.response);
	}
}