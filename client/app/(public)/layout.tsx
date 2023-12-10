"use client";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/shared/providers/themeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body data-theme="munchies" className="bg-white">
				<QueryClientProvider client={new QueryClient()}>
					<ReactQueryDevtools initialIsOpen={false} />
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
					>
						<div className="w-screen bg-white">{children}</div>
						<Toaster />
					</ThemeProvider>
				</QueryClientProvider>
			</body>
		</html>
	);
}
