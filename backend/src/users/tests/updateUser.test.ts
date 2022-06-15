import test from 'ava'
import {createUser} from 'users/actions/createUser'
import {deleteAllUsers} from 'users/actions/deleteUser'
import {updateUser} from 'users/actions/updateUser'

test('updateUser updates user', async (t) => {
  await deleteAllUsers()
  const user = await createUser({
    emailAddress: 'j@r.com',
    firstName: 'George',
  })
  t.is(user.firstName, 'George')
  t.truthy(user.id)

  const updatedUser = await updateUser(user.id, {firstName: 'Jack'})
  t.is(updatedUser.firstName, 'Jack')
  t.is(updatedUser.id, user.id)
})
