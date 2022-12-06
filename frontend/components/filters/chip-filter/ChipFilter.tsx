import { useState } from 'react';
import FilterChip from '../../chips/filter-chip/FilterChip';

export interface IChipFilter {
  title?: string;
  options: string[];
}

//TODO: replace typography with standarised typography
const ChipFilters: React.FC<IChipFilter> = ({ title, options }) => {
  if (!options) throw new Error('ChipFilters requires options');
  const [active, setActive] = useState(0);
  return (
    <div className=" flex flex-col gap-3">
      {title && (
        <div className="flex justify-between">
          <h3 className="text-xl">{title}</h3>
        </div>
      )}
      <div className="h-auto flex gap-2 overflow-x-scroll pb-2">
        {options.map((item, index) => (
          <FilterChip title={item} active={index === active} onClick={() => setActive(index)} />
        ))}
      </div>
    </div>
  );
};

export default ChipFilters;
