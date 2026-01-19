// app/products/[id]/page.tsx
import AddToCartButton from '@/app/components/add-to-cart-button'
import { Metadata } from 'next'
import Image from 'next/image'

interface Product {
  id: number
  name: string
  price: number
  description?: string
  barcode?: string
  image?: string
  category?: string
}

interface ProductDetailPageProps {
  params: Promise<{
    id: string
  }>
}

async function getProductById(id: string) {
  const res = await fetch(
    `https://backend.codingthailand.com/v2/products/${id}`
  )

  if (!res.ok) {
    return null
  }

  const data = await res.json()
  return data as Product
}

export async function generateMetadata(
  { params }: ProductDetailPageProps
): Promise<Metadata> {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) {
    return {
      title: 'ไม่พบสินค้า',
    }
  }

  return {
    title: product.name,
    description: product.description || product.name,
    openGraph: {
      title: product.name,
      description: product.description || product.name,
      images: product.image || undefined,
    },
  }
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold">ไม่พบสินค้า</h1>
          <p className="text-slate-600">
            ขออภัย ไม่พบสินค้าที่คุณกำลังมองหา
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-slate-100">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(width < 768px) 100vw, 50vw"
              className="object-contain"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-400">
              <span className="text-6xl">🛒</span>
            </div>
          )}
        </div>

        <div>
          <h1 className="mb-4 text-3xl font-bold">{product.name}</h1>

          {product.barcode && (
            <p className="mb-2 text-sm text-slate-500">
              รหัสสินค้า: {product.barcode}
            </p>
          )}

          <div className="mb-6 rounded-lg bg-slate-50 p-6">
            <p className="text-3xl font-bold text-blue-600">
              ฿{product.price?.toLocaleString() || 'ไม่ระบุราคา'}
            </p>
          </div>

          {product.description && (
            <div className="mb-6">
              <h2 className="mb-2 text-lg font-semibold">รายละเอียดสินค้า</h2>
              <p className="leading-relaxed text-slate-700">
                {product.description}
              </p>
            </div>
          )}

          <AddToCartButton
            productId={product.id}
            productName={product.name}
            productPrice={product.price || 0}
          />
        </div>
      </div>
    </main>
  )
}
