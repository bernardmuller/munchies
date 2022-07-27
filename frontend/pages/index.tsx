import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect } from 'react';

const Home: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Head>
        <title>Munchies</title>
      </Head>
    </div>
  );
};

export default Home;
