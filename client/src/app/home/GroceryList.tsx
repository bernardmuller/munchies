import { GroceryListItem } from "@/types";
import React from "react";

type Props = {
	items: GroceryListItem[];
};

const GroceryList = ({ items }: Props) => {
	return (
		<div className=" max-w-full  text-base font-sans">
			<div className="flex flex-col w-full overflow-hidden m-auto pb-4">
				<div className="flex flex-row items-baseline">
					<h1 className="text-lg ml-3">Grocerylist</h1>
				</div>
				{items?.map((item: GroceryListItem) => (
					<label
						className="custom-label flex mt-2 ml-3"
						key={item.id}
					>
						<div className="mr-4">
							<input type="checkbox" checked></input>
						</div>
						<span className="select-none">
							{item.ingredient.name}
						</span>
					</label>
				))}
			</div>
		</div>
	);
};

export default GroceryList;
