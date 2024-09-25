"use client"

import Link from 'next/link'
import Image from 'next/image'
import {usePathname, useRouter} from 'next/navigation'
import {List, LogOut, Menu, Settings, User} from 'lucide-react'
import {Button} from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet"
import getCurrentSession from "@/shared/utils/getCurrentSession"
import useAvatar from "@/hooks/useAvatar"
import {SignOutButton} from "@clerk/nextjs"
import settingsRoutes from "./settings/settingsRoutes"
import React from "react";

const navigation = [
  {name: "Grocery Lists", href: "/grocerylists"},
  {name: "Ingredients", href: "/ingredients"},
]

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const currentUser = getCurrentSession()
  const avatar = useAvatar(currentUser.username)

  return (
    <nav className="w-full z-50 bg-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/grocerylists" className="flex items-center">
                <h1 className="text-white text-2xl font-extrabold">M</h1>
                <h1 className="text-white text-2xl font-extrabold">unchies</h1>
              </Link>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                {navigation.filter(i => i.href !== "/grocerylists").map((item) => (
                  <NavLink key={item.name} href={item.href} active={pathname === item.href}>
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <ProfileMenu avatar={avatar} username={currentUser.username}/>
            </div>
          </div>
          <div className="flex items-center md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="text-white ml-2 w-10 h-10">
                  <Menu className="h-6 w-6"/>
                  <span className="sr-only">Open main menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-sm">
                <MobileMenu
                  avatar={avatar}
                  username={currentUser.username}
                  navigation={navigation}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavLink({href, active, children}: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        active
          ? "bg-secondary dark:bg-background text-white"
          : "text-gray-300 hover:bg-gray-700 hover:text-white"
      }`}
    >
      {children}
    </Link>
  )
}

function ProfileMenu({avatar, username}: { avatar: string; username: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <div
            className="h-10 w-10 bg-gradient-to-r from-blue-400 to-primary rounded-full flex justify-center items-center">
            <Image
              className="h-10 w-10 rounded-full"
              src={avatar}
              alt={`${username}'s avatar`}
              width={40}
              height={40}
            />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-2">
        <DropdownMenuItem asChild>
          <Link href="#" className="flex items-center">
            <User className="mr-2 h-4 w-4"/>
            <span>Your Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={settingsRoutes[0].href} className="flex items-center">
            <Settings className="mr-2 h-4 w-4"/>
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator/>
        <Button
          className="w-full h-8 mt-2"
          variant="destructive"
        >
          <SignOutButton/>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function MobileMenu({avatar, username, navigation}: {
  avatar: string;
  username: string;
  navigation: { name: string; href: string }[];
}) {
  return (
    <div className="pt-5 pb-3 space-y-1">
      <div className="flex items-center px-4 mb-4">
        <div
          className="h-10 w-10 bg-gradient-to-r from-blue-400 to-primary rounded-full flex justify-center items-center">
          <Image
            className="h-10 w-10 rounded-full"
            src={avatar}
            alt={`${username}'s avatar`}
            width={40}
            height={40}
          />
        </div>
        <div className="ml-3">
          <div className="text-base font-medium text-gray-800 dark:text-white">{username}</div>
        </div>
      </div>
      {navigation.map((item) => (
        <MobileNavLink key={item.name} href={item.href} icon={<List className="h-6 w-6"/>}>
          {item.name}
        </MobileNavLink>
      ))}
      <MobileNavLink href="#" icon={<User className="h-6 w-6"/>}>
        Your Profile
      </MobileNavLink>
      <MobileNavLink href={settingsRoutes[0].href} icon={<Settings className="h-6 w-6"/>}>
        Settings
      </MobileNavLink>
      <div className="px-4 pt-4">
        <Button
          className="w-full h-8 mt-2"
          variant="destructive"
        >
          <SignOutButton/>
        </Button>
      </div>
    </div>
  )
}

function MobileNavLink({href, icon, children}: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Link href={href}
          className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 block px-4 py-2 rounded-md text-base font-medium">
      <span className="flex items-center">
        {icon}
        <span className="ml-3">{children}</span>
      </span>
    </Link>
  )
}