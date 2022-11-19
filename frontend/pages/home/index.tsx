import PageHeader from '../../components/headers/list-header/ListHeader';
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import NavBar from '../../components/navbar/navbar/NavBar';
import HeroCard from '../../components/cards/hero-card/HeroCard';
import { NextPageWithLayout } from '../page';
import BasicSlider from '../../components/sliders/basic-slider/BasicSlider';
import ChipFilter from 'components/filters/chip-filter/ChipFilter';

const Household: NextPageWithLayout = () => {
  return (
    <section className="flex flex-col gap-12 overflow-hidden">
      <HeroCard />
      <BasicSlider />
      <ChipFilter />
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
