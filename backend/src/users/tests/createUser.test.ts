import test from 'ava'
import {createUser} from 'users/actions/createUser'
import {deleteAllUsers} from 'users/actions/deleteUser'

test('createUser creates user', async (t) => {
  await deleteAllUsers()
  const user = await createUser({
    emailAddress: 'j@r.com',
    firstName: 'George',
  })
  t.truthy(user.id)
  t.is(user.emailAddress, 'j@r.com')
})
