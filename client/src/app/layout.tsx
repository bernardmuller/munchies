import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Munchies",
	description: "The all-in-one grocery list manager.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
