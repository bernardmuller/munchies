import {SignIn, useAuth} from "@clerk/tanstack-start";
import React, {useEffect} from "react";
import {FaGithub} from "react-icons/fa";
import {Skeleton} from "@/components/ui/skeleton";
import {createFileRoute} from "@tanstack/react-router";

export const Route = createFileRoute('/sign-in')({
  component: SignInPage,
})

function SignInPage() {
  const {isSignedIn, isLoaded} = useAuth()

  useEffect(() => {
    if (isSignedIn) {
      window.location.href = "/lists"
    }
  }, [isSignedIn])

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
          <div className="relative rounded-lg bg-white shadow-xl min-h-[455px] min-w-[335px] sm:min-w-[374px] md:min-w-[400px]">
            <div className="w-full z-30 flex justify-center">
              {!isLoaded ? (
                <div className="absolute w-full mx-auto p-6 space-y-6">
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-2/3 mx-auto"/>
                    <Skeleton className="h-4 w-5/6 mx-auto"/>
                  </div>

                  <div className="flex gap-2 mt-2 pt-2 px-2">
                    <Skeleton className="h-8 w-full rounded-lg"/>
                    <Skeleton className="h-8 w-full rounded-lg"/>
                  </div>

                  <div className="flex items-center justify-center">
                    <Skeleton className="h-4 w-8"/>
                  </div>

                  <div className="space-y-2">
                    <Skeleton className="h-4 w-1/3"/>
                    <Skeleton className="h-10 w-full rounded-lg"/>
                  </div>

                  <Skeleton className="h-10 w-full rounded-lg px-4"/>

                  <div className="space-y-8 pt-4">
                    <Skeleton className="h-4 w-2/3 mx-auto"/>
                    <Skeleton className="h-4 w-1/3 mx-auto"/>
                  </div>
                </div>
              ): (
                <SignIn routing="hash" forceRedirectUrl={window.location.href}/>
              )}
            </div>
          </div>
        </div>
      </main>
      <div className="w-full flex flex-col justify-center items-center py-3 gap-2 pt-64 md:pt-0">
        <a href="https://github.com/bernardmuller/munchies" target="_blank" rel="noreferrer">
          <FaGithub className="w-6 h-6"/>
        </a>
        <p className="text-sm text-gray-400 text-center">&copy; 2024 Munchies. All rights reserved.</p>
      </div>
    </div>
  );
}
