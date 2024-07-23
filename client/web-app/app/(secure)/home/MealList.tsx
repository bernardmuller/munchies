"use client";

import { Button } from "@/components/ui/button";
import { Meal } from "@/types";
import { BeefIcon } from "lucide-react";
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
						key={meal.id}
						className={`flex relative items-center bg-white border cursor-pointer border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl ${
							!meal.deleted && "hover:bg-gray-100"
						} dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700`}
						onClick={() => {
							if (meal.deleted) return;
							router.push(`/meals/${meal.id}`);
						}}
					>
						{meal.deleted && (
							<span className="absolute top-2 right-2  text-xs text-slate-400 bg-slate-200 rounded-lg py-1 px-2">
								deleted
							</span>
						)}
						<div className="relative w-28 h-28 overflow-hidden">
							{meal.image ? (
								<Image
									className="object-cover w-28 bg-secondary rounded-t-lg h-28 md:h-auto md:w-28 md:rounded-none md:rounded-l-lg"
									src={meal.image || ""}
									alt=""
									// width={100}
									// height={100}
									fill
								/>
							) : (
								<div
									className={`flex w-full h-full rounded-l-lg ${
										meal.deleted
											? "bg-slate-300"
											: "bg-secondary"
									} justify-center items-center`}
								>
									<BeefIcon
										size={48}
										className="stroke-slate-400"
									/>
								</div>
							)}
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
				{!meals && (
					<div className="flex flex-col gap-2">
						<p className="text-slate-400 text-sm">
							No active meal plan found.
						</p>
						<Button
							type="button"
							onClick={() => router.push("/mealplans/new")}
							className="w-48"
						>
							Create Meal plan
						</Button>
					</div>
				)}
			</div>
		</>
	);
}
