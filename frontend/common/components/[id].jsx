import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Header } from 'common/components';
import MealDirections from 'common/componentsMealDirections';
import MealInfo from 'common/components/MealInfo';
import { IoArrowBackOutline } from 'react-icons/io5';
import { IoTrashOutline } from 'react-icons/io5';
import Confirmation from 'common/componentsConfirmation';
import { getMeal, deleteMeal } from 'api';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { ActiveViewContext } from 'contexts/ActiveViewContext';

const MealDetail = props => {
  const token = getCookie('token');
  const activeContext = useContext(ActiveViewContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [meal, setMeal] = useState(props.meal);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    activeContext.dispatch({ type: 'MEALS' });
  }, []);

  const removeMeal = async () => {
    setShowConfirmation(false);
    setLoading(true);
    await deleteMeal(meal._id, token).then(() => {
      router.push('/meals');
      setLoading(false);
    });
  };

  const fetchMeal = async () => {
    setLoading(true);
    await getMeal(meal._id, token)
      .then(data => setMeal(data))
      .catch(err => console.log(err));
    setLoading(false);
  };

  return (
    <Container>
      <Header
        heading="Meal Detail"
        onLeftButtonClick={() => router.back()}
        onRightButtonClick={() => setShowConfirmation(true)}
        RightIcon={IoTrashOutline}
        LeftIcon={IoArrowBackOutline}
        loading={loading}
      />

      {showConfirmation && (
        <Confirmation
          text="Are you sure you want to delete this meal?"
          onConfirm={removeMeal}
          onCancel={() => setShowConfirmation(false)}
        />
      )}

      {meal && (
        <>
          <MealInfo
            meal={meal}
            onClose={props.onClose}
            onReload={() => fetchMeal()}
            // onHardReload={() => props.onHardReload()}
          />

          <MealDirections meal={meal} onReload={() => fetchMeal()} />
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;

  const token = getCookie('token', { req, res });
  const meal = await getMeal(context.params.id, token);

  return {
    props: {
      meal: meal,
    },
  };
}

export default MealDetail;
