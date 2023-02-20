import AsyncStorage from "@react-native-async-storage/async-storage";

export const requireBaseURL = () => {
	return process.env.ENV_NODE !== "production"
		? "http://192.168.8.176:5000/api"
		: process.env.MUNCHIES_API_URL;
};

export const requireAuthHeader = () => {
	const token = AsyncStorage.getItem("token");
	return "Bearer " + token;
};

export const requireHeaders = () => {
	return {
		ContentType: "Application/json",
		Authorization: requireAuthHeader(),
	};
};
