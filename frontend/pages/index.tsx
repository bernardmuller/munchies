import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect } from 'react';
import { Stack } from '@mui/material';
import { colors } from 'common';
import Image from 'next/image';
import phone from '../assets/svg/iphone.svg';
import { Button } from 'common/components';
import Section from 'common/components/splash/Section';
import { FaGlobeAfrica } from 'react-icons/fa';
import { MdCopyright } from 'react-icons/md';
import { IoLogoGithub } from 'react-icons/io5';

const Home: NextPage = () => {
  const router = useRouter();

  const sectionData = [
    {
      title: `a comprehensive grocerylist manager`,
      paragraph: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
      Necessitatibus veniam optio iusto, commodi est molestiae. Repellat
      fugiat, explicabo aliquid, debitis possimus magni assumenda vero
      repellendus totam repudiandae, voluptatem consequatur ullam.`,
      variant: 1,
      background: true,
    },
    {
      title: `Section 2`,
      paragraph: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
      Necessitatibus veniam optio iusto, commodi est molestiae. Repellat
      fugiat, explicabo aliquid, debitis possimus magni assumenda vero
      repellendus totam repudiandae, voluptatem consequatur ullam.`,
      variant: 2,
      background: false,
    },
    {
      title: `Section 3`,
      paragraph: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
      Necessitatibus veniam optio iusto, commodi est molestiae. Repellat
      fugiat, explicabo aliquid, debitis possimus magni assumenda vero
      repellendus totam repudiandae, voluptatem consequatur ullam.`,
      variant: 1,
      background: true,
    },
  ];

  return (
    <div>
      <Head>
        <title>Munchies</title>
      </Head>
      <div className="w-full h-20 flex fixed justify-between items-center px-24 bg-secondary z-10">
        <h1 className="text-3xl font-bold text-white">Munchies</h1>
        <ul className="flex gap-8 items-center text-white text-lg">
          <li>
            <a href="/login">login</a>
          </li>
          <li>
            <button
              type="button"
              className="text-white w-36 h-10 rounded bg-primary text-lg shadow-glow"
              onClick={() => router.push('/register')}
            >
              Sign Up
            </button>
          </li>
        </ul>
      </div>
      {sectionData.map(item => (
        <Section key={item.title} data={item} />
      ))}
      <div className="w-full h-60 bg-secondary px-24 pt-12 flex flex-col gap-3">
        <span className="text-2xl text-white"> Munchies</span>
        <a
          href="https://github.com/bernardmuller/munchies"
          className="text-white flex gap-1"
        >
          <IoLogoGithub size={24} color="white" /> Github
        </a>
        <span className="text-lg text-slate-300 flex gap-1 items-center">
          <FaGlobeAfrica color="white" size={15} />
          South Africa
        </span>
        <span className="text-sm text-white flex gap-1 items-center">
          <MdCopyright color="white" size={15} />
          Copyright 2022
        </span>
      </div>
    </div>
  );
};

export default Home;
