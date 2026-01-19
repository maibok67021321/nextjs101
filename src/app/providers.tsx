// app/providers.tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,  // ข้อมูลเก่า 1 นาที
      cacheTime: 5 * 60 * 1000,  // cache ไว้ 5 นาที
    },
  },
})

export default function AppQueryProvider({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}