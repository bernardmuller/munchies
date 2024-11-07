import {createFileRoute, useNavigate} from '@tanstack/react-router'
import React, {useMemo, useState} from 'react'
import {ChevronLeft, Minus, Plus, Trash} from 'lucide-react'
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {ScrollArea} from "@/components/ui/scroll-area"
import {Ingredient} from "@/lib/http/client/ingredients/getAllIngredients";
import useGrocerylistById from "@/lib/http/hooks/grocerylists/useGrocerylistById";
import useCreateItem from "@/lib/http/hooks/items/useCreateItem";
import {GroceryItem} from "@/lib/http/client/grocerylists/getLatestGrocerylistByUserId";
import useDeleteItem from "@/lib/http/hooks/items/useDeleteItem";
import {useToast} from "@/components/ui/use-toast";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {keys} from "@/lib/http/keys";
import {InvalidateQueryFilters, useQueryClient} from "@tanstack/react-query";
import useCategories from "@/lib/http/hooks/categories/useCategories";
import useIngredients from "@/lib/http/hooks/ingredients/useIngredients";
import NewIngredientForm from "@/components/NewIngredientForm";
import {Skeleton} from "@/components/ui/skeleton";

export const Route = createFileRoute('/_authed/lists/$listId')({
  component: () => {
    return <ManageGrocerylist/>
  },
})

interface GroceryItemWithQuantity extends GroceryItem {
  quantity: number
}

const SearchableSelect = ({options, onSelect, placeholder, onFocus}: {
  options: Ingredient[];
  onSelect: (ingredient: Ingredient) => void;
  placeholder: string;
  onFocus: () => void
}) => {
  return (
    <Select
      options={options.map(i => ({value: i.id, label: i.name}))}
      placeholder="Search ingredients..."
      // @ts-ignore
      onChange={(val: {
        value: string;
        label: string;
      }) => {
        const selected = options.find(i => i.id === val.value)
        if (val && val.value && selected) {
          onSelect(selected)
        }
      }}
      onFocus={onFocus}
      className="my-react-select-container"
      classNamePrefix="my-react-select"
    />
  )
}

