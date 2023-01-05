import Image from 'next/image';

import Badge from 'components/chips/badge/Badge';
import { H3, P } from 'components/typography';

export interface IHeroCard {
  heading: string;
  onClick: () => void;
  data: {
    name?: string;
    image?: string;
    author?: string;
    authorImage?: string;
    description?: string;
  };
  variant?: 'menu' | 'recipe';
}

const MealHeroCard: React.FC<IHeroCard> = ({ heading, onClick, data, variant }) => {
  return (
    <div className=" flex flex-col gap-3 z-10">
      <div className="grid gap-3">
        <H3 className="text-2xl leading-7 text-white h-16">{heading}</H3>
        <P className=" text-[12px] text-slate-400">25 minutes | 25 ingredients | cooked 2 times</P>
      </div>
      <div className="w-full relative h-80  bg-slate-400 rounded-3xl overflow-clip">
        <div className="w-full h-full object-cover  rounded-3xl">
          <Image
            src={
              data?.image ||
              'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=781&q=80'
            }
            alt="not found"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="absolute bottom-0 w-full h-full bg-gradient-to-b from-transparent to-secondary_900 via-transparent" />
      </div>
      <div className="relative -top-8 w-full flex justify-center">
        <div className="flex justify-center gap-4 w-full">
          {['tag', 'tag', 'tag', 'tag', 'tag', 'tag']
            .map(tag => <Badge title={tag} size="lg" />)
            .slice(0, 3)}
        </div>
      </div>
    </div>
  );
};

export default MealHeroCard;
