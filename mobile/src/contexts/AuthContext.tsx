import { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
	authToken: "",
	saveToken: (value: any) => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [authToken, setAuthToken] = useState("");

	const saveToken = async (value: any) => {
		setAuthToken(value);
		await AsyncStorage.setItem("token", value);
	};

	const isLoggedIn = async () => {
		try {
			let userToken = await AsyncStorage.getItem("token");
			if (userToken) {
				setAuthToken(userToken);
			}
		} catch (e) {
			console.log("isLoggedIn error", e);
		}
	};

	useEffect(() => {
		isLoggedIn();
	}, []);

	console.log("context token: ", authToken);

	return (
		<AuthContext.Provider value={{ authToken, saveToken }}>
			{children}
		</AuthContext.Provider>
	);
};
