import { Alert, AlertTitle } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Toast } from 'components/alerts/toast-alert/Toast';
import Form from 'components/forms/react-hook-form-wrapper/Form';
import TextField from 'components/inputs/textfield/TextField';
import { useState } from 'react';
import Button from '../../components/buttons/button/Button';
import { login } from '../api/auth';

// TODO : reffactor to use React Query and elogin funcitonality to custom hooks

const Login = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    const loginRes = await login(data);
    setLoading(false);
    if (!loginRes?.ok) {
      setError(loginRes?.message);
    }
  };

  return (
    <div className="w-full h-screen bg-secondary prose p-4 pt-8">
      <h1 className="text-white text-center">Munchies</h1>
      <h2 className="ml-4">Login</h2>
      {error && <Toast variant="filled" severity="error" message={error} />}
      <Form onSubmit={onSubmit} className="px-4 flex flex-col gap-6 ">
        <TextField name="email" label="Email" type="text" placeholder="me@email.com" />
        <TextField name="password" label="Password" type="password" placeholder="**********" />
        <Button type="submit" label="Login" isLoading={loading} />
      </Form>
    </div>
  );
};

export default Login;
