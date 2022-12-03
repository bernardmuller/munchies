'use client';

export interface IFilterChip {
  title: string;
  active: boolean;
  onClick: () => void;
}

const FilterChip: React.FC<IFilterChip> = ({ title, active, onClick }) => {
  return (
    <button
      className={`   backdrop-blur-lg rounded-xl text-sm z-20 w-24 h-12 flex items-center justify-center ${
        active
          ? 'bg-primary_300 bg-opacity-80 text-primary_800'
          : ' border-2 border-secondary_500 text-secondary_100'
      }`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default FilterChip;
