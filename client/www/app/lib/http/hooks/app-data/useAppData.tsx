import useGetCurrentLoggedInUser from "@/lib/http/hooks/users/useGetCurrentLoggedInUser";
import useCategories from "@/lib/http/hooks/categories/useCategories";
import useIngredients from "@/lib/http/hooks/ingredients/useIngredients";
import useLatestGrocerylistByUserId from "@/lib/http/hooks/grocerylists/useLatestGrocerylistByUserId";
import useLatestGrocerylistByHouseholdId from "@/lib/http/hooks/grocerylists/useLatestGrocerylistByHouseholdId";
import {useEffect, useState} from "react";
import useCurrentUserHouseholdDetails from "@/lib/http/hooks/households/useCurrentUserHouseholdDetails";

export default function useAppData () {
  const [isLoading, setIsLoading] = useState(true)
  const [isFetching, setIsFetching] = useState(true)

  const {
    data: currentUser,
    isLoading: isCurrentUserLoading,
    isFetching: isCurrentUserFetching
  } = useGetCurrentLoggedInUser()
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isFetching: isCategoriesFetching
  } = useCategories({initialData: null})
  const {
    data: ingredients,
    isLoading: isIngredientsLoading,
    isFetching: isIngredientsFetching
  } = useIngredients({initialData: null})
  const {
    data: mylist,
    isLoading: isMyGrocerylistLoading,
    isFetching: isMyGrocerylistFetching
  } = useLatestGrocerylistByUserId({
    initialData: null,
  })
  const {
    data: myHousholdList,
    isLoading: isMyHouseholdGrocerylistLoading,
    isFetching: isMyHouseholdGrocerylistFetching
  } = useLatestGrocerylistByHouseholdId({
    initialData: null,
  })
  const {
    data: household,
    isLoading: isHouseholdLoading,
    isFetching: isHouseholdFetching
  } = useCurrentUserHouseholdDetails({
    initialData: null,
  })

  useEffect(() => {
    if (
      (!isCurrentUserLoading && currentUser) ||
      !isCategoriesLoading ||
      (!isIngredientsLoading && !ingredients) ||
      (!isMyGrocerylistLoading && !mylist) ||
      (!isMyHouseholdGrocerylistLoading && !myHousholdList) ||
      (!isHouseholdLoading)
    ) {
      setIsLoading(false)
    }
  }, [
    isCurrentUserLoading,
    isCategoriesLoading,
    isIngredientsLoading,
    isMyGrocerylistLoading,
    isMyHouseholdGrocerylistLoading,
    isHouseholdLoading
  ])

  useEffect(() => {
    if (
      (!isCurrentUserFetching && !currentUser) ||
      (!isCategoriesFetching) ||
      (!isIngredientsFetching && !ingredients) ||
      (!isMyGrocerylistFetching && !mylist) ||
      (!isMyHouseholdGrocerylistFetching) ||
      (!isHouseholdFetching)
    ) {
      setIsFetching(false)
    }
  }, [
    isCurrentUserFetching,
    isCategoriesFetching,
    isIngredientsFetching,
    isMyGrocerylistFetching,
    isMyHouseholdGrocerylistFetching,
    isHouseholdFetching
  ])

  return {
    currentUser,
    categories,
    ingredients,
    mylist,
    myHousholdList,
    household,
    isLoading,
    isFetching
  }
}