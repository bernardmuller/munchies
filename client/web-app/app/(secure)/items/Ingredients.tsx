"use client";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {ArrowUpDown, EllipsisIcon, Filter, FilterXIcon, PlusIcon, Trash,} from "lucide-react";
import {DataTable} from "./DataTable";
import React from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import {useToast} from "@/components/ui/use-toast";
import {Category} from "@/lib/http/client/categories/getAllCategories";
import useIngredients from "@/lib/http/hooks/ingredients/useIngredients";
import {useQueryClient} from "@tanstack/react-query";
import {keys} from "@/lib/http/keys";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import useDeleteIngredient from "@/lib/http/hooks/ingredients/useDeleteIngredient";
import useCreateItem from "@/lib/http/hooks/items/useCreateItem";
import NewIngredientForm from "@/app/(secure)/_components/forms/NewIngredientForm";

type IngredientsProps = {
  grocerylistId: string;
  householdGrocerylistId: string;
  ingredients: any[];
  categories: Category[];
};

export default function Ingredients({
  grocerylistId,
  householdGrocerylistId,
  ingredients: data,
  categories,
}: IngredientsProps) {
  const deleteIngredient = useDeleteIngredient();
  const {toast} = useToast();
  const {data: ingredientsData, isFetching} = useIngredients({
    initialData: data,
  });
  const createGroceryItem = useCreateItem(grocerylistId);
  const createHouseholdGroceryItem = useCreateItem(householdGrocerylistId);
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredCategory, setFilteredCategory] = React.useState<
    string | null
  >(null);
  const queryClient = useQueryClient();
  const handleDeleteIngredient = (id: string) => {
    deleteIngredient.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(keys.ingredients);
        toast({
          variant: "success",
          title: "Success",
          description: "Ingredient deleted successfully",
        });
      },
    });
  };

  const columns = [
    {
      accessorKey: "#",
      header: ({column}: any) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }
          >
            <span className="text-gray-500">#</span>
            <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500"/>
          </Button>
        );
      },
      cell: ({row}: any) => {
        return <div className="w-8">{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "name",
      header: ({column}: any) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }
          >
            <span className="text-gray-500">Name</span>
            <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500"/>
          </Button>
        );
      },
      cell: ({row}: any) => {
        return <div className="w-full">{row.original.name}</div>;
      },
    },
    {
      accessorKey: "categoryName",
      header: "Category",
    },
    {
      accessorKey: "action",
      header: () => {
        return <div className="w-full flex justify-end ">Action</div>;
      },
      cell: ({cell}: any) => {
        return (
          <div className="w-full flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="h-8">
                  <EllipsisIcon className="rotate-90 dark:stroke-white"/>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="px-2 space-y-2 py-2" align="end">
                <div className="flex flex-col">
                  <DropdownMenuItem className="h-8"
                      onClick={() =>
                        createGroceryItem.mutate({
                          ingredientId: cell.row.original.id,
                          name: cell.row.original.name,
                          categoryId: cell.row.original.categoryId,
                          id: cell.row.original.id,
                        })
                      }
                  >
                      <PlusIcon className="h-4 w-4 mr-2"/>
                      Add to my list
                  </DropdownMenuItem>
                  {householdGrocerylistId && (
                    <DropdownMenuItem
                      className="w-full justify-start h-8"
                      onClick={() =>
                        createHouseholdGroceryItem.mutate({
                          ingredientId: cell.row.original.id,
                          name: cell.row.original.name,
                          categoryId: cell.row.original.categoryId,
                          id: cell.row.original.id,
                        })
                      }
                    >
                      <PlusIcon className="h-4 w-4 mr-2"/>
                      Add to household list
                    </DropdownMenuItem>
                  )}
                </div>
                <DropdownMenuItem
                  className="flex gap-1 hover:bg-gray-50 w-full justify-start px-2 bg-red-400 hover:bg-red-500"
                  onClick={() =>
                    handleDeleteIngredient(
                      cell.row.original.id,
                    )
                  }
                >
                  <Trash className="h-4 w-4"/>
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-4 w-full min-h-[50vh] py-4 md:pt-0 px-2 md:px-0 bg-white">
        <div className="flex justify-between">
          <div>
            <Input
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div
                >
                  <Filter/>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="px-2" align="end">
                {categories.map((c) => (
                  <DropdownMenuItem
                    key={c.id}
                    className="p-0">
                    <div
                      className="flex gap-1 hover:bg-gray-50 w-full"
                      onClick={() =>
                        setFilteredCategory(c.id)
                      }
                    >
                      {c.name}
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              onClick={() => {
                setSearchTerm("");
                setFilteredCategory(null);
              }}
              variant="ghost"
              disabled={!filteredCategory}
            >
              <FilterXIcon/>
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
              <Button onClick={() => setOpen(true)}>
                <PlusIcon/>
                <span className="hidden md:block">New Item</span>
              </Button>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New Item</DialogTitle>
                </DialogHeader>
                <NewIngredientForm
                  defaultValue=""
                  categories={categories}
                  onClose={() => setOpen(false)}
                  onInvalidate={() => {
                    queryClient.invalidateQueries(
                      keys.ingredients,
                    );
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        {ingredientsData?.length && (
          <DataTable
            columns={columns}
            data={ingredientsData
              .filter((i) => {
                if (filteredCategory !== null) {
                  return i.categoryId === filteredCategory;
                }
                return true;
              })
              .filter((ingredient) =>
                ingredient.name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()),
              )}
          />
        )}
      </div>
    </>
  );
}
