import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Text } from 'common/components';
import { colors, FontSizes } from 'common';
import { IoCheckboxOutline, IoCheckbox } from 'react-icons/io5';
import { checkItem, unCheckItem } from 'api/itemActions';
import { getCookie } from 'cookies-next';

const Container = styled.div`
  width: 100%;
  display: grid;
`;

const ItemsContainer = styled.ul`
  width: 100%;
  display: flex;
  margin: 0;
  flex-direction: column;
  padding: 0;
  gap: 0.4rem;
`;

const ItemWrapper = styled.li`
  outline: none;
  border: none;
  background: none;
  width: 100%;
  height: 2.5rem;
  padding: 0.3rem 1rem;
  display: flex;
  border-radius: 4px;
  align-items: center;
  box-shadow: ${props =>
    props.checked ? null : 'rgba(0, 0, 0, 0.16) 0px 1px 4px'};
  background-color: ${props =>
    props.checked ? colors.secondary : colors.secondary_light};
`;

const ItemName = styled.span`
  text-decoration: ${props => (props.checked ? 'line-through' : '')};
  color: ${props => props.color};
  margin: ${props => props.margin};
`;

const Item = ({ item }) => {
  const [checked, setChecked] = useState(false);
  const token = getCookie('token');

  const handleCheck = async itemData => {
    setChecked(prev => !prev);
    if (itemData.check) {
      unCheckItem(item._id, token);
    } else {
      checkItem(itemData._id, token);
    }
  };

  useEffect(() => {
    if (item.check) {
      setChecked(true);
    } else {
      setChecked(false);
    }
    return () => {};
  }, []);

  return (
    <ItemWrapper onClick={() => {}} checked={checked}>
      {checked ? (
        <IoCheckbox
          color={colors.primary}
          onClick={() => handleCheck(item)}
          size="22px"
        />
      ) : (
        <IoCheckboxOutline
          color={colors.grey_light}
          onClick={() => handleCheck(item)}
          size={22}
        />
      )}
      <ItemName
        fontSize={FontSizes.Small}
        color={checked ? colors.grey_dark : colors.grey}
        margin="0 0 0 0.5rem"
        checked={checked}
      >
        {item.ingredient.name}
      </ItemName>
    </ItemWrapper>
  );
};

export const IngredientsList = ({ mealItems, name }) => {
  return (
    <Container>
      <Text
        fontSize={FontSizes.Small}
        color={colors.white}
        padding="0.5rem 0"
        style={{ borderBottom: `1px solid ${colors.grey}` }}
      >
        {name}
      </Text>
      <ItemsContainer>
        {mealItems.length > 0 ? (
          <>
            {mealItems.map(item => (
              <Item key={item + Math.random() * 2} item={item} />
            ))}
          </>
        ) : (
          <Text margin="1rem" color={colors.grey} fontSize={FontSizes.Smaller}>
            No meal items yet. First add meals to the menu.
          </Text>
        )}
      </ItemsContainer>
    </Container>
  );
};
