"use client";

import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "./sidebar-nav";

// export const metadata: Metadata = {
// 	title: "Forms",
// 	description: "Advanced form example using react-hook-form and Zod.",
// };

const sidebarNavItems = [
	{
		title: "Profile",
		href: "/settings/profile",
	},
	{
		title: "Ingredients",
		href: "/settings/ingredients",
	},

	{
		title: "Preferences",
		href: "/settings/preferences",
	},
];

interface SettingsLayoutProps {
	children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
	return (
		<>
			<div className="md:hidden">
				<Image
					src="/examples/forms-light.png"
					width={1280}
					height={791}
					alt="Forms"
					className="block dark:hidden"
				/>
				<Image
					src="/examples/forms-dark.png"
					width={1280}
					height={791}
					alt="Forms"
					className="hidden dark:block"
				/>
			</div>
			<div className="hidden space-y-6 pb-16 md:block">
				<div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
					<aside className="-mx-4 lg:w-1/5">
						<SidebarNav items={sidebarNavItems} />
					</aside>
					<div className="flex-1 lg:max-w-2xl">{children}</div>
				</div>
			</div>
		</>
	);
}
