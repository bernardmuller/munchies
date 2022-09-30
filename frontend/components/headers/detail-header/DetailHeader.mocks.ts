import { IDetailHeader } from './DetailHeader';

const base: IDetailHeader = {
  loading: false,
  heading: 'Heading',
  onRightButtonClick: () => {},
  onLeftButtonClick: () => {},
  leftButtonVariant: 'back',
  rightButtonVariant: 'plus',
};

export const mockDetailHeaderProps = {
  base,
};