function ManageGrocerylist() {
  const {listId} = Route.useParams()
  const navigate = useNavigate({from: '/lists/$listId'})
  const [open, setOpen] = React.useState(false);
  const {data, isFetching: isFetchingGrocerylist} = useGrocerylistById({
    id: listId,
  });

  const {data: categories} = useCategories();
  const queryClient = useQueryClient();
  const createItem = useCreateItem(listId);
  const deleteItem = useDeleteItem(listId);
  const [searchTerm, setSearchTerm] = useState("")
  const {data: ingredients, isFetching: isFetchingIngredients} = useIngredients();
  const {toast} = useToast()

  const groceryItemsWithQuantity = useMemo(() => {
    if (!data) return []
    const itemCounts = data.items.reduce((acc: Record<string, number>, item: GroceryItem) => {
      acc[item.name] = (acc[item.name] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return data.items.reduce((acc: GroceryItemWithQuantity[], item: GroceryItem) => {
      if (!acc.some(i => i.name === item.name)) {
        acc.push({...item, quantity: itemCounts[item.name]})
      }
      return acc
    }, [] as GroceryItemWithQuantity[])
  }, [data])

  const addItem = async (ingredientId: string) => {
    if (!ingredientId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ingredient Id not found.",
      })
      return
    }

    const ingredient = ingredients?.find((i: Ingredient) => i.id === ingredientId)

    if (!ingredient) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ingredient not found.",
      })
      return
    }

    await createItem.mutateAsync({...ingredient, ingredientId: ingredient.id});
  }

  const removeItem = async (itemId: string) => {
    deleteItem.mutate(itemId);
  }

  const removeAllItem = (ingredientId: string) => {
    if(!data) return
    for (const item of data.items) {
      if (item.ingredient_id === ingredientId) {
        deleteItem.mutate(item.item_id);
      }
    }
  }

  const handleCreate = (inputValue: string) => {
    setOpen(true)
    setSearchTerm(inputValue)
  }

  const scrollToSection = () => {
    const section = document.querySelector('.page');
    if (section) {
      window.scrollTo({
        // @ts-ignore
        top: section.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        {/*<DialogTrigger asChild>*/}
        {/*  <Button variant="outline" className="w-full">*/}
        {/*    New Ingredient*/}
        {/*  </Button>*/}
        {/*</DialogTrigger>*/}
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-center mb-4">New Ingredient</DialogTitle>
          </DialogHeader>
          <NewIngredientForm
            defaultValue={searchTerm}
            categories={categories?.length ? categories : []}
            onClose={() => setOpen(false)}
            onInvalidate={() => {
              queryClient.invalidateQueries(
                keys.ingredients as InvalidateQueryFilters,
              );
            }}
          />
        </DialogContent>
      </Dialog>

      <div className="container mx-auto p-4">
        <Button
          variant="outline"
          onClick={() => navigate({to: '/lists'})}
          className="mb-4"
        >
          <ChevronLeft className="mr-2 h-4 w-4"/>
          Back
        </Button>

        <div className="flex flex-col md:flex-row gap-4 min-h-[100vh]">
          <div className="w-full md:w-1/2">
            <h2 className="text-xl font-semibold mb-2">Current Grocery List</h2>

            <div className="md:hidden mb-4 page">
              <SearchableSelect
                options={ingredients && ingredients.length ? ingredients : []}
                onSelect={(i: Ingredient) => addItem(i.id)}
                placeholder="Search and add ingredients..."
                onFocus={scrollToSection}
              />
            </div>

            <ScrollArea className="min-h-[75vh]">
              <div className="space-y-2">
                {!groceryItemsWithQuantity.length && !isFetchingIngredients && (
                  <span className="text-center text-muted-foreground">
                    No items in list.
                  </span>
                )}
                {(isFetchingGrocerylist && !groceryItemsWithQuantity.length) ? (
                  <>
                    {[...Array(3)].map((_, index) => (
                      <Card key={index}>
                        <CardContent className="p-6 px-7">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              <Skeleton className="h-6 w-6 rounded-sm"/>
                              <Skeleton className="h-6 w-24"/>
                            </div>
                            <Skeleton className="h-6 w-12"/>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </>
                ) : null}

                {groceryItemsWithQuantity.map((item: GroceryItemWithQuantity) => (
                  <Card key={item.item_id}>
                    <CardContent className="flex items-center justify-between p-4">
                      <span className="flex-grow">{item.name}</span>
                      <div className="flex items-center space-x-2">
                        {item.quantity > 1 ? (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => removeItem(item.item_id)}
                          >
                            <Minus className="h-4 w-4"/>
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => removeAllItem(item.ingredient_id)}
                          >
                            <Trash className="h-4 w-4"/>
                          </Button>
                        )}
                        <span className="w-8 text-center">{item.quantity || 0}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            addItem(item.ingredient_id)
                          }
                          }
                        >
                          <Plus className="h-4 w-4"/>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="hidden md:block w-full md:w-1/2">
            <h2 className="text-xl font-semibold mb-2">Available Items</h2>
            <div className="mb-4 relative pr-4">
              <CreatableSelect
                isClearable
                options={ingredients?.map((ingredient) => ({
                  value: ingredient.id,
                  label: ingredient.name,
                }))}
                placeholder="Search for an item..."
                onCreateOption={handleCreate}
                // @ts-ignore
                onChange={(val: {
                  value: string;
                  label: string;
                }) => {
                  if (val) {
                    setSearchTerm(val.label.toString())
                  } else {
                    setSearchTerm("")
                  }
                }}
                onInputChange={(inputValue: string) => setSearchTerm(inputValue)}
                menuShouldScrollIntoView
                className="my-react-select-container"
                classNamePrefix="my-react-select"
                styles={{
                  input: (provided) => ({
                    ...provided,
                    fontSize: "16px",
                  }),
                  control: (provided) => ({
                    ...provided,
                    borderRadius: 8,
                    height: 44,
                  }),
                  indicatorSeparator: (provided) => ({
                    ...provided,
                    display: "none",
                  }),
                  menu: (provided) => ({
                    ...provided,
                    borderRadius: 8,
                  }),
                }}
              />
            </div>
            <ScrollArea className="md:h-[calc(100vh-250px)] min-h-75vh]">
              <div className="space-y-2 pr-4">
                {ingredients && ingredients.length ? ingredients
                  .filter((ingredient: Ingredient) => {
                    return ingredient.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase());
                  })
                  .map((ingredient: Ingredient) => (
                    <Card key={ingredient.id}>
                      <CardContent className="flex items-center justify-between p-4">
                        <span className="flex-grow">{ingredient.name}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => addItem(ingredient.id)}
                        >
                          <Plus className="h-4 w-4"/>
                        </Button>
                      </CardContent>
                    </Card>
                  )) : null}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </>
  )
}