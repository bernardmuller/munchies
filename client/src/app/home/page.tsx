"use client";

import { useCurrentMenuData } from "@/hooks/menusHooks";
import MealList from "./MealList";
import GroceryList from "./GroceryList";
import { MealPlan } from "@/types";
import { useGrocerylistData } from "@/hooks/grocerylistHooks";

export default function Home() {
	const { data: menu } = useCurrentMenuData();
	const { data: grocerylist } = useGrocerylistData(
		menu?.grocerylistId as string
	);

	console.log({ menu });

	if (!menu) return <div>Loading...</div>;
	return (
		<>
			<div className="xs:flex-col xs:gap-8 lg:gap-0 lg:flex w-full min-h-[70vh]">
				<div className="w-full h-full flex-[0.6] pr-4">
					<MealList meals={menu?.meals} />
				</div>

				<div className="w-full h-full lg:flex-[0.4] lg:pl-4">
					<GroceryList items={grocerylist?.items} />
				</div>
			</div>
		</>
	);
}
