'use client';

import { Header, Footer } from '@/components';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
            شروط الاستخدام
          </h1>

          <div className="space-y-8 text-gray-600 dark:text-gray-400 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                1. شروط الخدمة
              </h2>
              <p>
                باستخدام موقع Birem Toys، أنت توافق على الالتزام بجميع الشروط والأحكام الموضحة هنا.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                2. استخدام الموقع
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>يجب أن تكون بسن 18 سنة أو أكثر لاستخدام هذا الموقع</li>
                <li>أنت توافق على عدم استخدام الموقع لأي أغراض غير قانونية</li>
                <li>لا يجوز نسخ أو إعادة استخدام أي محتوى من الموقع بدون إذن</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                3. المنتجات والأسعار
              </h2>
              <p>
                نحتفظ بالحق في تغيير الأسعار والأسهم والتوفر في أي وقت دون إشعار مسبق. جميع الأسعار صحيحة
                وقت النشر.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                4. الطلبات والدفع
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>جميع الطلبات تتطلب دفعًا كاملاً قبل الشحن</li>
                <li>نقبل جميع طرق الدفع المذكورة على الموقع</li>
                <li>المسؤولية عن الدفع تقع على المشتري</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                5. الشحن والتسليم
              </h2>
              <p>
                نحاول توصيل الطلبات في الوقت المحدد، لكننا لا نضمن التسليم في تاريخ معين. نحن لا نتحمل
                المسؤولية عن التأخير الناجم عن ظروف خارجة عن سيطرتنا.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                6. الإرجاع والاستبدال
              </h2>
              <p>
                يمكن إرجاع المنتجات في غضون 7 أيام من الاستلام إذا كانت غير مستخدمة وفي حالتها الأصلية.
                اتصل بنا لترتيب العودة.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                7. الضمان والتنصل
              </h2>
              <p>
                نحن لا نقدم أي ضمان، صريح أو ضمني، بخصوص المنتجات أو الخدمات. نحن لا نتحمل المسؤولية
                عن أي أضرار غير مباشرة أو عرضية.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                8. تحديد المسؤولية
              </h2>
              <p>
                مسؤوليتنا تجاهك محدودة بالمبلغ الذي دفعته للشراء. لن نتحمل المسؤولية عن الأرباح المفقودة
                أو البيانات أو الدخل.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                9. الاتصال بنا
              </h2>
              <p>
                إذا كان لديك أي استفسارات حول هذه الشروط، يرجى الاتصال بنا على:
                <br />
                البريد: {process.env.NEXT_PUBLIC_STORE_EMAIL}
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
