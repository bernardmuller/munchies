"use client";

import { useCurrentMenuData } from "@/hooks/menusHooks";
import MealList from "./MealList";
import GroceryList from "./GroceryList";
import { useGrocerylistData } from "@/hooks/grocerylistHooks";
import { Skeleton } from "@/components/ui/skeleton";
import { useMealsData } from "@/hooks/mealsHooks";
import { useAllIngredientsData } from "@/hooks/ingredientsHooks";
import Confetti from "@/components/custom/Confetti";
import { useEffect, useState } from "react";

export default function Home() {
	const { data: menu } = useCurrentMenuData();

	console.log({ menu });
	useAllIngredientsData();
	useMealsData();
	const { data: grocerylist } = useGrocerylistData(
		menu?.grocerylistId as string
	);
	const [showConfetti, setShowConfetti] = useState<boolean>(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			setShowConfetti(
				localStorage.getItem("confetti") === "true" ? true : false
			);
		}
		window.scrollTo(0, 0);
		setTimeout(() => {
			setShowConfetti(false);
		}, 5000);
	}, []);

	if (!menu)
		return (
			<div className="w-full flex flex-col lg:flex-row gap-6 justify-evenly min-h-[50vh]">
				<Skeleton className="flex-[0.3] w-full h-28 rounded-md" />
				<Skeleton className="flex-[0.3] w-full h-28 rounded-md" />
				<Skeleton className="flex-[0.4] w-full h-[40vh] rounded-md" />
			</div>
		);

	return (
		<>
			{showConfetti && <Confetti />}
			<div className="flex flex-col lg:flex-row gap-8  w-full min-h-[50vh]">
				<div className="w-full h-full xl:flex-[0.6] ">
					<MealList meals={menu?.meals} />
				</div>

				<div className="w-full h-full lg:flex-[0.4] lg:pl-4 sm:pt-7 lg:pt-0">
					<GroceryList items={grocerylist?.items!} />
				</div>
			</div>
		</>
	);
}
