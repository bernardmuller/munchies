// import "@/styles/globals.css";
// import {Toaster} from "@/components/ui/toaster";
// import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
// import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {FaGithub} from "react-icons/fa";
import React from "react";
import {Clipboard, List} from "lucide-react";
import {User} from "@/lib/http/client/users/getCurrentLoggedInUser";
import Navbar from "@/components/NavigationBar";
import { Apple, Beer, Cake, Coffee, IceCream, Pizza } from 'lucide-react'

const tabs = [
  { id: "/lists", label: "Lists", icon: <Clipboard className="w-4 h-4" /> },
  { id: "/items", label: "Items", icon: <List className="w-4 h-4" /> },
]

const foodIcons = [Apple, Beer, Cake, Coffee, IceCream, Pizza]

interface FoodIconBackgroundProps {
  gridSize?: number
  iconSize?: number
  iconColor?: string
}

function FoodIconBackground({
  gridSize = 10,
  iconSize = 24,
  iconColor = '#d1d5db'
}: FoodIconBackgroundProps = {}) {
  const getRandomIcon = () => {
    const RandomIcon = foodIcons[Math.floor(Math.random() * foodIcons.length)]
    return <RandomIcon size={iconSize} color={iconColor} />
  }

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{backgroundColor: '#eff1f6'}}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fill, ${iconSize * 2}px)`,
          gridTemplateRows: `repeat(auto-fill, ${iconSize * 2}px)`,
        }}
      >
        {Array.from({length: gridSize * gridSize}).map((_, index) => (
          <React.Fragment key={index}>
            <div
              className="flex items-center justify-center"
              style={{
                transform: 'rotate(-45deg)',
                gridColumn: `${index % 2 === 0 ? 'auto' : '2'} / span 1`,
                gridRow: `${index % 2 === 0 ? 'auto' : '2'} / span 1`,
              }}
            >
              {getRandomIcon()}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}


export default function AuthenticatedLayout({
  children,
  user
}: {
  children: React.ReactNode;
  user: User
}) {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar
        currentUser={user}
      />
      <main className="">
        {/*<FoodIconBackground/>*/}
        <div className="absolute top-0 left-0 right-0 h-[300px] bg-header" aria-hidden="true"/>
        <div className="relative z-10 max-w-7xl mx-auto md:px-4 lg:px-8 min-h-full">
          <div className="h-20 md:h-20 flex items-center">
            <div>
              {/*<h3 className="text-lg md:text-2xl text-white font-bold px-4 md:px-0">Hi, {currentUser.firstName}</h3>*/}
              <div className="md:hidden flex gap-2 items-center">
                {/*<Link href="/lists" className={badgeVariants({variant: "outline"})}>Lists</Link>*/}
                {/*<Link href="/items" className={badgeVariants({variant: "outline"})}>Items</Link>*/}
                <div className="w-full flex justify-between px-2 md:px-3 md:mt-3">
                  {/*<MobileTabs defaultValue={activeTab}>*/}
                  {/*  <MobileTabsList>*/}
                  {/*{(pathname.includes("/lists") || pathname.includes("items"))  && tabs.map((tab) => (*/}
                  {/*  <MobileTabsTrigger key={tab.id} value={tab.id}>*/}
                  {/*    <Link href={`${tab.id}`} className="flex items-center">*/}
                  {/*      <span className="mr-2">{tab.icon}</span>*/}
                  {/*      {tab.label}*/}
                  {/*    </Link>*/}
                  {/*  </MobileTabsTrigger>*/}
                  {/*))}*/}
                  {/*</MobileTabsList>*/}
                  {/*</MobileTabs>*/}
                </div>
              </div>
            </div>
          </div>
          <div
            className="bg-background md:bg-white md:rounded-lg md:shadow-lg overflow-hidden mb-80">
            <div className="px-0 py-0 md:px-4 md:py-5 sm:p-6">
              {children}
            </div>
          </div>
        </div>
      </main>
      <div className="absolute w-full flex flex-col justify-center items-center py-3 gap-2 bottom-2">
        <a href="https://github.com/bernardmuller/munchies" target="_blank" rel="noreferrer">
          <FaGithub className="w-6 h-6"/>
        </a>
        <p className="text-sm text-gray-400 text-center">&copy; 2024 Munchies. All rights reserved.</p>
      </div>
    </div>
  );
}
