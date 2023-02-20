'use client';

import { usePathname } from 'next/navigation';

export const useActiveView = () => {
  const pathname = usePathname();
  return pathname?.split('/')[1];
};
