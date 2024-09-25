import {SignIn} from "@clerk/nextjs";
import React from "react";
import {FaGithub} from "react-icons/fa";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow relative">
        <div className="absolute top-0 left-0 right-0 h-[300px] bg-header" aria-hidden="true"/>
        <div className="relative flex flex-col items-center z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-full">
          <div className="w-full text-center pt-16 pb-8">
            <div>
              <h1 className="text-2xl text-white font-bold">Munchies</h1>
              <h4 className="text-md text-gray-400">Sign in</h4>
            </div>
          </div>
          <SignIn/>
        </div>
      </main>
      <div className="w-full flex flex-col justify-center items-center py-3 gap-2">
        <a href="https://github.com/bernardmuller/munchies" target="_blank" rel="noreferrer">
          <FaGithub className="w-6 h-6"/>
        </a>
        <p className="text-sm text-gray-400 text-center">&copy; 2024 Munchies. All rights reserved.</p>
      </div>
    </div>
  );
}
