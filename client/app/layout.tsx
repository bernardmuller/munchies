"use client";

import { ThemeProvider } from "@/shared/providers/themeProvider";
import Header from "./Header";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useAllIngredientsData } from "@/hooks/ingredientsHooks";
import { useMealsData } from "@/hooks/mealsHooks";
import { useCurrentMenuData } from "@/hooks/menusHooks";

const App = ({ children }: any) => {
	const ingredients = useAllIngredientsData();
	const meals = useMealsData();
	const currentMenu = useCurrentMenuData();

	const loading =
		ingredients.isLoading || meals.isLoading || currentMenu.isLoading;
	return (
		<div className="min-h-full">
			<Header />

			<main className="-mt-32">
				<div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
					<div className="bg-white rounded-lg shadow dark:shadow-none px-5 py-6 sm:px-6 dark:bg-background">
						{loading ? (
							<div className="min-h-96">loading...</div>
						) : (
							<>{children}</>
						)}
					</div>
				</div>
			</main>
		</div>
	);
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body data-theme="munchies">
				<QueryClientProvider client={new QueryClient()}>
					<ReactQueryDevtools initialIsOpen={false} />
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
					>
						<App>{children}</App>
					</ThemeProvider>
				</QueryClientProvider>
			</body>
		</html>
	);
}
