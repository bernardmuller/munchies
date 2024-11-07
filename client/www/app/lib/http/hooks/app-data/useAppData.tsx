import {useQueries} from "@tanstack/react-query";
import {useAuth} from "@clerk/tanstack-start";
import {keys} from "@/lib/http/keys";
import {getCurrentLoggedInUser} from "@/lib/http/client/users/getCurrentLoggedInUser";
import {getAllCategories} from "@/lib/http/client/categories/getAllCategories";
import {getAllIngredients} from "@/lib/http/client/ingredients/getAllIngredients";
import {getLatestGrocerylistByUserId} from "@/lib/http/client/grocerylists/getLatestGrocerylistByUserId";
import {getLatestGrocerylistByHouseholdId} from "@/lib/http/client/grocerylists/getLatestGrocerylistByHouseholdId";
import {getCurrentUserHouseholdDetails} from "@/lib/http/client/households/getCurrentUserHouseholdDetails";
import {ONE_DAY_IN_MS} from "@/lib/constants";
import { useState} from "react";

export default function useAppData () {
  const {getToken} = useAuth();
  const token = getToken({ template: import.meta.env.VITE_CLERK_JWT_TEMPLATE ?? "default" }).then((t) => t?.toString());
  const [ids, setIds] = useState<{
    userListId: string | null,
    householdListId: string | null,
  }>({
    userListId: null,
    householdListId: null,
  });

  const highDemandData = useQueries({
    queries: [
      {
        queryKey: keys.currentUser,
        queryFn: async () => {
          const response = await getCurrentLoggedInUser((await token) as string);
          if (!response.data) return null;
          return response.data;
        },
        enabled: !!token,
        staleTime: ONE_DAY_IN_MS
      },
      {
        queryKey: keys.latestGrocerylistByUserId,
        queryFn: async () => {
          const response = await getLatestGrocerylistByUserId((await token) as string);
          if (!response.data) return null;
          setIds(prev =>({
            ...prev,
            householdListId: response.data ? response.data.id : null,
          }))
          return response.data;
        },
        enabled: !!token,
        staleTime: ONE_DAY_IN_MS
      },
    ]
  })

  const lowDemandData = useQueries({
    queries: [
      {
        queryKey: keys.categories,
        queryFn: async () => {
          const response = await getAllCategories((await token) as string);
          if (!response.data) return null;
          return response.data;
        },
        enabled: !!token,
        staleTime: ONE_DAY_IN_MS
      },
      {
        queryKey: keys.ingredients,
        queryFn: async () => {
          const response = await getAllIngredients((await token) as string);
          if (!response.data) return null;
          return response.data;
        },
        enabled: !!token,
        staleTime: ONE_DAY_IN_MS
      },
      {
        queryKey: keys.latestGrocerylistByHouseholdId,
        queryFn: async () => {
          const response = await getLatestGrocerylistByHouseholdId((await token) as string);
          if (!response.data) return null;
          return response.data;
        },
        enabled: !!token && !!ids.householdListId,
        staleTime: ONE_DAY_IN_MS
      },
      {
        queryKey: keys.currentUserHouseholdDetails,
        queryFn: async () => {
          const response = await getCurrentUserHouseholdDetails((await token) as string);
          if (!response.data) return null;
          return response.data;
        },
        enabled: !!token,
        staleTime: ONE_DAY_IN_MS
      },
    ],
  })

  return {
    currentUser: highDemandData[0].data,
    categories: lowDemandData[0].data,
    ingredients: lowDemandData[2].data,
    myList: highDemandData[1].data,
    myHouseholdList: lowDemandData[2].data,
    household: lowDemandData[3].data,
    isLoading: highDemandData.some((q) => q.isLoading ),
    isFetching: highDemandData.some((q) => q.isFetching ),
    isError: highDemandData.some(i => i.isError),
    isAbsent: highDemandData.some(i => !i.data),
  }
}