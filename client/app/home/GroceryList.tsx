import { Checkbox } from "../../components/ui/checkbox";
import { GroceryListItem } from "../../types";
import React from "react";

type Props = {
	items: GroceryListItem[];
};

const GroceryList = ({ items }: Props) => {
	return (
		<div className=" max-w-full  text-base font-sans">
			<div className="flex flex-col w-full overflow-hidden m-auto pb-4">
				<h1 className="text-2xl">Grocerylist</h1>
				<div className="grid gap-2 py-4">
					{items?.map((item: GroceryListItem) => (
						<div className="flex gap-2 items-center">
							<Checkbox onCheckedChange={(e) => {}} />
							<span>{item.ingredient.name}</span>
						</div>
					))}
				</div>
				{items?.length === 0 && (
					<div className="flex flex-col items-center justify-center">
						<p className="text-lg">No items in grocerylist</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default GroceryList;
