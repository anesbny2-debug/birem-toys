'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '../layout';
import { FiUsers, FiPackage, FiShoppingCart, FiTrendingUp, FiLogOut } from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const chartData = [
  { date: '1 يناير', sales: 400 },
  { date: '8 يناير', sales: 3000 },
  { date: '15 يناير', sales: 2000 },
  { date: '22 يناير', sales: 2780 },
  { date: '29 يناير', sales: 1890 },
  { date: '5 فبراير', sales: 2390 },
  { date: '12 فبراير', sales: 3490 },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        const [products, orders] = await Promise.all([
          axios.get('/api/products?limit=1000'),
          axios.get('/api/orders'),
        ]);

        const totalRevenue = orders.data.reduce(
          (sum: number, order: any) => sum + order.totalAmount,
          0
        );

        setStats({
          totalProducts: products.data.products.length,
          totalOrders: orders.data.length,
          totalCustomers: new Set(orders.data.map((o: any) => o.customerEmail)).size,
          totalRevenue,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  const StatCard = ({ icon: Icon, label, value, color }: any) => (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`${color} text-white p-4 rounded-lg`}>
          <Icon size={32} />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
          >
            <FiLogOut /> تسجيل الخروج
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={FiPackage}
            label="إجمالي المنتجات"
            value={stats.totalProducts}
            color="bg-primary-500"
          />
          <StatCard
            icon={FiShoppingCart}
            label="الطلبات"
            value={stats.totalOrders}
            color="bg-secondary-500"
          />
          <StatCard
            icon={FiUsers}
            label="العملاء"
            value={stats.totalCustomers}
            color="bg-success"
          />
          <StatCard
            icon={FiTrendingUp}
            label="إجمالي الإيرادات"
            value={`${Math.round(stats.totalRevenue).toLocaleString('ar-DZ')} دج`}
            color="bg-warning"
          />
        </div>

        {/* Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-900 mb-4">المبيعات هذا الشهر</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#f97316" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href="/admin/products"
            className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6 rounded-lg hover:shadow-lg transition cursor-pointer"
          >
            <FiPackage size={32} className="mb-3" />
            <h3 className="text-xl font-bold">إدارة المنتجات</h3>
            <p className="text-sm mt-2 opacity-90">إضافة وتعديل وحذف المنتجات</p>
          </a>

          <a
            href="/admin/orders"
            className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white p-6 rounded-lg hover:shadow-lg transition cursor-pointer"
          >
            <FiShoppingCart size={32} className="mb-3" />
            <h3 className="text-xl font-bold">الطلبات</h3>
            <p className="text-sm mt-2 opacity-90">عرض وإدارة الطلبات</p>
          </a>

          <a
            href="/admin/settings"
            className="bg-gradient-to-r from-success to-success/80 text-white p-6 rounded-lg hover:shadow-lg transition cursor-pointer"
          >
            <FiTrendingUp size={32} className="mb-3" />
            <h3 className="text-xl font-bold">الإعدادات</h3>
            <p className="text-sm mt-2 opacity-90">إدارة إعدادات المتجر</p>
          </a>
        </div>
      </div>
    </AdminLayout>
  );
}
