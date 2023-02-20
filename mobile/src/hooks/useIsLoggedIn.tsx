import { getCookie } from 'cookies-next';
import { authenticate } from 'pages/api/auth';

export const useIsLoggedIn = async () => {
  const token = getCookie('token');
  if (!token) return false;

  const authenticated = await authenticate({ token: token as string });
  console.log(authenticated);
  if (!authenticated) {
    return false;
  }

  return true;
};
