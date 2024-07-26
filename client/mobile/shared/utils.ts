import AsyncStorage from "@react-native-async-storage/async-storage";

export const requireBaseURL = () => {
	return process.env.ENV_NODE !== "production"
		? "http://192.168.8.160:5000/api"
		: process.env.EXPO_PUBLIC_MUNCHIES_API_URL;
};

export const requireAuthHeader = async () => {
	const token = await AsyncStorage.getItem("token");
	return "Bearer " + token;
};

export const requireHeaders = async () => {
	const token = await AsyncStorage.getItem("token");
	return {
		ContentType: "Application/json",
		Authorization: "Bearer " + token,
	};
};

export const requirePublicHeaders = async () => {
	return {
		ContentType: "Application/json",
	};
};
