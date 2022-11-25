import Button from '../../buttons/button/Button';
import Image from 'next/image';
import ph from '../../../assets/images/food_ph.png';
import Badge from '../../badges/Badge';
import Link from 'next/link';
import MealCard from 'components/cards/meal-card/MealCard';
import { totalmem } from 'os';

export interface IChipFilter {
  title?: string;
}

//TODO: replace typography with standarised typography
const ChipFilter: React.FC<IChipFilter> = ({ title }) => {
  return (
    <div className=" flex flex-col gap-3">
      {title && (
        <div className="flex justify-between">
          <h3 className="text-xl">{title}</h3>
        </div>
      )}
      <div className="h-auto flex gap-2 overflow-x-scroll pb-2">
        {['summer', 'autumn', 'winter', 'spring', 'desert', 'main', 'entre', 'snack'].map(item => (
          <Badge title={item} />
        ))}
      </div>
    </div>
  );
};

export default ChipFilter;
