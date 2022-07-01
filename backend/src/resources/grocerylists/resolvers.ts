import {
  updateGrocerylist,
  createGrocerylist,
  getGrocerylists,
  deleteGrocerylist,
} from './actions'

export const GrocerylistResolvers = {
  Query: {
    grocerylists: () => getGrocerylists(),
    grocerylist: (_parent: any, args: {id: string}) => {
      return getGrocerylists({filters: {id: args?.id}})
    },
  },
  Mutation: {
    createGrocerylist: (parent: any, args: any) => {
      return createGrocerylist(args?.input)
    },
    updateGrocerylist: (parent: any, args: any) => {
      return updateGrocerylist(args?.input?.id, args.input)
    },
    deleteGrocerylist: (parent: any, args: any) => {
      return deleteGrocerylist(args?.input?.id)
    },
  },
}
