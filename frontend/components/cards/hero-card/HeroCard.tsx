import Image from 'next/image';

import { H3, H4, P } from 'components/typography';
import Link from 'next/link';

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

const HeroCard: React.FC<IHeroCard> = ({ heading, onClick, data, variant }) => {
  return (
    <div className=" flex flex-col gap-3 z-10 pb-8">
      {variant === 'recipe' && heading && (
        <div className="">
          <H3 className="text-2xl leading-7 text-slate-50">{heading}</H3>
          <P className="text-2xl leading-7 text-slate-300">
            25 minutes | 25 ingredients | cooked 2 times
          </P>
        </div>
      )}
      {variant !== 'recipe' && heading && (
        <div className="flex justify-between">
          <H3 className="text-xl text-slate-50">{heading}</H3>
          <Link href="#" className="text-primary_400 text-md font-light">
            call to action
          </Link>
        </div>
      )}
      <div className="w-full relative h-72 rounded-3xl bg-slate-400 object-cover overflow-clip">
        <Image
          src={
            data?.image ||
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=781&q=80'
          }
          alt="not found"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute bottom-0 w-full h-full bg-gradient-to-b from-transparent to-secondary_900 via-transparent" />
        {variant === 'menu' ? (
          <div className=" absolute bottom-4 pl-4">
            {data.name && <H3 className="text-2xl font-bold text-white mb-2">{data.name}</H3>}
            <P className="text-sm text-slate-400 font-light">{data.description}</P>
          </div>
        ) : (
          <div className="z-10">
            {!data.authorImage && (
              <Image
                className="absolute rounded-full ring-2 ring-white bottom-3 left-3"
                src={
                  'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80'
                }
                alt=""
                width={30}
                height={30}
              />
            )}
            {data.author && (
              <H4 className="absolute bottom-[1.1rem] left-14 text-secondary_200 text-[12px]">
                {`by ${data.author}`}
              </H4>
            )}
          </div>
        )}
      </div>
      {variant !== 'menu' && (
        <div>
          {data.name && <H3 className="text-2xl font-bold text-black mb-2">{data?.name}</H3>}
          {data.description && (
            <P className="text-sm text-slate-400 font-light">{data.description}</P>
          )}
        </div>
      )}
    </div>
  );
};

export default HeroCard;
