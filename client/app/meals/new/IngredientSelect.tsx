"use client";

import React from "react";

import Select from "react-select";
import { Ingredient } from "@/types";
import _ from "lodash";
import { useAllIngredientsData } from "@/hooks/ingredientsHooks";

type IngredientSelectProps = {
	onIngredientSelect: (ingredient: Ingredient) => void;
};

type IngredientOption = {
	value: string;
	label: string;
};

export default function IngredientSelect({
	onIngredientSelect,
}: IngredientSelectProps) {
	const ingredients = useAllIngredientsData();
	const [inputValue, setInputValue] = React.useState("");

	const options = ingredients.data?.map((ingredient: Ingredient) => ({
		value: ingredient.id,
		label: ingredient.name,
	}));

	return (
		<div className="grid gap-2">
			<Select
				onChange={(selectedOption: IngredientOption) => {
					onIngredientSelect(
						ingredients.data?.find(
							(ingredient: Ingredient) =>
								ingredient.id === selectedOption.value
						)
					);
					setInputValue("");
				}}
				inputValue={inputValue}
				searchPromptText="Add an ingredient"
				onInputChange={(value) => setInputValue(value)}
				placeholder="Add an ingredient"
				options={options}
				className="my-react-select-container"
				classNamePrefix="my-react-select"
			/>
		</div>
	);
}
