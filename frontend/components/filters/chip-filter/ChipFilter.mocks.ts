import { IChipFilter } from './ChipFilter';

const base: IChipFilter = {
  title: 'Meal Name',
  onClick: () => {},
  active: false,
  season: 'summer',
};

export const mockChipFilterProps = {
  base,
};
