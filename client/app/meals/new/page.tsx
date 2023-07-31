"use client";

import * as z from "zod";
import CreateUpdateForm from "../CreateUpdateForm";
import { Ingredient } from "@/types";
import { useCreateMeal } from "@/hooks/mealsHooks";
import { useRouter } from "next/navigation";

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
	const createMeal = useCreateMeal();
	const router = useRouter();
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
			formType="create"
			validationSchema={formSchema}
			isLoading={createMeal.isLoading}
		/>
	);
}
