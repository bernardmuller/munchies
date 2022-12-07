import FloatingMenu from 'components/buttons/main-util-button/MainUtilityButton';
import MealCard from 'components/cards/meal-card/MealCard';
import PageContainer from 'components/containers/page-container/PageContainer';
import ChipFilters from 'components/filters/chip-filter/ChipFilter';
import { default as ListHeader } from 'components/headers/list-header/ListHeader';
import SearchField from 'components/inputs/search-field/SearchField';
import PrimaryLayout from 'components/layouts/primary/PrimaryLayout';
import NavBar from 'components/navbar/navbar/NavBar';
import { useAddIngredient, useIngredientsData } from 'hooks/ingredientsHooks';
import { NextPageWithLayout } from 'pages/page';
import { useState } from 'react';
// import { NextPageWithLayout } from './page';

interface IMeal {
  name: string;
  active: boolean;
  id: string;
  image: string;
  seasons: string[] | string;
  onClick: () => void;
}

const Ingredients: NextPageWithLayout = () => {
  return (
    <PageContainer>
      <ListHeader heading="Explore" />
      <FloatingMenu />
      <SearchField />
      <ChipFilters options={['summer', 'autumn', 'winter', 'spring']} />
      <div className=" grid grid-cols-2 gap-4 overflow-scroll pb-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index: number) => (
          <MealCard
            key={index}
            title={'Meal name'}
            active={false}
            seasons={['summer']}
            image={
              'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=781&q=80'
            }
            onClick={() => {}}
            ingredients={['ingredient 1', 'ingredient 2', 'ingredient 3'].length}
          />
        ))}
      </div>
    </PageContainer>
  );
};

export default Ingredients;

Ingredients.getLayout = page => {
  return (
    <PrimaryLayout>
      <div className="px-4">{page}</div>
      <NavBar />
    </PrimaryLayout>
  );
};
