import {createFileRoute, Outlet} from '@tanstack/react-router'
import {SettingsNav} from "@/components/SettingsNav";
import {House, User} from "lucide-react";

const sidebarNavItems = [
  {
    title: "My Profile",
    href: "/settings/profile",
    icon: <User className="h-5 w-5"/>,
  },
  {
    title: "My Household",
    href: "/settings/household",
    icon: <House className="h-5 w-5"/>,
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

export const Route = createFileRoute('/_authed/settings')({
  component: () => <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 min-h-[50vh]">
    <aside className="lg:w-1/5">
      <SettingsNav items={sidebarNavItems}/>
    </aside>
    <div className="flex-1">
      <Outlet/>
    </div>
  </div>,
})
