import { QueryClient } from "@tanstack/react-query";

let index: QueryClient;

export function getQueryClient() {
  if (!index) {
    index = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5, // 5 minutes
          cacheTime: 1000 * 60 * 10, // 10 minutes
          refetchOnWindowFocus: false, // Optional: Avoid refetch on focus
        },
      },
    });
  }
  return index;
}