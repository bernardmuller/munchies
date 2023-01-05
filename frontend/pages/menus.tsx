import MainUtilityButton from 'components/buttons/main-util-button/MainUtilityButton';
import HeroCard from 'components/cards/hero-card/HeroCard';
import MenuCard from 'components/cards/menu-card/MenuCard';
import ChipFilters from 'components/filters/chip-filter/ChipFilter';
import BlueHero from 'components/hero/hero/BlueHero';

import PageHeader from '../components/headers/list-header/ListHeader';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import NavBar from '../components/navbar/navbar/NavBar';
import { NextPageWithLayout } from './page';

const Menus: NextPageWithLayout = () => {
  return (
    <section className="flex flex-col ">
      <BlueHero size="sm" />
      <PageHeader heading="My Menus" theme="dark" />
      <HeroCard
        heading="Your current menu"
        onClick={() => {}}
        data={{
          name: '1 - 7 January 2023',
          image:
            'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        }}
        variant="menu"
      />
      <ChipFilters options={['active', 'completed', 'archive']} />

      <div className="pt-4 flex flex-col gap-8 pb-[20rem]">
        {[1, 2, 3, 4, 5].map((item, index) => (
          <MenuCard
            heading="Your current menu"
            onClick={() => {}}
            data={{
              image:
                'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=710&q=80',
              author: 'Firstname Lastname',
              name: '01 - 07 October Menu',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
              ingredients: 180,
              meals: 16,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Menus;

Menus.getLayout = page => {
  return (
    <PrimaryLayout>
      <div className="px-4">{page}</div>
      <MainUtilityButton />
      <NavBar />
    </PrimaryLayout>
  );
};
