"use client";

import Header from "./Header";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
					<div className="min-h-full">
						<Header />

						<main className="-mt-32">
							<div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
								<div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
									{children}
								</div>
							</div>
						</main>
					</div>
				</QueryClientProvider>
			</body>
		</html>
	);
}
