'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header, Footer, HeroBanner, ProductCard } from '@/components';
import { Product, Banner } from '@/types';
import { FiTrendingUp, FiStar, FiPackage } from 'react-icons/fi';
import { motion } from 'framer-motion';
import axios from 'axios';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function HomePage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch banners
        const bannersRes = await axios.get('/api/banners');
        setBanners(bannersRes.data);

        // Fetch featured products
        const featuredRes = await axios.get('/api/products?isFeatured=true&limit=8');
        setFeaturedProducts(featuredRes.data.products);

        // Fetch new arrivals
        const newRes = await axios.get('/api/products?isNewArrival=true&limit=8');
        setNewProducts(newRes.data.products);

        // Fetch best sellers
        const bestRes = await axios.get('/api/products?isBestSeller=true&limit=8');
        setBestSellers(bestRes.data.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header />

      {/* Hero Banner */}
      <section className="pt-4 px-4 container mx-auto">
        <HeroBanner banners={banners} />
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary-500 text-white p-4 rounded-full">
                  <FiTrendingUp size={32} />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                أفضل الأسعار
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                أسعار منخفضة وتنافسية على جميع المنتجات
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-secondary-500 text-white p-4 rounded-full">
                  <FiPackage size={32} />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                شحن سريع
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                توصيل آمن وسريع إلى جميع أنحاء الجزائر
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-success text-white p-4 rounded-full">
                  <FiStar size={32} />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                منتجات أصلية
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                ضمان 100% منتجات أصلية وموثوقة
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 px-4 container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              المنتجات المميزة
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              اكتشف أفضل العروض والمنتجات المختارة
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuredProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {/* New Arrivals */}
      {newProducts.length > 0 && (
        <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800 container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              الوصول الجديد
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              أحدث المنتجات التي وصلت حديثاً
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {newProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {/* Best Sellers */}
      {bestSellers.length > 0 && (
        <section className="py-16 px-4 container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              الأفضل مبيعاً
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              المنتجات الأكثر شعبية والمحبوبة
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {bestSellers.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="bg-primary-500 hover:bg-primary-600 text-white font-bold px-8 py-3 rounded-lg inline-block transition"
            >
              عرض جميع المنتجات
            </Link>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary-500 to-secondary-500">
        <div className="container mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            هل أنت مستعد للتسوق؟
          </h2>
          <p className="text-lg mb-8">
            اكتشف آلاف المنتجات الممتازة بأسعار لا تُصدق
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-white text-primary-500 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              ابدأ التسوق
            </Link>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_STORE_WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-green-600 transition"
            >
              اتصل بنا عبر الواتس
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
