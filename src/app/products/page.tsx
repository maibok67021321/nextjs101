// นำเข้า Components และ Types ที่จำเป็น
import Link from 'next/link' // สำหรับการนำทางระหว่างหน้า
import Image from 'next/image'; // Component รูปภาพที่ปรับขนาดอัตโนมัติ
import { Metadata } from "next" // Type สำหรับ SEO metadata
import ProductSearch from '@/app/components/product-search' // นำเข้า Client Component สำหรับค้นหา
import { api } from '@/lib/axios'  // ← นำเข้า Axios instance

// Static Metadata สำหรับหน้ารายการสินค้า
export const metadata: Metadata = {
  title: 'รายการสินค้า',
  description: 'ดูสินค้าทั้งหมดในร้านค้า พร้อมฟีเจอร์ค้นหา',
  openGraph: {
    title: 'รายการสินค้า | My Next.js App',
    description: 'ค้นหาและเลือกซื้อสินค้าที่คุณต้องการ',
  }
}

// TypeScript Interface
interface Product {
  id: number
  name: string
  price: string | number  // API ส่ง price เป็น string
  barcode?: string
  image?: string
  category?: {
    id: number
    name: string
  }
}

// กำหนด Props ที่หน้านี้จะรับจาก URL (Query Parameters)
interface ProductsPageProps {
  searchParams: Promise<{
    search?: string
  }>
}

// ใช้ Axios แทน fetch
async function getProducts(): Promise<Product[]> {
  try {
    const { data } = await api.get('/products')
    return data as Product[]
  } catch (error) {
    console.error('API Error:', error)
    throw new Error('ไม่สามารถดึงข้อมูลสินค้าได้')
  }
}

// ค้นหา (ใช้ Axios ดึงข้อมูลแล้วกรอง)
async function searchProducts(query: string): Promise<Product[]> {
  try {
    const { data } = await api.get('/products')
    return data.filter((p: Product) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    )
  } catch (error) {
    console.error('Search API Error:', error)
    throw new Error('ไม่สามารถค้นหาสินค้าได้')
  }
}

/**
 * หน้ารายการสินค้าทั้งหมด พร้อมฟีเจอร์ค้นหา
 * เป็น Server Component (รันบน Server)
 */
export default async function ProductsPage({ 
  searchParams 
}: ProductsPageProps) {
  const search = (await searchParams).search?.trim()

  const products = search 
    ? await searchProducts(search) 
    : await getProducts()

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">รายการสินค้า</h1>

      <ProductSearch initialQuery={search} />

      {products.length === 0 ? (
        <p className="text-slate-600">ไม่พบสินค้าที่ค้นหา</p>
      ) : (
        <>
          <p className="mb-4 text-slate-600">
            พบ {products.length} รายการ
            {search ? ` สำหรับ "${search}"` : ''}
          </p>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="block overflow-hidden rounded-lg border border-slate-200 transition hover:shadow-md"
              >
                <div className="relative h-48 bg-slate-100">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(width < 768px) 50vw, (width < 1200px) 33vw, 25vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-400">
                      No Image
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h2 className="mb-2 text-sm font-medium line-clamp-2">
                    {product.name}
                  </h2>
                  <p className="font-bold text-blue-600">
                    {/* price จาก API เป็น string, ต้อง parse ก่อน */}
                    ฿{Number(product.price).toLocaleString() || 'ไม่ระบุ'}
                  </p>
                  {product.barcode && (
                    <p className="text-xs text-slate-500 mt-1">
                      {product.barcode}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </main>
  )
}