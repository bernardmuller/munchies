import "@/styles/globals.css";

export default function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div className="w-screen">{children}</div>;
}
