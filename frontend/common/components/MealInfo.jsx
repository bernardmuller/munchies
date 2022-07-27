import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import {
  H2,
  Button,
  Text,
  SaveButton,
  CancelButton,
  Input,
} from 'common/components';
import { FontSizes, colors } from 'common';
import Multiselect from 'react-widgets/Multiselect';
import { useForm } from 'react-hook-form';
import { updateMeal, deleteMeal } from 'api';
import food from 'assets/images/food_ph.png';
import { getCookie } from 'cookies-next';
import { Confirmation } from './Confirmation';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: ${props => props.height || ''};
`;

const TagsWrapper = styled.button`
  display: flex;
  align-items: center;
  height: ${props => props.height || ''};
  background: none;
  border: none;
`;

const NameForm = styled.form`
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 0.5rem;
  justify-content: space-between;
  gap: 2rem;

  & > div {
    display: flex;
  }
`;

const StatsContainer = styled.div`
  width: 100%;
  display: flex;
  border: 1px solid ${colors.grey_dark};
  padding: 0.8rem 0.3rem;
  border-radius: 8px;
  margin: 0.5rem 0;
`;

const Stat = styled.div`
  flex: 0.333;
  display: grid;
  text-align: center;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MealImageContainer = styled.div`
  width: 87.5%;
  height: 14rem;
  overflow: hidden;
  border-radius: 20px;
  background-color: ${colors.grey};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30%;
  align-self: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const InfoContainer = styled.div`
  padding: 0 1.5rem;
  width: 100%;
  display: grid;
  align-items: space-between;
  gap: 0.4rem;
`;

const TagsContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 0.3rem;
`;
const TagWrapper = styled.div`
  height: 1.5rem;
  padding: 0 1rem;
  border-radius: 1.25rem;
  background-color: rgb(104, 191, 80, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Placeholder = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 170px;
  }
`;

const SeasonForm = styled.form`
  width: 100%;
  display: flex;
`;

const UploadButtonWrapper = styled.form`
  position: absolute;
  width: 100%;
  height: 20%;
  background-color: rgb(104, 191, 80, 0.9);
  z-index: 100;
  bottom: 0;
  font-size: ${FontSizes.Small};
  color: ${colors.white};
  padding: 0.3rem 1rem;
  align-items: center;

  input[type='file'] {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    &:hover {
      cursor: pointer;
    }
  }

  input[type='text'] {
    background-color: rgb(255, 255, 255, 0.7);
  }
`;

const Name = ({ data, onReload }) => {
  const { register, handleSubmit } = useForm();
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(data.name);
  const token = getCookie('token');

  const handleUpdateName = async nameData => {
    await updateMeal(data._id, nameData, token)
      .then(async () => {
        setEdit(false);
        onReload();
      })
      .catch(err => console.log(err));
  };

  const onSubmit = nameData => {
    handleUpdateName(nameData);
  };

  return (
    <Wrapper>
      {!edit ? (
        <H2
          color={colors.white}
          fontSize={FontSizes.Big}
          margin="0.6rem 0 0 0"
          onClick={() => setEdit(true)}
        >
          {name}
        </H2>
      ) : (
        <NameForm onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Meal name"
            height="2.5rem"
            value={name}
            {...register('name', {
              onChange: e => {
                setName(e.target.value);
              },
            })}
          />
          <div>
            <SaveButton />
            <CancelButton onClick={() => setEdit(false)} />
          </div>
        </NameForm>
      )}
    </Wrapper>
  );
};

const Tags = ({ tags }) => {
  return (
    <TagsContainer>
      {tags ? (
        tags.map(tag => (
          <TagWrapper key={tag + Math.random()}>
            <Text
              color={colors.primary_dark}
              fontSize={FontSizes.Smaller}
              fontWeight="bold"
            >
              {tag}
            </Text>
          </TagWrapper>
        ))
      ) : (
        <Button
          color="#B4D5AB"
          fontSize={FontSizes.Small}
          margin="0"
          primary
          style={{ borderRadius: '20px' }}
        >
          Select seasons
        </Button>
      )}
    </TagsContainer>
  );
};

