"use client";

import { ThemeProvider } from "@/shared/providers/themeProvider";
import Header from "./Header";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";

const App = ({ children }: any) => {
	const pathname = usePathname();

	if (pathname === "/login" || pathname === "/signup")
		return (
			<main className="flex items-center justify-center">{children}</main>
		);

	return (
		<div className="min-h-full">
			<Header />

			<main className="-mt-32">
				<div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
					<div className="bg-white rounded-lg shadow dark:shadow-none px-5 py-6 sm:px-6 dark:bg-background">
						{children}
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
						<Toaster />
					</ThemeProvider>
				</QueryClientProvider>
			</body>
		</html>
	);
}
