'use client';
import { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function ReactQueryProviders({ children }: React.PropsWithChildren) {
  const [queryClient] = useState(
    () => new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000, // ms
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/*<ReactQueryDevtools />*/}
    </QueryClientProvider>
  );
}
