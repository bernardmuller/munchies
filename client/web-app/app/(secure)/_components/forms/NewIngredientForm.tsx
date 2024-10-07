import {z} from "zod";
import {Category} from "@/lib/http/client/categories/getAllCategories";
import useCreateIngredient from "@/lib/http/hooks/ingredients/useCreateIngredient";
import {useToast} from "@/components/ui/use-toast";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import Select from "react-select";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import React from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  categoryId: z.string(),
});

export default function NewIngredientForm({
  categories,
  onClose,
  onInvalidate,
  defaultValue,
}: {
  categories: Category[];
  onClose: () => void;
  onInvalidate: () => void;
  defaultValue: string;
}) {
  const createIngredient = useCreateIngredient();
  const {toast} = useToast();
  const {
    register,
    formState: {errors},
    handleSubmit,
    setValue,
    reset,
    getValues,
    clearErrors,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValue ?? "",
      categoryId: "",
    },
  });

  console.log(defaultValue)
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
                  defaultValue={getValues("name")}
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
              <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
            )}
            Submit
          </Button>
        </div>
      </form>
    </>
  );
}