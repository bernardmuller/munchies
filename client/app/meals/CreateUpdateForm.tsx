"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIngredientsData } from "@/hooks/ingredientsHooks";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import NewIngredients from "@/app/mealplans/new/Ingredients";
import { Ingredient, Meal } from "@/types";
import Instructions from "@/app/mealplans/new/Instructions";
import { useRouter } from "next/navigation";
import IngredientSelect from "./new/IngredientSelect";
import { Loader2 } from "lucide-react";

type CreateUpdateProps = {
	data?: Meal;
	formType: "create" | "update";
	validationSchema: z.ZodType<any, any>;
	onSubmitForm: (values: any) => void;
	isLoading: boolean;
};

function CreateUpdateForm({
	data,
	formType,
	validationSchema,
	onSubmitForm,
	isLoading,
}: CreateUpdateProps) {
	const ingredients = useIngredientsData();
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();
	const [selectedIngredients, setSelectedIngredients] = useState<
		Ingredient[]
	>(data?.ingredients || []);
	const [newInstructions, setNewInstructions] = useState<string[]>(
		data?.directions || []
	);
	const {
		register,
		formState: { errors },
		handleSubmit,
		setValue,
		clearErrors,
	} = useForm<z.infer<typeof validationSchema>>({
		resolver: zodResolver(validationSchema),
		defaultValues: {
			name: data?.name,
		},
	});

	const handleAddInstruction = (instruction: string) => {
		setError(null);
		setNewInstructions([...newInstructions, instruction]);
	};

	function onSubmit(values: z.infer<typeof validationSchema>) {
		const newMealDTO = {
			name: values.name,
			cookTime: parseInt(values.cookTime),
			prepTime: parseInt(values.prepTime),
			readyIn: parseInt(values.readyIn),
			ingredients: selectedIngredients,
			instructions: newInstructions,
		};

		if (selectedIngredients.length === 0) {
			setError("You must add at least one ingredient.");
			return;
		}

		onSubmitForm(newMealDTO);
	}

	useEffect(() => {
		if (formType === "update" && data) {
			setValue("name", data.name);
			setValue("cookTime", data.cookTime);
			setValue("prepTime", data.prepTime);
			setValue("readyIn", data.readyIn);
			setSelectedIngredients(data.ingredients);
			setNewInstructions(data.directions);
		}
	}, [data]);

	if (!ingredients.data || (formType === "update" && !data))
		return (
			<div className="w-full flex flex-row gap-6 justify-evenly min-h-[50vh]">
				<Skeleton className="flex-[0.3] w-full h-28 rounded-md" />
				<Skeleton className="flex-[0.3] w-full h-28 rounded-md" />
				<Skeleton className="flex-[0.4] w-full h-[40vh] rounded-md" />
			</div>
		);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="flex flex-col lg:flex-row gap-8  w-full min-h-[50vh]">
				<div className="w-full h-full xl:flex-[0.6] ">
					<div className="flex flex-col gap-2">
						<div>
							<label className="text-sm">
								Name
								<span className="text-red-400">*</span>
							</label>
							<Input
								placeholder="eg. Hot dogs"
								defaultValue={data?.name}
								{...register("name")}
							/>

							<p className="text-red-500 text-sm py-1">
								{errors.name?.message as string}
							</p>
						</div>
						<div className="flex flex-row justify-between gap-4">
							<div className="flex flex-col gap-1">
								<label className="text-sm">
									Prep Time
									<span className="text-red-400">*</span>
								</label>
								<div className="flex gap-1 items-center">
									<Input
										type="number"
										placeholder="60"
										{...register("prepTime")}
										defaultValue={data?.prepTime as string}
										onChange={(e) => {
											setValue(
												"prepTime",
												parseInt(e.target.value)
											);
											clearErrors("prepTime");
										}}
									/>
									min
								</div>
								<p className="text-red-500 text-sm py-1">
									{errors.prepTime?.message as string}
								</p>
							</div>
							<div className="flex flex-col gap-1">
								<label className="text-sm">
									Cook Time
									<span className="text-red-400">*</span>
								</label>
								<div className="flex gap-1 items-center">
									<Input
										type="number"
										placeholder="60"
										{...register("cookTime")}
										onChange={(e) => {
											setValue(
												"cookTime",
												parseInt(e.target.value)
											);
											clearErrors("cookTime");
										}}
									/>
									min
								</div>

								<p className="text-red-500 text-sm py-1">
									{errors.cookTime?.message as string}
								</p>
							</div>
							<div className="flex flex-col gap-1">
								<label className="text-sm">
									Ready In
									<span className="text-red-400">*</span>
								</label>
								<div className="flex gap-1 items-center">
									<Input
										type="number"
										placeholder="60"
										{...register("readyIn")}
										defaultValue={data?.readyIn as string}
										onChange={(e) => {
											setValue(
												"readyIn",
												parseInt(e.target.value)
											);
											clearErrors("readyIn");
										}}
									/>
									min
								</div>

								<p className="text-red-500 text-sm py-1">
									{errors.readyIn?.message as string}
								</p>
							</div>
						</div>
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
							<div className="flex flex-col gap-4">
								{formType === "create" && (
									<div className="flex flex-row gap-2 items-center">
										<IngredientSelect
											onIngredientSelect={(val) => {
												setSelectedIngredients(
													(prev) => [...prev, val]
												);
											}}
										/>
										<Button
											variant="secondary"
											type="button"
											onClick={() =>
												setSelectedIngredients([])
											}
										>
											Clear
										</Button>
									</div>
								)}
								<div className="flex flex-col gap-2">
									<h4 className="text-sm font-normal text-slate-400">
										Selected Ingredients:
									</h4>
									<NewIngredients
										heading={false}
										editable={formType === "create"}
										onDelete={(id) => {
											setSelectedIngredients((prev) =>
												prev.filter((i) => i.id !== id)
											);
										}}
										ingredients={selectedIngredients}
									/>
								</div>
							</div>
						</TabsContent>
						<TabsContent value="instructions">
							<Instructions
								instructions={newInstructions}
								onAddInstruction={handleAddInstruction}
								editable={formType === "create"}
							/>
						</TabsContent>
					</Tabs>
				</div>
			</div>

			<div className="w-full flex  justify-end">
				<div className="flex flex-col justify-end">
					{error && (
						<p className="text-red-500 text-sm py-1">{error}</p>
					)}
					<div className="flex gap-2 justify-end">
						<Button
							variant="secondary"
							type="button"
							onClick={() => {
								router.back();
							}}
						>
							Cancel
						</Button>
						<Button disabled={isLoading} type="submit">
							{isLoading && (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							)}
							Submit
						</Button>
					</div>
				</div>
			</div>
		</form>
	);
}

export default CreateUpdateForm;
