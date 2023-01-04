'use client';

import Link from 'next/link';
import { Icon } from 'shared/Icons';
import { colors } from '../../../shared/colors';

export interface INavButton {
  variant: 'meals' | 'menus' | 'settings' | 'household' | 'explore';
  path: string;
  active?: boolean;
}

const NavButton: React.FC<INavButton> = ({ variant, path, active }) => {
  return (
    <Link className=" bg-none border-none cursor-pointer " href={path}>
      <div
        className={`p-4 flex align-center justify-center rounded-full ${
          active ? 'bg-primary shadow-primary' : 'bg-secondary_700'
        }`}
      >
        {variant === 'household' && <Icon variant="home" color={colors.white} size={25} />}
        {variant === 'menus' && <Icon variant="menus" color={colors.white} size={25} />}
        {variant === 'meals' && <Icon variant="meals" color={colors.white} size={25} />}
        {variant === 'settings' && <Icon variant="settings" color={colors.white} size={25} />}
        {variant === 'explore' && <Icon variant="explore" color={colors.white} size={25} />}
      </div>
    </Link>
  );
};

export default NavButton;
