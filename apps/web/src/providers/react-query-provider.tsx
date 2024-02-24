"use client"

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactNode } from 'react';

interface ReactQueryProviderProps {
  readonly children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 30 // revalidate after 30 seconds
    }
  }
});

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
