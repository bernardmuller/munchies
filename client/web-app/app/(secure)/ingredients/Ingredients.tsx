"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowUpDown,
  EllipsisIcon,
  Filter,
  FilterXIcon,
  Loader2,
  PlusIcon,
  Trash,
} from "lucide-react";
import { DataTable } from "./DataTable";
import React, { useCallback, useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useCreateIngredient from "@/lib/http/hooks/ingredients/useCreateIngredient";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import { Category } from "@/lib/http/client/categories/getAllCategories";
import useIngredients from "@/lib/http/hooks/ingredients/useIngredients";
import { useQueryClient } from "@tanstack/react-query";
import { keys } from "@/lib/http/keys";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useDeleteIngredient from "@/lib/http/hooks/ingredients/useDeleteIngredient";

type IngredientsProps = {
  ingredients: any[];
  categories: Category[];
};

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  categoryId: z.string().nonempty({ message: "Category is required." }),
});

function NewIngredientForm({
  categories,
  onClose,
  onInvalidate,
}: {
  categories: Category[];
  onClose: () => void;
  onInvalidate: () => void;
}) {
  const createIngredient = useCreateIngredient();
  const { toast } = useToast();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
    getValues,
    clearErrors,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      categoryId: "",
    },
  });

  const onSubmit = (data: { name: string; categoryId: string }) => {
    const ingredientDTO = {
      name: data.name,
      categoryId: data.categoryId,
    };
    createIngredient.mutate(ingredientDTO, {
      onSuccess: () => {
        reset();
        onClose();
        onInvalidate();
        toast({
          variant: "success",
          title: "Success",
          description: "Ingredient created successfully",
        });
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row gap-8  w-full min-h-[200px]">
          <div className="w-full h-full xl:flex-[0.6] ">
            <div className="w-full flex flex-col gap-2">
              <div className="w-full flex flex-col gap-2">
                <p>
                  Name
                  <span className="text-red-400">*</span>
                </p>
                <Input
                  placeholder="eg. Cherry Tomatoes"
                  {...register("name")}
                />
                <span className="text-red-500 text-sm py-1">
                  {errors.name?.message}
                </span>
              </div>
              <div className="w-full flex flex-col gap-2">
                <p>
                  Category
                  <span className="text-red-400">*</span>
                </p>
                <Select
                  options={categories?.map((cat) => ({
                    value: String(cat.id),
                    label: cat.name,
                  }))}
                  placeholder="Select a category"
                  value={{
                    value: getValues("categoryId"),
                    label: categories?.find(
                      (cat) =>
                        cat.id ===
                        getValues("categoryId"),
                    )?.name,
                  }}
                  // @ts-ignore
                  onChange={(val: {
                    value: string;
                    label: string;
                  }) => {
                    if (val) {
                      clearErrors("categoryId");
                      setValue(
                        "categoryId",
                        String(val.value),
                      );
                    }
                  }}
                  className="my-react-select-container"
                  classNamePrefix="my-react-select"
                />

                <span className="text-red-500 text-sm py-1">
                  {errors.categoryId?.message}
                </span>
              </div>
            </div>
          </div>
          <div className="w-full h-full lg:flex-[0.4] lg:pl-4 sm:pt-7 lg:pt-0"></div>
        </div>
        <div className="w-full flex gap-2 justify-end">
          <Button disabled={createIngredient.isLoading} type="submit">
            {createIngredient.isLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Submit
          </Button>
        </div>
      </form>
    </>
  );
}

type CategoryFilter =
  | "Fruits"
  | "Vegetables"
  | "Legumes & Beans"
  | "Fish & Seafood"
  | "Grains"
  | "Meats & Poultry"
  | "Dairy"
  | "Fats & Oils"
  | "Nuts & Seeds"
  | "Herbs & Vegetables";

export default function Ingredients({
  ingredients: data,
  categories,
}: IngredientsProps) {
  const deleteIngredient = useDeleteIngredient();
  const { toast } = useToast();
  const { data: ingredientsData, isFetching } = useIngredients({
    initialData: data,
  });
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
      accessorKey: "name",
      header: ({ column }: any) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }
          >
            <span className="text-gray-500">Ingredient Name</span>
            <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500" />
          </Button>
        );
      },
      cell: ({ row }: any) => {
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
      cell: ({ cell }: any) => {
        return (
          <div className="w-full flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost" className="h-8">
                  <EllipsisIcon className="rotate-90" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="px-2">
                <Button
                  className="flex gap-1 hover:bg-gray-50"
                  variant="ghost"
                  onClick={() =>
                    handleDeleteIngredient(
                      cell.row.original.id,
                    )
                  }
                >
                  <Trash className="h-4 w-4" />
                  <span>Delete</span>
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const data = ingredientsData
      .filter((i) => {
        if (filteredCategory !== null) {
          return i.categoryId === filteredCategory;
        }
        return true; // Keep the item if no category filter is applied
      })
      .filter((ingredient) =>
        ingredient.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      );

    console.log(data);
  }, [ingredientsData, filteredCategory, setSearchTerm]);

  return (
    <>
      <div className="flex flex-col  gap-4  w-full min-h-[50vh]">
        <div className="flex justify-between">
          <div>
            <Input
              placeholder="Search ingredients"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="icon" className="">
                  <Filter />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="px-2">
                {categories.map((c) => (
                  <DropdownMenuItem>
                    <Button
                      className="flex gap-1 hover:bg-gray-50"
                      variant="ghost"
                      onClick={() =>
                        setFilteredCategory(c.id)
                      }
                    >
                      {c.name}
                    </Button>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="icon"
              onClick={() => {
                setSearchTerm("");
                setFilteredCategory(null);
              }}
              disabled={!filteredCategory}
            >
              <FilterXIcon />
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
              <Button onClick={() => setOpen(true)}>
                <PlusIcon />
                Add ingredient
              </Button>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New Ingredient</DialogTitle>
                </DialogHeader>
                <NewIngredientForm
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
        {!isFetching && (
          <DataTable
            columns={columns}
            data={ingredientsData
              .filter((i) => {
                if (filteredCategory !== null) {
                  console.log(
                    i.categoryId === filteredCategory,
                  );
                  return i.categoryId === filteredCategory;
                }
                return true; // Keep the item if no category filter is applied
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
