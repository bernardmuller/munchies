import { getCookie } from 'cookies-next';

export const requireBaseURL = () => {
  return process.env.ENV_NODE === 'development'
    ? 'http://localhost:5000/api'
    : process.env.MUNCHIES_API_URL;
};

export const requireAuthHeader = () => {
  const token = getCookie('token');
  return 'Bearer ' + token;
};

export const requireHeaders = () => {
  return {
    ContentType: 'Application/json',
    Authorization: requireAuthHeader(),
  };
};
