import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { getCookie } from 'cookies-next';
import { MealCardList, Text, Header, Button } from 'common/components';
import { createMeal, getMeals } from 'api';
import { colors, FontSizes, PrivateContainer } from 'common';
import { IoAdd } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { ActiveViewContext } from 'contexts/ActiveViewContext';

const MealsContainer = styled.div`
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
`;

function Meals({ data }) {
  const token = getCookie('token');
  const [creating, setCreating] = useState(false);
  const router = useRouter();
  const [meals, setMeals] = useState(data);

  const activeContext = useContext(ActiveViewContext);

  const fetchData = async () => {
    const res = await getMeals(token);
    setMeals(res);
    setCreating(false);
  };

  useEffect(() => {
    activeContext.dispatch({ type: 'MEALS' });
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {};
  }, []);

  const handleCreateMeal = async () => {
    setCreating(true);
    const res = await createMeal(token);
    if (res) fetchData();
  };

  return (
    <PrivateContainer>
      <Head>
        <title>Munchies - Meals</title>
      </Head>
      <Container>
        <Header
          heading="My Meals"
          onRightButtonClick={() => handleCreateMeal()}
          RightIcon={IoAdd}
          loading={creating}
        />
        <MealsContainer>
          {meals.length > 0 ? (
            meals.map(meal => (
              <MealCardList
                image={meal.image}
                name={meal.name}
                seasons={meal.seasons}
                count={false}
                key={meal + Math.random()}
                onClick={() => router.push(`/meals/${meal._id}`)}
              />
            ))
          ) : (
            <>
              <Text
                fontSize={FontSizes.Small}
                color={colors.grey_light}
                textAlign="center"
              >
                You do not have any meals in your collection.
              </Text>
              <Button inline color={colors.primary}>
                Create Meal
              </Button>
            </>
          )}
        </MealsContainer>
      </Container>
    </PrivateContainer>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const { res } = context;
  const token = getCookie('token', { req, res });

  const data = await getMeals(token);

  return {
    props: {
      data,
    },
  };
}

export default Meals;
