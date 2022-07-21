import test from 'ava';
import { deleteAllUsers } from '../users/actions';
import { login, register } from './actions';

test('register > registers user', async (t) => {
  await deleteAllUsers();
  const user = await register({
    emailAddress: 'test2@example.com',
    password: 'Test123password!@#',
  });
  t.truthy(user.id);
  t.is(user.emailAddress, 'test2@example.com');
});

test('login > logs in user', async (t) => {
  await deleteAllUsers();
  const user = await register({
    emailAddress: 'test@example.com',
    password: 'Test123password!@#',
  });
  t.truthy(user.id);
  t.is(user.emailAddress, 'test@example.com');

  const token = await login({
    emailAddress: 'test@example.com',
    password: 'Test123password!@#',
  });
  t.truthy(token);
});
