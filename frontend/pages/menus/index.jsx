// import type { NextPage } from "next";
import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Header, Text, Button } from 'common/components';
import { colors, FontSizes, PrivateContainer } from 'common';
import { getMenus, createMenu } from 'api';
import { IoAdd, IoDocumentText } from 'react-icons/io5';
import { ActiveViewContext } from 'contexts/ActiveViewContext';
import { getCookie } from 'cookies-next';
import { Flex, Grid } from '@chakra-ui/react';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: ${props => props.height || '3rem'};
  padding: 0 1rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 6px;
  background-color: ${colors.secondary_light};
`;

const Menu = styled.div`
  width: 100%;
  padding: 0.3rem;
  display: flex;
  background: none;
  border: none;
  font-size: ${FontSizes.Small};
  padding-left: 0.5rem;
  color: ${colors.white};
`;

const MenusContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 1rem 1rem 2rem 1rem;
  gap: 0.5rem;
  ::-webkit-scrollbar {
    width: 0 !important;
  }
`;

const Container = styled.div`
  display: Flex;
  flex-direction: column;
  top: 0;
  width: 100%;
  height: 100%;
  /* background-color: ${colors.white}; */
`;

const MenuButton = ({ menu, onClick }) => {
  const count = menu.meals.length;
  return (
    <Wrapper height="3rem" onClick={() => onClick()}>
      <IoDocumentText size="1.4rem" color={colors.primary_dark} />
      <Menu>{menu.name}</Menu>
      <Text
        fontSize={FontSizes.Small}
        color={colors.grey_dark}
        style={{
          backgroundColor: colors.secondary,
          width: '1.5rem',
          minWidth: '1.5rem',
          height: '1.5rem',
          minHeight: '1.5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '8px',
        }}
      >
        {count}
      </Text>
    </Wrapper>
  );
};

const Menus = ({ data }) => {
  const [menus, setMenus] = useState(data);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const token = getCookie('token');
  const router = useRouter();
  const activeContext = useContext(ActiveViewContext);

  const fetchMenus = async () => {
    setCreating(true);
    await getMenus(token)
      .then(res => setMenus(res))
      .catch(err => console.log(err));
    setLoading(true);
    setLoading(false);
    setCreating(false);
  };

  const newMenu = async () => {
    setCreating(true);
    await createMenu(token).catch(err => console.log(err));
    fetchMenus();
  };

  useEffect(() => {
    activeContext.dispatch({ type: 'MENUS' });
    fetchMenus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {};
  }, []);

  return (
    <PrivateContainer>
      <Head>
        <title>Munchies - Menus</title>
      </Head>
      <Container>
        {!loading && (
          <>
            <Header
              heading="My Menus"
              onRightButtonClick={() => newMenu()}
              RightIcon={IoAdd}
              loading={creating}
            />
            <MenusContainer>
              {menus.length > 0 ? (
                menus.map(menu => (
                  <MenuButton
                    menu={menu}
                    key={menu + Math.random() + Math.random()}
                    onClick={() => {
                      router.push(`/menus/${menu._id}`);
                    }}
                  />
                ))
              ) : (
                <Grid justifyContent="center" gap={2}>
                  <Text fontSize={FontSizes.Small} color={colors.grey}>
                    Nothing to see here yet.
                  </Text>
                  <Button
                    inline
                    color={colors.primary}
                    height="0.5"
                    onClick={() => newMenu()}
                  >
                    Create Menu
                  </Button>
                </Grid>
              )}
            </MenusContainer>
          </>
        )}
      </Container>
    </PrivateContainer>
  );
};

export async function getServerSideProps(context) {
  const { req } = context;
  const { res } = context;
  const token = getCookie('token', { req, res });

  const menus = await getMenus(token);

  return {
    props: {
      data: menus,
    },
  };
}

export default Menus;
