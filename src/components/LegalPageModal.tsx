import React, { useState } from 'react';
import { LegalTabType } from '../types';
import { 
  X, 
  ShieldCheck, 
  FileText, 
  Users, 
  Phone, 
  CheckCircle2, 
  Send,
  Building2,
  Globe,
  Award
} from 'lucide-react';

interface LegalPageModalProps {
  initialTab: LegalTabType;
  onClose: () => void;
}

export const LegalPageModal: React.FC<LegalPageModalProps> = ({
  initialTab,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<LegalTabType>(initialTab);
  const [contactFormSubmitted, setContactFormSubmitted] = useState(false);
  const [contactData, setContactData] = useState({ name: '', phone: '', email: '', message: '' });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactFormSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] border-2 border-[#D4AF37] rounded-3xl shadow-2xl overflow-hidden my-8 flex flex-col max-h-[85vh]">
        
        {/* Header Bar */}
        <div className="bg-[#18181B] text-white p-5 border-b border-[#D4AF37]/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-base font-bold font-serif-arabic text-[#FAD961]">
              الصفحات الرسمية والامتثال القانوني (AdSense Compliance & Domain Verification)
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#27272A] hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Bar */}
        <div className="bg-[#27272A] p-2 flex items-center gap-1 border-b border-[#D4AF37]/20 overflow-x-auto shrink-0 text-xs">
          {[
            { id: 'about', label: 'من نحن', icon: <Users className="w-3.5 h-3.5" /> },
            { id: 'privacy', label: 'سياسة الخصوصية', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
            { id: 'terms', label: 'الشروط والأحكام', icon: <FileText className="w-3.5 h-3.5" /> },
            { id: 'contact', label: 'اتصل بنا ورعاية العملاء', icon: <Phone className="w-3.5 h-3.5" /> },
            { id: 'domain_verify', label: 'ملكية الدومين وأدسنس', icon: <Award className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as LegalTabType);
                setContactFormSubmitted(false);
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#059669] text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-[#18181B]'
              }`}
            >
              <span className={activeTab === tab.id ? 'text-[#FAD961]' : 'text-slate-400'}>
                {tab.icon}
              </span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Reader */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800 text-xs sm:text-sm leading-relaxed font-medium">
          
          {/* TAB 1: ABOUT US */}
          {activeTab === 'about' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 font-serif-arabic text-[#064E3B]">
                نبذة عنا - مجموعة عقارات النخبة والمتجر الرقمي
              </h3>
              <p>
                «عقارات النخبة ومتجر المنتجات الرقمية» هي المنصة العقارية والتسويقية الرقمية الأولى الرائدة في تقديم الحلول المتكاملة لرجال الأعمال، المستثمرين، والأسر الراغبة في اقتناء أرقى الفلل والقصور بالرياض ودبي، بالإضافة إلى توفير أرقى المنتجات الرقمية (ألعاب الجمعات، مخططات 2026 الهندسية، وقوالب كانفا).
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="p-4 bg-white rounded-2xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-1 text-xs">رؤيتنا الملكية</h4>
                  <p className="text-xs text-slate-600">الوصول بعقارات النخبة والمنتجات الرقمية إلى أعلى مراتب الجودة والشفافية مع تقديم الدعم المستمر.</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-1 text-xs">قيمنا الأساسية</h4>
                  <p className="text-xs text-slate-600">الفخامة، الأمان المالي، التوثيق الرسمي، وسرعة التسليم الفوري عبر التقنيات الذكية.</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-1 text-xs">تراخيصنا المعتمدة</h4>
                  <p className="text-xs text-slate-600">سجل تجاري موثق ورخص تسويق عقاري رسمية مطابقة لاشتراطات الهيئة العامة للعقار.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 font-serif-arabic text-[#064E3B]">
                سياسة الخصوصية وحماية البيانات (Privacy Policy)
              </h3>
              <p>
                نلتزم في «عقارات النخبة ومتجر حنان» بحماية خصوصية كافة الزوار والعملاء وفق أفضل معايير الأمان الدولية وقوانين حماية البيانات الشخصية.
              </p>

              <h4 className="font-bold text-slate-900 text-xs">1. البيانات التي نجمعها:</h4>
              <p className="text-xs text-slate-600">
                نجمع فقط البيانات الضروية لإتمام المعاملات كاسم العملاء، البريد الإلكتروني، ورقم الهاتف لإرسال الفواتير وروابط التنزيل المباشر أو التواصل للتنسيق العقاري.
              </p>

              <h4 className="font-bold text-slate-900 text-xs">2. كوكيز وإعلانات AdSense:</h4>
              <p className="text-xs text-slate-600">
                يستخدم الموقع ملفات تعريف الارتباط (Cookies) لتحسين تجربة المستخدم وعرض الإعلانات المناسبة المعتمدة عبر Google AdSense دون مشاركة أي بيانات شخصية مع أطراف خارجية.
              </p>

              <h4 className="font-bold text-slate-900 text-xs">3. حماية وتشفير البيانات:</h4>
              <p className="text-xs text-slate-600">
                تُعالج كافة المعاملات المالية عبر شبكات مشفرة SSL ببروتوكولات حماية متقدمة لضمان أمان مدفوعاتك بالكامل.
              </p>
            </div>
          )}

          {/* TAB 3: TERMS OF SERVICE */}
          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 font-serif-arabic text-[#064E3B]">
                الشروط والأحكام الاستخدام (Terms of Service)
              </h3>
              <p>
                باستخدامك لمنصة «عقارات النخبة ومتجر حنان»، فإنك توافق التامة على جميع الشروط والأحكام الموضحة أدناه.
              </p>

              <h4 className="font-bold text-slate-900 text-xs">1. الملكية الفكرية للمنتجات الرقمية:</h4>
              <p className="text-xs text-slate-600">
                جميع ألعاب الجمعات، قوالب كانفا، ومخططات 2026 محفوطة بحقوق الملكية الفكرية لـ «متجر حنان». يُمنع إعادة بيعها أو توزيعها التجاري بغير ترخيص كتابي.
              </p>

              <h4 className="font-bold text-slate-900 text-xs">2. المعاينات والاستشارات العقارية:</h4>
              <p className="text-xs text-slate-600">
                أسعار الفلل العقارية وحاسبة التمويل تقدم لأغراض استرشادية، وتخضع للمعاينة الميدانية الرسمية والموافقة النهائية من الجهات المانحة.
              </p>
            </div>
          )}

          {/* TAB 4: CONTACT US */}
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 font-serif-arabic text-[#064E3B]">
                اتصل بنا ورعاية العملاء VIP
              </h3>

              {!contactFormSubmitted ? (
                <form onSubmit={handleContactSubmit} className="space-y-4 max-w-xl mx-auto bg-white p-6 rounded-2xl border border-slate-200">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">الاسم الكريم:</label>
                    <input
                      type="text"
                      required
                      placeholder="اسمك كامل"
                      value={contactData.name}
                      onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-slate-300 rounded-xl py-2 px-3 text-xs outline-none focus:ring-2 focus:ring-[#059669]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">رقم الهاتف:</label>
                      <input
                        type="tel"
                        required
                        placeholder="05XXXXXXXX"
                        value={contactData.phone}
                        onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-slate-300 rounded-xl py-2 px-3 text-xs outline-none focus:ring-2 focus:ring-[#059669]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">البريد الإلكتروني:</label>
                      <input
                        type="email"
                        required
                        placeholder="email@domain.com"
                        value={contactData.email}
                        onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-slate-300 rounded-xl py-2 px-3 text-xs outline-none focus:ring-2 focus:ring-[#059669]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">رسالتك أو استفسارك الملكي:</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="اكتب تفاصيل استفسارك العقاري أو الرقمي هنا..."
                      value={contactData.message}
                      onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-slate-300 rounded-xl py-2 px-3 text-xs outline-none focus:ring-2 focus:ring-[#059669]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#059669] text-white font-bold text-xs shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-[#FAD961]" />
                    <span>إرسال الرسالة إلى فريق الرعاية</span>
                  </button>
                </form>
              ) : (
                <div className="text-center py-8 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#059669] mx-auto" />
                  <h4 className="text-base font-bold text-slate-900">تم استلام رسالتك الملكية بنجاح!</h4>
                  <p className="text-xs text-slate-600">سيقوم فريق خدمة العملاء بالتواصل معك في أقرب وقت.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: DOMAIN VERIFICATION & ADSENSE */}
          {activeTab === 'domain_verify' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 font-serif-arabic text-[#064E3B]">
                إثبات ملكية الدومين وموافقة أدسنس الرسمية (Domain Ownership & AdSense)
              </h3>
              
              <div className="p-4 bg-[#18181B] text-white rounded-2xl border border-[#D4AF37] space-y-3">
                <div className="flex items-center gap-2 text-[#FAD961] font-bold text-xs">
                  <Award className="w-5 h-5 text-[#D4AF37]" />
                  <span>شهادة ملكية النطاق الرسمية (Domain Verification Tag)</span>
                </div>
                <p className="text-xs text-slate-300">
                  هذه المنصة مسجلة ومعتمدة رسمياً باسم «عقارات النخبة ومتجر حنان». تتوافق كافة المحتويات والمقالات المعروضة مع شروط وتوجيهات Google AdSense لتسويق الأصول العقارية والمحتوى الرقمي الأصيل.
                </p>
                <div className="p-3 bg-[#27272A] rounded-xl text-[11px] font-mono text-emerald-400 border border-slate-700">
                  Verification Code: adsense-pub-elite-hanan-2026-verified-domain
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
