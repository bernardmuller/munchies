import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Header, H4, Button, MealCard } from 'common/components';
import { FontSizes, colors, DeviceMediaQueries } from 'common';
import { IoArrowBackOutline } from 'react-icons/io5';
import { getMenu, getMeals, addMealsToMenu } from 'api';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { ActiveViewContext } from 'contexts/ActiveViewContext';
import { ContentContainer } from 'common/hocs';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${colors.secondary_dark};
`;

const Content = styled.div`
  width: 100%;
  padding: 0rem 1rem;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${props => props.height || '3.5rem'};
  padding: 1rem;
`;

const Count = styled.div`
  background-color: ${props =>
    props.disabled ? colors.grey : colors.primary_dark};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.8rem;
  width: 1.8rem;
  border-radius: 0.4rem;
`;

const Waterfall = styled.div`
  width: 100%;
  height: 85vh;
  overflow-y: scroll;
`;

const MealsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 0.5rem;
  padding: 0 1rem;

  @media ${DeviceMediaQueries.tablet} {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media ${DeviceMediaQueries.laptopL} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const MenuMeals = ({ menu, meals, menuMeals }) => {
  const token = getCookie('token');
  const activeContext = useContext(ActiveViewContext);
  const router = useRouter();
  const [selectedMeals, setSelectedMeals] = useState(menuMeals);

  useEffect(() => {
    activeContext.dispatch({ type: 'MEALS' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveNewMeals = async () => {
    await addMealsToMenu(menu._id, { meals: selectedMeals }, token)
      .catch(err => console.log(err))
      .finally(() => router.back());
  };

  return (
    <ContentContainer>
      <Container>
        <Header
          heading="Menu Meals"
          onLeftButtonClick={() => router.back()}
          LeftIcon={IoArrowBackOutline}
        />

        <Content />

        <Wrapper>
          <H4 fontSize={FontSizes.Regular} color={colors.white}>
            Select Meals
          </H4>

          <Button
            primary
            width="6rem"
            disabled={selectedMeals.length === 0}
            gap="0.5rem"
            onClick={saveNewMeals}
          >
            Save
            <Count disabled={selectedMeals.length === 0}>
              {selectedMeals.length || '0'}
            </Count>
          </Button>
        </Wrapper>

        <Waterfall>
          <MealsContainer>
            {meals &&
              meals.map((meal, index) => (
                <MealCard
                  img={meal.image}
                  name={meal.name || 'Meal Name'}
                  active={selectedMeals.includes(meal._id)}
                  season={meal.seasons}
                  count={2}
                  key={meal}
                  onClick={() => {
                    if (selectedMeals.includes(meal._id)) {
                      const temp = selectedMeals.filter(item => {
                        return item !== meal._id;
                      });
                      setSelectedMeals(temp);
                    } else {
                      setSelectedMeals([...selectedMeals, meal._id]);
                    }
                  }}
                />
              ))}
          </MealsContainer>
        </Waterfall>
      </Container>
    </ContentContainer>
  );
};

export async function getServerSideProps(context) {
  const { req } = context;
  const { res } = context;

  const token = getCookie('token', { req, res });
  const meals = await getMeals(token);
  const menu = await getMenu(context.params.id, token);

  let menuMeals = [];
  menu.meals.forEach(meal => {
    menuMeals.push(meal._id);
  });

  return {
    props: {
      menu_id: context.params.id,
      meals,
      menu,
      menuMeals,
    },
  };
}

export default MenuMeals;
