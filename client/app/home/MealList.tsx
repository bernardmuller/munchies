"use client";

import { Meal } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
	meals: Meal[];
};

export default function MealList({ meals }: Props) {
	const router = useRouter();
	return (
		<>
			<h2 className="text-2xl mb-4 font-semibold">Current Mealplan</h2>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				{meals?.map((meal: Meal) => (
					<div
						className="flex items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
						onClick={() => {
							router.push(`/meals/${meal.id}`);
						}}
					>
						<div className="relative w-28 h-28 overflow-hidden">
							<Image
								className="object-cover w-28 rounded-t-lg h-28 md:h-auto md:w-28 md:rounded-none md:rounded-l-lg"
								src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=781&q=80"
								alt=""
								// width={100}
								// height={100}
								fill
							/>
						</div>
						<div className="flex flex-col justify-between p-4 leading-normal">
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
