'use client';

import Button from '../../../components/buttons/button/Button';
import Image from 'next/image';
import ph from '../../../assets/images/food_ph.png';
import Badge from '../../badges/Badge';
import Link from 'next/link';

export interface IHeroCard {}

//TODO: replace typography with standarised typography
const HeroCard: React.FC<IHeroCard> = () => {
  return (
    <div className=" flex flex-col gap-4">
      <div className="flex justify-between">
        <h3>Your menus</h3>
        <Link href="#">call to action</Link>
      </div>
      <div className="w-full h-48 rounded-xl bg-slate-400"></div>
      <div>
        <h3 className=" text-2xl font-bold text-slate-100">01 - 07 October Menu</h3>
        <p>16 meals - 180 ingreedients</p>
      </div>
    </div>
  );
};

export default HeroCard;
