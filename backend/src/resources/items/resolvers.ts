/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {getItems, createItem, updateItem, deleteItem} from './actions'

export const ItemResolvers = {
  Query: {
    items: () => getItems(),
    item: (_parent: any, args: {id: string}) => {
      return getItems({filters: {id: args.id}})
    },
  },
  Mutation: {
    createItem: (_parent: any, args: any) => {
      return createItem(args?.input)
    },
    updateItem: (_parent: any, args: any) => {
      return updateItem(args?.input?.id, args.input)
    },
    deleteItem: (_parent: any, args: any) => {
      return deleteItem(args?.input?.id)
    },
  },
}
