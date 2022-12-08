import PageHeader from '../components/headers/list-header/ListHeader';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import NavBar from '../components/navbar/navbar/NavBar';
import BaseTemplate from '../components/templates/BaseTemplate';
import { NextPageWithLayout } from './page';
import Link from 'next/link';
import { H1, H2, P } from '../components/typography';
import Image from 'next/image';
import preview from 'assets/images/munchies_preview.png';
import phone_preview from 'assets/images/phone.png';
import { Icon } from '../shared/Icons';
import { colors } from '../shared/colors';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <div className="pt-4 flex justify-between items-center px-[17.5%] prose min-w-full">
        <H1 className="text-2xl mb-0">Munchies</H1>
        <Link
          href="/login"
          className="btn bg-primary_400 text-white border-none shadow-idle px-8 hover:bg-primary_300 shadow-primary"
        >
          Login
        </Link>
      </div>
      <div className="w-full min-w-full px-[17.5%] flex mt-24 flex justify-between">
        <div className="w-1/2 prose">
          <H2 className="text-[4rem] leading-[4rem]">The all-in-one grocery list manager.</H2>
          <p className="text-[1.8rem] leading-[2.4rem] text-secondary_100">
            Never worry about writing out grocery lists manually again.{' '}
            <strong className="text-primary_300">Munchies</strong> generates grocery lists based on
            the ingredients in your favourite recipes.
          </p>
        </div>
        <div className="flex drop-shadow-2xl">
          <div className="w-full relative rounded-3xl drop-shadow-2xl">
            <div className="max-h-[540px] w-[250px] w-full overflow-scroll rounded-3xl scrollbar-hide ">
              <Image src={preview} alt={'preview'} className="w-full" />
            </div>
            <div className="w-full max-w-[350px]">
              <Image
                src={phone_preview}
                alt={'phone'}
                className="w-full absolute min-w-[350px] -top-6 -left-7 pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

const authenticateUser = () => {};

Home.getLayout = page => {
  const currentUserAuthenticated = authenticateUser();

  return (
    <PrimaryLayout>
      {/* <PageHeader heading="Heading" onButtonClick={() => {}} buttonVariant="plus" /> */}
      <div className="h-[calc(100vh-4rem)]">{page}</div>
      <footer className="h-[4rem] w-full bg-secondary_900 px-[17.5%] border-t-secondary_700 py-2 flex justify-between">
        <span className="text-sm text-secondary_400">©2022 Bernard Muller</span>
        <Link href={'https://github.com/bernardmuller/munchies'} target="_blank">
          <Icon variant="github" size={20} color={colors.secondary_400} />
        </Link>
      </footer>
    </PrimaryLayout>
  );
};
