import React from 'react';
import { Crown, ShieldCheck, Mail, Phone, MapPin, ExternalLink, Heart } from 'lucide-react';
import { LegalTabType } from '../types';

interface FooterProps {
  onOpenLegalTab: (tab: LegalTabType) => void;
  onOpenPropertySubmit: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLegalTab,
  onOpenPropertySubmit,
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
              التركيبة الملكية الشهيرة التي تجمع بين فخامة العقارات والمنتجات الرقمية (ألعاب الجمعات، مخططات 2026، وقوالب كانفا) بأسلوب استثنائي ودفع آمن.
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
              <li><a href="#catalog" className="hover:text-[#D4AF37] transition-colors">عقارات النخبة (الفلل والقصور)</a></li>
              <li><a href="#catalog" className="hover:text-[#D4AF37] transition-colors">ألعاب الجمعات الرقمية</a></li>
              <li><a href="#catalog" className="hover:text-[#D4AF37] transition-colors">مخططات 2026 الهندسية</a></li>
              <li><a href="#catalog" className="hover:text-[#D4AF37] transition-colors">قوالب كانفا الهوية الملكية</a></li>
              <li>
                <button onClick={onOpenPropertySubmit} className="text-[#059669] hover:underline font-bold">
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
                <button onClick={() => onOpenLegalTab('about')} className="hover:text-[#D4AF37] transition-colors">
                  من نحن (نبذة عنا)
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegalTab('privacy')} className="hover:text-[#D4AF37] transition-colors">
                  سياسة الخصوصية (Privacy Policy)
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegalTab('terms')} className="hover:text-[#D4AF37] transition-colors">
                  الشروط والأحكام (Terms of Service)
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegalTab('contact')} className="hover:text-[#D4AF37] transition-colors">
                  اتصل بنا ورعاية العملاء
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegalTab('domain_verify')} className="hover:text-[#059669] font-bold transition-colors">
                  الشروط وإثبات ملكية الدومين (Google AdSense)
                </button>
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
            جميع الحقوق محفوظة © 2026 «عقارات النخبة والمتجر الرقمي». تصميم مخصص باللون الذهبي الملكي والأخضر الزمردي الماسي.
          </p>

          <div className="flex items-center gap-4">
            <button onClick={() => onOpenLegalTab('domain_verify')} className="text-[#059669] font-bold hover:underline">
              إثبات ملكية الدومين للربح من أدسنس
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
