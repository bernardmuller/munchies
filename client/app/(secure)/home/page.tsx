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
				<div className="w-full h-full  ">
					<MealList meals={menu?.meals} />
				</div>

				<div className="w-full h-full  lg:pl-4 sm:pt-7 lg:pt-0">
					<h3 className="text-xl font-semibold">Grocerylist</h3>
					<GroceryList
						heading=""
						items={
							grocerylist?.items?.filter(
								(i: any) => i.typeId === 1
							)!
						}
					/>
					{grocerylist?.items?.filter((i: any) => i.typeId === 2)
						.length! > 0 && (
						<h4 className="text-lg font-medium">Extra Items</h4>
					)}
					<GroceryList
						heading=""
						items={
							grocerylist?.items?.filter(
								(i: any) => i.typeId === 2
							)!
						}
					/>
				</div>
			</div>
		</>
	);
}
