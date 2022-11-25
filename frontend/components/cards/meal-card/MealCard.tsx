'use client';

import Image from 'next/image';
import ph from '../../../assets/images/food_ph.png';
import Badge from '../../badges/Badge';

export interface IMealCard {
  onClick: () => void;
  active: boolean;
  image?: string;
  title: string;
  seasons: 'summer' | 'autumn' | 'winter' | 'spring';
}

const MealCard: React.FC<IMealCard> = ({ onClick, active, image, title, seasons }) => {
  return (
    <div
      className={`min-w-[11rem] h-[14rem] relative overflow-hidden rounded-xl bg-secondary cursor-pointer z-[1] ${
        active ? ' border-primary_l border-4 shadow-idle' : 'shadow-lg'
      }`}
      onClick={onClick}
    >
      <div className="absolute top-2 left-2 z-10">
        <Badge title="summer" />
      </div>
      <div className="w-full h-[65%] flex flex-col justify-end items-center">
        {image ? (
          <div className="w-full h-full absolute">
            <Image src={image} alt="meal image" layout="fill" objectFit="cover" />
          </div>
        ) : (
          <div className="p-4 w-1/2 -z-10">
            <Image
              src={ph}
              alt="not found"
              layout="fill"
              objectFit="contain"
              className="object-cover p-8"
            />
          </div>
        )}
      </div>
      <div className=" h-[35%] w-full z-10 bg-primary_800 p-3 px-3 flex flex-col justify-between">
        <h4 className="text-white z-10">{title}</h4>
        <p className="text-slate-300 text-[10px] z-10">25 minutes | 25 ingredients</p>
      </div>
    </div>
  );
};

export default MealCard;
