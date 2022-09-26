import { IMealCard } from './MealCard';

const base: IMealCard = {
  title: 'Meal Name',
  onClick: () => {},
  active: false,
  season: 'summer',
};

export const mockMealCardProps = {
  base,
};
