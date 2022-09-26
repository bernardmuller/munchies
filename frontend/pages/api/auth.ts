import axios from 'axios';
import { setCookie } from 'cookies-next';
import { requireBaseURL } from '../../shared/utils';

export function login(loginInputs: { email: string; password: string }) {
  axios
    .post(`${requireBaseURL()}/auth/login`, loginInputs)
    .then(function (response) {
      if (response.data.token) {
        setCookie('token', response.data.token);
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}
