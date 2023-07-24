import { useEffect, useState } from 'react';

const useIsMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return false;

  return true;
};

export default useIsMounted;
