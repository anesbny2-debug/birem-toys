'use client';

import { Header, Footer } from '@/components';

const faqs = [
  {
    question: 'ما هي رسوم الشحن؟',
    answer: 'رسوم الشحن تعتمد على الموقع والوزن. يتم حسابها تلقائياً عند الدفع.',
  },
  {
    question: 'هل يمكنني إرجاع المنتج؟',
    answer: 'نعم، يمكنك إرجاع المنتج في غضون 7 أيام من الاستلام إذا كان جديداً وغير مستخدم.',
  },
  {
    question: 'كم وقت يستغرق التسليم؟',
    answer: 'عادة ما يستغرق التسليم 3-5 أيام عمل بعد تأكيد الطلب.',
  },
  {
    question: 'هل تقبلون طرق دفع مختلفة؟',
    answer: 'نعم، نقبل الدفع عند الاستلام والتحويل البنكي والمحافظ الرقمية.',
  },
  {
    question: 'كيف أتتبع طلبي؟',
    answer: 'ستتلقى بريداً إلكترونياً برقم التتبع بعد شحن طلبك.',
  },
  {
    question: 'هل المنتجات أصلية؟',
    answer: 'نعم، جميع منتجاتنا أصلية 100% من موردين موثوقين.',
  },
  {
    question: 'هل هناك ضمان على المنتجات؟',
    answer: 'بعض المنتجات تأتي مع ضمان من الشركة المصنعة. تحقق من وصف المنتج للتفاصيل.',
  },
  {
    question: 'كيف يمكنني الاتصال بخدمة العملاء؟',
    answer: 'يمكنك الاتصال بنا عبر الهاتف أو البريد الإلكتروني أو الواتس آب.',
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white text-center">
          الأسئلة الشائعة
        </h1>

        <div className="max-w-2xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg cursor-pointer group"
            >
              <summary className="font-bold text-gray-900 dark:text-white flex items-center justify-between">
                {faq.question}
                <span className="group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
