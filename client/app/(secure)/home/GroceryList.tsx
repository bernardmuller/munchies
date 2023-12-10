"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { GroceryListItem } from "@/types";
import React from "react";
import { useUnCheckItem, useCheckItem } from "@/hooks/items";

type GrocerylistProps = {
	items: GroceryListItem[];
};

const Item = (item: GroceryListItem) => {
	const checkItem = useCheckItem(item.groceryListId);
	const uncheckItem = useUnCheckItem(item.groceryListId);

	const handleChange = () => {
		if (item.check) {
			uncheckItem.mutate(item.id);
		} else {
			checkItem.mutate(item.id);
		}
	};

	return (
		<div
			className="flex gap-2 items-center hover:cursor-pointer"
			onClick={handleChange}
		>
			<Checkbox checked={item.check} />
			<span>{item.ingredient.name}</span>
		</div>
	);
};

const GroceryList = ({ items }: GrocerylistProps) => {
	return (
		<div className=" max-w-full  text-base font-sans">
			<div className="flex flex-col w-full overflow-hidden m-auto pb-4">
				<h1 className="text-2xl mb-4 font-semibold">Grocerylist</h1>
				<div className="grid gap-3">
					{items?.map((item: GroceryListItem) => (
						<Item key={item.id} {...item} />
					))}
				</div>
				{!items && (
					<div className="flex flex-col">
						<p className="text-sm text-slate-400">
							No items in grocerylist
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default GroceryList;
