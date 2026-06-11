'use client';

import { useState, useEffect } from 'react';
import { Header, Footer, ProductCard } from '@/components';
import { Product, Category } from '@/types';
import axios from 'axios';
import { FiFilter, FiChevronDown } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const params: any = {
          page,
          limit: 12,
          sort: sortBy,
        };

        if (selectedCategory) {
          params.categoryId = selectedCategory;
        }

        const [productsRes, categoriesRes] = await Promise.all([
          axios.get('/api/products', { params }),
          axios.get('/api/categories'),
        ]);

        setProducts(productsRes.data.products);
        setTotalPages(productsRes.data.pagination.pages);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory, sortBy, page]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden'} lg:block`}>
            <button
              onClick={() => setShowFilters(false)}
              className="lg:hidden mb-4 text-gray-600 dark:text-gray-400"
            >
              ✕ إغلاق الفلاتر
            </button>

            <div className="space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                  <FiFilter /> الفئات
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setSelectedCategory('');
                      setPage(1);
                    }}
                    className={`block w-full text-left px-4 py-2 rounded transition ${
                      !selectedCategory
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    جميع الفئات
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setPage(1);
                      }}
                      className={`block w-full text-left px-4 py-2 rounded transition ${
                        selectedCategory === category.id
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      {category.nameAr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">الترتيب</h3>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setPage(1);
                  }}
                  className="w-full px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border-0 cursor-pointer"
                >
                  <option value="newest">الأحدث</option>
                  <option value="price-low">السعر: من الأقل للأعلى</option>
                  <option value="price-high">السعر: من الأعلى للأقل</option>
                  <option value="popular">الأكثر شعبية</option>
                  <option value="rating">التقييم الأعلى</option>
                </select>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                جميع المنتجات
              </h1>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden bg-primary-500 text-white px-4 py-2 rounded flex items-center gap-2"
              >
                <FiFilter /> الفلاتر
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  لم يتم العثور على منتجات
                </p>
              </div>
            ) : (
              <>
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
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
                            : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                    <button
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                      التالي
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
