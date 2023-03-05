import * as React from "react";
import { NativeBaseProvider } from "native-base";
import { AuthContext, AuthProvider } from "./src/contexts/AuthContext";
import AppNavigation from "./src/navigation";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<NativeBaseProvider>
				<AuthProvider>
					<AppNavigation />
				</AuthProvider>
			</NativeBaseProvider>
		</QueryClientProvider>
	);
}
