// src/types/order.ts
export interface Order {
  id: number
  orderNumber: string
  totalAmount: string
  totalCost: string
  paymentType: string
  paymentStatus: string
  notes: string | null
  createdAt: string
  updatedAt: string
  orderItems?: OrderItem[]
}

export interface OrderItem {
  id: number
  orderId: number
  productId: number
  quantity: number
  unitPrice: string
  unitCost: string
  totalPrice: string
  product: {
    id: number
    name: string
    barcode: string
  }
}
