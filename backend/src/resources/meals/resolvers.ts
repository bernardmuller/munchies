import {updateMeal, createMeal, getMeals, deleteMeal} from './actions'

export const MealResolvers = {
  Query: {
    Meals: () => getMeals(),
    Meal: (parent, args: {id: string}) => {
      return getMeals({filters: {id: args.id}})
    },
  },
  Mutation: {
    createMeal: (parent, args: any) => {
      return createMeal(args?.input)
    },
    updateMeal: (parent, args: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return updateMeal(args?.input?.id, args.input)
    },
    deleteMeal: (parent, args: any) => {
      return deleteMeal(args?.input?.id)
    },
  },
}
