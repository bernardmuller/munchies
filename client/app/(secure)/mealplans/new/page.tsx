"use client";

import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import AddMealList from "./AddMealList";
import { useMealsData } from "@/hooks/mealsHooks";
import Ingredients from "./Ingredients";
import { Meal, Ingredient } from "@/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCreateMealplan } from "@/hooks/menusHooks";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import IngredientSelect from "../../meals/new/IngredientSelect";
import { set } from "zod";

type AMeal = Meal & {
	ingredients: AIngredient[];
};

type AIngredient = Ingredient & {
	ingredient: {
		id: string;
		name: string;
		categoryId: number;
		createdAt: string;
		createdBy: string;
		mealId: string;
	};
};

function NewMealplan() {
	const [selectedMeals, setSelectedMeals] = useState<Meal[]>([]);
	const [error, setError] = useState<string>("");
	const meals = useMealsData();
	const createMealplan = useCreateMealplan();
	const router = useRouter();
	const [extraIngredients, setExtraIngredients] = useState<Ingredient[]>([]);

	const handleAddMeal = (meal: Meal) => {
		setError("");
		setSelectedMeals([...selectedMeals, meal]);
	};

	const handleRemoveMeal = (meal: Meal) => {
		setError("");
		setSelectedMeals(selectedMeals.filter((m) => m.id !== meal.id));
	};

	const ingredientsList = useMemo(() => {
		return selectedMeals.reduce((acc: Meal[], meal: Meal): Meal[] => {
			return [...acc, ...meal.ingredients.map((i: any) => i.ingredient)];
		}, []);
	}, [selectedMeals]);

	if (!meals.data)
		return (
			<div className="w-full flex flex-row gap-6 justify-evenly min-h-[50vh]">
				<Skeleton className="flex-[0.3] w-full h-28 rounded-md" />
				<Skeleton className="flex-[0.3] w-full h-28 rounded-md" />
				<Skeleton className="flex-[0.4] w-full h-[40vh] rounded-md" />
			</div>
		);

	const onSubmit = async () => {
		if (selectedMeals.length === 0) {
			setError("You need to select at least one meal");
			return;
		}
		createMealplan.mutate({
			meals: selectedMeals,
			extraItems: extraIngredients.map((i) => {
				return { id: i.id };
			}),
		});
	};

	return (
		<div>
			<div className="flex flex-col lg:flex-row gap-8  w-full min-h-[50vh]">
				<div className="w-full h-full  lg:w-2/3">
					<AddMealList
						meals={meals?.data}
						onAddMeal={handleAddMeal}
						onRemoveMeal={handleRemoveMeal}
						selectedMeals={selectedMeals}
					/>
				</div>
				<div className="flex md:flex-col">
					<div className="w-full h-full  lg:pl-4 lg:pt-0 lg:pb-0">
						<Ingredients ingredients={ingredientsList} />
					</div>
					<div className="w-full h-full flex flex-col gap-1 lg:pl-4 sm:pt-7 lg:pt-0 pb-10 lg:pb-0">
						<div className="w-full">
							<h3 className="text-2xl mb-4 font-semibold">
								Extra Items
							</h3>
							<div className="flex gap-1 pb-4 w-full">
								<IngredientSelect
									onIngredientSelect={(val) => {
										setExtraIngredients((prev) => [
											...prev,
											val,
										]);
									}}
								/>
								<Button
									variant="secondary"
									onClick={() => {
										setExtraIngredients([]);
									}}
								>
									Clear
								</Button>
							</div>
						</div>
						<Ingredients
							heading={false}
							ingredients={extraIngredients}
						/>
					</div>
				</div>
			</div>
			<div className="w-full flex justify-end">
				<div className="flex flex-col gap-2">
					{error && (
						<span className="text-red-400 text-sm">{error}</span>
					)}
					<div className="w-full flex justify-end gap-4">
						<Button
							type="button"
							variant="secondary"
							onClick={() => router.back()}
						>
							Cancel
						</Button>
						<Button
							disabled={createMealplan.isLoading}
							onClick={() => {
								onSubmit();
							}}
						>
							{createMealplan.isLoading && (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							)}
							Create Mealplan
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default NewMealplan;
