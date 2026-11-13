import React from 'react';
import { HERO_VILLA_IMAGE } from '../data/mockData';
import { 
  ShieldCheck, 
  Zap, 
  Award, 
  Headphones, 
  Calculator, 
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Building2,
  ShoppingBag,
  Crown
} from 'lucide-react';

interface HeroProps {
  onOpenMortgageCalculator: () => void;
  onOpenAiAdvisor: () => void;
  onScrollToCatalog: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenMortgageCalculator,
  onOpenAiAdvisor,
  onScrollToCatalog,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] py-12 lg:py-20 border-b border-[#D4AF37]/20">
      
      {/* Background Ambient Glows */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#059669]/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-32 w-96 h-96 rounded-full bg-[#18181B]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* VIP Authority Label */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#18181B] border border-[#059669] text-white shadow-lg">
              <div className="w-7 h-7 rounded-xl bg-[#059669] text-[#18181B] flex items-center justify-center font-bold">
                <Crown className="w-4 h-4 text-[#18181B]" />
              </div>
              <span className="text-xs font-black tracking-wide text-[#34D399]">
                المنصة العقارية المعتمدة · تحليلات واستثمارات الرياض ودبي 2026
              </span>
            </div>

            {/* Main Semantic H1 with Primary Target Keywords */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight font-serif-arabic tracking-tight space-y-2">
              <span className="flex flex-wrap items-center gap-3">
                <span>عقارات النخبة الفاخرة — فلل وقصور الرياض ودبي</span>
                <span className="inline-flex items-center justify-center p-2.5 rounded-2xl bg-[#18181B] border border-[#059669] shadow-lg">
                  <Building2 className="w-7 h-7 text-[#10B981]" />
                </span>
              </span>

              <span className="flex flex-wrap items-center gap-3 text-[#064E3B] font-extrabold pt-1 text-2xl sm:text-3xl lg:text-4xl">
                <span className="inline-flex items-center justify-center p-2 rounded-2xl bg-[#18181B] border border-[#059669] shadow-lg">
                  <ShoppingBag className="w-6 h-6 text-[#10B981]" />
                </span>
                <span className="bg-gradient-to-r from-[#064E3B] via-[#059669] to-[#047857] bg-clip-text text-transparent">
                  والمخططات الهندسية المعتمدة 2026
                </span>
              </span>
            </h1>

            {/* SEO Keyword-Aligned Value Proposition */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
              المنصة المتخصصة الأولى لاقتناء الفلل والقصور الفاخرة في الرياض ودبي (حطين، الملقا، داون تاون)، 
              مع دراسات استثمارية موثقة بمعايير E-E-A-T ورخص فال وتقييم، ومخططات كود البناء 2026 وقوالب التسويق العقاري.
            </p>

            {/* Interactive Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="/catalog"
                onClick={(e) => {
                  e.preventDefault();
                  onScrollToCatalog();
                }}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#059669] via-[#047857] to-[#064E3B] text-white font-bold text-sm shadow-xl hover:brightness-110 transition-all group whitespace-nowrap shrink-0"
              >
                <span>استكشف المعروضات الملكية</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#FAD961]" />
              </a>

              <a
                href="/calculator"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenMortgageCalculator();
                }}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#18181B] text-[#D4AF37] hover:bg-[#27272A] border border-[#D4AF37]/50 font-bold text-sm shadow-md transition-all whitespace-nowrap shrink-0"
              >
                <Calculator className="w-4 h-4 text-[#D4AF37]" />
                <span>حاسبة التمويل العقاري</span>
              </a>

              <button
                type="button"
                onClick={onOpenAiAdvisor}
                className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 border border-[#D4AF37]/40 text-[#064E3B] font-bold text-sm transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <Sparkles className="w-4 h-4 text-[#059669]" />
                <span>المستشار العقاري VIP</span>
              </button>
            </div>

            {/* Clean Crawlable Quick Nav & Feature Links */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-600 pt-3 border-t border-slate-200">
              <span className="flex items-center gap-1.5 text-[#064E3B]">
                <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                توثيق رسمي ومعاينات 3D
              </span>
              <span className="flex items-center gap-1.5 text-[#064E3B]">
                <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                مطابقة كود البناء السعودي 2026
              </span>
              <span className="flex items-center gap-1.5 text-[#064E3B]">
                <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                تقارير تقييم وفحص فني معتمدة
              </span>
            </div>

            {/* Direct Crawlable Internal Links to Flagship Guides for PageRank Flow */}
            <nav aria-label="أدلة مرجعية مميزة" className="flex flex-wrap items-center gap-3 text-xs pt-1">
              <span className="text-slate-500 font-bold">أدلة مميزة:</span>
              <a href="/post/post-33" className="text-[#064E3B] hover:text-[#059669] hover:underline font-bold">
                فحص الفلل وتأمين IDI
              </a>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <a href="/post/post-32" className="text-[#064E3B] hover:text-[#059669] hover:underline font-bold">
                تقييم العقارات الفاخرة
              </a>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <a href="/post/post-1" className="text-[#064E3B] hover:text-[#059669] hover:underline font-bold">
                استثمار عقارات الرياض ودبي
              </a>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <a href="/author" className="text-[#064E3B] hover:text-[#059669] hover:underline font-bold">
                ملف الكتّاب والتراخيص
              </a>
            </nav>

          </div>

          {/* Hero Visual Card Showcase */}
          <div className="lg:col-span-5 relative">
            <a
              href="/product/prop-01"
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('open-quick-view-product', { detail: 'prop-01' }));
              }}
              className="block relative rounded-3xl overflow-hidden p-1.5 bg-gradient-to-br from-[#D4AF37] via-[#059669] to-[#18181B] shadow-2xl gold-border-glow"
            >
              <div className="relative rounded-[22px] overflow-hidden bg-[#18181B]">
                <img
                  src={HERO_VILLA_IMAGE}
                  alt="قصر الزمرد الملكي في حي حطين بالرياض - عقارات النخبة الفاخرة 2026"
                  fetchPriority="high"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-[360px] object-cover hover:scale-105 transition-transform duration-700"
                />
                
                {/* Image Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#18181B] via-black/40 to-transparent" />

                {/* Floating Card Badge */}
                <div className="absolute bottom-4 right-4 left-4 p-4 rounded-xl bg-[#18181B]/90 backdrop-blur-md border border-[#D4AF37]/40 text-white flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-[#D4AF37] block">
                      عقار مميز موثق VIP
                    </span>
                    <h2 className="text-sm font-bold text-white font-serif-arabic">
                      قصر الزمرد الملكي - حطين
                    </h2>
                    <p className="text-xs text-emerald-400 font-bold mt-0.5 tabular-nums">
                      18,500,000 ر.س (حاسبة تمويل متاحة)
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-[#059669] text-white text-[10px] font-bold">
                    معاينة 3D
                  </span>
                </div>
              </div>
            </a>
          </div>

        </div>

        {/* 4 Trust Pillars Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-[#D4AF37]/30">
          
          <div className="p-4 rounded-2xl bg-white border border-[#D4AF37]/30 shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#059669]/10 flex items-center justify-center shrink-0 border border-[#059669]/30">
              <Zap className="w-5 h-5 text-[#059669]" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">التسليم والتوثيق الفوري</h3>
              <p className="text-[11px] text-slate-500">تحميل مباشر للمخططات والقوالب</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#D4AF37]/30 shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center shrink-0 border border-[#D4AF37]/30">
              <ShieldCheck className="w-5 h-5 text-[#B8860B]" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">تراخيص فال وتقييم معتمدة</h3>
              <p className="text-[11px] text-slate-500">توثيق عقاري وهندسي رسمي</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#D4AF37]/30 shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#059669]/10 flex items-center justify-center shrink-0 border border-[#059669]/30">
              <Award className="w-5 h-5 text-[#059669]" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">الجودة المعمارية المعتمدة</h3>
              <p className="text-[11px] text-slate-500">مطابقة كود البناء السعودي 2026</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#D4AF37]/30 shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#18181B] flex items-center justify-center shrink-0 border border-[#D4AF37]/30">
              <Headphones className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">استشارات خاصة 24/7 VIP</h3>
              <p className="text-[11px] text-slate-500">فريق هندسي وتمويلي متخصص</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
