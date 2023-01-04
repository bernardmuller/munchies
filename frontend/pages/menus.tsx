import MainUtilityButton from 'components/buttons/main-util-button/MainUtilityButton';
import MenuCard from 'components/cards/menu-card/MenuCard';
import ChipFilters from 'components/filters/chip-filter/ChipFilter';

import PageHeader from '../components/headers/list-header/ListHeader';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import NavBar from '../components/navbar/navbar/NavBar';
import { NextPageWithLayout } from './page';

const Menus: NextPageWithLayout = () => {
  return (
    <section className="flex flex-col ">
      <PageHeader heading="My Menus" buttonVariant="plus" onButtonClick={() => {}} />
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
