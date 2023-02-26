import * as React from "react";
import { NativeBaseProvider } from "native-base";
import { AuthContext, AuthProvider } from "./src/contexts/AuthContext";
import AppNavigation from "./src/navigation";

export default function App() {
	return (
		<NativeBaseProvider>
			<AuthProvider>
				<AppNavigation />
			</AuthProvider>
		</NativeBaseProvider>
	);
}
