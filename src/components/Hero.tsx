import React from 'react';
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
  Crown,
  Gem
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
            
            {/* VIP Black & Emerald Kicker Label */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#18181B] border-2 border-[#059669] text-white shadow-xl shadow-emerald-950/20">
              <div className="w-7 h-7 rounded-xl bg-[#059669] text-[#18181B] flex items-center justify-center font-bold shadow-inner">
                <Crown className="w-4 h-4 text-[#18181B]" />
              </div>
              <span className="text-xs font-black tracking-wide text-[#34D399]">
                المنصة الملكية المعتمدة • الفخامة بالأسود والأخضر الزمردي
              </span>
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
            </div>

            {/* Main Headline with Luxury Black & Emerald Icons */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight font-serif-arabic tracking-tight space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <span>عقارات النخبة الفاخرة</span>
                <span className="inline-flex items-center justify-center p-2.5 rounded-2xl bg-[#18181B] border-2 border-[#059669] shadow-lg shadow-emerald-950/30">
                  <Building2 className="w-7 h-7 text-[#10B981]" />
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-[#064E3B] font-extrabold pt-1">
                <span className="text-[#059669] text-3xl font-serif-arabic ml-1">&</span>
                <span className="inline-flex items-center justify-center p-2.5 rounded-2xl bg-[#18181B] border-2 border-[#059669] shadow-lg shadow-emerald-950/30">
                  <ShoppingBag className="w-7 h-7 text-[#10B981]" />
                </span>
                <span className="bg-gradient-to-r from-[#064E3B] via-[#059669] to-[#047857] bg-clip-text text-transparent">
                  متجر المنتجات الرقمية
                </span>
              </div>
            </h1>

            {/* Description */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
              الوجهة الاستثنائية الأولى التي تجمع بين استعراض أحدث الفلل والقصور بالرياض ودبي، 
              ومخططات 2026 الهندسية، مع ألعاب الجمعات الفاخرة وقوالب كانفا الجاهزة بالتنزيل المباشر.
            </p>

            {/* Interactive Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onScrollToCatalog}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#059669] via-[#047857] to-[#064E3B] text-white font-bold text-sm shadow-xl hover:shadow-2xl hover:brightness-110 transition-all group"
              >
                <span>استكشف المعروضات الملكية</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#FAD961]" />
              </button>

              <button
                onClick={onOpenMortgageCalculator}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#18181B] text-[#D4AF37] hover:bg-[#27272A] border border-[#D4AF37]/50 font-bold text-sm shadow-md transition-all"
              >
                <Calculator className="w-4 h-4 text-[#D4AF37]" />
                <span>حاسبة التمويل العقاري</span>
              </button>

              <button
                onClick={onOpenAiAdvisor}
                className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 border border-[#D4AF37]/40 text-[#064E3B] font-bold text-sm transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#059669]" />
                <span>المستشار الذكي VIP</span>
              </button>
            </div>

            {/* Quick Feature Pills */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 pt-2 border-t border-slate-200">
              <span className="flex items-center gap-1.5 text-[#064E3B]">
                <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                توثيق رسمي ومعاينات 3D
              </span>
              <span className="flex items-center gap-1.5 text-[#064E3B]">
                <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                تحميل فوري للملفات والقوالب
              </span>
              <span className="flex items-center gap-1.5 text-[#064E3B]">
                <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                دفع إلكتروني آمن 100%
              </span>
            </div>

          </div>

          {/* Hero Visual Card Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden p-1.5 bg-gradient-to-br from-[#D4AF37] via-[#059669] to-[#18181B] shadow-2xl gold-border-glow">
              <div className="relative rounded-[22px] overflow-hidden bg-[#18181B]">
                <img
                  src="/src/assets/images/hero_luxury_villa_1791003841235.jpg"
                  alt="عقارات النخبة القصر الملكي"
                  referrerPolicy="no-referrer"
                  className="w-full h-[360px] object-cover hover:scale-105 transition-transform duration-700"
                />
                
                {/* Image Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#18181B] via-black/40 to-transparent" />

                {/* Floating Card Badge */}
                <div className="absolute bottom-4 right-4 left-4 p-4 rounded-xl bg-[#18181B]/90 backdrop-blur-md border border-[#D4AF37]/40 text-white flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#D4AF37] block">
                      عرض الأسبوع VIP
                    </span>
                    <h3 className="text-sm font-bold text-white font-serif-arabic">
                      قصر الزمرد الملكي - حطين
                    </h3>
                    <p className="text-xs text-emerald-400 font-bold mt-0.5">
                      18,500,000 ر.س (حاسبة تمويل متاحة)
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-[#059669] text-white text-[10px] font-bold">
                    معاينة 3D
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Trust Badges Grid (خطابات الثقة بلمسات زمردية وذهبية) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-[#D4AF37]/30">
          
          <div className="p-4 rounded-2xl bg-white border border-[#D4AF37]/30 shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#059669]/10 flex items-center justify-center shrink-0 border border-[#059669]/30">
              <Zap className="w-5 h-5 text-[#059669]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">الدفع والتسليم الفوري</h4>
              <p className="text-[11px] text-slate-500">تحميل مباشر وروابط حصرية</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#D4AF37]/30 shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center shrink-0 border border-[#D4AF37]/30">
              <ShieldCheck className="w-5 h-5 text-[#B8860B]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">تراخيص وعقود معتمدة</h4>
              <p className="text-[11px] text-slate-500">توثيق عقاري ورقمي رسمياً</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#D4AF37]/30 shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#059669]/10 flex items-center justify-center shrink-0 border border-[#059669]/30">
              <Award className="w-5 h-5 text-[#059669]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">الجودة الملكية المعتمدة</h4>
              <p className="text-[11px] text-slate-500">أرقى المعايير والتصاميم</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#D4AF37]/30 shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#18181B] flex items-center justify-center shrink-0 border border-[#D4AF37]/30">
              <Headphones className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">دعم ملكي 24/7 VIP</h4>
              <p className="text-[11px] text-slate-500">استجابة فائقة السرعة</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
