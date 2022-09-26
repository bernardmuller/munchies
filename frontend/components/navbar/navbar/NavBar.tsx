import NavButton, { INavButton } from '../navbar-button/NavButton';

export interface INavBar {}

const obj: INavButton[] = [
  { variant: 'household', path: '/household' },
  { variant: 'menus', path: '/menus' },
  { variant: 'meals', path: '/meals' },
  { variant: 'ingredients', path: '/ingredients' },
  { variant: 'settings', path: '/settings' },
];

const NavBar: React.FC<INavBar> = () => {
  return (
    <div className="flex items-center h-20 z-50 bg-secondary_d w-full fixed bottom-0">
      <ul className="list-none flex w-full justify-evenly">
        {obj.map((nav, index) => (
          <li key={nav.variant}>
            <NavButton
              variant={nav.variant}
              path={nav.path}
              active={index == 1}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavBar;
