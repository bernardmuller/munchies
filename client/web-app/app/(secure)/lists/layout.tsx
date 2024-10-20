import React from "react";
import {ReactQueryWrapper} from "@/lib/query-client/QueryClientProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryWrapper>
      {children}
    </ReactQueryWrapper>
  );
}
