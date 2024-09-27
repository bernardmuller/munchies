"use client";

import React, {useEffect, useMemo, useState} from "react";
import type {GroceryItem, GroceryList} from "@/lib/http/client/grocerylists/getLatestGrocerylistByUserId";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Checkbox} from "@/components/ui/checkbox"
import {ScrollArea} from "@/components/ui/scroll-area"
import useLatestGrocerylistByUserId from "@/lib/http/hooks/grocerylists/useLatestGrocerylistByUserId";
import useLatestGrocerylistByHouseholdId from "@/lib/http/hooks/grocerylists/useLatestGrocerylistByHouseholdId";
import useCheckOrUncheckItem from "@/lib/http/hooks/items/useCheckOrUncheckItem";
import useCheckOrUncheckHouseholdItem from "@/lib/http/hooks/items/useCheckOrUncheckHouseholdItem";

type GrocerylistsPageProps = {
  grocerylists: {
    myGrocerylist: GroceryList;
    myHouseholdGrocerylist: GroceryList;
  };
};

interface GroceryItemWithQuantity extends GroceryItem {
  quantity: number
}

interface GroceryListProps {
  items: GroceryItem[],
  onCheckOrUncheckItem: (id: string) => void
}

function GroceryList({items, onCheckOrUncheckItem}: GroceryListProps) {
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>(items)
  const groceryItemsWithQuantity = useMemo(() => {
    const itemCounts = groceryItems.reduce((acc, item) => {
      acc[item.name] = (acc[item.name] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return groceryItems.reduce((acc, item) => {
      if (!acc.some(i => i.name === item.name)) {
        acc.push({...item, quantity: itemCounts[item.name]})
      }
      return acc
    }, [] as GroceryItemWithQuantity[])
  }, [groceryItems])

  useEffect(() => {
    if (items && Array.isArray(items)) {
      setGroceryItems(items);
    }
  }, [items])

  return (
    <ScrollArea className="">
      <ul className="space-y-2">
        {groceryItemsWithQuantity.map((item) => (
          <li key={item.item_id}
              className="flex items-center space-x-4 bg-slate-100 p-3 px-5 rounded-lg transition-colors hover:bg-secondary/30">
            <div className="flex items-center justify-center w-8 h-8">
              <Checkbox
                id={item.item_id}
                checked={item.check}
                onCheckedChange={() => onCheckOrUncheckItem(item.item_id)}
                className="w-6 h-6 border-2 border-primary"
              />
            </div>
            <label
              htmlFor={item.item_id}
              className={`flex-grow text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                item.check ? 'line-through text-muted-foreground' : ''
              }`}
            >
              {item.name}
            </label>
            {item.quantity > 1 && (
              <span className="text-md font-semibold text-muted-foreground">
                x{item.quantity}
              </span>
            )}
          </li>
        ))}
      </ul>
    </ScrollArea>
  )
}

export default function GroceryListPage({
  grocerylists
}: GrocerylistsPageProps) {

  const {data: myGrocerylist} = useLatestGrocerylistByUserId({
    initialData: grocerylists.myGrocerylist,
    userId: grocerylists.myGrocerylist?.createdBy
  })
  const {data: myHouseholdGrocerylist} = useLatestGrocerylistByHouseholdId({
    initialData: grocerylists.myGrocerylist,
  })
  const checkOrUncheckItem = useCheckOrUncheckItem()
  const checkOrUncheckHouseholdItem = useCheckOrUncheckHouseholdItem()

  const checkOrUncheckItemsWithSameName = (id: string) => {
    const mutItem = myGrocerylist.items.find(i => i.item_id === id)
    for (const item of myGrocerylist.items) {
      if (item.item_id !== id && item.name === mutItem?.name) {
        checkOrUncheckItem.mutateAsync(item.item_id)
      }
    }
  }

  const checkOrUncheckHouseholdItemsWithSameName = (id: string) => {
    const mutItem = myHouseholdGrocerylist.items.find(i => i.item_id === id)
    for (const item of myHouseholdGrocerylist.items) {
      if (item.item_id !== id && item.name === mutItem?.name) {
        checkOrUncheckItem.mutateAsync(item.item_id)
      }
    }
  }

  const handleCheckOrUncheckItem = (id: string) => {
    checkOrUncheckItem.mutateAsync(id)

    checkOrUncheckItemsWithSameName(id)
  }

  const handleCheckOrUncheckHouseholdItem = (id: string) => {
    checkOrUncheckHouseholdItem.mutateAsync(id)

    checkOrUncheckHouseholdItemsWithSameName(id)
  }

  if (!grocerylists.myHouseholdGrocerylist) {
    return (
      <div className="w-full min-h-[50vh]">
        <div className="w-1/2">
          <h2 className="text-lg font-semibold mb-2">My Grocerylist</h2>
          <GroceryList
            items={grocerylists.myGrocerylist?.items}
            onCheckOrUncheckItem={handleCheckOrUncheckItem}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-[50vh]">
      <Tabs defaultValue="my" className="w-full md:w-1/2">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my">My Grocerylist</TabsTrigger>
          {grocerylists.myHouseholdGrocerylist?.items && (
            <TabsTrigger value="household">Household Grocerylist</TabsTrigger>
          )}
        </TabsList>
        <div className="pt-6">
          <TabsContent value="my">
            <div>
              <GroceryList
                items={myGrocerylist?.items}
                onCheckOrUncheckItem={handleCheckOrUncheckItem}
              />
            </div>
          </TabsContent>
          {grocerylists.myHouseholdGrocerylist?.items && (
            <TabsContent value="household">
              <div>
                <GroceryList
                  items={myHouseholdGrocerylist?.items}
                  onCheckOrUncheckItem={handleCheckOrUncheckHouseholdItem}
                />
              </div>
            </TabsContent>
          )}
        </div>
      </Tabs>
    </div>
  )
}