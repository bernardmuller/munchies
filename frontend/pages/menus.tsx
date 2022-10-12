import PageHeader from '../components/headers/list-header/ListHeader';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import NavBar from '../components/navbar/navbar/NavBar';
import { NextPageWithLayout } from './page';

const Menus: NextPageWithLayout = () => {
  return <section>Menus</section>;
};

export default Menus;

Menus.getLayout = page => {
  return (
    <PrimaryLayout>
      <PageHeader heading="Menus" onButtonClick={() => {}} buttonVariant="plus" />
      <div className="px-4">{page}</div>
      <NavBar />
    </PrimaryLayout>
  );
};
