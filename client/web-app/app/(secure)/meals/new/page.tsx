"use client";

import * as z from "zod";
import CreateUpdateForm from "../CreateUpdateForm";
import { Ingredient } from "@/types";
import { useCreateMeal, useUploadMealImage } from "@/hooks/mealsHooks";

const formSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
});

type NewMealDTO = {
	name: string;
	cookTime: number;
	prepTime: number;
	readyIn: number;
	ingredients: Ingredient[];
	directions: string[];
	image: FormData;
};

export default function NewMeal() {
	const createMeal = useCreateMeal();
	const uploadImage = useUploadMealImage();

	const handleCreateMeal = (data: NewMealDTO) => {
		uploadImage.mutate(data.image, {
			onSuccess: (image) => {
				const newMealDTO = {
					name: data.name,
					cookTime: data.cookTime,
					prepTime: data.prepTime,
					readyIn: data.readyIn,
					ingredients: data.ingredients,
					directions: data.directions,
					image: image.url,
				};

				createMeal.mutate(newMealDTO);
			},
		});
	};

	return (
		<CreateUpdateForm
			onSubmitForm={handleCreateMeal}
			formType="create"
			validationSchema={formSchema}
			isLoading={createMeal.isLoading || uploadImage.isLoading}
		/>
	);
}
