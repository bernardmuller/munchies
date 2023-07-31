"use client";

import { Ingredient } from "@/types";
import React from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { X } from "lucide-react";

type NewIngredientsProps = {
	ingredients: Ingredient[];
	heading?: boolean;
	onDelete: (id: string) => void;
};

type ItemProps = {
	ingredient: Ingredient;
	onDelete?: (id: string) => void;
};

const Item = ({ ingredient, onDelete }: ItemProps) => {
	return (
		<div className="flex justify-between">
			<div className="flex gap-2 items-center hover:cursor-pointer">
				<div className="h-3 w-3 rounded-full bg-gray-300" />
				<span>{ingredient.name}</span>
			</div>
			{/*
      <div className="" onClick={() => onDelete(ingredient.id)}>
        X
      </div>
    */}
		</div>
	);
};

const NewIngredients = ({
	ingredients,
	heading = true,
	onDelete,
}: NewIngredientsProps) => {
	const [parent] = useAutoAnimate();
	return (
		<div className=" max-w-full  text-base font-sans">
			<div className="flex flex-col w-full overflow-hidden m-auto pb-4">
				{heading && (
					<h1 className="text-2xl mb-4 font-semibold">Ingredients</h1>
				)}
				<div className="grid gap-3" ref={parent}>
					{ingredients?.map((ingredient: Ingredient) => (
						<Item
							key={ingredient.id}
							onDelete={onDelete}
							ingredient={ingredient}
						/>
					))}
				</div>
				{ingredients?.length === 0 && (
					<div className="flex flex-coljustify-center">
						<p className="text-sm text-slate-300">
							No ingredients added yet
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default NewIngredients;
