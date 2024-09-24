"use client";

import React, { useEffect } from "react";
import type { GroceryList, GroceryItem } from "@/lib/http/client/grocerylists/getLatestGrocerylistByUserId";
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"

type GrocerylistsPageProps = {
  grocerylists: {
    myGrocerylist: GroceryList;
    myHouseholdGrocerylist: {}
  };
};

interface GroceryListProps {
  items: GroceryItem[]
}

const GroceryList: React.FC<GroceryListProps> = ({ items }) => {
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>(items)

  const toggleItemCheck = (id: string) => {
    setGroceryItems(prevItems =>
      prevItems.map(item =>
        item.item_id === id ? { ...item, check: !item.check } : item
      )
    )
  }

  return (
    <ul className="space-y-2">
      {groceryItems.map((item) => (
        <li key={item.item_id} className="flex items-center space-x-2">
          <Checkbox
            id={item.item_id}
            checked={item.check}
            onCheckedChange={() => toggleItemCheck(item.item_id)}
          />
          <label
            htmlFor={item.item_id}
            className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
              item.check ? 'line-through text-muted-foreground' : ''
            }`}
          >
            {item.name}
          </label>
        </li>
      ))}
    </ul>
  )
}

export default function GroceryListPage({
  grocerylists
}:GrocerylistsPageProps) {

  return (
    <div className="w-full">
      <Tabs defaultValue="my" className="w-full md:w-1/2">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my">My Grocerylist</TabsTrigger>
          <TabsTrigger value="household">Household Grocerylist</TabsTrigger>
        </TabsList>
        <div className="p-6">
          <TabsContent value="my">
            <div>
              <h2 className="text-lg font-semibold mb-4">My Grocerylist</h2>
              <GroceryList items={grocerylists.myGrocerylist?.items} />
            </div>
          </TabsContent>
          <TabsContent value="household">
            <div>
              <h2 className="text-lg font-semibold mb-4">Household Grocerylist</h2>
              <GroceryList items={[]} />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}