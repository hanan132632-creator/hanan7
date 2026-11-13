import React, { useState } from 'react';
import { ChevronDown, ArrowLeft } from 'lucide-react';
import { SEO_FAQ_ITEMS } from '../data/seoFaqData';

interface SeoFaqSectionProps {
  onSelectPost?: (postId: string) => void;
}

export const SeoFaqSection: React.FC<SeoFaqSectionProps> = ({ onSelectPost }) => {
  const [openId, setOpenId] = useState<string>(SEO_FAQ_ITEMS[0].id);

  return (
    <section
      id="faq-section"
      aria-labelledby="faq-heading"
      className="py-16 bg-white border-t border-[#D4AF37]/20"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-right space-y-2">
          <p className="text-xs font-bold text-[#059669] tracking-wide">
            إجابات مرجعية موثقة · التمويل والتقييم وكود البناء 2026
          </p>
          <h2
            id="faq-heading"
            className="text-2xl sm:text-3xl font-black text-slate-900 font-serif-arabic"
          >
            الأسئلة الشائعة حول الاستثمار والتمويل العقاري في الرياض ودبي
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
            خلاصة الاستفسارات العملية للمستثمرين والمشترين حول العوائد الرأسمالية، الفحص الهندسي،
            تراخيص الوساطة والتقييم المعتمد، وهيكلة التملك الدولي.
          </p>
        </div>

        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {SEO_FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="py-5">
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? '' : item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`${item.id}-panel`}
                  className="w-full flex items-center justify-between gap-4 text-right group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669] rounded-lg py-1"
                >
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#064E3B] transition-colors font-serif-arabic leading-snug">
                    {item.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-[#064E3B] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  id={`${item.id}-panel`}
                  className={isOpen ? 'mt-3 space-y-3' : 'hidden'}
                >
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.answer}
                  </p>
                  <a
                    href={`/post/${item.relatedPostId}`}
                    onClick={(e) => {
                      if (onSelectPost) {
                        e.preventDefault();
                        onSelectPost(item.relatedPostId);
                      }
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#064E3B] hover:text-[#059669] hover:underline whitespace-nowrap"
                  >
                    <span>اقرأ المرجع الكامل: {item.relatedPostLabel}</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
