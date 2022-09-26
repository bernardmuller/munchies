import { useRouter } from 'next/router';
import {
  IoCalendar,
  IoFastFood,
  IoHome,
  IoList,
  IoSettingsSharp,
} from 'react-icons/io5';
import { colors } from '../../../shared/colors';

export interface INavButton {
  variant: 'meals' | 'menus' | 'settings' | 'household' | 'ingredients';
  path: string;
  active?: boolean;
}

const NavButton: React.FC<INavButton> = ({ variant, path, active }) => {
  const router = useRouter();
  return (
    <button
      className=" bg-none border-none cursor-pointer "
      onClick={() => router.push(path)}
    >
      <div
        className={`p-4 flex align-center justify-center rounded-xl ${
          active ? 'bg-primary shadow-idle' : 'bg-secondary_l'
        }`}
      >
        {variant === 'household' && <IoHome color={colors.white} size={25} />}
        {variant === 'menus' && <IoCalendar color={colors.white} size={25} />}
        {variant === 'meals' && <IoFastFood color={colors.white} size={25} />}
        {variant === 'settings' && (
          <IoSettingsSharp color={colors.white} size={25} />
        )}
        {variant === 'ingredients' && <IoList color={colors.white} size={25} />}
      </div>
    </button>
  );
};

export default NavButton;
