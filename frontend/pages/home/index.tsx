import PageHeader from '../../components/headers/list-header/ListHeader';
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import NavBar from '../../components/navbar/navbar/NavBar';
import HeroCard from '../../components/cards/hero-card/HeroCard';
import { NextPageWithLayout } from '../page';
import BasicSlider from '../../components/sliders/basic-slider/BasicSlider';
import ChipFilter from 'components/filters/chip-filter/ChipFilter';
import MainUtiltityButton from 'components/buttons/main-util-button/MainUtilityButton';

const Household: NextPageWithLayout = () => {
  return (
    <section className="flex flex-col gap-12 overflow-hidden">
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
      <BasicSlider />
      <ChipFilter />
      <MainUtiltityButton />
    </section>
  );
};

export default Household;

Household.getLayout = page => {
  return (
    <PrimaryLayout>
      <PageHeader heading="Hey <Name>" onButtonClick={() => {}} buttonVariant="plus" />
      <div className="px-4">{page}</div>
      <NavBar />
    </PrimaryLayout>
  );
};
