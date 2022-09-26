import { IButton } from './Button';

const primary: IButton = {
  type: 'button',
  label: 'Primary',
  onClick: () => {},
  secondary: false,
  disabled: false,
};

const secondary: IButton = {
  type: 'button',
  label: 'Secondary',
  onClick: () => {},
  secondary: true,
  disabled: false,
};

const disabled: IButton = {
  type: 'button',
  label: 'Disabled',
  onClick: () => {},
  secondary: false,
  disabled: true,
};

export const mockButtonProps = {
  primary,
  secondary,
  disabled,
};
