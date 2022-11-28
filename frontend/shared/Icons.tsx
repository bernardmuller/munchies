import { IoIosSearch } from 'react-icons/io';
import {
  IoAddCircleOutline,
  IoCalendarClearOutline,
  IoFastFood,
  IoSettingsOutline,
} from 'react-icons/io5';
import {
  TiPlus,
  TiChevronLeft,
  TiCalendarOutline,
  TiHome,
  TiZoom,
  TiSpanner,
} from 'react-icons/ti';

interface IconProps {
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
    | 'back'
    | 'plusOutline'
    | 'meals'
    | 'menus'
    | 'explore'
    | 'settings'
    | 'home';
  size: number;
  color?: string;
  className?: string;
  props?: any;
}

const ICON_SIZE = 20;

export const Icon = ({ variant, size, color, className, props }: IconProps) => {
  switch (variant) {
    case 'save':
      return (
        <TiPlus size={size ? size : ICON_SIZE} color={color} {...props} className={className} />
      );

    case 'delete':
      return (
        <TiPlus size={size ? size : ICON_SIZE} color={color} {...props} className={className} />
      );

    case 'edit':
      return (
        <TiPlus size={size ? size : ICON_SIZE} color={color} {...props} className={className} />
      );

    case 'share':
      return (
        <TiPlus size={size ? size : ICON_SIZE} color={color} {...props} className={className} />
      );

    case 'arrowDown':
      return (
        <TiPlus size={size ? size : ICON_SIZE} color={color} {...props} className={className} />
      );

    case 'arrowUp':
      return (
        <TiPlus size={size ? size : ICON_SIZE} color={color} {...props} className={className} />
      );

    case 'arrowLeft':
      return (
        <TiPlus size={size ? size : ICON_SIZE} color={color} {...props} className={className} />
      );

    case 'arrowRight':
      return (
        <TiPlus size={size ? size : ICON_SIZE} color={color} {...props} className={className} />
      );

    case 'close':
      return (
        <TiPlus size={size ? size : ICON_SIZE} color={color} {...props} className={className} />
      );

    case 'menu':
      return (
        <TiPlus size={size ? size : ICON_SIZE} color={color} {...props} className={className} />
      );

    case 'plus':
      return (
        <TiPlus size={size ? size : ICON_SIZE} color={color} {...props} className={className} />
      );

    case 'back':
      return (
        <TiPlus size={size ? size : ICON_SIZE} color={color} {...props} className={className} />
      );
    case 'home':
      return (
        <TiHome size={size ? size : ICON_SIZE} color={color} {...props} className={className} />
      );
    case 'meals':
      return (
        <IoFastFood size={size ? size : ICON_SIZE} color={color} {...props} className={className} />
      );
    case 'menus':
      return (
        <IoCalendarClearOutline
          size={size ? size : ICON_SIZE}
          color={color}
          {...props}
          className={className}
        />
      );
    case 'explore':
      return (
        <IoIosSearch
          size={size ? size : ICON_SIZE}
          color={color}
          {...props}
          className={className}
        />
      );
    case 'settings':
      return (
        <IoSettingsOutline
          size={size ? size : ICON_SIZE}
          color={color}
          {...props}
          className={className}
        />
      );

    case 'plusOutline':
      return (
        <IoAddCircleOutline
          size={size ? size : ICON_SIZE}
          color={color}
          {...props}
          className={className}
        />
      );

    default:
      return (
        <TiPlus size={size ? size : ICON_SIZE} color={color} {...props} className={className} />
      );
  }
};
