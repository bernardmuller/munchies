import * as React from "react";
import { NativeBaseProvider } from "native-base";
import { AuthProvider } from "./src/contexts/AuthContext";
import AppNavigation from "./src/navigation";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();
export default function App() {
	return (
		<GestureHandlerRootView>
			<RecoilRoot>
				<QueryClientProvider client={queryClient}>
					<NativeBaseProvider>
						<AuthProvider>
							<AppNavigation />
						</AuthProvider>
					</NativeBaseProvider>
				</QueryClientProvider>
			</RecoilRoot>
		</GestureHandlerRootView>
	);
}
