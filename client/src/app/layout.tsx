"use client";

import Header from "./Header";
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
					<div className="min-h-full">
						<Header />

						<main className="-mt-32">
							<div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
								{children}
							</div>
						</main>
					</div>
				</QueryClientProvider>
			</body>
		</html>
	);
}
