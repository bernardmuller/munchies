import { useRouter } from 'next/router';

export const useActiveView = () => {
  const { pathname } = useRouter();
  return pathname.split('/')[1];
};
