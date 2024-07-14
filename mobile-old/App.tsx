import { AuthProvider } from "./src/contexts/AuthContext";
import AppNavigation from "./src/navigation";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();
export default function App() {
	return (
		<RecoilRoot>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<AppNavigation />
				</AuthProvider>
			</QueryClientProvider>
		</RecoilRoot>
	);
}
