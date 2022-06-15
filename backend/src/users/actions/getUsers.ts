import {usersModel} from '../../../prisma/zod'
import {db} from '../../db/db'

export const getUsers = async (params?: {filters?: {id?: string}}) => {
  if (params?.filters?.id) {
    const row = await db.users.findUnique({where: {id: params.filters.id}})
    const user = usersModel.parse(row)
    return user
  }
  const rows = await db.users.findMany()
  const users = rows.map((row) => usersModel.parse(row))
  return users
}
