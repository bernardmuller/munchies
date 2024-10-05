'use client'

import { useMemo, useState} from 'react'
import {ChevronLeft, Minus, Plus, Search, X} from 'lucide-react'
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {ScrollArea} from "@/components/ui/scroll-area"
import {Ingredient} from "@/lib/http/client/ingredients/getAllIngredients";
import useGrocerylistById from "@/lib/http/hooks/grocerylists/useGrocerylistById";
import useCreateItem from "@/lib/http/hooks/items/useCreateItem";
import {GroceryItem, GroceryList} from "@/lib/http/client/grocerylists/getLatestGrocerylistByUserId";
import useDeleteItem from "@/lib/http/hooks/items/useDeleteItem";
import {useRouter} from "next/navigation";
import {useToast} from "@/components/ui/use-toast";
import Select from "react-select";

type Props = {
  grocerylist: GroceryList;
  ingredients: Ingredient[];
};

interface GroceryItemWithQuantity extends GroceryItem {
  quantity: number
}

const SearchableSelect = ({ options, onSelect, placeholder}: {
  options: Ingredient[];
  onSelect: (ingredient: Ingredient) => void;
  placeholder: string;
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
      className="my-react-select-container"
      classNamePrefix="my-react-select"
    />
  )
}

export default function ManageGrocerylist({
  grocerylist,
  ingredients,
}: Props) {
  const {data} = useGrocerylistById({
    initialData: grocerylist,
    id: grocerylist.id,
  });
  const createItem = useCreateItem(grocerylist.id);
  const deleteItem = useDeleteItem(grocerylist.id);
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()
  const {toast} = useToast()

  const groceryItemsWithQuantity = useMemo(() => {
    const itemCounts = data.items.reduce((acc: Record<string, number>, item: GroceryItem) => {
      acc[item.name] = (acc[item.name] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return data.items.reduce((acc:GroceryItemWithQuantity[], item: GroceryItem) => {
      if (!acc.some(i => i.name === item.name)) {
        acc.push({...item, quantity: itemCounts[item.name]})
      }
      return acc
    }, [] as GroceryItemWithQuantity[])
  }, [data])

  const addItem = async (ingredientId: string) => {
    if(!ingredientId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ingredient Id not found.",
      })
      return
    }

    const ingredient = ingredients.find(i => i.id === ingredientId)

    if(!ingredient) {
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
    for (const item of data.items) {
      if (item.ingredient_id === ingredientId) {
        deleteItem.mutate(item.item_id);
      }
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Button
        variant="outline"
        onClick={() => router.back()}
        className="mb-4"
      >
        <ChevronLeft className="mr-2 h-4 w-4"/>
        Back
      </Button>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-2">Current Grocery List</h2>

          <div className="md:hidden mb-4">
            <SearchableSelect
              options={ingredients}
              onSelect={(i: Ingredient) => addItem(i.id)}
              placeholder="Search and add ingredients..."
            />
          </div>

          <ScrollArea className="min-h-75vh]">
            <div className="space-y-2">
              {!groceryItemsWithQuantity.length && (
                <span className="text-center text-muted-foreground">
                  No items in list.
                </span>
              )}
              {groceryItemsWithQuantity.map((item: GroceryItemWithQuantity) => (
                <Card key={item.item_id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <span className="flex-grow">{item.name}</span>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeItem(item.item_id)}
                      >
                        <Minus className="h-4 w-4"/>
                      </Button>
                      <span className="w-8 text-center">{item.quantity || 0}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          addItem(item.ingredient_id)}
                      }
                      >
                        <Plus className="h-4 w-4"/>
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeAllItem(item.ingredient_id)}
                      >
                        <X className="h-4 w-4"/>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="hidden md:block w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-2">Available Ingredients</h2>
          <div className="mb-4 relative pr-4">
            <Input
              type="text"
              placeholder="Search ingredients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
          </div>
          <ScrollArea className="md:h-[calc(100vh-250px)] min-h-75vh]">
            <div className="space-y-2 pr-4">
              {ingredients
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
                ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}