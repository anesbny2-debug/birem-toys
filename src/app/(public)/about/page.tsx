'use client';

import { Header, Footer } from '@/components';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white text-center">
          عن Birem Toys
        </h1>

        <div className="max-w-3xl mx-auto space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              من نحن؟
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Birem Toys هو متجر متخصص في بيع الألعاب التعليمية والترفيهية للأطفال من جميع الأعمار.
              نحن ملتزمون بتقديم منتجات عالية الجودة وآمنة تساهم في تنمية مهارات الأطفال وإبداعهم.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              رؤيتنا
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              أن نكون الخيار الأول للعائلات الجزائرية في شراء الألعاب والمنتجات الآمنة والموثوقة
              التي تساهم في التنمية الصحيحة والآمنة للأطفال.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              قيمنا
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
              <li>الجودة: نختار أفضل المنتجات من أفضل الشركات العالمية</li>
              <li>الأمان: جميع منتجاتنا آمنة وتتوافق مع المعايير الدولية</li>
              <li>الشفافية: نتعامل بصراحة كاملة مع عملائنا</li>
              <li>الخدمة: نسعى دائماً لتقديم أفضل خدمة عملاء</li>
              <li>الابتكار: نتابع أحدث الاتجاهات في عالم الألعاب التعليمية</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              منتجاتنا
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              نوفر مجموعة واسعة من المنتجات:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
              <li>ألعاب تعليمية وذكاء (فسيفساء، ألغاز، ألعاب بناء)</li>
              <li>ألعاب الماء والشاطئ</li>
              <li>ألعاب الأطفال الرضع والحسية</li>
              <li>الإكسسوارات والملحقات</li>
            </ul>
          </section>

          <section className="bg-gradient-to-r from-primary-500 to-secondary-500 p-8 rounded-lg text-white">
            <h2 className="text-2xl font-bold mb-4">تواصل معنا</h2>
            <p className="mb-6">
              هل لديك أي استفسارات؟ نحن هنا لمساعدتك!
            </p>
            <div className="space-y-3">
              <p>
                📞 الهاتف: <a href={`tel:${process.env.NEXT_PUBLIC_STORE_PHONE}`} className="hover:underline">{process.env.NEXT_PUBLIC_STORE_PHONE}</a>
              </p>
              <p>
                📧 البريد: <a href={`mailto:${process.env.NEXT_PUBLIC_STORE_EMAIL}`} className="hover:underline">{process.env.NEXT_PUBLIC_STORE_EMAIL}</a>
              </p>
              <p>
                📍 الموقع: {process.env.NEXT_PUBLIC_STORE_ADDRESS}
              </p>
              <p>
                <a href={`https://wa.me/${process.env.NEXT_PUBLIC_STORE_WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  💬 تواصل عبر الواتس
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
