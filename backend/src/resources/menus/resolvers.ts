/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {updateMenu, createMenu, getMenus, deleteMenu} from './actions'

export const MenuResolvers = {
  Query: {
    menus: async (parent, args, context, info) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return getMenus()
    },
    menu: (parent, args: {id: string}) => {
      return getMenus({filters: {id: args.id}})
    },
  },
  Mutation: {
    createMenu: (parent, args: any) => {
      return createMenu(args?.input)
    },
    updateMenu: (parent, args: any) => {
      return updateMenu(args?.input?.id, args.input)
    },
    deleteMenu: (parent, args: any) => {
      return deleteMenu(args?.input?.id)
    },
  },
}
