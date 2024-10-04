"use client";

import React, {useEffect, useMemo, useState} from "react"
import type {GroceryItem, GroceryList} from "@/lib/http/client/grocerylists/getLatestGrocerylistByUserId"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Checkbox} from "@/components/ui/checkbox"
import {ScrollArea} from "@/components/ui/scroll-area"
import {Button} from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import useLatestGrocerylistByUserId from "@/lib/http/hooks/grocerylists/useLatestGrocerylistByUserId"
import useLatestGrocerylistByHouseholdId from "@/lib/http/hooks/grocerylists/useLatestGrocerylistByHouseholdId"
import useCheckOrUncheckItem from "@/lib/http/hooks/items/useCheckOrUncheckItem"
import useCheckOrUncheckHouseholdItem from "@/lib/http/hooks/items/useCheckOrUncheckHouseholdItem"
import {ClipboardList, House, Loader2, Pencil, User} from "lucide-react"
import {useRouter} from "next/navigation";
import useCreateList from "@/lib/http/hooks/grocerylists/useCreateList";
import {useToast} from "@/components/ui/use-toast";
import {Card, CardContent} from "@/components/ui/card";

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
  id: string,
  items: GroceryItem[],
  onCheckOrUncheckItem: (id: string) => void
}

function GroceryList({id, items, onCheckOrUncheckItem}: GroceryListProps) {
  const router = useRouter()
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
    <div className="bg-slate-100 md:bg-white">
      <ScrollArea className="bg-slate-100 md:bg-white px-3 py-3 rounded-b-sm h-fit md:rounded-lg">
        <h3 className="text-lg pb-3 ml md:hidden">Items:</h3>
        <ul className="space-y-2">
          {!groceryItemsWithQuantity.length && (
            <div
              className="flex flex-col gap-2 justify-center items-center bg-white rounded-lg p-3 md:p-4 md:rounded-xl">
              <span className="text-center text-muted-foreground">
                No items in list.
              </span>
              <Button
                onClick={() => router.push(`/grocerylists/${id}`)}
                className="mt-2"
                variant="outline"
              >
                Add items
              </Button>
            </div>
          )}
          {groceryItemsWithQuantity.map((item) => (
            <Card key={item.item_id}
              // className="flex items-center space-x-4 bg-white p-3 px-5 rounded-lg transition-colors hover:bg-secondary/30 border-2 "
            >
              <CardContent className="flex items-center justify-between p-4 gap-2">
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
              </CardContent>
            </Card>
          ))}
        </ul>
      </ScrollArea>
    </div>
  )
}

const MetaDataWrapper = ({children}: { children: React.ReactNode }) => {
  return (
    <Card className="w-full p-4 md:rounded-lg h-fit mt-3">
      <CardContent className="w-full md:p-0 rounded-lg">
        {children}
      </CardContent>
    </Card>
  )
}

export function ListMetaData({list}: { list: GroceryList }) {
  const router = useRouter()
  return (
    <MetaDataWrapper>
      <div className="w-full flex justify-between items-center">
        <h3 className="text-md md:text-lg font-semibold">My Shopping List</h3>
        <Button
          variant="outline"
          onClick={() => router.push(`/grocerylists/${list.id}`)}
        >
          <Pencil className="mr-2 h-4 w-4"/>
          Edit
        </Button>
      </div>
      <p className="text-sm">Created: {new Date().toLocaleDateString()}</p>
      <p className="text-sm">Total Items: {list.items.length}</p>
      <p className="text-sm">Checked Items: {list.items.filter(item => item.check).length}</p>
    </MetaDataWrapper>
  )
}

export function HouseholdListMetaData({list}: { list: GroceryList }) {
  const router = useRouter()
  return (
    <MetaDataWrapper>
      <div className="w-full flex justify-between items-center">
        <h3 className="text-md md:text-lg font-semibold">My Household Shopping List</h3>
        <Button
          variant="outline"
          onClick={() => router.push(`/grocerylists/${list.id}`)}
        >
          <Pencil className="mr-2 h-4 w-4"/>
          Edit
        </Button>
      </div>
      <p className="text-sm">Created: {new Date().toLocaleDateString()}</p>
      <p className="text-sm">Total Items: {list.items.length}</p>
      <p className="text-sm">Checked Items: {list.items.filter(item => item.check).length}</p>
      <p className="text-sm">Household Members: {'N/A'}</p>
    </MetaDataWrapper>
  )
}

