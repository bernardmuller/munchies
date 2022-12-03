import PageHeader from '../components/headers/list-header/ListHeader';
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

const authenticateUser = () => {};

Home.getLayout = page => {
  const currentUserAuthenticated = authenticateUser();

  return (
    <PrimaryLayout>
      {/* <PageHeader heading="Heading" onButtonClick={() => {}} buttonVariant="plus" /> */}
      <div className="px-4">{page}</div>
      {/* <NavBar /> */}
    </PrimaryLayout>
  );
};
