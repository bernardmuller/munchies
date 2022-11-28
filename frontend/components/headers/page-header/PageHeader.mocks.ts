import { IListHeader } from './PageHeader';

const base: IListHeader = {
  loading: false,
  heading: 'Heading',
  onButtonClick: () => {},
  buttonVariant: 'plus',
};

export const mockListHeaderProps = {
  base,
};
