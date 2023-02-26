import { createContext, ReactNode, useEffect, useState } from "react";

export const AuthContext = createContext({
	authToken: "",
	saveToken: (value: any) => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [authToken, setAuthToken] = useState("");

	const saveToken = (value: any) => {
		setAuthToken(value);
	};

	useEffect(() => {
		console.log("provider => ", authToken);
	}, [authToken]);

	return (
		<AuthContext.Provider value={{ authToken, saveToken }}>
			{children}
		</AuthContext.Provider>
	);
};
