"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

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
	const [text, setText] = useState<string>("");

	const onSubmit = () => {
		if (text === "") return;
		onAddInstruction(text);
		setText("");
	};

	if (!instructions) return <p></p>;
	return (
		<div className="flex flex-col gap-4">
			{editable && (
				<>
					<label htmlFor="instruction">Add an instruction</label>
					<div className="flex gap-2">
						<Input
							type="text"
							id="instruction"
							placeholder="eg. Whisk the eggs"
							onChange={(e) => setText(e.target.value)}
						/>
						<Button
							type="button"
							variant="secondary"
							disabled={text?.length === 0 ? true : false}
							onClick={onSubmit}
						>
							Add
						</Button>
					</div>
				</>
			)}
			<ol className="list-inside list-decimal flex flex-col gap-1 overflow-hidden">
				{instructions.map((instruction, index) => {
					return (
						<li key={`${index}-${instruction}`} className="">
							{instruction}
						</li>
					);
				})}
			</ol>
			{instructions.length === 0 && <p>No instructions found</p>}
		</div>
	);
}
