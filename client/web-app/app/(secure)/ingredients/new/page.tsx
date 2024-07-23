"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ingredientCategories } from "@/shared/configs/ingredientCategories";
import Select from "react-select";
import { Loader2 } from "lucide-react";
import { useCreateIngredient } from "@/hooks/ingredientsHooks";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	categoryId: z.string().nonempty({ message: "Category is required." }),
});

function NewIngredient() {
	const router = useRouter();
	const createIngredient = useCreateIngredient();
	const { toast } = useToast();
	const {
		register,
		formState: { errors },
		handleSubmit,
		setValue,
		reset,
		getValues,
		clearErrors,
	} = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			categoryId: "",
		},
	});

	const onSubmit = (data: { name: string; categoryId: string }) => {
		const ingredientDTO = {
			name: data.name,
			categoryId: parseInt(data.categoryId),
		};
		createIngredient.mutate(ingredientDTO, {
			onSuccess: () => {
				reset();
				toast({
					variant: "success",
					title: "Success",
					description: "Ingredient created successfully",
				});
			},
		});
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col lg:flex-row gap-8  w-full min-h-[50vh]">
					<div className="w-full h-full xl:flex-[0.6] ">
						<div className="w-1/2 flex flex-col gap-2">
							<div>
								<p>
									Name
									<span className="text-red-400">*</span>
								</p>
								<Input
									placeholder="eg. Cherry Tomatoes"
									{...register("name")}
								/>
								<span className="text-red-500 text-sm py-1">
									{errors.name?.message}
								</span>
							</div>
							<div>
								<p>
									Category
									<span className="text-red-400">*</span>
								</p>
								<Select
									options={ingredientCategories.map(
										(cat) => ({
											value: String(cat.id),
											label: cat.name,
										})
									)}
									placeholder="Select a category"
									value={{
										value: getValues("categoryId"),
										label: ingredientCategories.find(
											(cat) =>
												cat.id ===
												parseInt(
													getValues("categoryId")
												)
										)?.name,
									}}
									// @ts-ignore
									onChange={(val: {
										value: string;
										label: string;
									}) => {
										if (val) {
											clearErrors("categoryId");
											setValue(
												"categoryId",
												String(val.value)
											);
										}
									}}
									className="my-react-select-container"
									classNamePrefix="my-react-select"
								/>

								<span className="text-red-500 text-sm py-1">
									{errors.categoryId?.message}
								</span>
							</div>
						</div>
					</div>
					<div className="w-full h-full lg:flex-[0.4] lg:pl-4 sm:pt-7 lg:pt-0"></div>
				</div>
				<div className="w-full flex gap-2 justify-end">
					<Button
						variant="secondary"
						type="submit"
						onClick={() => {
							router.back();
						}}
					>
						Cancel
					</Button>
					<Button disabled={createIngredient.isLoading} type="submit">
						{createIngredient.isLoading && (
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						)}
						Submit
					</Button>
				</div>
			</form>
		</>
	);
}

export default NewIngredient;
