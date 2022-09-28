import { getCookie } from 'cookies-next';

export const useIsLoggedIn = () => {
  const token = getCookie('token');
  return;
};
