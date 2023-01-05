import FloatingMenu from 'components/buttons/main-util-button/MainUtilityButton';
import MealCard from 'components/cards/meal-card/MealCard';
import ChipFilters from 'components/filters/chip-filter/ChipFilter';
import SearchField from 'components/inputs/search-field/SearchField';
import { useAddMeal, useMealsData } from 'hooks/mealsHooks';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ListHeader from '../../components/headers/list-header/ListHeader';
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import NavBar from '../../components/navbar/navbar/NavBar';
import { NextPageWithLayout } from '../page';

interface IMeal {
  name: string;
  active: boolean;
  id: string;
  image: string;
  seasons: string[] | string;
  onClick: () => void;
}

const Meals: NextPageWithLayout = () => {
  const [searchText, setSearchText] = useState('');
  const { data, isLoading } = useMealsData();
  const addMeal = useAddMeal();

  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <section className="flex flex-col gap-4">
        <ListHeader
          heading="Meals"
          buttonVariant="plus"
          onButtonClick={() => {
            addMeal.mutate();
          }}
          theme="light"
        />
        <FloatingMenu />
        <SearchField
          name="Search"
          label="Search"
          placeholder="Search..."
          onChange={val => setSearchText(val)}
        />
        <ChipFilters options={['summer', 'autumn', 'winter', 'spring']} />
        <div className=" grid grid-cols-2 gap-4 overflow-scroll pb-4">
          {data &&
            data
              .filter((meal: IMeal) => meal.name.includes(searchText))
              .map((meal: IMeal) => (
                <MealCard
                  key={meal.id}
                  title={meal.name}
                  active={false}
                  seasons={['summer']}
                  ingredients={12}
                  image={
                    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=781&q=80'
                  }
                  onClick={() => {
                    router.push(`meals/${meal.id}`);
                  }}
                />
              ))}
        </div>
      </section>
    </>
  );
};

export default Meals;

Meals.getLayout = page => {
  return (
    <PrimaryLayout>
      <div className="px-4">{page}</div>
      <NavBar />
    </PrimaryLayout>
  );
};
