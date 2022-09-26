import { IPageHeader } from './PageHeader';

const left: IPageHeader = {
  loading: false,
  heading: 'Heading',
  onRightButtonClick: () => {},
  onLeftButtonClick: () => {},
  rightButton: false,
  leftButton: true,
  leftButtonVariant: 'plus',
};

const right: IPageHeader = {
  loading: false,
  heading: 'Heading',
  onRightButtonClick: () => {},
  onLeftButtonClick: () => {},
  rightButton: true,
  rightButtonVariant: 'plus',
  leftButton: false,
};

const loading: IPageHeader = {
  loading: true,
  heading: 'Heading',
  onRightButtonClick: () => {},
  onLeftButtonClick: () => {},
  rightButton: true,
  rightButtonVariant: 'plus',
  leftButton: false,
};

export const mockPageHeaderProps = {
  left,
  right,
  loading,
};
