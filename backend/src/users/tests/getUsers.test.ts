import test from 'ava'
import {createUser} from 'users/actions/createUser'
import {getUsers} from 'users/actions/getUsers'
import {deleteAllUsers} from 'users/actions/deleteUser'

test('getUsers gets users', async (t) => {
  await deleteAllUsers()
  const newUser = await createUser({
    emailAddress: 'j@r.com',
    firstName: 'George',
  })
  const user = await getUsers({filters: {id: newUser.id}})
  t.truthy(user)
})
