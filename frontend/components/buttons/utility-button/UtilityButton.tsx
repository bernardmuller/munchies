'use client';

import {
  FiCheck,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiChevronUp,
  FiEdit2,
  FiMoreHorizontal,
  FiShare2,
  FiTrash,
  FiX,
} from 'react-icons/fi';

import { TiChevronLeft, TiPlus } from 'react-icons/ti';

export interface IUtilityButton {
  type: 'button' | 'submit';
  variant:
    | 'save'
    | 'delete'
    | 'edit'
    | 'share'
    | 'arrowDown'
    | 'arrowUp'
    | 'arrowLeft'
    | 'arrowRight'
    | 'close'
    | 'menu'
    | 'plus'
    | 'back';
  onClick?: () => any;
  border?: boolean;
  theme: 'light' | 'dark';
}

const ICON_SIZE = 25;
const ICON_COLOR = 'white';

const UtilityButton: React.FC<IUtilityButton> = ({ type, variant, onClick, border, theme }) => {
  if (!variant) {
    throw new Error('UtilityButton required variant.');
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={`h-12 w-12 flex items-center justify-center rounded-full active:bg-secondary_500 ${
        border && 'border-2'
      } `}
    >
      {variant === 'save' && (
        <FiCheck color={theme === 'dark' ? 'white' : 'black'} size={ICON_SIZE} />
      )}
      {variant === 'delete' && (
        <FiTrash color={theme === 'dark' ? 'white' : 'black'} size={ICON_SIZE} />
      )}
      {variant === 'edit' && (
        <FiEdit2 color={theme === 'dark' ? 'white' : 'black'} size={ICON_SIZE} />
      )}
      {variant === 'share' && (
        <FiShare2 color={theme === 'dark' ? 'white' : 'black'} size={ICON_SIZE} />
      )}
      {variant === 'arrowDown' && (
        <FiChevronDown color={theme === 'dark' ? 'white' : 'black'} size={ICON_SIZE} />
      )}
      {variant === 'arrowUp' && (
        <FiChevronUp color={theme === 'dark' ? 'white' : 'black'} size={ICON_SIZE} />
      )}
      {variant === 'arrowLeft' && (
        <FiChevronLeft color={theme === 'dark' ? 'white' : 'black'} size={ICON_SIZE} />
      )}
      {variant === 'arrowRight' && (
        <FiChevronRight color={theme === 'dark' ? 'white' : 'black'} size={ICON_SIZE} />
      )}
      {variant === 'close' && <FiX color={theme === 'dark' ? 'white' : 'black'} size={ICON_SIZE} />}
      {variant === 'menu' && (
        <FiMoreHorizontal color={theme === 'dark' ? 'white' : 'black'} size={ICON_SIZE} />
      )}
      {variant === 'plus' && (
        <TiPlus color={theme === 'dark' ? 'white' : 'black'} size={ICON_SIZE} />
      )}
      {variant === 'back' && (
        <TiChevronLeft color={theme === 'dark' ? 'white' : 'black'} size={ICON_SIZE} />
      )}
    </button>
  );
};

export default UtilityButton;
