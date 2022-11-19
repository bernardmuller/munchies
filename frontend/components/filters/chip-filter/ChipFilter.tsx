import Button from '../../buttons/button/Button';
import Image from 'next/image';
import ph from '../../../assets/images/food_ph.png';
import Badge from '../../badges/Badge';
import Link from 'next/link';
import MealCard from 'components/cards/meal-card/MealCard';

export interface IChipFilter {}

//TODO: replace typography with standarised typography
const ChipFilter: React.FC<IChipFilter> = () => {
  return (
    <div className=" flex flex-col gap-2">
      <div className="flex justify-between">
        <h3>Your Favourite Meals</h3>
        <Link href="#">View more</Link>
      </div>
      <div className="h-auto flex gap-4 overflow-x-scroll pb-4">
        {[1, 2, 3, 4].map(() => (
          <MealCard active={false} title="test" seasons="autumn" onClick={() => {}} />
        ))}
      </div>
    </div>
  );
};

export default ChipFilter;
