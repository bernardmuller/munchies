"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";

import {cn} from "@/lib/utils";
import {Button, buttonVariants} from "@/components/ui/button";
import {SignOutButton} from "@clerk/nextjs";
import React from "react";
import {GoSignOut} from "react-icons/go";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon: React.ReactNode;
  }[];
}

export function Nav({className, items, ...props}: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <>
      <div className="hidden md:flex flex-col items-between md:min-h-[50vh] h-[50vh]">

        <nav
          className={cn(
            "hidden md:flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 lg:items-between lg:h-full",
            className,
          )}
          {...props}
        >
          <div className="flex flex-col gap-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  buttonVariants({variant: "ghost"}),
                  pathname === item.href
                    ? "bg-muted hover:bg-muted"
                    : "hover:bg-transparent hover:underline",
                  "justify-start px-2 flex gap-2",
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </div>
        </nav>

        <Button
          className="w-full h-8"
          variant="destructive"
        >
          <SignOutButton/>
        </Button>
      </div>
    </>
  );
}
