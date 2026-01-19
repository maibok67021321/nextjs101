// app/orders/page.tsx
'use client'

import { useOrders } from '@/hooks/use-orders'  // แก้ชื่อไฟล์


export default function OrdersPage() {
  const { data: ordersResponse, isLoading, error } = useOrders()

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold">รายการคำสั่งซื้อล่าสุด</h1>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-lg border p-6">
              <div className="mb-4 h-6 w-1/4 rounded bg-slate-200" />
              <div className="mb-2 h-4 w-1/2 rounded bg-slate-200" />
              <div className="h-4 w-1/3 rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">เกิดข้อผิดพลาด</h2>
          <p className="text-slate-600">ไม่สามารถโหลดข้อมูลคำสั่งซื้อได้</p>
        </div>
      </div>
    )
  }

  const orders = ordersResponse?.data || []

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">รายการคำสั่งซื้อล่าสุด</h1>
      
      {orders.length === 0 ? (
        <p className="text-slate-600">ยังไม่มีคำสั่งซื้อ</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-lg border p-6 transition hover:shadow-md"
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="mb-1 text-lg font-semibold">
                    คำสั่งซื้อ #{order.orderNumber}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {new Date(order.createdAt).toLocaleDateString('th-TH', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  {order.notes && (
                    <p className="mt-1 text-sm text-slate-500">
                      {order.notes}
                    </p>
                  )}
                </div>
                
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    order.paymentStatus === 'paid'
                      ? 'bg-green-100 text-green-800'
                      : order.paymentStatus === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  {order.paymentStatus === 'paid' && 'ชำระแล้ว'}
                  {order.paymentStatus === 'pending' && 'รอชำระเงิน'}
                  {order.paymentStatus === 'cancelled' && 'ยกเลิก'}
                </span>
              </div>

              <div className="flex items-center justify-between border-t pt-4">
                <div className="text-sm text-slate-600">
                  <p>ช่องทาง: {order.paymentType}</p>
                  {order.orderItems && (
                    <p className="mt-1">
                      รายการสินค้า: {order.orderItems.length} รายการ
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-600">ยอดรวม</p>
                  <p className="text-2xl font-bold text-blue-600">
                    ฿{Number(order.totalAmount).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
