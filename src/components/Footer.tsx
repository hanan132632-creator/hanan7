import React from 'react';
import { Crown, ShieldCheck, Mail, Phone, MapPin, ExternalLink, Heart, Compass } from 'lucide-react';
import { LegalTabType } from '../types';
import { MOCK_BLOG_POSTS } from '../data/mockData';

interface FooterProps {
  onOpenLegalTab: (tab: LegalTabType) => void;
  onOpenPropertySubmit: () => void;
  onScrollToSitemap?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLegalTab,
  onOpenPropertySubmit,
  onScrollToSitemap,
}) => {
  return (
    <footer className="bg-[#18181B] text-slate-300 border-t-2 border-[#D4AF37]/50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] via-[#059669] to-[#064E3B] p-0.5">
                <div className="w-full h-full bg-[#18181B] rounded-[10px] flex items-center justify-center">
                  <Crown className="w-5 h-5 text-[#D4AF37]" />
                </div>
              </div>
              <span className="text-lg font-bold font-serif-arabic text-white">
                عقارات النخبة <span className="text-[#D4AF37]">والمتجر الرقمي</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              المنصة العقارية والهندسية الموثقة التي تجمع بين أرقى الفلل والقصور بالرياض ودبي، المخططات المعمارية المعتمدة لعام 2026، وقوالب الهوية الاحترافية بأسلوب استثنائي ودفع آمن.
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs font-bold text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>منصة معتمدة رسمياً وموثقة VIP</span>
            </div>
          </div>

          {/* Col 2: Category Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#FAD961] font-serif-arabic border-b border-slate-800 pb-2">
              الأقسام الرئيسية
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="/catalog" className="hover:text-[#D4AF37] transition-colors">عقارات النخبة (الفلل والقصور)</a></li>
              <li><a href="/blog" className="hover:text-[#D4AF37] transition-colors">مدونة التحليلات العقارية E-E-A-T</a></li>
              <li><a href="/author" className="hover:text-[#D4AF37] transition-colors">ملف الكتّاب والتراخيص الرسمية</a></li>
              <li><a href="/calculator" className="hover:text-[#D4AF37] transition-colors">حاسبة التمويل العقاري الذكية</a></li>
              <li><a href="/post/post-33" className="hover:text-[#D4AF37] transition-colors">دليل فحص الفلل وتأمين IDI</a></li>
              <li>
                <button onClick={onOpenPropertySubmit} className="text-[#059669] hover:underline font-bold cursor-pointer">
                  + عرض عقارك المباشر معنا
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: AdSense & Legal Pages */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#FAD961] font-serif-arabic border-b border-slate-800 pb-2">
              الصفحات القانونية والامتثال
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a
                  href="/about"
                  onClick={(e) => { e.preventDefault(); onOpenLegalTab('about'); }}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  من نحن (نبذة عنا)
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  onClick={(e) => { e.preventDefault(); onOpenLegalTab('privacy'); }}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  سياسة الخصوصية (Privacy Policy)
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  onClick={(e) => { e.preventDefault(); onOpenLegalTab('terms'); }}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  الشروط والأحكام (Terms of Service)
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => { e.preventDefault(); onOpenLegalTab('contact'); }}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  اتصل بنا ورعاية العملاء
                </a>
              </li>
              <li>
                <a
                  href="/domain_verify"
                  onClick={(e) => { e.preventDefault(); onOpenLegalTab('domain_verify'); }}
                  className="hover:text-[#059669] font-bold transition-colors"
                >
                  الشروط وإثبات ملكية الدومين (Google AdSense)
                </a>
              </li>
              <li className="pt-2">
                <a
                  href="/sitemap"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onScrollToSitemap) {
                      onScrollToSitemap();
                    } else {
                      onOpenLegalTab('sitemap');
                    }
                  }}
                  className="w-full sm:w-auto px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#D4AF37]/20 to-[#059669]/20 border border-[#D4AF37]/50 text-[#FAD961] hover:text-[#D4AF37] font-bold text-xs transition-colors flex items-center justify-between sm:justify-start gap-2 shadow-sm"
                  title="عرض خريطة الموقع وفهرس الروابط المباشرة"
                >
                  <span className="flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-[#D4AF37]" />
                    <span>خريطة الموقع وفهرس الروابط</span>
                  </span>
                  <span className="px-1.5 min-w-[20px] h-5 rounded-full bg-[#D4AF37] text-slate-900 text-[10px] font-black flex items-center justify-center">
                    {MOCK_BLOG_POSTS.length + 6}
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#FAD961] font-serif-arabic border-b border-slate-800 pb-2">
              خدمة العملاء والتواصل
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>الرياض - حي حطين VIP / دبي - داون تاون</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#059669] shrink-0" />
                <span>العناية بالعملاء: 920000000 / 0500000000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>vip@hanan-elite.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: AdSense Tag & Copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>
            جميع الحقوق محفوظة © 2026 «عقارات النخبة». جميع التحليلات العقارية والهندسية موثقة بمعايير E-E-A-T.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="/domain_verify"
              onClick={(e) => { e.preventDefault(); onOpenLegalTab('domain_verify'); }}
              className="text-[#059669] font-bold hover:underline"
            >
              إثبات ملكية الدومين للربح من أدسنس
            </a>
            <span className="text-slate-700" aria-hidden="true">|</span>
            <a href="/sitemap.xml" className="text-slate-400 hover:text-[#D4AF37] font-mono">
              sitemap.xml
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
