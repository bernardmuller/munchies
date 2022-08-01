import Image from 'next/image';
import React from 'react';
import phone from '../../../assets/svg/iphone.svg';
import { Button } from '../button';

const Section = ({ data }: { data: any }) => {
  if (data.variant === 2) {
    return (
      <div
        className={`h-screen flex p-16 ${data.background && 'bg-secondary'}`}
      >
        <div className="w-2/4 flex justify-center items-center">
          <Image
            src={phone}
            alt="phone"
            layout="fixed"
            height="750"
            className=" z-"
          />
        </div>
        <div className="grid gap-1 w-2/4 p-24">
          <h2 className={`text-7xl ${data.background && 'text-white'} w-full`}>
            {data.title}
          </h2>
          <p
            className={`${
              data.background ? 'text-slate-300' : 'text-slate-400'
            } text-2xl`}
          >
            {data.paragraph}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`h-screen flex px-16 pt-24 ${
        data.background && 'bg-secondary'
      }`}
    >
      <div className="grid w-2/4 p-24">
        <h2 className={`text-7xl ${data.background && 'text-white'} w-full`}>
          {data.title}
        </h2>
        <p
          className={`${
            data.background ? 'text-slate-300' : 'text-slate-400'
          } text-2xl`}
        >
          {data.paragraph}
        </p>
      </div>
      <div className="w-2/4 flex justify-center items-center">
        <Image src={phone} alt="phone" layout="fixed" height="750" />
      </div>
    </div>
  );
};

export default Section;
