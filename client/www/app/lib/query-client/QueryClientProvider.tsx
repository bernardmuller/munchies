"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/app/lib/query-client/index";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = getQueryClient();

export function ReactQueryWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
}