import MealHeroCard from 'components/cards/meal-detail-hero-card/MealDetailHeroCard';
import Form from 'components/forms/react-hook-form-wrapper/Form';
import DetailHeader from 'components/headers/detail-header/DetailHeader';
import BlueHero from 'components/hero/hero/BlueHero';
import TextField from 'components/inputs/textfield/TextField';
import PrimaryLayout from 'components/layouts/primary/PrimaryLayout';
import MealDirections from 'components/meal/meal-directions/MealDirections';
import MealIngredients from 'components/meal/meal-ingredients/MealIngredients';
import { MealStats } from 'components/meal/meal-stats/MealStats';
import { useMealData } from 'hooks/mealsHooks';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'pages/page';
import loader from '../../assets/images/loading-utensils.gif';

const MealDetail: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const mealData = useMealData(typeof id === 'string' ? id : '');

  if (!mealData.data)
    return (
      <div className="w-fulle h-screen flex justify-center items-center">
        <Image src={loader} height={200} width={200} alt="loading..." />
      </div>
    );
  return (
    <>
      <section className="z-30 grid w-full">
        <BlueHero size="sm" />
        <DetailHeader
          leftButtonVariant="back"
          onLeftButtonClick={() => router.back()}
          theme="dark"
        />
        <MealHeroCard
          heading={mealData?.data?.name}
          onClick={() => {}}
          data={{
            image: mealData?.data?.image,
            description: mealData?.data?.description,
          }}
          ingredients={mealData?.data?.ingredients?.length}
          cookTimes={mealData?.data?.timesCooked}
          minutes={mealData?.data?.readyInMinutes}
          mealId={mealData?.data?.id}
        />

        {/* <MealStats meal={mealData?.data} /> */}
        <MealIngredients meal={mealData?.data} isLoading={mealData?.isFetching} />
        <MealDirections meal={mealData?.data} />
      </section>
    </>
  );
};

export default MealDetail;

MealDetail.getLayout = page => {
  return (
    <PrimaryLayout>
      <div className="px-6">{page}</div>
    </PrimaryLayout>
  );
};
