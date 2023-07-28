"use client";

// import clearSession from "@/shared/utils/clearSession";
// import getCurrentSession from "@/shared/utils/getCurrentSession";
// import getIdToken from "@/shared/utils/getIdToken";
// import sessionIsValid from "@/shared/utils/sessionIsValid";
import axios, { AxiosError, CreateAxiosDefaults } from "axios";
// import { refreshSession } from "./client/auth";
// import createSession from "@/shared/utils/createSession";
// import apiRoutes from "./routes";
// import refreshTokenIsValid from "@/shared/utils/refreshTokenIsValid";

const getHeaders = () => {
	if (typeof window !== "undefined") {
		let headers: any = {};

		const session = JSON.parse(localStorage.getItem("session") || "{}");

		const authToken = session?.token;

		if (authToken) {
			headers.Authorization = `Bearer ${authToken}`;
			headers["Content-Type"] = "application/json";
		}

		return headers;
	}
};

const axiosConfig: CreateAxiosDefaults = {
	baseURL: "http://localhost:5000/api/",
	// process.env.ENV_NODE !== "development"
	// 	? process.env.NEXT_PUBLIC_API_URL
	// 	: "http://localhost:5000/api/",
	headers: getHeaders(),
};

const httpClient = axios.create(axiosConfig);

// httpClient.interceptors.request.use(
// 	async (req) => {
// 		return req;
// 	},
// 	(error) => {
// 		return Promise.reject(error);
// 	}
// );

// httpClient.interceptors.response.use(
// 	(response) => {
// 		return response;
// 	},
// 	(error: AxiosError) => {
// 		if (error.code === "ERR_NETWORK" || error.response?.status === 401) {
// 			return (window.location.href = "/login");
// 		}

// 		return Promise.reject(error);
// 	}
// );

export default httpClient;
