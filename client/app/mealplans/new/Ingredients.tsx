"use client";

import { Ingredient } from "@/types";
import React from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type NewIngredientsProps = {
	ingredients: Ingredient[];
};

const Item = (ingredient: Ingredient) => {
	return (
		<div className="flex gap-2 items-center hover:cursor-pointer">
			<div className="h-3 w-3 rounded-full bg-gray-300" />
			<span>{ingredient.name}</span>
		</div>
	);
};

const NewIngredients = ({ ingredients }: NewIngredientsProps) => {
	const [parent, enableAnimations] = useAutoAnimate(/* optional config */);
	return (
		<div className=" max-w-full  text-base font-sans">
			<div className="flex flex-col w-full overflow-hidden m-auto pb-4">
				<h1 className="text-2xl mb-4 font-semibold">Ingredients</h1>
				<div className="grid gap-3" ref={parent}>
					{ingredients?.map((ingredient: Ingredient) => (
						<Item key={ingredient.id} {...ingredient} />
					))}
				</div>
				{ingredients?.length === 0 && (
					<div className="flex flex-coljustify-center">
						<p className="text-md text-gray-400">
							No ingredients added yet
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default NewIngredients;
