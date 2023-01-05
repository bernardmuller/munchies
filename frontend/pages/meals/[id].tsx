import MealHeroCard from 'components/cards/meal-detail-hero-card/MealDetailHeroCard';
import DetailHeader from 'components/headers/detail-header/DetailHeader';
import BlueHero from 'components/hero/hero/BlueHero';
import PrimaryLayout from 'components/layouts/primary/PrimaryLayout';
import { MealInfo, MealStats } from 'components/meal/meal-info/MealInfo';
import { useMealData } from 'hooks/mealsHooks';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'pages/page';

const MealDetail: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const mealData = useMealData(typeof id === 'string' ? id : '');
  console.log(mealData.data);
  if (!mealData.data) return <div className="w-full h-full ">Loading...</div>;
  return (
    <>
      <section className="z-30 grid">
        <BlueHero size="sm" />
        <DetailHeader
          leftButtonVariant="back"
          onLeftButtonClick={() => router.back()}
          heading={mealData.data?.name}
          theme="dark"
        />
        <MealHeroCard
          heading={mealData?.data?.name}
          onClick={() => {}}
          data={{
            image: mealData?.data?.image,
            description: mealData?.data?.description,
          }}
        />

        <div className="prose flex flex-col gap-2">
          <MealStats meal={mealData?.data} />
        </div>
        {/* <MealDirections meal={mealData.data} /> */}
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
