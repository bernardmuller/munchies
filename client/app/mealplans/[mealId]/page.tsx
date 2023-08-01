"use client";

import * as z from "zod";
import CreateUpdateForm from "../CreateUpdateForm";
import { Ingredient } from "@/types";
import { useCreateMeal, useMealData } from "@/hooks/mealsHooks";
import { useParams, useRouter } from "next/navigation";

const formSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	cookTime: z.string(),
	prepTime: z.string(),
	readyIn: z.string(),
});

type createMealDTO = z.infer<typeof formSchema> & {
	ingredients: {
		id: number;
		name: string;
	}[];
};

export default function NewMeal() {
	const params = useParams();
	const createMeal = useCreateMeal();
	const meal = useMealData(params.mealId);
	const router = useRouter();

	console.log(meal);

	const handleCreateMeal = (data: any) => {
		createMeal.mutate(data, {
			onSuccess: () => {
				router.push("/home");
			},
		});
	};
	return (
		<CreateUpdateForm
			onSubmitForm={handleCreateMeal}
			formType="update"
			validationSchema={formSchema}
			isLoading={createMeal.isLoading}
		/>
	);
}
