// lib/axios.ts
import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://backend.codingthailand.com/v2',  // เติมหน้าทุก URL อัตโนมัติ
  timeout: 10000,                                    // รอสูงสุด 10 วินาที
  headers: {
    'Content-Type': 'application/json',              // ส่ง JSON ทุก request
  },
})