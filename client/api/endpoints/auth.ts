"use client";

import axios from "axios";
import { requireBaseURL } from "@/shared/utils";
import httpClient from "../httpClient";
import createSession from "@/shared/utils/createSession";
import getApiRoute from "@/shared/utils/getApiRoute";
import { SignupDTO } from "@/types";

const processAxiosErrorResponse = (res: any) => {
	return {
		ok: res.status < 300,
		status: res?.status,
		message: res?.data?.error?.message || "No response.",
	};
};

export async function login(loginInputs: { email: string; password: string }) {
	return await httpClient
		.post(getApiRoute("login"), loginInputs)
		.then((res) => createSession(res.data));
}

export async function signup(signupInputs: SignupDTO) {
	return await httpClient
		.post("/auth/register", signupInputs)
		.then((res) => res.data);
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
