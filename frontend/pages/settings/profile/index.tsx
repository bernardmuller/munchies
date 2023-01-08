import PageContainer from '../../../components/containers/page-container/PageContainer';
import DetailHeader from '../../../components/headers/detail-header/DetailHeader';
import PrimaryLayout from '../../../components/layouts/primary/PrimaryLayout';
import { useQuery } from '@tanstack/react-query';
import { H3, P } from '../../../components/typography';
import Badge from '../../../components/chips/badge/Badge';
import { InfoWidget } from '../../../components/widgets/info-widget/InfoWidget';
import HeroCard from '../../../components/cards/hero-card/HeroCard';
import BasicMealSlider from '../../../components/sliders/basic-slider/BasicSlider';
import { useRouter } from 'next/router';
import UserInfoWidget from '../../../components/widgets/user-info-widget/UserInfoWidget';

export const useProfileData = (seed: string) => {
  return useQuery(['profile'], async () => {
    return await fetch(`https://avatars.dicebear.com/api/initials/${seed}.svg`);
  });
};

const Profile = () => {
  const router = useRouter();
  return (
    <PrimaryLayout>
      <div className="px-4">
        <PageContainer>
          <DetailHeader
            heading={'Profile'}
            onLeftButtonClick={() => {
              router.back();
            }}
            leftButtonVariant="back"
            theme="dark"
          />
          <section className="flex flex-col gap-10">
            <UserInfoWidget />
            <HeroCard
              heading={'Your Favourite Meal'}
              onClick={() => {}}
              data={{
                name: 'Sushi',
                image:
                  'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
                description: '6 Ingredients - Last Eaten: 06 December 2022',
              }}
            />
            <BasicMealSlider
              theme="light"
              heading="Name's Recipes"
              meals={[
                {
                  name: 'Sushi',
                  ingredients: [1, 2, 3],
                  seasons: ['winter'],
                },
                {
                  name: 'Sushi',
                  ingredients: [1, 2, 3],
                  seasons: ['winter'],
                },
                {
                  name: 'Sushi',
                  ingredients: [1, 2, 3],
                  seasons: ['winter'],
                },
              ]}
              onMealClicked={() => {}}
            />
          </section>
        </PageContainer>
      </div>
    </PrimaryLayout>
  );
};

export default Profile;
