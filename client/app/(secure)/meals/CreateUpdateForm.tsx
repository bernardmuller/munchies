"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { set, useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIngredientsData } from "@/hooks/ingredientsHooks";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import NewIngredients from "@/app/(secure)/mealplans/new/Ingredients";
import { Ingredient, Meal } from "@/types";
import Instructions from "@/app/(secure)/mealplans/new/Instructions";
import { useRouter } from "next/navigation";
import IngredientSelect from "./new/IngredientSelect";
import { BeefIcon, Loader2 } from "lucide-react";
import { useDeleteMeal } from "@/hooks/mealsHooks";
import Image from "next/image";

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
	const [image, setImage] = useState<FormData | null>(null);
	const [error, setErrorMessage] = useState<string | null>(null);
	const router = useRouter();
	const [selectedIngredients, setSelectedIngredients] = useState<
		Ingredient[]
	>(data?.ingredients || []);
	const [newInstructions, setNewInstructions] = useState<string[]>(
		data?.directions || []
	);
	const deleteMeal = useDeleteMeal(data?.id as string);

	const {
		register,
		formState: { errors },
		handleSubmit,
		setValue,
		getValues,
		setError,
		clearErrors,
	} = useForm<z.infer<typeof validationSchema>>({
		resolver: zodResolver(validationSchema),
		defaultValues: {
			name: data?.name,
		},
	});

	const handleAddInstruction = (instruction: string) => {
		setErrorMessage(null);
		setNewInstructions([...newInstructions, instruction]);
	};

	function onSubmit(values: z.infer<typeof validationSchema>) {
		const newMealDTO = {
			name: values.name,
			cookTime: getValues("cookTime"),
			prepTime: getValues("prepTime"),
			readyIn: getValues("readyIn"),
			ingredients: selectedIngredients,
			directions: newInstructions,
			image: image,
		};

		if (selectedIngredients.length === 0) {
			setErrorMessage("You must add at least one ingredient.");
			return;
		}

		if (!image) {
			setError("image", {
				message: "You must upload an image.",
			});
			return;
		}

		onSubmitForm(newMealDTO);
	}

	const handleImage = (e: any) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append("file", file);
		formData.append("upload_preset", "m1npbppd");

		setImage(formData);
	};

	const handleDeleteMeal = () => {
		deleteMeal.mutate(data?.id as string, {
			onSuccess: () => {
				router.back();
			},
		});
	};

	useEffect(() => {
		if (formType === "update" && data) {
			setValue("name", data.name);
			setValue("cookTime", data.cookTime);
			setValue("prepTime", data.prepTime);
			setValue("readyIn", data.readyIn);
			setValue("image", data.image);
			setSelectedIngredients(data.ingredients);
			setNewInstructions(data.directions);
		} else {
			setValue("cookTime", 0);
			setValue("prepTime", 0);
			setValue("readyIn", 0);
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
										min={0}
										onChange={(e) => {
											setValue(
												"prepTime",
												parseInt(e.target.value)
											);
											setValue(
												"readyIn",
												parseInt(e.target.value) +
													parseInt(
														getValues("cookTime")
													)
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
										min={0}
										onChange={(e) => {
											console.log(typeof e.target.value);
											setValue(
												"cookTime",
												parseInt(e.target.value)
											);
											setValue(
												"readyIn",
												parseInt(
													e.target.value as string
												) +
													parseInt(
														getValues("prepTime")
													)
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
							<div className="flex flex-col gap-1 w-full">
								<label className="text-sm">
									Ready In
									<span className="text-red-400">*</span>
								</label>
								<div className="flex gap-1 items-center py-2">
									{/* <Input
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
									/> */}
									{getValues("readyIn") || 0} min
								</div>

								<p className="text-red-500 text-sm py-1">
									{errors.readyIn?.message as string}
								</p>
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-1">
						<label className="text-sm">
							Picture
							<span className="text-red-400">*</span>
						</label>
						<div className="flex gap-1 items-center">
							{formType === "update" ? (
								<>
									<div className="relative w-[100px] h-[100px] rounded-md bg-gray-200 flex items-center justify-center overflow-hidden">
										{data?.image ? (
											<Image
												src={data?.image as string}
												fill
												alt="meal image"
												className="object-cover"
											/>
										) : (
											<div className="bg-secondary rounded-md w-full h-full flex justify-center items-center">
												<BeefIcon
													size={48}
													className="stroke-slate-400"
												/>
											</div>
										)}
									</div>
								</>
							) : (
								<>
									<Input
										type="file"
										className="hover:cursor-pointer"
										onChange={handleImage}
									/>
								</>
							)}
						</div>

						<p className="text-red-500 text-sm py-1 pt-0">
							{errors.image?.message as string}
						</p>
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
												setErrorMessage(null);
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
									{selectedIngredients?.length !== 0 && (
										<h4 className="text-sm font-normal text-slate-400">
											Selected Ingredients:
										</h4>
									)}
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

									{ingredients?.data?.length === 0 && (
										<Button
											className="w-48"
											onClick={() => {
												router.push("/ingredients/new");
											}}
										>
											Create an ingredient
										</Button>
									)}
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

			<div className={`w-full flex justify-between`}>
				<div>
					{formType === "update" && (
						<Button
							type="button"
							disabled={deleteMeal.isLoading}
							variant="destructive"
							onClick={handleDeleteMeal}
						>
							Delete Meal
						</Button>
					)}
				</div>
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
							Save Meal
						</Button>
					</div>
				</div>
			</div>
		</form>
	);
}

export default CreateUpdateForm;
