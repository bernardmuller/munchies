import MealCard from 'components/cards/meal-card/MealCard';
import { useAddMeal, useMealsData } from 'hooks/mealsHooks';
import { useRouter } from 'next/router';
import { useState } from 'react';
import PageHeader from '../components/headers/page-header/PageHeader';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import NavBar from '../components/navbar/navbar/NavBar';
import { NextPageWithLayout } from './page';

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
      <PageHeader
        heading="Meals"
        rightButton
        rightButtonVariant="plus"
        onRightButtonClick={() => {
          addMeal.mutate();
        }}
      />
      <section className="px-8 flex flex-col gap-4 pt-4">
        <input
          className="input"
          placeholder="Search meal..."
          onChange={e => setSearchText(e.target.value)}
        />
        <div className=" grid grid-cols-2 gap-4 overflow-scroll pb-28">
          {data &&
            data
              .filter((meal: IMeal) => meal.name.includes(searchText))
              .map((meal: IMeal) => (
                <MealCard
                  key={meal.id}
                  title={meal.name}
                  active={false}
                  seasons={meal.seasons}
                  image={meal?.image}
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
      {page}
      <NavBar />
    </PrimaryLayout>
  );
};
