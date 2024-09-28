"use client";

import "@/styles/globals.css";
// import { usePathname } from "next/navigation";
import {Toaster} from "@/components/ui/toaster";
import {ThemeProvider} from "@/shared/providers/themeProvider";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import Navbar from "@/app/(secure)/NavigationBar";
import {FaGithub} from "react-icons/fa";
import React from "react";

const App = ({children}: any) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar/>
      <main className="bg-white md:bg-background">
        <div className="absolute top-0 left-0 right-0 h-[250px] bg-header" aria-hidden="true"/>
        <div className="relative z-10 max-w-7xl mx-auto md:px-4 lg:px-8 min-h-full">
          <div className="h-14 md:h-20 flex items-center">
            <div>
              <h3 className="text-lg md:text-2xl text-white font-bold px-4 md:px-0">Hi, John Doe</h3>
            </div>

          </div>
          <div className="bg-white dark:bg-background md:rounded-lg md:shadow-lg overflow-hidden mb-80">
            <div className="px-3 py-3 md:px-4 md:py-5 sm:p-6">
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <body data-theme="munchies">
    <QueryClientProvider client={new QueryClient()}>
      <ReactQueryDevtools initialIsOpen={false}/>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
      >
        <App>{children}</App>

        <Toaster/>
      </ThemeProvider>
    </QueryClientProvider>
    </body>
    </html>
  );
}
