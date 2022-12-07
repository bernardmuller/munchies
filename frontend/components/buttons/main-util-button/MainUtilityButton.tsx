import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Icon } from 'shared/Icons';

type menuOption = {
  label: string;
  action: () => void;
  icon: any;
};

const menuOptions: menuOption[] = [
  {
    label: 'Create Menu',
    action: () => {
      console.log('Creating Meal');
    },
    icon: <Icon variant="plusOutline" size={20} className="mr-3 fill-primary_400" />,
  },
  {
    label: 'Create Meal',
    action: () => {
      console.log('Creating Meal');
    },
    icon: <Icon variant="plusOutline" size={20} className="mr-3 fill-primary_400" />,
  },
];

export default function FloatingMenu() {
  return (
    <div className="fixed bottom-28 right-8 w-56 text-right z-[200]">
      <Menu as="div" className="relative inline-block text-left ">
        <div>
          <Menu.Button className=" h-16 w-16 flex items-center justify-center rounded-full bg-primary shadow-idle shadow-secondary_800 drop-shadow-2xl text-white">
            <Icon variant="plus" color="white" size={35} />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute bottom-14 right-0 mb-5 w-72 origin-bottom-right rounded-lg bg-secondary_200 shadow-black drop-shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none ">
            <div className="px-1 py-1 ">
              {menuOptions.map(item => (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? ' text-white' : 'text-white'
                      } group flex w-full items-center rounded-md px-3 py-4 text-sm bg-secondary_400 active:bg-secondary_300`}
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
