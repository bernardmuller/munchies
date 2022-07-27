import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { ActiveViewProvider } from 'contexts/ActiveViewContext';
import theme from 'common/theme';
import { useRouter } from 'next/router';
import ScreenLoader from 'common/components/loadingModal';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router]);

  // if (pageLoading) return <>Loading</>;

  return (
    <ChakraProvider theme={theme}>
      <ActiveViewProvider>
        <Component {...pageProps} />
      </ActiveViewProvider>
    </ChakraProvider>
  );
}

export default MyApp;
