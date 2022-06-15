import {getUsers} from './getUsers'
import {db} from '../../db/db'

export const deleteUser = async (id: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const user = await getUsers({filters: {id}})
  if (!user) throw new Error('User not found')

  await db.users.delete({
    where: {
      id,
    },
  })
}

export const deleteAllUsers = async () => {
  await db.users.deleteMany()
}
