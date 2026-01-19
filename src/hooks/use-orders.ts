// src/hooks/use-orders.ts
'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { Order } from '@/types/order'

interface OrdersResponse {
  data: Order[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async (): Promise<OrdersResponse> => {
      const res = await api.get<OrdersResponse>(
        '/orders?page=1&limit=10&search=&sortBy=createdAt&sortOrder=desc&paginate=true'
      )
      return res.data
    },
  })
}
