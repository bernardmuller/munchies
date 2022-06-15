import test from 'ava'
import {createUser} from 'users/actions/createUser'
import {deleteUser} from 'users/actions/deleteUser'

// FIX: test relies on createUser action to work

test('deleteUser deletes user', async (t) => {
  const user = await createUser({
    emailAddress: 'b@m.com',
    firstName: 'Archie',
  })
  t.truthy(user.id)
  t.is(user.emailAddress, 'b@m.com')

  const deletedUser = await deleteUser(user.id)
  t.falsy(deletedUser)
})
