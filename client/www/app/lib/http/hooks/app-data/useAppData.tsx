import useGetCurrentLoggedInUser from "@/lib/http/hooks/users/useGetCurrentLoggedInUser";
import useCategories from "@/lib/http/hooks/categories/useCategories";
import useIngredients from "@/lib/http/hooks/ingredients/useIngredients";
import useLatestGrocerylistByUserId from "@/lib/http/hooks/grocerylists/useLatestGrocerylistByUserId";
import useLatestGrocerylistByHouseholdId from "@/lib/http/hooks/grocerylists/useLatestGrocerylistByHouseholdId";
import {useEffect, useState} from "react";

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

  useEffect(() => {
    if (!isCurrentUserLoading && !isCategoriesLoading && !isIngredientsLoading && !isMyGrocerylistLoading && !isMyHouseholdGrocerylistLoading) {
      setIsLoading(false)
    }
  }, [isCurrentUserLoading, isCategoriesLoading, isIngredientsLoading, isMyGrocerylistLoading, isMyHouseholdGrocerylistLoading])

  useEffect(() => {
    if (
      (!isCurrentUserFetching && !currentUser) ||
      (!isCategoriesFetching && !categories) ||
      (!isIngredientsFetching && !ingredients) ||
      (!isMyGrocerylistFetching && !mylist) ||
      (!isMyHouseholdGrocerylistFetching && !myHousholdList)
    ) {
      setIsFetching(false)
    }
  }, [isCurrentUserFetching, isCategoriesFetching, isIngredientsFetching, isMyGrocerylistFetching, isMyHouseholdGrocerylistFetching])

  return {
    currentUser,
    categories,
    ingredients,
    mylist,
    myHousholdList,
    isLoading,
    isFetching
  }
}