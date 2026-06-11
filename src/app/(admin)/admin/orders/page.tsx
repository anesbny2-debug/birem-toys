'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '../../layout';
import { Order } from '@/types';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiEye, FiEdit2 } from 'react-icons/fi';
import Link from 'next/link';

const statusColors: Record<string, string> = {
  pending: 'bg-warning/20 text-warning',
  confirmed: 'bg-secondary-500/20 text-secondary-500',
  shipped: 'bg-primary-500/20 text-primary-500',
  delivered: 'bg-success/20 text-success',
  cancelled: 'bg-danger/20 text-danger',
};

const statusLabels: Record<string, string> = {
  pending: 'قيد الانتظار',
  confirmed: 'مؤكد',
  shipped: 'مشحون',
  delivered: 'تم التسليم',
  cancelled: 'ملغى',
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    fetchOrders();
  }, [router]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/orders');
      setOrders(res.data);
    } catch (error) {
      toast.error('خطأ في تحميل الطلبات');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">الطلبات</h1>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">لا توجد طلبات</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">رقم الطلب</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">العميل</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">المبلغ</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">الحالة</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">التاريخ</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm text-gray-900 font-semibold">{order.orderNumber}</td>
                    <td className="px-6 py-3 text-sm text-gray-900">{order.customerName}</td>
                    <td className="px-6 py-3 text-sm text-gray-900">{order.totalAmount.toLocaleString('ar-DZ')} دج</td>
                    <td className="px-6 py-3 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
                        {statusLabels[order.status]}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString('ar-DZ')}
                    </td>
                    <td className="px-6 py-3 text-sm">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="text-primary-500 hover:text-primary-600 transition"
                      >
                        <FiEye />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
