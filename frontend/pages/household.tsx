import PageHeader from '../components/headers/page-header/PageHeader';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import NavBar from '../components/navbar/navbar/NavBar';
import { NextPageWithLayout } from './page';

const Household: NextPageWithLayout = () => {
  return <section>Household</section>;
};

export default Household;

Household.getLayout = (page) => {
  return (
    <PrimaryLayout>
      <PageHeader heading="Household" />
      <div className="px-4">{page}</div>
      <NavBar />
    </PrimaryLayout>
  );
};
