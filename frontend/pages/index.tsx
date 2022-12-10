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
import background from 'assets/images/background.png';
import { Icon } from '../shared/Icons';
import { colors } from '../shared/colors';
import { HomeParticles } from '../components/particles/home-particles/HomeParticles';
import arrow from 'assets/images/arrow.gif';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <div className="pt-4 flex justify-between items-center px-[17.5%] prose min-w-full z-50">
        <H1 className="text-2xl mb-0 z-10">Munchies</H1>
        <Link
          href="/login"
          className="btn bg-primary_400 text-white border-none shadow-idle z-10 px-8 hover:bg-primary_300 shadow-primary"
        >
          Login
        </Link>
      </div>
      <div className="w-full min-w-full px-[17.5%] flex mt-36 flex justify-between">
        <div className="bg-[#1C2534] w-full h-[30rem] absolute top-0 left-0 overflow-hidden">
          <div className="h-[30rem] w-[30rem] rounded-full bg-primary_300/30 blur-[6rem] absolute left-[-14rem] top-[-14rem]" />
          <div className="h-[30rem] w-[30rem] rounded-full bg-primary_200/60 blur-[8rem] absolute right-[-20rem] bottom-[-20rem]" />
          <div className="h-[30rem] w-[30rem] rounded-full bg-[#FFB572]/30 blur-[10rem] absolute left-[60%] top-[-24rem]" />
          <HomeParticles />
        </div>
        <div className="w-1/2 prose z-10 flex flex-col gap-8">
          <H2 className="text-[4rem] leading-[4rem] pt-5">The all-in-one grocery list manager.</H2>
          <p className="text-[1.8rem] leading-[2.4rem] text-slate-400">
            Never worry about writing out grocery lists manually again.{' '}
            <strong className="text-primary_300">Munchies</strong> generates grocery lists based on
            the ingredients in your favourite recipes.
          </p>
        </div>
        <div className="flex drop-shadow-2xl z-10">
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
            <div className="w-[3rem] absolute bottom-[1rem] opacity-30 left-[6.3rem]">
              <Image src={arrow} alt="arrow" />
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
      {/*<PageHeader heading="Heading" onButtonClick={() => {}} buttonVariant="plus" />*/}
      <div className="h-[calc(100vh-4rem)] relative">{page}</div>
      <footer className="h-[4rem] w-full bg-[#F5F7FA] px-[17.5%] py-2 flex justify-between">
        <span className="text-sm text-slate-400">©2022 Munchies</span>
        <Link href={'https://github.com/bernardmuller/munchies'} target="_blank">
          <Icon variant="github" size={20} color={colors.grey} />
        </Link>
      </footer>
    </PrimaryLayout>
  );
};
