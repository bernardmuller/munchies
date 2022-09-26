import PageHeader from '../components/headers/page-header/PageHeader';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import NavBar from '../components/navbar/navbar/NavBar';
import { NextPageWithLayout } from './page';

const Settings: NextPageWithLayout = () => {
  return <section>Settings</section>;
};

export default Settings;

Settings.getLayout = (page) => {
  return (
    <PrimaryLayout>
      <PageHeader heading="Settings" />
      <div className="px-4">{page}</div>
      <NavBar />
    </PrimaryLayout>
  );
};
