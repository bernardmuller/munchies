"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIngredientsData } from "@/hooks/ingredientsHooks";
import { Skeleton } from "@/components/ui/skeleton";
import DebouncedInput from "./DebouncedInput";
import IngredientSelect from "./IngredientSelect";
import { useState } from "react";
import NewIngredients from "@/app/mealplans/new/Ingredients";
import { Ingredient } from "@/types";

const formSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	cookTime: z.string(),
	prepTime: z.string(),
	readyIn: z.string(),
});

export default function NewMeal() {
	const ingredients = useIngredientsData();
	const [selectedIngredients, setSelectedIngredients] = useState<
		Ingredient[]
	>([]);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	if (!ingredients.data)
		return (
			<div className="w-full flex flex-row gap-6 justify-evenly min-h-[50vh]">
				<Skeleton className="flex-[0.3] w-full h-28 rounded-md" />
				<Skeleton className="flex-[0.3] w-full h-28 rounded-md" />
				<Skeleton className="flex-[0.4] w-full h-[40vh] rounded-md" />
			</div>
		);

	console.log({ ingredients });
	return (
		<Form {...form}>
			<div className="flex flex-col lg:flex-row gap-8  w-full min-h-[50vh]">
				<div className="w-full h-full xl:flex-[0.6] ">
					<div>
						<h2 className="text-2xl mb-4 font-semibold">
							New Meal
						</h2>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-4"
						>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Name
											<span className="text-red-400">
												*
											</span>
										</FormLabel>
										<FormControl>
											<Input
												placeholder="eg. Hot dogs"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="flex flex-row justify-between gap-4">
								<FormField
									control={form.control}
									name="prepTime"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Prep Time
												<span className="text-red-400">
													*
												</span>
											</FormLabel>
											<FormControl>
												<div className="flex gap-1 items-center">
													<Input
														type="number"
														placeholder="60"
														step="5"
														{...field}
													/>
													min
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="cookTime"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Cook Time
												<span className="text-red-400">
													*
												</span>
											</FormLabel>
											<FormControl>
												<div className="flex gap-1 items-center">
													<Input
														type="number"
														placeholder="60"
														step="5"
														{...field}
													/>
													min
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="readyIn"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Ready Ink
												<span className="text-red-400">
													*
												</span>
											</FormLabel>
											<FormControl>
												<div className="flex gap-1 items-center">
													<Input
														type="number"
														placeholder="60"
														step="5"
														{...field}
													/>
													min
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</form>
					</div>
				</div>

				<div className="w-full h-full lg:flex-[0.4] lg:pl-4 sm:pt-7 lg:pt-0">
					<Tabs defaultValue="ingredients" className="w-full">
						<TabsList className="w-full">
							<TabsTrigger value="ingredients" className="w-full">
								Ingredients
							</TabsTrigger>
							<TabsTrigger
								value="instructions"
								className="w-full"
							>
								Instructions
							</TabsTrigger>
						</TabsList>
						<TabsContent value="ingredients">
							<div className="flex flex-col gap-1">
								<h3 className="text-xl font-semibold">
									Ingredients
								</h3>
								<IngredientSelect
									heading={false}
									onIngredientSelect={(val) => {
										setSelectedIngredients((prev) => [
											...prev,
											val,
										]);
									}}
								/>
								<NewIngredients
									ingredients={selectedIngredients}
								/>
							</div>
						</TabsContent>
						<TabsContent value="instructions">
							Change your password here.
						</TabsContent>
					</Tabs>
				</div>
			</div>
			<div className="w-full flex gap-2 justify-end">
				<Button variant="secondary" type="submit">
					Cancel
				</Button>
				<Button type="submit">Submit</Button>
			</div>
		</Form>
	);
}
