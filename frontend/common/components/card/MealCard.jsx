import React from 'react';
import styled from 'styled-components';
import { FontSizes, colors } from 'common';
import { Text, H4 } from 'common/components';
import ph from 'assets/images/food_ph.png';
import Image from 'next/image';

const Container = styled.div`
  width: 10.2rem;
  min-width: 10.2rem;
  height: 15rem;
  position: relative;
  justify-self: center;
  overflow: hidden;
  border-radius: 1rem;
  background-color: ${colors.secondary};
  box-shadow: ${props =>
    props.active
      ? 'rgba(104, 191, 80, 0.50) 0px 5px 15px'
      : 'rgba(0, 0, 0, 0.24) 0px 3px 8px;'};
  outline: ${props => props.active && `5px solid ${colors.primary_light}`};

  &:hover {
    cursor: pointer;
  }
  z-index: 1;
`;

const Gradient = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 1rem;
  background-image: linear-gradient(
    0deg,
    rgb(0, 0, 0, 0.9),
    rgb(255, 255, 255, 0)
  );
`;

const ImageContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: -1;
  object-fit: contain;
  overflow: hidden;
  top: 0;
  background-color: ${colors.grey_dark};
`;

const Placeholder = styled.div`
  height: 100%;
  width: 100%;
  padding: 25%;

  img {
    height: 100%;
    object-fit: cover;
  }
`;

export const MealCard = ({ onClick, active, img, name, season }) => {
  return (
    <Container onClick={() => onClick()} active={active}>
      <Gradient active={active}>
        <ImageContainer>
          {img ? (
            <Image src={img} alt="meal image" layout="fill" objectFit="cover" />
          ) : (
            <Placeholder>
              <Image src={ph} alt="meal" />
            </Placeholder>
          )}
        </ImageContainer>

        <H4
          color={colors.white}
          margin="0px 0 0 0"
          fontSize={FontSizes.Regular}
          textAlign="center"
        >
          {name || 'Meal Name'}
        </H4>

        <Text color="#B4DFA8" fontSize={FontSizes.Smaller}>
          {season}
        </Text>
      </Gradient>
    </Container>
  );
};
