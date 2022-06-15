import {db} from '../../db/db'
import {getUuid} from '../../shared/utils'
import {usersModel} from '../../../prisma/zod'

export const createUser = async (data: {
  id?: string
  emailAddress: string
  firstName: string
}) => {
  const userData = {...data, id: data.id || getUuid()}
  const user = usersModel.parse(userData)

  const newUser = await db.users.create({data: user})
  return newUser
}
