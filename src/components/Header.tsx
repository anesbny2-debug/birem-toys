'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme';
import { useCart } from '@/hooks/useCart';
import { FiShoppingCart, FiSearch, FiMenu, FiX, FiMoon, FiSun } from 'react-icons/fi';
import SearchBar from './SearchBar';

export default function Header() {
  const { language, changeLanguage, isRTL, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 shadow-md transition-colors">
      {/* Top Bar */}
      <div className="bg-primary-500 text-white dark:bg-primary-700 px-4 py-2 text-center text-sm">
        <p>🚘 {t('free_shipping')} | 🃲 {process.env.NEXT_PUBLIC_STORE_WHATSAPP}</p>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
            <span className="text-primary-500">🎀</span>
            <span className="text-gray-900 dark:text-white">Birem Toys</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 mx-8">
            <SearchBar />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Search Button - Mobile */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden text-gray-900 dark:text-white hover:text-primary-500 transition"
            >
              <FiSearch size={24} />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="text-gray-900 dark:text-white hover:text-primary-500 transition"
            >
              {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            {/* Language Selector */}
            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value as any)}
              className="text-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 rounded border-0 cursor-pointer"
            >
              <option value="ar">العربية</option>
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>

            {/* Cart Button */}
            <Link
              href="/cart"
              className="relative text-gray-900 dark:text-white hover:text-primary-500 transition"
            >
              <FiShoppingCart size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Admin Link */}
            <Link
              href="/admin"
              className="text-sm bg-secondary-500 text-white px-4 py-2 rounded hover:bg-secondary-600 transition hidden md:block"
            >
              Admin
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-900 dark:text-white"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        {searchOpen && (
          <div className="md:hidden mt-4">
            <SearchBar />
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white dark:bg-gray-900">
          <nav className="flex flex-col gap-2 p-4">
            <Link href="/" className="py-2 text-gray-900 dark:text-white hover:text-primary-500">
              {t('home')}
            </Link>
            <Link href="/products" className="py-2 text-gray-900 dark:text-white hover:text-primary-500">
              {t('products')}
            </Link>
            <Link href="/categories" className="py-2 text-gray-900 dark:text-white hover:text-primary-500">
              {t('categories')}
            </Link>
            <Link href="/about" className="py-2 text-gray-900 dark:text-white hover:text-primary-500">
              {t('about')}
            </Link>
            <Link href="/contact" className="py-2 text-gray-900 dark:text-white hover:text-primary-500">
              {t('contact')}
            </Link>
            <Link href="/admin" className="py-2 text-secondary-500 font-semibold">
              Admin Panel
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
