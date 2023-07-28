"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

const formSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	cookTime: z.string(),
	prepTime: z.string(),
	readyIn: z.string(),
});

export default function NewMeal() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	if (false)
		return (
			<div className="w-full flex flex-row gap-6 justify-evenly min-h-[50vh]">
				<Skeleton className="flex-[0.3] w-full h-28 rounded-md" />
				<Skeleton className="flex-[0.3] w-full h-28 rounded-md" />
				<Skeleton className="flex-[0.4] w-full h-[40vh] rounded-md" />
			</div>
		);

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
												Ready In
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
					<h2 className="text-2xl mb-4 font-semibold">
						Ingredients and instructions
					</h2>
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
