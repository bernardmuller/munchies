'use client';

import { usePathname } from 'next/navigation';
import { IoCalendar, IoFastFood, IoHomeSharp, IoBuild } from 'react-icons/io5';
import { TiSpanner, TiHome, TiCalendarOutline, TiZoom } from 'react-icons/ti';
import { IoMdList } from 'react-icons/io';
import { colors } from '../../../shared/colors';
import Link from 'next/link';

export interface INavButton {
  variant: 'meals' | 'menus' | 'settings' | 'household' | 'ingredients';
  path: string;
  active?: boolean;
}

const NavButton: React.FC<INavButton> = ({ variant, path, active }) => {
  return (
    <Link className=" bg-none border-none cursor-pointer " href={path}>
      <div
        className={`p-4 flex align-center justify-center rounded-full ${
          active ? 'bg-primary shadow-idle' : 'bg-secondary_700'
        }`}
      >
        {variant === 'household' && <TiHome color={colors.white} size={30} />}
        {variant === 'menus' && <TiCalendarOutline color={colors.white} size={30} />}
        {variant === 'meals' && <IoFastFood color={colors.white} size={25} />}
        {variant === 'settings' && <TiSpanner color={colors.white} size={30} />}
        {variant === 'ingredients' && <TiZoom color={colors.white} size={30} />}
      </div>
    </Link>
  );
};

export default NavButton;
