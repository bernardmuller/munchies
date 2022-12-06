'use client';

import { useActiveView } from 'hooks/useActiveView';
import NavButton, { INavButton } from '../navbar-button/NavButton';

export interface INavBar {}

const navOptions: INavButton[] = [
  { variant: 'household', path: '/home' },
  { variant: 'menus', path: '/menus' },
  { variant: 'meals', path: '/meals' },
  { variant: 'explore', path: '/explore' },
  { variant: 'settings', path: '/hello' },
];

const NavBar: React.FC<INavBar> = () => {
  const activeView = useActiveView();

  return (
    <div className="flex flex-col fixed bottom-0 z-50 w-full gap-1.5">
      <div className="flex items-center h-20 z-[50] bg-secondary_700  ">
        <ul className="list-none flex w-full justify-evenly">
          {navOptions.map((nav, index) => (
            <li key={nav.variant}>
              <NavButton
                variant={nav.variant}
                path={nav.path}
                active={nav.path.split('/')[1] === activeView}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
