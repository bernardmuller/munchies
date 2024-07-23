import type { AxiosError, AxiosResponse } from "axios";
import axios from "axios";
import { requireHeaders } from "@/shared/utils";

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

export type APIResponse<T> = {
	ok: boolean;
	status: number;
	data?: T;
	error?: AxiosError;
	message?: string;
};

const instance = axios.create();

instance.interceptors.response.use(
	async (response) => {
		return response;
	},
	async (error) => {
		return Promise.reject(error);
	}
);

export const httpRequest = async <T, D>(
	url: string,
	method: HTTPMethod = "GET",
	data?: D,
	options?: {
		headers?: Record<string, string>;
		accessToken: string;
	}
): Promise<APIResponse<T>> => {
	try {
		const customHeaders = await requireHeaders();
		const response: AxiosResponse<T> = await instance({
			method,
			url,
			headers: customHeaders,
			data,
		});

		return {
			ok: true,
			status: response.status,
			data: response.data,
		};
	} catch (error) {
		return {
			ok: false,
			status: (error as AxiosError).response?.status ?? 500,
			error: error as AxiosError,
			message: (error as AxiosError).message,
		};
	}
};
