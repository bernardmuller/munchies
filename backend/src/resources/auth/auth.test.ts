import test from 'ava';
import { deleteAllUsers } from '../users/actions';
import { login, register } from './actions';

test('register > registers user', async (t) => {
  await deleteAllUsers();
  const user = await register({
    email: 'test2@example.com',
    password: 'Test123password!@#',
  });
  t.truthy(user.id);
  t.is(user.email, 'test2@example.com');
});

test('login > logs in user', async (t) => {
  await deleteAllUsers();
  const user = await register({
    email: 'test@example.com',
    password: 'Test123password!@#',
  });
  t.truthy(user.id);
  t.is(user.email, 'test@example.com');

  const token = await login({
    email: 'test@example.com',
    password: 'Test123password!@#',
  });
  t.truthy(token);
});
