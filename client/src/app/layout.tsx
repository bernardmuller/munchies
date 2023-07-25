"use client";

import "./globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body data-theme="munchies">
				<QueryClientProvider client={new QueryClient()}>
					{children}
				</QueryClientProvider>
			</body>
		</html>
	);
}
