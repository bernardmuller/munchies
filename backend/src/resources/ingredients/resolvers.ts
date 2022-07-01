/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  getIngredients,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} from './actions'

export const IngredientResolvers = {
  Query: {
    ingredients: () => getIngredients(),
    ingredient: (_parent: any, args: {id: string}) => {
      return getIngredients({filters: {id: args.id}})
    },
  },
  Mutation: {
    createIngredient: (_parent: any, args: any) => {
      return createIngredient(args?.input)
    },
    updateIngredient: (_parent: any, args: any) => {
      return updateIngredient(args?.input?.id, args.input)
    },
    deleteIngredient: (_parent: any, args: any) => {
      return deleteIngredient(args?.input?.id)
    },
  },
}
