import PageHeader from '../components/headers/page-header/PageHeader';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import NavBar from '../components/navbar/navbar/NavBar';
import { NextPageWithLayout } from './page';

const Menus: NextPageWithLayout = () => {
  return <section>Menus</section>;
};

export default Menus;

Menus.getLayout = (page) => {
  return (
    <PrimaryLayout>
      <PageHeader heading="Menus" />
      <div className="px-4">{page}</div>
      <NavBar />
    </PrimaryLayout>
  );
};
