'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '../../layout';
import { Product, Category } from '@/types';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import Link from 'next/link';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    fetchProducts();
  }, [page, router]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/products?page=${page}&limit=20`);
      setProducts(res.data.products);
      setTotalPages(res.data.pagination.pages);
    } catch (error) {
      toast.error('خطأ في تحميل المنتجات');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) return;

    try {
      await axios.delete(`/api/products/${id}`);
      toast.success('تم حذف المنتج بنجاح');
      fetchProducts();
    } catch (error) {
      toast.error('خطأ في حذف المنتج');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">المنتجات</h1>
          <Link
            href="/admin/products/new"
            className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
          >
            <FiPlus /> منتج جديد
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">لا توجد منتجات</p>
            <Link href="/admin/products/new" className="text-primary-500 hover:underline">
              إضافة منتج جديد
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">اسم المنتج</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">السعر</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">المخزون</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">الحالة</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-3 text-sm text-gray-900">{product.nameAr}</td>
                      <td className="px-6 py-3 text-sm text-gray-900">{product.price} دج</td>
                      <td className="px-6 py-3 text-sm text-gray-900">{product.stock}</td>
                      <td className="px-6 py-3 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            product.isAvailable
                              ? 'bg-success/20 text-success'
                              : 'bg-danger/20 text-danger'
                          }`}
                        >
                          {product.isAvailable ? 'متوفر' : 'غير متوفر'}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-sm">
                        <div className="flex gap-2">
                          <Link
                            href={`/admin/products/${product.id}`}
                            className="text-primary-500 hover:text-primary-600 transition"
                          >
                            <FiEdit2 />
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-danger hover:text-danger/80 transition"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50 hover:bg-gray-300 transition"
                >
                  السابق
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`px-4 py-2 rounded transition ${
                      page === p
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50 hover:bg-gray-300 transition"
                >
                  التالي
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
}
