import {db} from '../../db/db'
import {getUuid} from '../../shared/utils'
import {ItemModel} from '../../../prisma/zod'

export const createItem = async (data: {
  id?: string
  ingredientId: string
  typeId: number
}) => {
  const itemData = {...data, id: data.id || getUuid()}

  const res = await db.item.create({data: itemData})
  const newItem = ItemModel.parse(res)
  return newItem
}

export const getItems = async (params?: {filters?: {id?: string}}) => {
  if (params?.filters?.id) {
    const row = await db.item.findUnique({where: {id: params.filters.id}})
    const Item = ItemModel.parse(row)
    return Item
  }
  const rows = await db.item.findMany()
  const Items = rows.map((row) => ItemModel.parse(row))
  return Items
}

export const updateItem = async (
  id: string,
  data: {id?: string; ingredientId: string; typeId: number},
) => {
  const Item = await getItems({filters: {id}})
  if (!Item) {
    throw new Error('Item not found')
  }

  const updatedItemData = await db.item.update({
    where: {id},
    data,
  })

  const updatedItem = ItemModel.parse(updatedItemData)

  return updatedItem
}

export const deleteItem = async (id: string) => {
  const Item = await getItems({filters: {id}})
  if (!Item) throw new Error('Item not found')

  await db.item.delete({
    where: {
      id,
    },
  })
}

export const deleteAllItems = async () => {
  await db.item.deleteMany()
}
