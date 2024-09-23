"use client";

import { Nav } from "./nav";

const sidebarNavItems = [
  // {
  //   title: "My Profile",
  //   href: "/settings/profile",
  // },
  {
    title: "My Household",
    href: "/settings/household",
  },
  // {
  //   title: "Ingredients",
  //   href: "/settings/ingredients",
  // },
  // {
  //   title: "Preferences",
  //   href: "/settings/preferences",
  // },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 min-h-[50vh] px-2">
        <aside className="-mx-4 lg:w-1/5">
          <Nav items={sidebarNavItems} />
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
}
