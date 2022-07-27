import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { H3, Text } from 'common/components';
import { colors, FontSizes } from 'common';
import { IngredientsList } from './IngredientsList';
import { ExtraItems } from './ExtraItems';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Head = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const GroceryList = ({
  mealItems,
  extraItems,
  menuId,
  onReload,
  totalItems,
}) => {
  return (
    <Container>
      <Head>
        <H3 color={colors.white} fontSize={FontSizes.Regular}>
          Grocery list
        </H3>
        <Text color={colors.grey} fontSize={FontSizes.Small}>
          Total Items: {totalItems || '0'}
        </Text>
      </Head>
      <IngredientsList name="Main Ingredients" mealItems={mealItems} />

      <ExtraItems
        name="Extra Items"
        extraItems={extraItems}
        menuId={menuId}
        onReload={onReload}
      />
    </Container>
  );
};
