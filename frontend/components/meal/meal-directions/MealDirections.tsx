import { useEffect, useState } from 'react';
// import 'react-widgets/styles.css';
import styled from 'styled-components';
// import DropdownList from 'react-widgets/DropdownList';

// import { FontSizes, colors } from 'common';
import { useForm } from 'react-hook-form';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from 'components/buttons/button/Button';
import UtilityButton from 'components/buttons/utility-button/UtilityButton';
import { useAddIngredientToMeal } from 'hooks/ingredientsHooks';
import { debounce } from 'lodash';
import { fetchIngredients } from 'pages/api/ingredients';
import ReactSelect from 'react-select';
import { colors } from 'shared/colors';
import { H3, P } from 'components/typography';
import { TextField } from '@mui/material';
import { useAddDirectionToMeal } from 'hooks/mealsHooks';
import DeleteWrapper from 'components/containers/delete-wrapper/DeleteWrapper';
import { removeDirectionFromMeal } from 'pages/api/meals';

// import { Grid } from '@chakra-ui/react';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  margin: 0 0 0.5rem 0;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const Container = styled.div`
  width: 100%;
  padding: 0rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Steps = styled.div`
  width: 100%;
  list-style-position: outside;
  color: white;
`;

const Step = styled.div`
  width: 100%;
  display: flex;
  margin: 0 0 0.5rem 0;
  gap: 0.3rem;
`;

const SubContainer = styled.div`
  width: 100%;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UtilityWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const DirectionsForm = styled.form`
  width: 100%;
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2.5rem;
  padding: 0 0 0 1rem;
  background-color: ${colors.secondary_l};
  border-radius: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const ItemContainerForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2.5rem;
  padding: 0 0 0 1rem;
  gap: 1rem;
