import Image from 'next/image';

import { H3, H4, P } from 'components/typography';

export interface IHeroCard {
  heading: string;
  onClick: () => void;
  data: {
    name: string;
    image: string;
    author: string;
    description: string;
    ingredients: number;
    meals: number;
  };
}

//TODO: replace typography with standarised typography
const MenuCard: React.FC<IHeroCard> = ({ onClick, data }) => {
  return (
    <div
      className=" flex flex-col gap-3 drop-shadow-sm p-4 shadow-xl rounded-lg"
      onClick={() => onClick()}
    >
      <div className="w-full relative h-48 rounded-xl bg-slate-400 object-cover overflow-clip">
        <Image src={data.image} alt="not found" layout="fill" objectFit="cover" />
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
          {`by ${data.author}`}
        </H4>
      </div>
      <div>
        <H3 className="text-2xl font-bold text-black mb-2">{data.name}</H3>
        <P className="text-sm text-slate-400 font-light">
          {`${data.meals} meals - ${data.ingredients} ingreedients`}
        </P>
      </div>
    </div>
  );
};

export default MenuCard;