function CreateListDialog() {
  const router = useRouter()
  const [creating, setCreating] = useState(false)
  const [step, setStep] = useState<'type' | 'scope'>('type')
  const [listType, setListType] = useState<'shopping' | 'mealplan' | null>(null)
  const createList = useCreateList()
  const {toast} = useToast()

  const handleCreateList = async (scope: 'me' | 'household') => {
    if (!listType) return
    setCreating(true)

    const params = {
      household: scope === 'household',
      menu: listType === 'mealplan'
    }

    const res = await createList.mutateAsync(params)

    if (!res.ok || !res.data) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong creating the list.",
      })
      setCreating(false)
      return
    }

    const routes = {
      shopping: {
        me: `/grocerylists/${res.data.data}`,
        household: `/grocerylists/${res.data.data}`
      },
      mealplan: {
        me: '/grocerylist/mealplan/new',
        household: '/grocerylist/mealplan-household/new'
      }
    }

    router.push(routes[listType][scope])
  }

  const resetDialog = () => {
    setStep('type')
    setListType(null)
  }

  const buttonClass = "flex-1 h-16 text-lg transition-all duration-200 ease-in-out hover:bg-primary/10 hover:border-primary hover:border-2 active:bg-primary/20 active:scale-95"

  return (
    <Dialog onOpenChange={(open) => !open && resetDialog()}>
      <DialogTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 md:static md:w-auto md:h-auto md:rounded-md
                     w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-lg md:shadow-none
                     hover:bg-primary/90 transition-all duration-200 ease-in-out
                     flex items-center justify-center z-50"
        >
          {/*<Plus className="h-8 w-8 md:h-4 md:w-4 md:mr-2 text-white" strokeWidth={3} />*/}
          <span className="text-3xl md:hidden">+</span>
          <span className="hidden md:inline">Create List</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-center mb-4">Create a New List</DialogTitle>
          {!creating && (
            <DialogDescription className="text-center">
              {step === 'type' ? 'Select the type of list you want to create.' : 'Choose who this list is for.'}
            </DialogDescription>
          )}
        </DialogHeader>
        {creating &&
            <div className="flex flex-col gap-2 justify-center items-center">
                <Loader2 className="h-6 w-6 animate-spin"/>
                <span>Creating new list...</span>
            </div>
        }
        {!creating && (
          <>
            {step === 'type' ? (
              <div className="flex flex-col gap-4">
                <Button
                  onClick={() => {
                    setListType('shopping')
                    setStep('scope')
                  }}
                  className={buttonClass}
                  variant="outline"
                >
                  <ClipboardList className="mr-2 h-6 w-6"/>
                  Shopping List
                </Button>
                {/*<Button*/}
                {/*  onClick={() => {*/}
                {/*    setListType('mealplan')*/}
                {/*    setStep('scope')*/}
                {/*  }}*/}
                {/*  className={buttonClass}*/}
                {/*  variant="outline"*/}
                {/*>*/}
                {/*  <Utensils className="mr-2 h-6 w-6" />*/}
                {/*  Mealplan List*/}
                {/*</Button>*/}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <Button
                  onClick={() => handleCreateList('me')}
                  className={buttonClass}
                  variant="outline"
                >
                  <User className="mr-2 h-6 w-6"/>
                  For Me
                </Button>
                <Button
                  onClick={() => handleCreateList('household')}
                  className={buttonClass}
                  variant="outline"
                >
                  <House className="mr-2 h-6 w-6"/>
                  For Household
                </Button>
              </div>
            )}
            {step === 'scope' ? (
              <Button onClick={() => setStep('type')} variant="outline" className="mt-4">
                Back
              </Button>
            ) : (
              <DialogClose className="w-full mt-4">
                <Button variant="outline" className="w-full">
                  Cancel
                </Button>
              </DialogClose>

            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default function GroceryListPage({
  grocerylists
}: GrocerylistsPageProps) {
  const router = useRouter()

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
      <div className="space-y-4">
        <div className="w-full flex justify-end md:px-3">
          {/*<h2 className="text-lg font-semibold mb-2">My list</h2>*/}
          <CreateListDialog/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="px-3">
            <ListMetaData list={grocerylists.myGrocerylist}/>
          </div>
          <GroceryList
            id={grocerylists.myGrocerylist?.id}
            items={grocerylists.myGrocerylist?.items}
            onCheckOrUncheckItem={handleCheckOrUncheckItem}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">

      <Tabs defaultValue="my" className="w-full">
        <div className="w-full flex justify-between md:px-3">
          <TabsList className="grid w-full md:w-1/2 grid-cols-2">
            <TabsTrigger value="my">Shopping List</TabsTrigger>
            {grocerylists.myHouseholdGrocerylist?.items && (
              <TabsTrigger value="household">Household Shopping List</TabsTrigger>
            )}
          </TabsList>
          <CreateListDialog/>
        </div>
        <div className="lg:pt-2">
          <TabsContent value="my">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 md:gap-4">
              <div className="px-3">
                <ListMetaData list={myGrocerylist}/>
              </div>
              <GroceryList
                id={grocerylists.myGrocerylist?.id}
                items={myGrocerylist?.items}
                onCheckOrUncheckItem={handleCheckOrUncheckItem}
              />
            </div>
          </TabsContent>
          {grocerylists.myHouseholdGrocerylist?.items && (
            <TabsContent value="household">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 md:gap-4">
                <div className="px-3">
                  <HouseholdListMetaData list={myHouseholdGrocerylist}/>
                </div>
                <GroceryList
                  id={grocerylists.myHouseholdGrocerylist?.id}
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