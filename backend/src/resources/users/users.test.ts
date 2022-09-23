// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
import test from 'ava';
import {
  createUser,
  deleteAllUsers,
  getUsers,
  updateUser,
  deleteUser,
} from './actions';

test('createUser > creates user', async (t) => {
  await deleteAllUsers();
  const user = await createUser({
    email: 'george@cat.com',
    firstName: 'George',
    password: 'Tester@123',
  });
  t.truthy(user.id);
  t.is(user.email, 'george@cat.com');
});

test('getUsers > gets users', async (t) => {
  await deleteAllUsers();
  const newUser = await createUser({
    email: 'peanut@cat.com',
    firstName: 'peanut',
    password: 'Tester@123',
  });
  const user = await getUsers();
  t.truthy(user);
});

test('updateUser > updates user', async (t) => {
  await deleteAllUsers();
  const user = await createUser({
    email: 'j@r.com',
    firstName: 'George',
    password: 'Tester@123',
  });
  t.is(user.firstName, 'George');
  t.truthy(user.id);

  const updatedUser = await updateUser(user.id, { firstName: 'Jack' });
  t.is(updatedUser.firstName, 'Jack');
  t.is(updatedUser.id, user.id);
});

test('deleteUser > deletes user', async (t) => {
  const user = await createUser({
    email: 'b@m.com',
    firstName: 'Archie',
    password: 'Tester@123',
  });
  t.truthy(user.id);
  t.is(user.email, 'b@m.com');

  const deletedUser = await deleteUser(user.id);
  t.truthy(deletedUser.message);
});
