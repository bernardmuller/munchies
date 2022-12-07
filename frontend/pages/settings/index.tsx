import SettingsButton from 'components/buttons/settings-option/SettingsOption';
import PageContainer from 'components/containers/page-container/PageContainer';
import PageHeader from 'components/headers/page-header/PageHeader';
import PrimaryLayout from 'components/layouts/primary/PrimaryLayout';
import NavBar from 'components/navbar/navbar/NavBar';
import { NextPageWithLayout } from '../page';
import { useRouter } from 'next/router';

const settingsOptions = [
  { label: 'Manage Household' },
  { label: 'Admin Panel' },
  { label: 'Preferences' },
];

const Settings: NextPageWithLayout = () => {
  const router = useRouter();
  return (
    <PageContainer>
      {/* <DetailHeader heading="Settings" onLeftButtonClick={() => {}} leftButtonVariant="arrowLeft" /> */}
      <PageHeader heading="Settings" onProfileClick={() => {}} image={''} />
      <SettingsButton label={'My Profile'} onClick={() => router.push('/settings/profile')} />

      {settingsOptions.map(option => (
        <SettingsButton label={option.label} onClick={() => {}} />
      ))}
    </PageContainer>
  );
};

export default Settings;

Settings.getLayout = page => {
  return (
    <PrimaryLayout>
      <div className="px-4">{page}</div>
      <NavBar />
    </PrimaryLayout>
  );
};
