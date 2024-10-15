import React, {Suspense} from "react";
import {ClerkProvider} from "@clerk/nextjs";

const RootLayout = ({children}: { children: React.ReactNode }) => {
  return (
    <html lang="en">
    <head>
      <meta
        name="Munchies"
        content="Grocerylist and Mealplan manager"
      />
      <link rel="icon" sizes="192x192" href="/icon-192x192.png"/>
      <link rel="shortcut icon" href="/favicon.ico"/>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
    </head>
    <body>
    <ClerkProvider>
      <div className="w-screen">{children}</div>
    </ClerkProvider>
    </body>
    </html>
  );
};

export default RootLayout;