const MealStats = ({ meal }) => {
  return (
    <StatsContainer>
      <Stat>
        <Text color={colors.white} fontSize={FontSizes.Big} margin="0">
          {meal.ingredients.length || '0'}
        </Text>
        <Text color={colors.grey} fontSize={FontSizes.Smaller} margin="0">
          Ingredients
        </Text>
      </Stat>
      <Stat borders>
        <Text color={colors.white} fontSize={FontSizes.Big} margin="0">
          N/A
        </Text>
        <Text color={colors.grey} fontSize={FontSizes.Smaller} margin="0">
          Prep time
        </Text>
      </Stat>
      <Stat>
        <Text color={colors.white} fontSize={FontSizes.Big} margin="0">
          N/A
        </Text>
        <Text color={colors.grey} fontSize={FontSizes.Smaller} margin="0">
          Serve in
        </Text>
      </Stat>
    </StatsContainer>
  );
};

const Seasons = ({ id, onReload, meal }) => {
  const [seasonsData, setSeasons] = useState(meal.seasons);
  const [edit, setEdit] = useState(false);
  const token = getCookie('token');

  const handleUpdateSeason = async e => {
    e.preventDefault();
    await updateMeal(id, { seasons: seasonsData }, token)
      .then(async () => {
        setEdit(false);
        onReload();
      })
      .catch(err => console.log(err));
  };

  return (
    <Container>
      {!edit ? (
        <Container>
          {seasonsData.length > 0 ? (
            <TagsWrapper onClick={() => setEdit(true)}>
              <Tags tags={seasonsData} />
            </TagsWrapper>
          ) : (
            <Button
              fontSize={FontSizes.Smaller}
              tertiary
              height="2rem"
              borderRadius="4px"
              onClick={() => setEdit(true)}
            >
              Select seasons
            </Button>
          )}
        </Container>
      ) : (
        <SeasonForm onSubmit={handleUpdateSeason}>
          <Multiselect
            placeholder="Select season/s"
            value={seasonsData}
            data={['Summer', 'Autumn', 'Winter', 'Spring', 'All Year']}
            onChange={val => setSeasons(val)}
          />
          <SaveButton margin="0 0 0 0.5rem" />
          <CancelButton onClick={() => setEdit(false)} />
        </SeasonForm>
      )}
    </Container>
  );
};

export const MealInfo = ({ meal, onReload, onHardReload }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const token = getCookie('token');
  const { register, handleSubmit } = useForm();
  const [imageURL, setImageURL] = useState(null);

  const removeMeal = async () => {
    setShowConfirmation(false);
    await deleteMeal(meal._id, token).then(() => onHardReload());
  };

  const uploadImageURL = async () => {
    await updateMeal(meal._id, { image: imageURL }, token).then(() =>
      onReload()
    );
  };

  return (
    <Container>
      {showConfirmation && (
        <Confirmation
          text="Are you sure you want to delete this meal?"
          onConfirm={removeMeal}
          onCancel={() => setShowConfirmation(false)}
        />
      )}

      <MealImageContainer>
        {meal.image ? (
          <Image
            src={meal.image}
            layout="fill"
            objectFit="cover"
            alt="meal image"
          />
        ) : (
          <Placeholder>
            <Image src={food} alt="meal" />
            <UploadButtonWrapper
              enctype="multipart/form-data"
              onSubmit={handleSubmit(uploadImageURL)}
            >
              <Input
                type="text"
                placeholder="Image URL"
                height="2rem"
                {...register('image', {
                  onChange: e => {
                    setImageURL(e.target.value);
                  },
                  required: 'Please provide URL',
                })}
              />
            </UploadButtonWrapper>
          </Placeholder>
        )}
      </MealImageContainer>

      <InfoContainer>
        <Name
          data={meal}
          onReload={() => {
            onReload();
          }}
        />

        <Text color={colors.grey_light} fontSize={FontSizes.Smaller} margin="0">
          Creator: {meal.createdBy.firstname}
        </Text>

        <MealStats meal={meal} />

        <Seasons
          meal={meal}
          id={meal._id}
          onReload={() => {
            onReload();
          }}
        />
      </InfoContainer>
    </Container>
  );
};
