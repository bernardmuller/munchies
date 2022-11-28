'use client';

export interface IFilterChip {
  title: string;
  active: boolean;
}

const FilterChip: React.FC<IFilterChip> = ({ title, active }) => {
  return (
    <span
      className={`   backdrop-blur-lg rounded-xl text-sm z-20 w-24 h-12 flex items-center justify-center ${
        active
          ? 'bg-primary_300 bg-opacity-80 text-primary_800'
          : ' border-2 border-secondary_500 text-secondary_100'
      }`}
    >
      {title}
    </span>
  );
};

export default FilterChip;
