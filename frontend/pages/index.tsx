import PageHeader from '../components/headers/page-header/PageHeader';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import NavBar from '../components/navbar/navbar/NavBar';
import BaseTemplate from '../components/templates/BaseTemplate';
import { NextPageWithLayout } from './page';

const Home: NextPageWithLayout = () => {
  return (
    <div>
      <BaseTemplate sampleTextProp="Munchies" />
    </div>
  );
};

export default Home;

Home.getLayout = (page) => {
  return (
    <PrimaryLayout>
      <PageHeader heading="Heading" />
      <div className="px-4">{page}</div>
      <NavBar />
    </PrimaryLayout>
  );
};
