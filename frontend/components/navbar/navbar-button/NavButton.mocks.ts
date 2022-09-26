import { INavButton } from './NavButton';

const active: INavButton = {
  path: '/',
  active: true,
  variant: 'meals',
};

const inActive: INavButton = {
  path: '/',
  active: false,
  variant: 'meals',
};

export const mockNavButtonProps = {
  active,
  inActive,
};
