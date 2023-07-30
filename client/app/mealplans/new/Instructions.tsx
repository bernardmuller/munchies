"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

type Instruction = {
	id: string;
	value: string;
};

type InstructionsProps = {
	instructions: Instruction[];
	onAddInstruction: (instruction: Instruction) => void;
};

export default function Instructions({
	instructions,
	onAddInstruction,
}: InstructionsProps) {
	const { register, handleSubmit, setValue } = useForm();

	const onSubmit = (data: { instruction: string }) => {
		setValue("instruction", "");
		const newInstruction = {
			id: uuidv4(),
			value: data.instruction,
		};
		onAddInstruction(newInstruction);
	};

	if (!instructions) return <p></p>;
	return (
		<div className="flex flex-col gap-4">
			<ol className="list-inside list-decimal flex flex-col gap-1 overflow-hidden">
				{instructions.map((instruction) => {
					return (
						<li key={instruction.id} className="">
							{instruction.value}
						</li>
					);
				})}
			</ol>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="instruction">Add an instruction</label>
				<div className="flex gap-2">
					<Input
						type="text"
						id="instruction"
						placeholder="eg. Whisk the eggs"
						{...register("instruction")}
					/>
					<Button type="submit">Add</Button>
				</div>
			</form>
		</div>
	);
}
