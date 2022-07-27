import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Nav } from 'common/components';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import { colors } from 'common/constants';
import { DeviceMediaQueries } from 'common/device';

const Content = styled.div`
  display: flex;
  width: 100vw;
  position: relative;
  background-color: ${colors.secondary_dark};
  height: 100%;

  @media ${DeviceMediaQueries.laptop} {
    justify-content: center;
  }
`;

const Temp = styled.div`
  display: flex;
  flex-direction: column-reverse;
  height: 100vh;

  @media ${DeviceMediaQueries.laptop} {
    display: flex;
    flex-direction: row;
    height: 100vh;
  }
`;

const Ratio = styled.div`
  width: 100%;
  @media ${DeviceMediaQueries.laptop} {
    width: 50%;
  }
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  position: relative;

  @media ${DeviceMediaQueries.laptop} {
    align-items: center;
  }
`;

export function PublicContainer({ children }) {
  return (
    <Page>
      <Ratio>{children}</Ratio>
    </Page>
  );
}

export function ContentContainer({ children }) {
  const router = useRouter();

  useEffect(() => {
    const auth = async () => {
      const token = getCookie('token');

      if (!token) {
        router.push('/login');
      }
    };
    auth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Content>
      <Ratio>{children}</Ratio>
    </Content>
  );
}

export function PrivateContainer({ children }) {
  return (
    <Temp>
      <Nav />
      <ContentContainer>{children}</ContentContainer>
    </Temp>
  );
}
