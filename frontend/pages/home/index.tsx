import PageHeader from '../../components/headers/page-header/PageHeader';
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import NavBar from '../../components/navbar/navbar/NavBar';
import HeroCard from '../../components/cards/hero-card/HeroCard';
import { NextPageWithLayout } from '../page';
import BasicMealSlider from '../../components/sliders/basic-slider/BasicSlider';
import ChipFilter from 'components/filters/chip-filter/ChipFilter';
import MainUtiltityButton from 'components/buttons/main-util-button/MainUtilityButton';
import { useMealsData } from 'hooks/mealsHooks';

const Home: NextPageWithLayout = () => {
  const { data, isLoading } = useMealsData();
  console.log(data);
  if (isLoading) return <div>Loading...</div>;
  return (
    <section className="flex flex-col gap-8 overflow-hidden">
      <PageHeader
        heading="Hey User"
        image={
          'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80'
        }
        onProfileClick={() => {}}
      />

      <HeroCard
        heading="Your menus"
        onClick={() => {}}
        menu={{
          image:
            'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=710&q=80',
          author: 'Firstname Lastname',
          name: '01 - 07 October Menu',
          ingredients: 180,
          meals: 16,
        }}
      />

      <BasicMealSlider meals={data} heading="Your Meals" onMealClicked={() => {}} />
      <ChipFilter />
      <MainUtiltityButton />
    </section>
  );
};

export default Home;

Home.getLayout = page => {
  return (
    <PrimaryLayout>
      <div className="px-4">{page}</div>
      <NavBar />
    </PrimaryLayout>
  );
};
