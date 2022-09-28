import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ActiveViewProvider } from 'contexts/activeViewContext';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { NextPageWithLayout } from './page';

const queryClient = new QueryClient();

// this should give a better typing
interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || (page => page);

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>,
  );
};

export default MyApp;
