import Image from 'next/image';

import Link from 'next/link';
import { H3, H4, P } from 'components/typography';

export interface IHeroCard {
  heading: string;
  onClick: () => void;
  menu: {
    name: string;
    image: string;
    author: string;
    description: string;
    ingredients: number;
    meals: number;
  };
}

//TODO: replace typography with standarised typography
const HeroCard: React.FC<IHeroCard> = ({ heading, onClick, menu }) => {
  return (
    <div className=" flex flex-col gap-3">
      <div className="flex justify-between">
        <H3 className="text-xl text-slate-50">{heading}</H3>
        <Link href="#" className="text-primary_400 text-md font-light">
          call to action
        </Link>
      </div>
      <div className="w-full relative h-48 rounded-xl bg-slate-400 object-cover overflow-clip">
        <Image src={menu.image} alt="not found" layout="fill" objectFit="cover" />
        <div className="absolute bottom-0 w-full h-full bg-gradient-to-b from-transparent to-secondary_900 via-transparent" />
        <Image
          className="absolute rounded-full ring-2 ring-white bottom-3 left-3"
          src={
            'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80'
          }
          alt=""
          width={30}
          height={30}
        />
        <H4 className="absolute bottom-[1.1rem] left-14 text-secondary_200 text-[12px]">
          {`by ${menu.author}`}
        </H4>
      </div>
      <div>
        <H3 className="text-2xl font-bold text-slate-100 mb-2">{menu.name}</H3>
        <P className="text-sm text-slate-300 font-light">
          {`${menu.meals} meals - ${menu.ingredients} ingreedients`}
        </P>
      </div>
    </div>
  );
};

export default HeroCard;
