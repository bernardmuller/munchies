import { useMutation } from '@tanstack/react-query';
import router from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../components/buttons/button/Button';
import { login } from '../api/auth';

type Inputs = {
  email: string;
  password: string;
};

const useLogin = (inputs: Inputs) => {
  return useMutation((loginInput) => {
    return login(loginInput);
  });
};

const Login = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<Inputs>();
  const login = useLogin();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    login.mutate(data, {
      onSuccess: () => {
        router.push('/meals');
      },
    });
  };

  return (
    <div className="w-full h-screen bg-secondary prose p-4 pt-8">
      <h1 className="text-white text-center">Munchies</h1>
      <h2 className="ml-4">Login</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-4 flex flex-col gap-4"
      >
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="text"
            value="me@bernardmuller.dev"
            placeholder="me@email.com"
            className="input input-bordered input-lg w-full"
            {...register('email', { required: true })}
          />
        </div>
        <div className="form-control w-full mb-8">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            value="Tester@123"
            placeholder="**********"
            className="input input-bordered input-lg w-full"
            {...register('password', { required: true })}
          />
        </div>
        <Button type="submit" label="Login" />
      </form>
    </div>
  );
};

export default Login;