`;

const Item = ({ data, onDelete }: { data: any; onDelete: any }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [edit, setEdit] = useState(false);
  const [hover, setHover] = useState(false);
  const [value, setValue] = useState(data.name);

  if (edit) {
    return (
      <ItemContainerForm onSubmit={() => {}}>
        <input
          className=""
          value={value}
          {...register('name')}
          onChange={e => setValue(e.target.value)}
        />
        <UtilityWrapper>
          <UtilityButton type="button" variant="save" onClick={() => {}} theme="light" />
          <UtilityButton
            type="button"
            variant="close"
            onClick={() => {
              setEdit(false);
            }}
            theme="light"
          />
        </UtilityWrapper>
      </ItemContainerForm>
    );
  }

  return (
    <ItemContainer
      onClick={() => setHover(true)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <span>{data.name}</span>

      {hover && !edit && (
        <UtilityWrapper>
          <UtilityButton type="button" variant="save" onClick={() => {}} theme="light" />

          <UtilityButton
            type="button"
            variant="close"
            onClick={() => {
              onDelete();
            }}
            theme="light"
          />
        </UtilityWrapper>
      )}
    </ItemContainer>
  );
};

export const MealDirections2 = ({ meal }: { meal: any }) => {
  const [edit, setEdit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [directions, setDirections] = useState(meal?.directions);
  const [addStep, setAddStep] = useState(false);
  const [newStep, setNewStep] = useState('');

  return (
    <SubContainer>
      <Header>
        <h3>Directions</h3>
      </Header>
      <>
        <Steps>
          {directions &&
            directions.map((step: any) => (
              <Step key={step}>
                {!edit ? (
                  <>
                    <span>{step}</span>
                    {!edit && (
                      <>
                        <UtilityButton
                          type="button"
                          variant="save"
                          onClick={() => {}}
                          theme="light"
                        />
                        <UtilityButton
                          type="button"
                          variant="close"
                          onClick={() => {
                            setEdit(false);
                          }}
                          theme="light"
                        />
                      </>
                    )}
                  </>
                ) : (
                  <DirectionsForm onSubmit={() => {}}>
                    <input
                      type="textarea"
                      value={''}
                      {...register('directions', {
                        onChange: e => {
                          setDirections(e.target.value);
                        },
                      })}
                    />
                    <UtilityWrapper>
                      <UtilityButton
                        type="button"
                        variant="save"
                        onClick={() => {}}
                        theme="light"
                      />
                      <UtilityButton
                        type="button"
                        variant="close"
                        onClick={() => {
                          setEdit(false);
                        }}
                        theme="light"
                      />
                    </UtilityWrapper>
                  </DirectionsForm>
                )}
              </Step>
            ))}
        </Steps>
        {!addStep ? (
          <Button type="button" secondary onClick={() => setAddStep(true)} label="Add Step" />
        ) : (
          <Form>
            <input
              type="textarea"
              placeholder="Step directions"
              onChange={e => setNewStep(e.target.value)}
            />

            <UtilityWrapper>
              <UtilityButton type="button" variant="save" onClick={() => {}} theme="light" />
              <UtilityButton
                type="button"
                variant="close"
                onClick={() => {
                  setAddStep(false);
                }}
                theme="light"
              />
            </UtilityWrapper>
          </Form>
        )}
      </>
    </SubContainer>
  );
};

const Direction = ({
  direction,
  mealId,
  index,
}: {
  mealId: string;
  direction: any;
  index: number;
}) => {
  const mutation = useMutation(removeDirectionFromMeal);
  const queryClient = useQueryClient();
  return (
    <div className="flex flex-col  ">
      <DeleteWrapper
        handleDelete={() => {
          mutation.mutate(
            {
              mealId: mealId,
              directionIndex: index,
            },
            {
              onSuccess: () => {
                queryClient.invalidateQueries([`meal-${mealId}`]);
              },
            },
          );
        }}
        height={40}
      >
        <div className="flex items-center bg-white_d rounded-lg py-1">
          <div className="h-[1px] w-full bg-secondary_500" />

          <div className="w-8 h-8 mx-2 px-3 rounded-lg bg-primary_100 flex justify-center items-center text-primary_400">
            {index + 1}
          </div>

          <div className="h-[1px] w-full bg-secondary_500" />
        </div>
      </DeleteWrapper>
      <div className="px-2">
        <P className="text-black">{direction}</P>
      </div>
    </div>
  );
};

const MealDirections = ({ meal }: { meal: any }) => {
  return (
    <div className="w-full prose flex flex-col gap-4">
      <div className="w-full flex justify-between items-center py-4">
        <H3 className="m-0 text-black">Directions:</H3>
        <P className="m-0 text-secondary_400 ">{meal?.directions?.length || '0'} Steps</P>
      </div>
      <div className="grid gap-1 w-full">
        {meal.directions &&
          meal.directions.map((direction: any, index: number) => (
            <Direction key={index} direction={direction} mealId={meal.id} index={index} />
          ))}
        {/* {isLoading && (
          <div className="flex w-full justify-center">
            <P className="text-secondary_400">Loading...</P>
          </div>
        )} */}
        <AddDirection meal={meal} />
      </div>
    </div>
  );
};

export default MealDirections;

export const AddDirection = ({ meal }: { meal: any }) => {
  const [add, setAdd] = useState(false);
  const [direction, setDirection] = useState('');
  const mutation = useAddDirectionToMeal(meal.id);
  const queryClient = useQueryClient();

  if (!add)
    return (
      <div className="flex justify-center px-4 py-3 bg-secondary_400/40 rounded-lg items-center">
        <button className="text-secondary_500" onClick={() => setAdd((prev: boolean) => !prev)}>
          Add Direction +
        </button>
      </div>
    );

  return (
    <div className="flex justify-center px-4 py-3 bg-secondary_400/40 rounded-lg items-center">
      <form className="flex w-full items-center justify-between gap-1">
        <div className="flex w-full">
          <div className="w-full flex justify-between items-center gap-4">
            <TextField
              name="direction"
              label="Direction"
              type="text"
              autoFocus
              placeholder="Add Direction..."
              onChange={(e: any) => {
                setDirection(e.target.value);
              }}
              className="w-full"
            />
            <UtilityButton
              type="button"
              variant="save"
              theme="light"
              onClick={() => {
                mutation.mutate(
                  { mealId: meal.id, direction: direction },
                  {
                    onSuccess: () => {
                      setAdd(false);
                    },
                  },
                );
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
