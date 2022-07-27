import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { FontSizes, colors } from 'common';
import { Text } from 'common/components';
import food from 'assets/images/food_ph.png';
import { IoHeartOutline } from 'react-icons/io5';

const Container = styled.div`
  display: flex;
  height: 100px;
  width: 100%;
  background-color: ${props =>
    props.secondary ? colors.secondary_light : colors.secondary};
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  &:hover {
    cursor: pointer;
    box-shadow: ${props =>
      props.hover
        ? 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'
        : ''};
    background-color: ${colors.secondary_light};
  }
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0.6rem 0 0.5rem;
  transition: box-shadow 0.4 ease-in-out;
`;

const ImageContainer = styled.div`
  height: 100px;
  min-height: 100px;
  width: 100px;
  min-width: 100px;
  border-radius: 20px;
  border: 8px solid ${colors.secondary_light};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  object-fit: contain;
  overflow: hidden;
  top: 0;
  background-color: ${colors.grey_light};

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const Placeholder = styled.div`
  height: 100%;
  width: 100%;
  padding: 25%;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Tags = styled.div`
  width: 100%;
  display: flex;
  gap: 0.5rem;
`;

export function MealCardList({ onClick, image, secondary, seasons, name }) {
  const [hover, setHover] = useState(false);

  return (
    <Container
      onClick={() => onClick()}
      // onMouseEnter={() => setHover(true)}
      // onMouseLeave={() => setHover(false)}
    >
      <ImageContainer>
        {image ? (
          <Image src={image} alt="meal image" layout="fill" />
        ) : (
          <Placeholder>
            <Image src={food} alt="meal" />
          </Placeholder>
        )}
      </ImageContainer>

      <Info hover={hover} secondary={secondary}>
        <Wrapper>
          <Text color="white" margin="0" fontSize={FontSizes.Regular}>
            {name}
          </Text>

          <IoHeartOutline size={22.5} color={colors.grey_dark} />
        </Wrapper>

        <Tags>
          {seasons &&
            seasons.map(item => (
              <Text
                color={colors.primary}
                fontSize={FontSizes.Smaller}
                key={item}
              >
                {item}
              </Text>
            ))}
        </Tags>
      </Info>
    </Container>
  );
}
