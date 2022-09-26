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

const MealCard: React.FC<IMealCard> = ({
  onClick,
  active,
  image,
  title,
  seasons,
}) => {
  return (
    <div
      className={`w-[10.2rem] h-[15rem] relative overflow-hidden rounded-md bg-secondary cursor-pointer z-[1] ${
        active ? ' border-primary_l border-4 shadow-idle' : 'shadow-lg'
      }`}
      onClick={onClick}
    >
      <div
        className={`w-full h-full flex flex-col relative justify-end items-center  z-10`}
      >
        <div
          className={`w-full h-full flex items-center justify-center absolute object-contain bg-gradient-to-t from-black overflow-hidden z-20`}
        />
        {image ? (
          <div className="w-full h-full absolute -z-10">
            <Image
              src={image}
              alt="meal image"
              layout="fill"
              objectFit="cover"
            />
          </div>
        ) : (
          <div className="p-4 w-1/2 h-1/2">
            <Image
              src={ph}
              alt="not found"
              layout="fill"
              objectFit="contain"
              className="h-full object-cover"
            />
          </div>
        )}
        <h4 className="text-white text-center z-20">{title}</h4>
        <Badge title={''} />
      </div>
    </div>
  );
};

export default MealCard;
