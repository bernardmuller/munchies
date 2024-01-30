import "@/styles/globals.css";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<div className="w-screen">{children}</div>
			</body>
		</html>
	);
}
