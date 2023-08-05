import { login, register } from './actions';
import { describe, expect, it } from 'vitest';
import { db } from '../../db/db';

const UserDTO = {
  email: 'john@doe.com',
  password: 'Tester@123',
  firstName: 'John',
  lastName: 'Doe',
};

describe('AUTH - register', async () => {
  it('should register a new user to the database', async () => {
    await db.user.deleteMany();
    const user = await register(UserDTO);
    expect(
      await db.user.findUnique({
        where: {
          id: user.id,
        },
      }),
    ).toBeTruthy();
  });

  it('should throw an error if the user already exists', async () => {
    await db.user.deleteMany();
    const user = await register(UserDTO);
    expect(
      await db.user.findUnique({
        where: {
          id: user.id,
        },
      }),
    ).toBeTruthy();

    await expect(register(UserDTO)).rejects.toThrowError();
  });

  it('should throw an error if the password is not provided', async () => {
    await db.user.deleteMany();
    await expect(
      register({
        ...UserDTO,
        password: '',
      }),
    ).rejects.toThrowError();
  });

  it('should throw an error if the password is not valid', async () => {
    await db.user.deleteMany();
    await expect(
      register({
        ...UserDTO,
        password: '123',
      }),
    ).rejects.toThrowError();
  });

  it('should throw an error if the email is not valid', async () => {
    await db.user.deleteMany();
    await expect(
      register({
        ...UserDTO,
        email: 'john',
      }),
    ).rejects.toThrowError();
  });

  it('should throw an error if the provided data is incomplete', async () => {
    await db.user.deleteMany();
    await expect(
      register({
        ...UserDTO,
        email: '',
        firstName: '',
        lastName: '',
      }),
    ).rejects.toThrowError();
  });
});

describe('AUTH - login', async () => {
  it('should return a token if the user exists', async () => {
    await db.user.deleteMany();
    const user = await register(UserDTO);
    const response = await login({
      email: user.email,
      password: UserDTO.password,
    });
    expect(response.token).toBeTruthy();
  });
});
