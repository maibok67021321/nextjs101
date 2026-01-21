# 📘 บทที่ 7 การจัดการ Cache ด้วย Cache Components

คุณกำลังอยู่ที่ Branch **`chapter-07`** ซึ่งเน้นการทำ Cache Components

---

## 🎯 สิ่งที่จะได้เรียนรู้ในบทนี้
- เข้าใจ Cache Components


---

## 📦 Library ที่ต้องติดตั้งเพิ่ม (Prerequisites)
ยังไม่มี

---

## 📂 โครงสร้างไฟล์สำคัญ

* `src/types/product.ts`: สร้าง types สําหรับข้อมูลสินค้าและหมวดหมู่
* `src/services/product-service.ts`: product service ที่ไม่ใช้ cache
* `src/services/category-service.ts`: category service ที่ใช้ use cache
* `src/components/product-search-barcode.tsx`: Component สําหรับค้นหาสินค้า
* `src/components/category-list.tsx`: Component สำหรับแสดงหมวดหมู่


---

## 🚀 วิธีการรัน

1. `npm install`
2. `npm run dev`
3. เข้าไปที่ `http://localhost:3000/products`

---

⬅️ [กลับไปหน้าสารบัญหลัก (Main Branch)](../../tree/main)

