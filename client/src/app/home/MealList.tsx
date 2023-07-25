import { Meal } from "@/types";
import Image from "next/image";

/* This example requires Tailwind CSS v2.0+ */
const people = [
	{
		name: "Leslie Alexander",
		email: "lesliealexander@example.com",
		role: "Co-Founder / CEO",
		imageUrl:
			"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
	},
	{
		name: "Leslie Alexander",
		email: "lesliealexander@example.com",
		role: "Co-Founder / CEO",
		imageUrl:
			"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
	},
	{
		name: "Leslie Alexander",
		email: "lesliealexander@example.com",
		role: "Co-Founder / CEO",
		imageUrl:
			"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
	},
	// More people...
];

type Props = {
	meals: Meal[];
};

export default function MealList({ meals }: Props) {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
			{meals?.map((meal: Meal) => (
				<div
					key={meal.id}
					className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
				>
					<div className="flex-shrink-0">
						<Image
							className="h-10 w-10 rounded-full"
							src={meal.image || ""}
							alt=""
							width="40"
							height="40"
						/>
					</div>
					<div className="flex-1 min-w-0">
						<a href="#" className="focus:outline-none">
							<span
								className="absolute inset-0"
								aria-hidden="true"
							/>
							<p className="text-sm font-medium text-gray-900">
								{meal.name}
							</p>
							<p className="text-sm text-gray-500 truncate">
								{meal.ingredients.length}
							</p>
						</a>
					</div>
				</div>
			))}
		</div>
	);
}
