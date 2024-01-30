"use client";

import { Button } from "@/components/ui/button";
import { Meal } from "@/types";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
	meals: Meal[];
	onAddMeal: (meal: Meal) => void;
	onRemoveMeal: (meal: Meal) => void;
	selectedMeals: Meal[];
};

function AddMealList({ meals, onAddMeal, onRemoveMeal, selectedMeals }: Props) {
	const router = useRouter();
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
					<div
						key={meal.id}
						className="z-10 relative flex items-center bg-white border border-gray-200 rounded-lg  md:flex-row md:max-w-xl  dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
					>
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
							{meal.image ? (
								<>
									<Image
										className="object-cover w-28 bg-secondary  h-28 md:h-auto md:w-28 md:rounded-none md:rounded-l-lg"
										src={meal.image}
										alt=""
										// width={100}
										// height={100}
										fill
									/>
								</>
							) : (
								<div className="w-full h-full bg-secondary rounded-l-lg"></div>
							)}
						</div>
						<div className="flex flex-col m-0 leading-normal px-2">
							<h5
								onClick={() => {
									router.push(`/meals/${meal.id}`);
								}}
								className="cursor-pointer hover:underline mb-2 text-lg font-normal tracking-tight text-gray-900 dark:text-white"
							>
								{meal.name}
							</h5>
							<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
								{meal.ingredients.length} ingredients
							</p>
						</div>
					</div>
				))}
				{meals.length === 0 && (
					<div className="flex flex-col gap-2">
						<p className="text-sm text-slate-400">No meals found</p>
						<Button
							className="w-48"
							onClick={() => {
								router.push(`/meals/new`);
							}}
						>
							Create a meal
						</Button>
					</div>
				)}
			</div>
		</>
	);
}

export default AddMealList;
