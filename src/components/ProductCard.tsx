'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/hooks/useCart';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { formatCurrency, getDiscountPercentage } from '@/lib/utils';
import toast from 'react-hot-toast';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const mainImage = product.images?.[0]?.imageUrl || '/placeholder.jpg';
  const discount = product.originalPrice
    ? getDiscountPercentage(product.originalPrice, product.price)
    : 0;

  const handleAddToCart = () => {
    addItem(product, 1);
    toast.success('تم إضافة المنتج إلى السلة');
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'تم الإزالة من المفضلة' : 'تم الإضافة إلى المفضلة');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-200 dark:bg-gray-700 aspect-square">
        <Image
          src={mainImage}
          alt={product.nameAr}
          fill
          className="object-cover w-full h-full"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between">
          {discount > 0 && (
            <div className="bg-danger text-white px-2 py-1 rounded text-xs font-bold">
              -{discount}%
            </div>
          )}
          {product.isBestSeller && (
            <div className="bg-success text-white px-2 py-1 rounded text-xs font-bold">
              الأفضل
            </div>
          )}
          {product.isNewArrival && (
            <div className="bg-warning text-white px-2 py-1 rounded text-xs font-bold">
              جديد
            </div>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute bottom-3 right-3 bg-white dark:bg-gray-800 p-2 rounded-full shadow hover:bg-primary-500 hover:text-white transition"
        >
          <FiHeart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">الفئة</p>

        {/* Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2 hover:text-primary-500 transition">
            {product.nameAr}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex text-warning">
            {'★'.repeat(Math.round(product.rating))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="font-bold text-primary-500 text-lg">
            {formatCurrency(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="mb-3">
          {product.stock > 0 ? (
            <p className="text-xs text-success font-semibold">متوفر بالمخزن</p>
          ) : (
            <p className="text-xs text-danger font-semibold">غير متوفر</p>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!product.isAvailable || product.stock === 0}
          className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <FiShoppingCart size={18} />
          أضف للسلة
        </button>
      </div>
    </div>
  );
}
