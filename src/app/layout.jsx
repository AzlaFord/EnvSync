'use client'
import './styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { useState } from 'react'

export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <html lang="en" className='scrollbar-hide'>
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  )
}
