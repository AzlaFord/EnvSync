'use client'
import './styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
export default function Layout({ children }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <html className='scrollbar-hide '>
        <body>{children}</body>
      </html>
    </QueryClientProvider>
  );
}
