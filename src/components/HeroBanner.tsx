'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Banner } from '@/types';

interface HeroBannerProps {
  banners: Banner[];
}

export default function HeroBanner({ banners }: HeroBannerProps) {
  const activeBanners = banners.filter(
    (b) => b.isActive && new Date() >= b.validFrom && new Date() <= b.validUntil
  );

  if (activeBanners.length === 0) {
    return (
      <div className="relative w-full h-96 bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">مرحبا بك في Birem Toys</h1>
          <p className="text-xl mb-6">أفضل متجر ألعاب في الجزائر</p>
          <Link
            href="/products"
            className="bg-white text-primary-500 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition inline-block"
          >
            تصفح المنتجات
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden">
      {activeBanners.map((banner, index) => (
        <motion.div
          key={banner.id}
          initial={{ opacity: index === 0 ? 1 : 0 }}
          animate={{ opacity: index === 0 ? 1 : 0 }}
          transition={{ duration: 5 }}
          className="absolute inset-0"
        >
          <Image
            src={banner.image}
            alt={banner.titleAr}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{banner.titleAr}</h2>
              {banner.subtitleAr && (
                <p className="text-lg md:text-xl mb-4">{banner.subtitleAr}</p>
              )}
              {banner.link && (
                <Link
                  href={banner.link}
                  className="bg-primary-500 hover:bg-primary-600 text-white font-bold px-8 py-3 rounded-lg inline-block transition"
                >
                  تسوق الآن
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
