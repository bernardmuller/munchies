import { getCookie } from 'cookies-next';
import { authenticate } from 'pages/api/auth';

export const useIsLoggedIn = () => {
  const token = getCookie('token');
  if (!token) return false;

  const authenticated = authenticate({ token: token as string });
  if (!authenticated) {
    return false;
  }

  return true;
};
