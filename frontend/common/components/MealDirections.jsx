import React, { useState, useEffect } from 'react';
import 'react-widgets/styles.css';
import styled from 'styled-components';
import DropdownList from 'react-widgets/DropdownList';
import {
  H3,
  Text,
  TextArea,
  EditButton,
  SaveButton,
  CancelButton,
  Input,
  Button,
  Loader,
} from 'common/components';
import { FontSizes, colors } from 'common';
import { useForm } from 'react-hook-form';
import {
  updateIngredient,
  getMeal,
  removeIngredient,
  updateMeal,
  getIngredients,
  addIngredient,
} from 'api';
import { getCookie } from 'cookies-next';
import { Grid } from '@chakra-ui/react';

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
  background-color: ${colors.secondary_light};
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

const Item = ({ data, onDelete, onReload }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [edit, setEdit] = useState(false);
  const [hover, setHover] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(data.name);
  const token = getCookie('token');

  const onSubmit = async submitData => {
    setEdit(false);
    setLoading(true);
    await updateIngredient(submitData._id, submitData, token)
      .then(async () => {
        await onReload();

        setLoading(false);
      })
      .catch(err => console.log(err));
  };

  if (edit) {
    return (
      <ItemContainerForm onSubmit={handleSubmit(onSubmit)}>
        <Input
          value={value}
          height="2rem"
          {...register('name')}
          onChange={e => setValue(e.target.value)}
        />
        <UtilityWrapper>
          {loading ? <Loader /> : <SaveButton />}
          <CancelButton onClick={() => setEdit(false)} />
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
      <Text fontSize={FontSizes.Small} color={colors.grey}>
        {data.name}
      </Text>

      {hover && !edit && (
        <UtilityWrapper>
          <EditButton
            onClick={() => {
              setEdit(true);
            }}
          />
          <CancelButton
            color={colors.danger}
            onClick={() => onDelete(data._id)}
          />
        </UtilityWrapper>
      )}
    </ItemContainer>
  );
};

const AddItem = ({ meal, onReload }) => {
  const [add, setAdd] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const token = getCookie('token');

  const fetchIngredients = async () => {
    const response = await getIngredients(token);
    setIngredients(response);
  };

  useEffect(() => {
    fetchIngredients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onAddIngredient = async e => {
    e.preventDefault();
    await addIngredient(meal._id, selectedIngredient._id, token)
      .then(res => {
        setSelectedIngredient(null);
        onReload();
      })
      .catch(err => console.log(err));
  };

  return (
    <Wrapper>
      {!add ? (
        <Button inline onClick={() => setAdd(true)}>
          <Text fontSize={FontSizes.Smaller} color={colors.grey_dark}>
            + Add Ingredient
          </Text>
        </Button>
      ) : (
        <Form onSubmit={onAddIngredient}>
          <DropdownList
            placeholder="Search for ingredient"
            data={ingredients}
            dataKey="_id"
            textField="name"
            onChange={val => setSelectedIngredient(val)}
          />
          <UtilityWrapper>
            <SaveButton />
            <CancelButton onClick={() => setAdd(false)} />
          </UtilityWrapper>
        </Form>
      )}
    </Wrapper>
  );
};

export const MealDirections = ({ onReload, onDelete, meal }) => {
  const [edit, setEdit] = useState(false);
  const [hover, setHover] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [ingredients, setIngredients] = useState(meal.ingredients);
  const [directions, setDirections] = useState(meal.directions);
  const [addStep, setAddStep] = useState(false);
  const [newStep, setNewStep] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const token = getCookie('token');

  const fetchIngredients = async () => {
    await getMeal(meal._id, token)
      .then(data => setIngredients(data.ingredients))
      .catch(err => console.log(err));
  };
  const handleDeleteIngredient = async id => {
    await removeIngredient(meal._id, id, token)
      .then(async () => {
        fetchIngredients();
      })
      .catch(err => console.log(err));
  };

  const handleAddStep = async e => {
    e.preventDefault();
    let Arr = directions;
    Arr.push(newStep);
    await updateMeal(meal._id, { directions: Arr }, token)
      .then(async () => {
        onReload();
      })
      .catch(err => console.log(err));
  };

  const handleUpdateDirections = async data => {
    await updateMeal(meal._id, data)
      .then(async () => {
        onReload();
      })
      .catch(err => console.log(err));
  };

  const onDirectionsSubmit = data => {
    handleUpdateDirections(data);
  };

  return (
    <Container>
      <SubContainer>
        <Header>
          <H3 color={colors.white} fontSize={FontSizes.Regular}>
            Ingredients
          </H3>
        </Header>
        <Grid gap={2}>
          {ingredients &&
            ingredients.map(item => (
              <Item
                key={item + Math.random()}
                data={item}
                onDelete={id => handleDeleteIngredient(id)}
                onReload={() => fetchIngredients()}
              />
            ))}

          <AddItem meal={meal} onReload={() => fetchIngredients(token)} />
        </Grid>
      </SubContainer>

      <SubContainer>
        <Header>
          <H3 color={colors.white} fontSize={FontSizes.Regular}>
            Directions
          </H3>
        </Header>
        <>
          <Steps>
            {directions &&
              directions.map((step, index) => (
                <Step key={step}>
                  {!edit ? (
                    <>
                      <Text color="#ABBBC2" fontSize={FontSizes.Small}>
                        {step}
                      </Text>
                      {hover && !edit && (
                        <>
                          <EditButton
                            onClick={() => {
                              setEdit(true);
                              setEditIndex(index);
                            }}
                          />
                          <CancelButton
                            color={colors.danger}
                            onClick={() => onDelete()}
                          />
                        </>
                      )}
                    </>
                  ) : (
                    <DirectionsForm onSubmit={handleSubmit(onDirectionsSubmit)}>
                      <TextArea
                        value={directions[editIndex]}
                        {...register('directions', {
                          onChange: e => {
                            setDirections(e.target.value);
                          },
                        })}
                      />
                      <UtilityWrapper>
                        <SaveButton />

                        <CancelButton onClick={() => setEdit(false)} />
                      </UtilityWrapper>
                    </DirectionsForm>
                  )}
                </Step>
              ))}
          </Steps>
          {!addStep ? (
            <Button
              inline
              onClick={() => setAddStep(true)}
              style={{ marginBottom: '2rem' }}
            >
              <Text fontSize={FontSizes.Smaller} color={colors.grey_dark}>
                + Add Step
              </Text>
            </Button>
          ) : (
            <Form onSubmit={handleAddStep}>
              <TextArea
                placeholder="Step directions"
                onChange={e => setNewStep(e.target.value)}
              />

              <UtilityWrapper>
                <SaveButton />

                <CancelButton
                  onClick={() => {
                    setAddStep(false);
                  }}
                />
              </UtilityWrapper>
            </Form>
          )}
        </>
      </SubContainer>
    </Container>
  );
};
