import { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
	authToken: "",
	saveToken: (value: any) => {},
	clearToken: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [authToken, setAuthToken] = useState("");

	const saveToken = async (value: any) => {
		setAuthToken(value);
		await AsyncStorage.setItem("token", value);
	};

	const clearToken = async () => {
		setAuthToken("");
		await AsyncStorage.removeItem("token");
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

	return (
		<AuthContext.Provider value={{ authToken, saveToken, clearToken }}>
			{children}
		</AuthContext.Provider>
	);
};
