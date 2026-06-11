'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Header, Footer } from '@/components';
import { Product, Review } from '@/types';
import axios from 'axios';
import { FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [newReview, setNewReview] = useState({
    customerName: '',
    customerEmail: '',
    rating: 5,
    commentAr: '',
  });
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${params.id}`);
        setProduct(res.data);
        setReviews(res.data.reviews || []);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('خطأ في تحميل المنتج');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      toast.success('تم إضافة المنتج إلى السلة');
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`/api/reviews/${product?.id}`, newReview);
      toast.success('تم إرسال التقييم بنجاح');
      setNewReview({
        customerName: '',
        customerEmail: '',
        rating: 5,
        commentAr: '',
      });
    } catch (error) {
      toast.error('خطأ في إرسال التقييم');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400 text-lg">المنتج غير موجود</p>
      </div>
    );
  }

  const mainImage = product.images?.[selectedImage]?.imageUrl || '/placeholder.jpg';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Images */}
          <div>
            <div className="relative bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden aspect-square mb-4">
              <Image
                src={mainImage}
                alt={product.nameAr}
                fill
                className="object-cover"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition ${
                      selectedImage === index
                        ? 'border-primary-500'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <Image
                      src={image.imageUrl}
                      alt={`${product.nameAr} ${index}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
              {product.nameAr}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex text-warning gap-1">
                {Array(Math.round(product.rating))
                  .fill(0)
                  .map((_, i) => (
                    <FiStar key={i} fill="currentColor" />
                  ))}
              </div>
              <span className="text-gray-600 dark:text-gray-400">
                ({product.reviewCount} تقييم)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-4xl font-bold text-primary-500">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <p className="text-success font-semibold">
                  ✓ متوفر بالمخزن ({product.stock} وحدة)
                </p>
              ) : (
                <p className="text-danger font-semibold">✗ غير متوفر</p>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                الوصف
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {product.descriptionAr}
              </p>
            </div>

            {/* Quantity & Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 transition"
                >
                  −
                </button>
                <span className="font-bold text-lg w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 transition"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition"
              >
                <FiShoppingCart /> أضف للسلة
              </button>
              <button className="bg-secondary-500 hover:bg-secondary-600 text-white font-bold px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition">
                <FiHeart /> أضف للمفضلة
              </button>
            </div>

            {/* Contact */}
            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm mb-3 text-gray-700 dark:text-gray-300">
                هل لديك استفسار؟ تواصل معنا:
              </p>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_STORE_WHATSAPP}?text=أنا مهتم بـ: ${product.nameAr}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition font-semibold"
              >
                💬 اتصل عبر الواتس
              </a>
            </div>
          </div>
        </motion.div>

        {/* Reviews Section */}
        <div className="border-t pt-12">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
            التقييمات والآراء
          </h2>

          {/* Reviews List */}
          {reviews.length > 0 ? (
            <div className="grid gap-6 mb-8">
              {reviews.map((review) => (
                <motion.div
                  key={review.id}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {review.customerName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString('ar-DZ')}
                      </p>
                    </div>
                    <div className="flex text-warning gap-1">
                      {Array(review.rating)
                        .fill(0)
                        .map((_, i) => (
                          <FiStar key={i} fill="currentColor" />
                        ))}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {review.commentAr}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              لا توجد تقييمات حتى الآن
            </p>
          )}

          {/* Add Review Form */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              أضف تقييمك
            </h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="اسمك"
                  value={newReview.customerName}
                  onChange={(e) =>
                    setNewReview({ ...newReview, customerName: e.target.value })
                  }
                  className="px-4 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
                <input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  value={newReview.customerEmail}
                  onChange={(e) =>
                    setNewReview({ ...newReview, customerEmail: e.target.value })
                  }
                  className="px-4 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <select
                value={newReview.rating}
                onChange={(e) =>
                  setNewReview({ ...newReview, rating: parseInt(e.target.value) })
                }
                className="w-full px-4 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value={5}>⭐⭐⭐⭐⭐ ممتاز</option>
                <option value={4}>⭐⭐⭐⭐ جيد جداً</option>
                <option value={3}>⭐⭐⭐ جيد</option>
                <option value={2}>⭐⭐ مقبول</option>
                <option value={1}>⭐ ضعيف</option>
              </select>
              <textarea
                placeholder="اكتب تعليقك..."
                value={newReview.commentAr}
                onChange={(e) =>
                  setNewReview({ ...newReview, commentAr: e.target.value })
                }
                className="w-full px-4 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-24 resize-none"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 rounded-lg transition"
              >
                إرسال التقييم
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
