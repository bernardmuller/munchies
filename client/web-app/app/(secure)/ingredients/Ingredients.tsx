"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, Loader2, PlusIcon } from "lucide-react";
import { DataTable } from "./DataTable";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
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
import { Ingredient } from "@/lib/http/client/ingredients/getAllIngredients";

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
}: {
  categories: Category[];
  onClose: () => void;
}) {
  const createIngredient = useCreateIngredient();
  const queryClient = useQueryClient();
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
        queryClient.invalidateQueries(keys.ingredients);
        onClose();
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

export default function Ingredients({
  ingredients: data,
  categories,
}: IngredientsProps) {
  const { data: ingredientsData, isFetching } = useIngredients({
    initialData: data,
  });
  const [open, setOpen] = React.useState(false);
  const [ingredients, setIngredients] =
    React.useState<Ingredient[]>(ingredientsData);
  const columns = [
    {
      accessorKey: "name",
      header: ({ column }) => {
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
      cell: ({ row }) => {
        return <div className="w-full">{row.original.name}</div>;
      },
    },
    {
      accessorKey: "categoryName",
      header: "Category",
    },
  ];

  useEffect(() => {
    setIngredients(ingredientsData);
  }, [ingredientsData]);

  return (
    <>
      <div className="flex flex-col  gap-4  w-full min-h-[50vh]">
        <div className="flex justify-between">
          <div>
            <Input
              placeholder="Search ingredients"
              onChange={(e) =>
                setIngredients(
                  ingredientsData.filter((ingredient) =>
                    ingredient.name
                      .toLowerCase()
                      .includes(
                        e.target.value.toLowerCase(),
                      ),
                  ),
                )
              }
            />
          </div>
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
              />
            </DialogContent>
          </Dialog>
        </div>
        {!isFetching && (
          <DataTable columns={columns} data={ingredients} />
        )}
      </div>
    </>
  );
}
