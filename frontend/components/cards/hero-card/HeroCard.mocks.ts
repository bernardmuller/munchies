import { IHeroCard } from './HeroCard';

const base: IHeroCard = {
  title: 'Meal Name',
  onClick: () => {},
  active: false,
  season: 'summer',
};

export const mockHeroCardProps = {
  base,
};
