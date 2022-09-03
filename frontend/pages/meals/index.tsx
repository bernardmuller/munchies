import { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import { IoAdd } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { colors, FontSizes, PrivateContainer } from '../../common';
import { MealCardList, Text, Header, Button } from '../../common/components';
import { ActiveViewContext } from '../../contexts/ActiveViewContext';
import { Stack } from '@mui/material';
import { apiRequest } from 'api/utils';
import { useQuery } from '@tanstack/react-query';
import { Typography } from '@material-ui/core';

function Meals() {
  const router = useRouter();
  const activeContext = useContext(ActiveViewContext);

  const { data, isError, error, isLoading } = useQuery(
    ['meals'],
    async () => await apiRequest('getMeals', {}, {})
  );

  useEffect(() => {
    activeContext.dispatch({ type: 'MEALS' });
    return () => {};
  }, []);

  if (isError) return <Text>Error: {error}</Text>;

  return (
    <PrivateContainer>
      <Head>
        <title>Munchies - Meals</title>
      </Head>
      <Stack>
        <Header
          heading="My Meals"
          onRightButtonClick={() => {}}
          RightIcon={IoAdd}
          // loading={creating}
        />
        {isLoading ? (
          <Text color={colors.grey_light}>Loading...</Text>
        ) : (
          <Stack p={2} style={{ gap: '1rem' }}>
            {data ? (
              data.map(meal => (
                <MealCardList
                  image={meal.image}
                  name={meal.name}
                  seasons={meal.seasons}
                  count={false}
                  key={meal.id}
                  onClick={() => router.push(`/meals/${meal.id}`)}
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
          </Stack>
        )}
      </Stack>
    </PrivateContainer>
  );
}

export default Meals;
