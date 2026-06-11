'use client';

import { useState } from 'react';
import { Header, Footer } from '@/components';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    messageAr: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('/api/contact', formData);
      toast.success('تم إرسال رسالتك بنجاح');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        messageAr: '',
      });
    } catch (error) {
      toast.error('حدث خطأ في إرسال الرسالة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white text-center">
          اتصل بنا
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              معلومات التواصل
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                  📞 الهاتف
                </h3>
                <a
                  href={`tel:${process.env.NEXT_PUBLIC_STORE_PHONE}`}
                  className="text-primary-500 hover:underline"
                >
                  {process.env.NEXT_PUBLIC_STORE_PHONE}
                </a>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                  📧 البريد الإلكتروني
                </h3>
                <a
                  href={`mailto:${process.env.NEXT_PUBLIC_STORE_EMAIL}`}
                  className="text-primary-500 hover:underline"
                >
                  {process.env.NEXT_PUBLIC_STORE_EMAIL}
                </a>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                  📍 العنوان
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {process.env.NEXT_PUBLIC_STORE_ADDRESS}
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                  💬 الواتس آب
                </h3>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_STORE_WHATSAPP}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-success hover:underline"
                >
                  اتصل الآن عبر الواتس
                </a>
              </div>

              <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-bold mb-3 text-gray-900 dark:text-white">
                  ساعات العمل
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  السبت - الخميس: 09:00 - 18:00
                  <br />
                  الجمعة: مغلق
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              أرسل رسالة
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                  الاسم
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                  رقم الهاتف (اختياري)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                  الموضوع
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                >
                  <option value="">اختر الموضوع</option>
                  <option value="استفسار">استفسار عام</option>
                  <option value="شكوى">شكوى</option>
                  <option value="اقتراح">اقتراح</option>
                  <option value="طلب">طلب خاص</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                  الرسالة
                </label>
                <textarea
                  name="messageAr"
                  value={formData.messageAr}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-32 resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition"
              >
                {loading ? 'جاري الإرسال...' : 'إرسال الرسالة'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
