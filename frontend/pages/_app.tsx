import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { ActiveViewProvider } from 'contexts/ActiveViewContext';
import theme from 'common/theme';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <ActiveViewProvider>
          <Component {...pageProps} />
        </ActiveViewProvider>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
