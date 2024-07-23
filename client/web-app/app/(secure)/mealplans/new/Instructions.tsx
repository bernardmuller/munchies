"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

type InstructionsProps = {
	instructions: string[];
	onAddInstruction: (instruction: string) => void;
	editable: boolean;
};

export default function Instructions({
	instructions,
	onAddInstruction,
	editable,
}: InstructionsProps) {
	const { register, getValues, setValue } = useForm();

	const onSubmit = () => {
		if (getValues("instruction") === "") return;
		onAddInstruction(getValues("instruction"));
		setValue("instruction", "");
	};

	if (!instructions) return <p></p>;
	return (
		<div className="flex flex-col gap-4">
			{editable && (
				<>
					<div className="flex gap-2 mt-1">
						<div className="w-full flex flex-col gap-1">
							<label htmlFor="instruction" className="text-sm">
								Add an instruction
							</label>
							<Input
								type="text"
								id="instruction"
								placeholder="eg. Whisk the eggs"
								{...register("instruction")}
								onChange={(e) => {
									setValue("instruction", e.target.value);
								}}
							/>
						</div>
						<Button
							type="button"
							variant="secondary"
							disabled={
								getValues("instruction") === 0 ? true : false
							}
							className="mt-6"
							onClick={() => onSubmit()}
						>
							Add
						</Button>
					</div>
				</>
			)}
			<ol className="list-inside list-decimal flex flex-col gap-1 overflow-hidden mb-4">
				{instructions.map((instruction, index) => {
					return (
						<li key={`${index}-${instruction}`} className="">
							{instruction}
						</li>
					);
				})}
			</ol>
			{instructions.length === 0 && (
				<p className="text-slate-400 text-sm">No instructions found</p>
			)}
		</div>
	);
}
