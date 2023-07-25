export const requireBaseURL = () => {
	return process.env.ENV_NODE !== "production"
		? "http://localhost:5000/api"
		: process.env.MUNCHIES_API_URL;
};

export const requireAuthHeader = async () => {};

export const requireHeaders = async () => {
	return {
		"Accept-Version": 1,
		Accept: "application/json",
		"Access-Control-Allow-Origin": "*",
		"Content-Type": "application/json; charset=utf-8",
		Authorization: await requireAuthHeader(),
	};
};
