"use client";

import * as z from "zod";
import CreateUpdateForm from "../CreateUpdateForm";
import { useCreateMeal, useMealData, useUpdateMeal } from "@/hooks/mealsHooks";
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
	const { data } = useMealData(params.mealId as string);
	const updateMeal = useUpdateMeal({ mealId: params.mealId as string });
	const router = useRouter();

	const handleUpdateMeal = (data: any) => {
		const updateDTO = {
			name: data.name,
			cookTime: parseInt(data.cookTime),
			prepTime: parseInt(data.prepTime),
			readyIn: parseInt(data.readyIn),
		};
		updateMeal.mutate(
			{
				id: params.mealId as string,
				data: updateDTO,
			},
			{
				onSuccess: () => {
					router.back();
				},
			}
		);
	};
	return (
		<CreateUpdateForm
			onSubmitForm={handleUpdateMeal}
			data={data}
			formType="update"
			validationSchema={formSchema}
			isLoading={updateMeal.isLoading}
		/>
	);
}
