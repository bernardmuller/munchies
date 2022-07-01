import {db} from '../../db/db'
import {getUuid} from '../../shared/utils'
import {MenuModel} from '../../../prisma/zod'
import {createGrocerylist} from '../grocerylists/actions'

export const createMenu = async (data: {id?: string}) => {
  const menuData = {...data, id: data?.id || getUuid()}

  const res = await db.menu.create({data: menuData})
  await createGrocerylist({menuId: res.id})

  const newMenu = MenuModel.parse(res)
  return newMenu
}

export const getMenus = async (params?: {filters?: {id?: string}}) => {
  if (params?.filters?.id) {
    const row = await db.menu.findUnique({where: {id: params.filters.id}})
    const menu = MenuModel.parse(row)
    return menu
  }
  const rows = await db.menu.findMany()
  const menus = rows.map((row) => MenuModel.parse(row))
  return menus
}

export const updateMenu = async (id: string, data: {name?: string}) => {
  const user = await getMenus({filters: {id}})
  if (!user) {
    throw new Error('User not found')
  }

  const updatedMenuData = await db.menu.update({
    where: {id},
    data,
  })

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const updatedMenu = MenuModel.parse(updatedMenuData)

  return updatedMenu
}

export const deleteMenu = async (id: string) => {
  const user = await getMenus({filters: {id}})
  if (!user) throw new Error('User not found')

  await db.menu.delete({
    where: {
      id,
    },
  })
}

export const deleteMenus = async () => {
  await db.menu.deleteMany()
}
