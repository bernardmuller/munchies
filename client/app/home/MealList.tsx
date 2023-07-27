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
		<>
			<h2 className="text-2xl mb-4 font-semibold">Meals</h2>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				{meals?.map((meal: Meal) => (
					<a
						href="#"
						className="flex items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
					>
						<Image
							className="object-cover w-28 rounded-t-lg h-28 md:h-auto md:w-28 md:rounded-none md:rounded-l-lg"
							src="/docs/images/blog/image-4.jpg"
							alt=""
							width={100}
							height={100}
						/>
						<div className="flex flex-col justify-between p-4 leading-normal">
							<h5 className="mb-2 text-lg font-normal tracking-tight text-gray-900 dark:text-white">
								{meal.name}
							</h5>
							<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
								{meal.ingredients.length} ingredients
							</p>
						</div>
					</a>
				))}
			</div>
		</>
	);
}
