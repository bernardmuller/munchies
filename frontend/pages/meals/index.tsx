import MealCard from 'components/cards/meal-card/MealCard';
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
      <ListHeader
        heading="Meals"
        buttonVariant="plus"
        onButtonClick={() => {
          addMeal.mutate();
        }}
      />
      <section className="px-4 flex flex-col gap-4 pt-4">
        <input
          className="input"
          placeholder="Search meal..."
          onChange={e => setSearchText(e.target.value)}
        />
        <div className=" grid grid-cols-2 gap-4 overflow-scroll pb-4">
          {data &&
            data
              .filter((meal: IMeal) => meal.name.includes(searchText))
              .map((meal: IMeal) => (
                <MealCard
                  key={meal.id}
                  title={meal.name}
                  active={false}
                  seasons={meal.seasons}
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
      {page}
      <NavBar />
    </PrimaryLayout>
  );
};
