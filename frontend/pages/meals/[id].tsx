import PageHeader from 'components/headers/page-header/PageHeader';
import PrimaryLayout from 'components/layouts/primary/PrimaryLayout';
import { MealDirections } from 'components/meal/meal-directions/MealDirections';
import { MealInfo } from 'components/meal/meal-info/MealInfo';
import NavBar from 'components/navbar/navbar/NavBar';
import { useMealData } from 'hooks/mealsHooks';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'pages/page';

const MealDetail: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const mealData = useMealData(typeof id === 'string' ? id : '');

  return (
    <section className=" pb-96">
      <PageHeader
        heading="Meals"
        leftButton
        leftButtonVariant="back"
        onLeftButtonClick={() => router.back()}
      />
      <div className="px-6">
        <MealInfo meal={mealData.data} />
        <MealDirections meal={{}} />
      </div>
    </section>
  );
};

export default MealDetail;

MealDetail.getLayout = (page) => {
  return (
    <PrimaryLayout>
      {page}
      <NavBar />
    </PrimaryLayout>
  );
};
