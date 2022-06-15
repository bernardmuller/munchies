import {db} from '../../db/db'
import {getUsers} from './getUsers'
import {usersModel} from '../../../prisma/zod/users'

export const updateUser = async (
  id: string,
  data: {firstName?: string; lastName?: string; dateOfBirth?: Date},
) => {
  const user = await getUsers({filters: {id}})
  if (!user) {
    throw new Error('User not found')
  }

  const updatedUserData = await db.users.update({
    where: {id},
    data,
  })

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const updatedUser = usersModel.parse(updatedUserData)

  return updatedUser
}
