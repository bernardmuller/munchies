"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";
import { DataTable } from "./DataTAble";
import React from "react";

type IngredientsProps = {
  data: any[];
};

export default function Ingredients({ data }: IngredientsProps) {
  const [ingredients, setIngredients] = React.useState<any[]>(data);
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "categoryName",
      header: "Category",
    },
  ];
  const handleAddIngredient = () => {
    console.log("add ingredient");
  };
  return (
    <div className="flex flex-col  gap-4  w-full min-h-[50vh]">
      <div className="flex justify-between">
        <div>
          <Input
            placeholder="Search ingredients"
            onChange={(e) =>
              setIngredients(
                data.filter((ingredient) =>
                  ingredient.name
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()),
                ),
              )
            }
          />
        </div>
        <Button onClick={handleAddIngredient}>
          <PlusIcon />
          Add ingredient
        </Button>
      </div>
      <DataTable columns={columns} data={ingredients} />
    </div>
  );
}
