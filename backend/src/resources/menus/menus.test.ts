/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import test from 'ava'
import {createMenu, getMenus, updateMenu, deleteAllMenus} from './actions'

test('createMenu creates menu', async (t) => {
  await deleteAllMenus()
  const menu = await createMenu({})
  t.truthy(menu.id)
  t.is(menu.name, 'New Menu')
})

// test('getUsers gets users', async (t) => {
//   await deleteAllMenus()
//   const newUser = await createMenu({
//     emailAddress: 'j@r.com',
//   })
//   const user = await getUsers({filters: {id: newUser.id}})
//   t.truthy(user)
// })

// test('updateUser updates user', async (t) => {
//   await deleteAllMenus()
//   const user = await createMenu({
//     emailAddress: 'j@r.com',
//     firstName: 'George',
//     password: 'Tester@123',
//   })
//   t.is(user.firstName, 'George')
//   t.truthy(user.id)

//   const updatedUser = await updateUser(user.id, {firstName: 'Jack'})
//   t.is(updatedUser.firstName, 'Jack')
//   t.is(updatedUser.id, user.id)
// })

// test('deleteUser deletes user', async (t) => {
//   const user = await createMenu({
//     emailAddress: 'b@m.com',
//     firstName: 'Archie',
//     password: 'Tester@123',
//   })
//   t.truthy(user.id)
//   t.is(user.emailAddress, 'b@m.com')

//   const deletedUser = await deleteUser(user.id)
//   t.falsy(deletedUser)
// })
