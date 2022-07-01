import {db} from '../../db/db'
import {getUuid} from '../../shared/utils'
import {MealModel} from '../../../prisma/zod'

export const createMeal = async (data: {id?: string}) => {
  const mealData = {...data, id: data.id || getUuid()}

  const res = await db.meal.create({data: mealData})
  const newMeal = MealModel.parse(res)
  return newMeal
}

export const getMeals = async (params?: {filters?: {id?: string}}) => {
  if (params?.filters?.id) {
    const row = await db.meal.findUnique({where: {id: params.filters.id}})
    const meal = MealModel.parse(row)
    return meal
  }
  const rows = await db.meal.findMany()
  const meals = rows.map((row) => MealModel.parse(row))
  return meals
}

export const updateMeal = async (id: string, data: {name?: string}) => {
  const meal = await getMeals({filters: {id}})
  if (!meal) {
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

export const deleteMeal = async (id: string) => {
  const user = await getMeals({filters: {id}})
  if (!user) throw new Error('User not found')

  await db.meal.delete({
    where: {
      id,
    },
  })
}

export const deleteMeals = async () => {
  await db.meal.deleteMany()
}
