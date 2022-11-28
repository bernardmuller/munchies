import Button from '../../buttons/button/Button';
import Image from 'next/image';
import ph from '../../../assets/images/food_ph.png';
import FilterChip from '../../chips/filter-chip/FilterChip';
import Link from 'next/link';
import MealCard from 'components/cards/meal-card/MealCard';
import { totalmem } from 'os';

export interface IChipFilter {
  title?: string;
}

//TODO: replace typography with standarised typography
const ChipFilters: React.FC<IChipFilter> = ({ title }) => {
  return (
    <div className=" flex flex-col gap-3">
      {title && (
        <div className="flex justify-between">
          <h3 className="text-xl">{title}</h3>
        </div>
      )}
      <div className="h-auto flex gap-2 overflow-x-scroll pb-2">
        {['summer', 'autumn', 'winter', 'spring'].map((item, index) => (
          <FilterChip title={item} active={index === 0} />
        ))}
      </div>
    </div>
  );
};

export default ChipFilters;
