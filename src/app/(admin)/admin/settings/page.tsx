'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminLayout from '../../layout';
import { FiLogOut } from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Setting {
  id: string;
  key: string;
  value: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({
    STORE_NAME: process.env.NEXT_PUBLIC_STORE_NAME || 'Birem Toys',
    STORE_PHONE: process.env.NEXT_PUBLIC_STORE_PHONE || '',
    STORE_WHATSAPP: process.env.NEXT_PUBLIC_STORE_WHATSAPP || '',
    STORE_EMAIL: process.env.NEXT_PUBLIC_STORE_EMAIL || '',
    STORE_ADDRESS: process.env.NEXT_PUBLIC_STORE_ADDRESS || '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save settings to database
      for (const [key, value] of Object.entries(settings)) {
        await axios.post('/api/settings', { key, value });
      }
      toast.success('تم حفظ الإعدادات بنجاح');
    } catch (error) {
      toast.error('خطأ في حفظ الإعدادات');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">الإعدادات</h1>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow space-y-6 max-w-2xl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              اسم المتجر
            </label>
            <input
              type="text"
              name="STORE_NAME"
              value={settings.STORE_NAME}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              رقم الهاتف
            </label>
            <input
              type="tel"
              name="STORE_PHONE"
              value={settings.STORE_PHONE}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              رقم الواتس
            </label>
            <input
              type="tel"
              name="STORE_WHATSAPP"
              value={settings.STORE_WHATSAPP}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              name="STORE_EMAIL"
              value={settings.STORE_EMAIL}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              العنوان
            </label>
            <textarea
              name="STORE_ADDRESS"
              value={settings.STORE_ADDRESS}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-24 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 text-white font-bold py-2 rounded-lg transition"
          >
            {loading ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
