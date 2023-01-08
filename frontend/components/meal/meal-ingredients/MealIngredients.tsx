import { AddIngredient, Ingredient } from 'components/ingredient/Ingredient';
import { H3, P } from 'components/typography';
import React, { useEffect, useRef } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const MealIngredients = ({ meal, isLoading }: { meal: any; isLoading: boolean }) => {
  const [loadingIngredients, setLoadingIngredients] = React.useState(false);
  // const [listRef] = useAutoAnimate<HTMLDivElement>();

  useEffect(() => {
    if (isLoading) setLoadingIngredients(true);
  }, [isLoading, loadingIngredients]);

  return (
    <div className="w-full prose flex flex-col gap-4 pb-4">
      <div className="w-full flex justify-between items-center py-4">
        <H3 className="m-0 text-black">Ingredients:</H3>
        <P className="m-0 text-secondary_400 ">{meal.ingredients.length} items</P>
      </div>
      <div className="grid gap-1 w-full">
        {meal.ingredients &&
          meal.ingredients.map((ingredient: any, index: number) => (
            <Ingredient key={index} ingredient={ingredient} mealId={meal.id} />
          ))}
        {isLoading && (
          <div className="flex w-full justify-center">
            <P className="text-secondary_400">Loading...</P>
          </div>
        )}
        <AddIngredient
          meal={meal}
          onLoading={loading => {
            if (loading) {
              setLoadingIngredients(true);
            } else {
              setLoadingIngredients(false);
            }
          }}
        />
      </div>
    </div>
  );
};

export default MealIngredients;
