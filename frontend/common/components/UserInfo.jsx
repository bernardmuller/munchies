import React, { useState } from 'react';
import styled from 'styled-components';
import pp from 'assets/images/user.png';
import { colors, FontSizes } from 'common';
import { H2, Text, Loader } from 'common/components';
import Image from 'next/image';

const ImageContainer = styled.div`
  height: 150px;
  width: 150px;
  overflow: hidden;
  position: relative;
  background-color: ${colors.grey};
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StatsContainer = styled.div`
  height: 4rem;
  width: 100%;
  display: flex;
  align-items: center;
`;

const Stat = styled.div`
  flex: 0.333;
  border-left: ${props => (props.borders ? '1px solid grey' : '')};
  border-right: ${props => (props.borders ? '1px solid grey' : '')};
  display: grid;
  text-align: center;
  padding: 0.5rem;
`;

const Placeholder = styled.div`
  height: 150px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.grey};
  border-radius: 50%;
  overflow: hidden;

  img {
    padding: 10%;
    width: 80%;
    height: 80%;
    object-fit: cover;
  }
`;

export const UserInfo = ({ user, loading }) => {
  return (
    <Container>
      <ImageContainer>
        {user.image ? (
          <Image
            src={user.image}
            alt="profile picture"
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <Image
            src={pp}
            alt="profile picture"
            objectFit="contain"
            height="100"
            width="100"
          />
        )}
      </ImageContainer>
      <H2
        fontSize={FontSizes.Bigger}
        color={colors.white}
        textAlign="center"
        margin="1rem 0 0 0"
      >
        {user.firstname || 'Firstname'} {user.lastname || 'Lastname'}
      </H2>

      <Text
        fontSize={FontSizes.Smaller}
        color={colors.grey}
        margin="0 0 1rem 0"
      >
        {!loading && user.email}
      </Text>

      <StatsContainer>
        <Stat>
          <Text color={colors.white} fontSize={FontSizes.Big}>
            {user.menus && user.menus.length}
          </Text>
          <Text color={colors.grey} fontSize={FontSizes.Smaller}>
            Menus
          </Text>
        </Stat>
        <Stat borders>
          <Text color={colors.white} fontSize={FontSizes.Big}>
            {user.meals && user.meals.length}
          </Text>
          <Text color={colors.grey} fontSize={FontSizes.Smaller}>
            Meals
          </Text>
        </Stat>
        <Stat>
          <Text color={colors.white} fontSize={FontSizes.Big}>
            N/A
          </Text>
          <Text color={colors.grey} fontSize={FontSizes.Smaller}>
            Favourites
          </Text>
        </Stat>
      </StatsContainer>
    </Container>
  );
};
