// app/products/error.tsx
'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-bold">เกิดข้อผิดพลาด</h2>
        <p className="mb-6 text-slate-600">
          ขออภัย ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง
        </p>
        <button
          onClick={reset}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          ลองใหม่อีกครั้ง
        </button>
      </div>
    </div>
  )
}