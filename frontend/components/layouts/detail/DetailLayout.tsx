'use client';

import { useIsLoggedIn } from 'hooks/useIsLoggedIn';
import useIsMounted from 'hooks/useIsMounted';
import { useRouter } from 'next/router';
import React from 'react';

export interface IPrimaryLayout {
  children: React.ReactNode;
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({ children }) => {
  const router = useRouter();
  const isLoggedIn = useIsLoggedIn();

  const mounted = useIsMounted();

  if (!mounted) {
    console.log('comon');
    return null;
  }

  if (!isLoggedIn && mounted) {
    router.push('/login');
  }

  return <div className="w-screen bg-[#F5F7FA] text-black pb-[30rem]">{children}</div>;
};

export default PrimaryLayout;