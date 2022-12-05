import axios from 'axios';
import { setCookie } from 'cookies-next';
import router from 'next/router';
import { requireBaseURL } from '../../shared/utils';

const processAxiosErrorResponse = (res: any) => {
  return {
    ok: res.status < 300,
    status: res.status,
    message: res.data.error.message,
  };
};

export async function login(loginInputs: { email: string; password: string }) {
  try {
    const response = await axios.post(`${requireBaseURL()}/auth/login`, loginInputs);
    if (response.data.token) {
      setCookie('token', response.data.token);
      router.push('/meals');
    }
  } catch (err: any) {
    return processAxiosErrorResponse(err.response);
  }
}

export async function authenticate(inputs: { token: string }) {
  try {
    const response = await axios.post(`${requireBaseURL()}/auth/authenticate`, inputs);
    if (response) {
      console.log('authenticate: ', response.data);
    }
  } catch (err: any) {
    return processAxiosErrorResponse(err.response);
  }
}
