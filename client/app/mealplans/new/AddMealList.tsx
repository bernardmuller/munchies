"use client";

import { Button } from "@/components/ui/button";
import { Meal } from "@/types";
import Image from "next/image";

type Props = {
	meals: Meal[];
	onAddMeal: (meal: Meal) => void;
	onRemoveMeal: (meal: Meal) => void;
	selectedMeals: Meal[];
};

function AddMealList({ meals, onAddMeal, onRemoveMeal, selectedMeals }: Props) {
	const handleClick = (meal: Meal) => {
		if (selectedMeals?.find((m) => m.id === meal.id)) {
			onRemoveMeal(meal);
		} else {
			onAddMeal(meal);
		}
	};

	return (
		<>
			<h2 className="text-2xl mb-4 font-semibold">Add Meals</h2>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				{meals?.map((meal: Meal) => (
					<div className=" relative flex items-center bg-white border border-gray-200 rounded-lg  md:flex-row md:max-w-xl  dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
						<Button
							className="absolute shadow-lg top-1 right-1 h-8 w-8 rounded-full"
							onClick={() => handleClick(meal)}
							variant={
								selectedMeals?.find((m) => m.id === meal.id)
									? "destructive"
									: "default"
							}
						>
							{selectedMeals?.find((m) => m.id === meal.id)
								? "-"
								: "+"}
						</Button>
						<div className="w-24 h-24 relative overflow-hidden">
							<Image
								className="object-cover w-28  h-28 md:h-auto md:w-28 md:rounded-none md:rounded-l-lg"
								src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=780&q=80"
								alt=""
								// width={100}
								// height={100}
								fill
							/>
						</div>
						<div className="flex flex-col m-0 leading-normal px-2">
							<h5 className="mb-2 text-lg font-normal tracking-tight text-gray-900 dark:text-white">
								{meal.name}
							</h5>
							<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
								{meal.ingredients.length} ingredients
							</p>
						</div>
					</div>
				))}
			</div>
		</>
	);
}

export default AddMealList;
