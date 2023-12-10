"use client";

import { Ingredient } from "@/types";
import React from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type NewIngredientsProps = {
	ingredients: Partial<Ingredient>[];
	heading?: boolean;
	onDelete?: (id: string) => void;
	editable?: boolean;
};

type ItemProps = {
	ingredient: Partial<Ingredient>;
	onDelete?: (id: string) => void;
};

const Item = ({ ingredient }: ItemProps) => {
	return (
		<div className="flex justify-between">
			<div className="flex gap-2 items-center hover:cursor-pointer">
				<div className="h-3 w-3 rounded-full bg-gray-300" />
				<span>{ingredient.name}</span>
			</div>
		</div>
	);
};

const NewIngredients = ({
	ingredients,
	heading = true,
	onDelete,
}: NewIngredientsProps) => {
	const [parent] = useAutoAnimate();
	const router = useRouter();
	return (
		<div className=" max-w-full  text-base font-sans">
			<div className="flex flex-col w-full overflow-hidden m-auto pb-4">
				{heading && (
					<h3 className="text-2xl mb-4 font-semibold">Ingredients</h3>
				)}
				<div className="grid gap-3" ref={parent}>
					{ingredients?.map((ingredient: Partial<Ingredient>) => (
						<Item
							key={ingredient.id}
							onDelete={onDelete}
							ingredient={ingredient}
						/>
					))}
				</div>
				{ingredients?.length === 0 && (
					<div className="flex flex-col justify-center gap-2">
						<p className="text-sm text-slate-400">
							No ingredients added yet
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default NewIngredients;
