'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { FiPhone, FiMail, FiMapPin, FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';
import { SiTiktok } from 'react-icons/si';

export default function Footer() {
  const { isRTL, t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-16">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span>🎀</span> Birem Toys
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              متجر ألعاب موثوق لجميع الأعمار. نوفر أفضل الألعاب التعليمية والترفيهية بأسعار منافسة.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 text-xl">
              <a href="https://facebook.com" className="hover:text-primary-500 transition">
                <FiFacebook />
              </a>
              <a href="https://instagram.com" className="hover:text-primary-500 transition">
                <FiInstagram />
              </a>
              <a href="https://tiktok.com" className="hover:text-primary-500 transition">
                <SiTiktok />
              </a>
              <a href="https://twitter.com" className="hover:text-primary-500 transition">
                <FiTwitter />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">روابط سريعة</h4>
            <nav className="flex flex-col gap-2 text-sm text-gray-400">
              <Link href="/" className="hover:text-primary-500 transition">
                الرئيسية
              </Link>
              <Link href="/products" className="hover:text-primary-500 transition">
                المنتجات
              </Link>
              <Link href="/categories" className="hover:text-primary-500 transition">
                الفئات
              </Link>
              <Link href="/about" className="hover:text-primary-500 transition">
                عن المتجر
              </Link>
              <Link href="/contact" className="hover:text-primary-500 transition">
                اتصل بنا
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-bold mb-4">القانونية</h4>
            <nav className="flex flex-col gap-2 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-primary-500 transition">
                سياسة الخصوصية
              </Link>
              <Link href="/terms" className="hover:text-primary-500 transition">
                شروط الاستخدام
              </Link>
              <Link href="/faq" className="hover:text-primary-500 transition">
                الأسئلة الشائعة
              </Link>
              <Link href="/shipping" className="hover:text-primary-500 transition">
                سياسة الشحن
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4">تواصل معنا</h4>
            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <a
                href={`tel:${process.env.NEXT_PUBLIC_STORE_PHONE}`}
                className="flex items-center gap-2 hover:text-primary-500 transition"
              >
                <FiPhone /> {process.env.NEXT_PUBLIC_STORE_PHONE}
              </a>
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_STORE_EMAIL}`}
                className="flex items-center gap-2 hover:text-primary-500 transition"
              >
                <FiMail /> {process.env.NEXT_PUBLIC_STORE_EMAIL}
              </a>
              <p className="flex items-center gap-2">
                <FiMapPin /> {process.env.NEXT_PUBLIC_STORE_ADDRESS}
              </p>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_STORE_WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 bg-success px-4 py-2 rounded font-semibold hover:opacity-90 transition inline-block text-center"
              >
                📱 اتصل عبر واتساب
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-bold mb-4">اشترك في النشرة البريدية</h3>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="ادخل بريدك الإلكتروني"
              className="flex-1 px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              type="submit"
              className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-2 rounded transition"
            >
              اشترك
            </button>
          </form>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <p>&copy; {currentYear} Birem Toys. جميع الحقوق محفوظة.</p>
          <p>
            تم التطوير بواسطة{' '}
            <a href="#" className="text-primary-500 hover:underline">
              فريق التطوير
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
