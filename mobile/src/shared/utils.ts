import AsyncStorage from "@react-native-async-storage/async-storage";

export const requireBaseURL = () => {
	return process.env.ENV_NODE !== "production"
		? "http://192.168.8.176:5000/api"
		: process.env.MUNCHIES_API_URL;
};

export const requireAuthHeader = async () => {
	const token = await AsyncStorage.getItem("token");
	if (token) {
		return "Bearer " + token;
	}
};

export const requireHeaders = async () => {
	return {
		"Accept-Version": 1,
		Accept: "application/json",
		"Access-Control-Allow-Origin": "*",
		"Content-Type": "application/json; charset=utf-8",
		Authorization: await requireAuthHeader(),
	};
};
