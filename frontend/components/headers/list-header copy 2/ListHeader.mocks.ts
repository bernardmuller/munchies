import { IListHeader } from './ListHeader';

const left: IListHeader = {
  loading: false,
  heading: 'Heading',
  onRightButtonClick: () => {},
  onLeftButtonClick: () => {},
  rightButton: false,
  leftButton: true,
  leftButtonVariant: 'plus',
};

const right: IListHeader = {
  loading: false,
  heading: 'Heading',
  onRightButtonClick: () => {},
  onLeftButtonClick: () => {},
  rightButton: true,
  rightButtonVariant: 'plus',
  leftButton: false,
};

const loading: IListHeader = {
  loading: true,
  heading: 'Heading',
  onRightButtonClick: () => {},
  onLeftButtonClick: () => {},
  rightButton: true,
  rightButtonVariant: 'plus',
  leftButton: false,
};

export const mockListHeaderProps = {
  left,
  right,
  loading,
};
