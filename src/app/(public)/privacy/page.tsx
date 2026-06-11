'use client';

import { Header, Footer } from '@/components';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
            سياسة الخصوصية
          </h1>

          <div className="space-y-8 text-gray-600 dark:text-gray-400 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                1. مقدمة
              </h2>
              <p>
                Birem Toys تحترم خصوصيتك وملتزمة بحماية بيانات الشخصية الخاصة بك. توضح هذه السياسة كيفية
                جمع واستخدام ومشاركة المعلومات عند استخدام موقعنا.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                2. المعلومات التي نجمعها
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>الاسم والبريد الإلكتروني ورقم الهاتف</li>
                <li>عنوان التوصيل والدفع</li>
                <li>تاريخ الطلبات والمشتريات</li>
                <li>معلومات حول استخدام الموقع</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                3. استخدام المعلومات
              </h2>
              <p>
                نستخدم المعلومات لمعالجة طلباتك وتحسين الخدمات وإرسال التحديثات والعروض الترويجية
                (إذا وافقت على ذلك).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                4. حماية المعلومات
              </h2>
              <p>
                نستخدم تشفير SSL وغيرها من الإجراءات الأمنية لحماية بياناتك الشخصية من الوصول غير المصرح
                والاستخدام غير السليم.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                5. حقوقك
              </h2>
              <p>
                لديك الحق في الوصول إلى بيانتك الشخصية وتصحيحها وحذفها. للقيام بذلك، يرجى الاتصال بنا.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                6. التعديلات
              </h2>
              <p>
                قد نحدّث هذه السياسة من وقت لآخر. سنخطرك بأي تغييرات مهمة عن طريق تحديث تاريخ آخر تعديل.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                7. الاتصال بنا
              </h2>
              <p>
                إذا كان لديك أي أسئلة حول هذه السياسة، يرجى الاتصال بنا على:
                <br />
                البريد: {process.env.NEXT_PUBLIC_STORE_EMAIL}
                <br />
                الهاتف: {process.env.NEXT_PUBLIC_STORE_PHONE}
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
