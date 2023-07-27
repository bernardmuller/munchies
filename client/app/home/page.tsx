"use client";

import { useCurrentMenuData } from "@/hooks/menusHooks";
import MealList from "./MealList";
import GroceryList from "./GroceryList";
import { useGrocerylistData } from "@/hooks/grocerylistHooks";
import { Button } from "@/components/ui/button";

export default function Home() {
	const { data: menu } = useCurrentMenuData();
	const { data: grocerylist } = useGrocerylistData(
		menu?.grocerylistId as string
	);

	console.log({ menu });

	if (!menu) return <div>Loading...</div>;
	return (
		<div className="flex flex-col lg:flex-row gap-8  w-full min-h-[50vh]">
			<div className="w-full h-full xl:flex-[0.6] ">
				<MealList meals={menu?.meals} />
			</div>

			<div className="w-full h-full lg:flex-[0.4] lg:pl-4 sm:pt-7 lg:pt-0">
				<GroceryList items={grocerylist?.items!} />
			</div>
		</div>
	);
}
