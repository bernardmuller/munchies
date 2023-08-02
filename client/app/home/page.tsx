"use client";

import { useCurrentMenuData } from "@/hooks/menusHooks";
import MealList from "./MealList";
import GroceryList from "./GroceryList";
import { useGrocerylistData } from "@/hooks/grocerylistHooks";
import { Skeleton } from "@/components/ui/skeleton";
import { useMealsData } from "@/hooks/mealsHooks";
import { useAllIngredientsData } from "@/hooks/ingredientsHooks";

const LoadData = ({ children }: any) => {
	const ingredients = useAllIngredientsData();
	const meals = useMealsData();
	const currentMenu = useCurrentMenuData();

	const loading =
		ingredients.isLoading || meals.isLoading || currentMenu.isLoading;
	return (
		<>
			<>{children}</>
		</>
	);
};

export default function Home() {
	const { data: menu } = useCurrentMenuData();
	const { data: grocerylist } = useGrocerylistData(
		menu?.grocerylistId as string
	);

	if (!menu)
		return (
			<div className="w-full flex flex-row gap-6 justify-evenly min-h-[50vh]">
				<Skeleton className="flex-[0.3] w-full h-28 rounded-md" />
				<Skeleton className="flex-[0.3] w-full h-28 rounded-md" />
				<Skeleton className="flex-[0.4] w-full h-[40vh] rounded-md" />
			</div>
		);

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
