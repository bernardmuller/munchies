import MealCard from 'components/cards/meal-card/MealCard';
// import MealHeroCard from 'components/cards/meal-detail-hero-card/MealDetailHeroCard';
// import Form from 'components/forms/react-hook-form-wrapper/Form';
import DetailHeader from 'components/headers/detail-header/DetailHeader';
// import BlueHero from 'components/hero/hero/BlueHero';
// import TextField from 'components/inputs/textfield/TextField';
import PrimaryLayout from 'components/layouts/primary/PrimaryLayout';
// import MealDirections from 'components/meal/meal-directions/MealDirections';
// import MealIngredients from 'components/meal/meal-ingredients/MealIngredients';
// import { format } from 'date-fns';
// import { MealStats } from 'components/meal/meal-stats/MealStats';
// import { useMenuData } from 'hooks/menusHooks';
import { useMealsData } from 'hooks/mealsHooks';
import { useMenuData } from 'hooks/menusHooks';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'pages/page';
import loader from '../../../../assets/images/loading-utensils.gif';

const MealsList: NextPageWithLayout = () => {
  const router = useRouter();
  const mealId = router.query.id;
  const { data, isFetching } = useMealsData();
  const { data: menuData, isFetching: menuIsFetching } = useMenuData(mealId as string);

  if (isFetching)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Image src={loader} height={200} width={200} alt="loading..." />
      </div>
    );
  console.log('data >>>', data);
  return (
    <>
      <section className="z-30 grid w-full prose">
        <DetailHeader
          leftButtonVariant="back"
          onLeftButtonClick={() => router.back()}
          theme="light"
        />
        <h1 className="text-black mb-1">Meals List</h1>
        <div>
          <h3>Meals</h3>
          <div className="grid grid-cols-2 gap-4">
            {data.map((meal: any) => (
              <MealCard
                key={meal.id}
                onClick={() => {}}
                title={meal.name}
                seasons={meal.seasons}
                ingredients={meal.ingredients?.length}
                active={menuData.meals?.includes(meal.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default MealsList;

MealsList.getLayout = page => {
  return (
    <PrimaryLayout>
      <div className="px-6">{page}</div>
    </PrimaryLayout>
  );
};
