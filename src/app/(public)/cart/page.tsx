'use client';

import { Header, Footer } from '@/components';
import { useCart } from '@/hooks/useCart';
import Image from 'next/image';
import Link from 'next/link';
import { FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { formatCurrency } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('السلة فارغة');
      return;
    }
    // TODO: Implement checkout process
    toast.success('جارٍ التوجيه إلى الدفع...');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">سلة التسوق</h1>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
              سلتك فارغة حالياً
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-bold px-6 py-3 rounded-lg transition"
            >
              <FiArrowLeft /> العودة للتسوق
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => {
                  const image = item.product?.images?.[0]?.imageUrl || '/placeholder.jpg';
                  return (
                    <div
                      key={item.id}
                      className="flex gap-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
                    >
                      <div className="relative w-24 h-24 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={image}
                          alt={item.product?.nameAr}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                          {item.product?.nameAr}
                        </h3>
                        <p className="text-primary-500 font-semibold mb-3">
                          {formatCurrency(item.price)}
                        </p>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity - 1)
                            }
                            className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                          >
                            −
                          </button>
                          <span className="font-semibold w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity + 1)
                            }
                            className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-lg mb-4 text-gray-900 dark:text-white">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-danger hover:text-danger/80 transition"
                        >
                          <FiTrash2 size={20} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg h-fit sticky top-20">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                ملخص الطلب
              </h3>

              <div className="space-y-3 mb-6 border-b pb-4">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>عدد المنتجات:</span>
                  <span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>الرسوم:</span>
                  <span>0.00 دج</span>
                </div>
              </div>

              <div className="flex justify-between mb-6 text-lg font-bold text-gray-900 dark:text-white">
                <span>الإجمالي:</span>
                <span className="text-primary-500">{formatCurrency(total)}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 rounded-lg mb-3 transition"
              >
                المتابعة للدفع
              </button>

              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_STORE_WHATSAPP}?text=أود%20أن%20أطلب`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition"
              >
                اطلب عبر الواتس
              </a>

              <button
                onClick={() => clearCart()}
                className="w-full mt-4 text-danger hover:text-danger/80 font-semibold transition"
              >
                مسح السلة
              </button>

              <Link
                href="/products"
                className="block text-center mt-4 text-secondary-500 hover:text-secondary-600 font-semibold transition"
              >
                العودة للتسوق
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
