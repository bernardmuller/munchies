import React, { useEffect, useState } from 'react';
import { IngredientsList } from '../ingredientslist';

export const GroceryList = ({
  mealItems,
  extraItems,
  menuId,
  onReload,
  totalItems,
}: {
  mealItems: any;
  extraItems: any;
  menuId: string;
  onReload: () => void;
  totalItems: number;
}) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center w-full">
        <h3 className="text-black m-0">Grocery list</h3>
        <p className="text-secondary_300 m-0">Total Items: {totalItems || '0'}</p>
      </div>
      <IngredientsList name="Main Ingredients" mealItems={mealItems} />
    </div>
  );
};

// <ExtraItems name="Extra Items" extraItems={extraItems} menuId={menuId} onReload={onReload} />
