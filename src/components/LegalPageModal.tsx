import React, { useState } from 'react';
import { LegalTabType } from '../types';
import { MOCK_BLOG_POSTS, MOCK_PRODUCTS } from '../data/mockData';
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
  Award,
  Compass,
  ExternalLink,
  Copy,
  Check,
  BookOpen,
  ShoppingBag,
  Link2,
  Code2,
  Download,
  Search,
  Sparkles,
  FileCode,
  ArrowUpRight
} from 'lucide-react';

interface LegalPageModalProps {
  initialTab: LegalTabType;
  onClose: () => void;
  onSelectPost?: (postId: string) => void;
  onNavigateToHash?: (hash: string) => void;
}

export const LegalPageModal: React.FC<LegalPageModalProps> = ({
  initialTab,
  onClose,
  onSelectPost,
  onNavigateToHash,
}) => {
  const [activeTab, setActiveTab] = useState<LegalTabType>(initialTab);
  const [contactFormSubmitted, setContactFormSubmitted] = useState(false);
  const [contactData, setContactData] = useState({ name: '', phone: '', email: '', message: '' });
  const [sitemapCopied, setSitemapCopied] = useState(false);
  const [sitemapViewMode, setSitemapViewMode] = useState<'links' | 'xml'>('links');
  const [sitemapSearch, setSitemapSearch] = useState('');
  const [sitemapFilter, setSitemapFilter] = useState<'all' | 'posts' | 'pages' | 'products'>('all');
  const [copiedUrlKey, setCopiedUrlKey] = useState<string | null>(null);
  const [allUrlsCopied, setAllUrlsCopied] = useState(false);
  const [xmlCopied, setXmlCopied] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactFormSubmitted(true);
  };

  const handleCopySitemapUrl = () => {
    const sitemapUrl = `${window.location.origin}/sitemap.xml`;
    navigator.clipboard.writeText(sitemapUrl);
    setSitemapCopied(true);
    setTimeout(() => setSitemapCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] border-2 border-[#D4AF37] rounded-3xl shadow-2xl overflow-hidden my-8 flex flex-col max-h-[85vh]">
        
        {/* Header Bar */}
        <div className="bg-[#18181B] text-white p-5 border-b border-[#D4AF37]/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-base font-bold font-serif-arabic text-[#FAD961]">
              الصفحات الرسمية والامتثال القانوني وخريطة الموقع (AdSense & Sitemap.xml)
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
            { id: 'sitemap', label: 'خريطة الموقع (Sitemap.xml)', icon: <Compass className="w-3.5 h-3.5 text-[#FAD961]" /> },
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

          {/* TAB 6: SITEMAP & XML FEED */}
          {activeTab === 'sitemap' && (() => {
            const origin = typeof window !== 'undefined' ? window.location.origin : 'https://hanan.pro';

            const corePages = [
              { id: 'home', title: 'الصفحة الرئيسية والواجهة الملكية', path: '/', hash: '#', fullUrl: `${origin}/`, desc: 'الواجهة الملكية وحاسبة التمويل وأحدث المعروضات', priority: '1.0', changefreq: 'daily', actionType: 'scroll-home' },
              { id: 'catalog', title: 'كتالوج العقارات والمتجر الشامل', path: '/?section=catalog', hash: '#catalog', fullUrl: `${origin}/?section=catalog`, desc: 'الفلل والقصور والمنتجات الرقمية وألعاب الجمعات', priority: '0.90', changefreq: 'daily', actionType: 'scroll-catalog' },
              { id: 'blog-section', title: 'مدونة النخبة العقارية 2026', path: '/?section=blog-section', hash: '#blog-section', fullUrl: `${origin}/?section=blog-section`, desc: 'تحليلات عقارية متقدمة (22 مقالاً موثوقاً EEAT)', priority: '0.95', changefreq: 'daily', actionType: 'scroll-blog' },
              { id: 'about', title: 'من نحن (نبذة عن المنصة الملكية)', path: '/?tab=about', hash: '#about', fullUrl: `${origin}/?tab=about`, desc: 'هوية ورؤية منصة النخبة ومعايير الجودة', priority: '0.80', changefreq: 'monthly', tabKey: 'about' },
              { id: 'privacy', title: 'سياسة الخصوصية وحماية البيانات', path: '/?tab=privacy', hash: '#privacy', fullUrl: `${origin}/?tab=privacy`, desc: 'حماية البيانات وحقوق الزوار وسياسة الكوكيز', priority: '0.80', changefreq: 'monthly', tabKey: 'privacy' },
              { id: 'terms', title: 'الشروط والأحكام والتعاملات', path: '/?tab=terms', hash: '#terms', fullUrl: `${origin}/?tab=terms`, desc: 'قواعد التداول وتراخيص الاستخدام والتحميل', priority: '0.80', changefreq: 'monthly', tabKey: 'terms' },
              { id: 'contact', title: 'اتصل بنا ورعاية العملاء 24/7', path: '/?tab=contact', hash: '#contact', fullUrl: `${origin}/?tab=contact`, desc: 'قنوات التواصل المباشر وطلب المعاينات', priority: '0.80', changefreq: 'monthly', tabKey: 'contact' },
              { id: 'domain_verify', title: 'توثيق ملكية الدومين وأدسنس', path: '/?tab=domain_verify', hash: '#domain_verify', fullUrl: `${origin}/?tab=domain_verify`, desc: 'شهادة التوثيق والامتثال الرسمي لـ Google AdSense', priority: '0.85', changefreq: 'monthly', tabKey: 'domain_verify' },
              { id: 'calculator', title: 'حاسبة التمويل العقاري التقديرية', path: '/?calculator=mortgage', hash: '#calculator', fullUrl: `${origin}/?calculator=mortgage`, desc: 'حساب الأقساط الشهرية لفلل وقصور النخبة', priority: '0.85', changefreq: 'daily', actionType: 'open-calc' },
              { id: 'sitemap-interactive', title: 'خريطة الموقع التفاعلية الشاملة', path: '/?tab=sitemap', hash: '#sitemap', fullUrl: `${origin}/?tab=sitemap`, desc: 'الفهرس المعتمد لكافة روابط المنصة الـ 37', priority: '0.90', changefreq: 'daily', tabKey: 'sitemap' },
            ];

            const blogUrls = MOCK_BLOG_POSTS.map((post, idx) => ({
              id: post.id,
              index: idx + 1,
              title: post.title,
              path: `/?post=${post.id}`,
              hash: `#${post.id}`,
              fullUrl: `${origin}/?post=${post.id}`,
              desc: post.category,
              author: post.author,
              date: post.date,
              priority: '0.85',
              changefreq: 'weekly'
            }));

            const productUrls = MOCK_PRODUCTS.map((prod) => ({
              id: prod.id,
              title: prod.title,
              path: `/?product=${prod.id}`,
              hash: `#${prod.id}`,
              fullUrl: `${origin}/?product=${prod.id}`,
              desc: `${prod.categoryLabel} • ${prod.priceSAR.toLocaleString()} ر.س`,
              imageUrl: prod.imageUrl,
              priority: '0.80',
              changefreq: 'weekly'
            }));

            const totalCount = corePages.length + blogUrls.length + productUrls.length;

            const allUrlStrings = [
              ...corePages.map(p => p.fullUrl),
              ...blogUrls.map(b => b.fullUrl),
              ...productUrls.map(pr => pr.fullUrl)
            ];

            const rawXmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- 1. الصفحات والأقسام الرئيسية (${corePages.length} روابط) -->
${corePages.map(p => `  <url>
    <loc>${p.fullUrl}</loc>
    <lastmod>2026-10-07</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}

  <!-- 2. مقالات المدونة العقارية المعتمدة (${blogUrls.length} مقالاً موثقاً EEAT) -->
${blogUrls.map(b => `  <url>
    <loc>${b.fullUrl}</loc>
    <lastmod>2026-10-07</lastmod>
    <changefreq>${b.changefreq}</changefreq>
    <priority>${b.priority}</priority>
  </url>`).join('\n')}

  <!-- 3. الأصول والمنتجات الرقمية المعروضة (${productUrls.length} منتجات) -->
${productUrls.map(pr => `  <url>
    <loc>${pr.fullUrl}</loc>
    <lastmod>2026-10-07</lastmod>
    <changefreq>${pr.changefreq}</changefreq>
    <priority>${pr.priority}</priority>
  </url>`).join('\n')}

</urlset>`;

            const handleNavigate = (item: any) => {
              if (item.tabKey && item.tabKey !== 'sitemap') {
                setActiveTab(item.tabKey as LegalTabType);
                return;
              }
              if (item.actionType === 'open-calc') {
                onClose();
                window.dispatchEvent(new CustomEvent('open-mortgage-calc'));
                return;
              }
              if (item.actionType === 'scroll-home') {
                onClose();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
              }
              if (item.actionType === 'scroll-catalog') {
                onClose();
                const el = document.getElementById('catalog');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                return;
              }
              if (item.actionType === 'scroll-blog') {
                onClose();
                const el = document.getElementById('blog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                return;
              }
              if (item.id && item.id.startsWith('post-')) {
                onClose();
                window.dispatchEvent(new CustomEvent('open-blog-post', { detail: item.id }));
                setTimeout(() => {
                  const el = document.getElementById('blog-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 150);
                return;
              }
              if (item.id && (item.id.startsWith('prop-') || item.id.startsWith('game-') || item.id.startsWith('blueprint-') || item.id.startsWith('canva-') || item.id.startsWith('royal-'))) {
                onClose();
                window.dispatchEvent(new CustomEvent('open-quick-view-product', { detail: item.id }));
                return;
              }
              onClose();
            };

            const handleCopyUrl = (url: string, key: string) => {
              navigator.clipboard.writeText(url);
              setCopiedUrlKey(key);
              setTimeout(() => setCopiedUrlKey(null), 2500);
            };

            const handleCopyAll = () => {
              navigator.clipboard.writeText(allUrlStrings.join('\n'));
              setAllUrlsCopied(true);
              setTimeout(() => setAllUrlsCopied(false), 2500);
            };

            const handleCopyXml = () => {
              navigator.clipboard.writeText(rawXmlContent);
              setXmlCopied(true);
              setTimeout(() => setXmlCopied(false), 2500);
            };

            const handleDownloadXmlFile = () => {
              const blob = new Blob([rawXmlContent], { type: 'application/xml;charset=utf-8' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'sitemap.xml';
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            };

            // Filter logic
            const q = sitemapSearch.toLowerCase().trim();
            const filteredCorePages = corePages.filter(p => 
              (sitemapFilter === 'all' || sitemapFilter === 'pages') &&
              (!q || p.title.toLowerCase().includes(q) || p.path.toLowerCase().includes(q) || p.fullUrl.toLowerCase().includes(q))
            );

            const filteredBlogUrls = blogUrls.filter(b => 
              (sitemapFilter === 'all' || sitemapFilter === 'posts') &&
              (!q || b.title.toLowerCase().includes(q) || b.id.toLowerCase().includes(q) || b.fullUrl.toLowerCase().includes(q) || b.desc.toLowerCase().includes(q))
            );

            const filteredProductUrls = productUrls.filter(pr => 
              (sitemapFilter === 'all' || sitemapFilter === 'products') &&
              (!q || pr.title.toLowerCase().includes(q) || pr.id.toLowerCase().includes(q) || pr.fullUrl.toLowerCase().includes(q))
            );

            return (
              <div className="space-y-6">
                {/* Hero Header Card */}
                <div className="p-4 sm:p-5 bg-gradient-to-r from-[#18181B] via-[#27272A] to-[#064E3B] text-white rounded-2xl border-2 border-[#D4AF37] shadow-xl">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#059669]/30 text-[#FAD961] text-xs font-bold mb-2 border border-[#D4AF37]/30">
                        <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>خريطة الموقع الرسمية الشاملة المعتمدة 2026 (Sitemap.xml)</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black font-serif-arabic text-white flex items-center gap-2">
                        <span>فهرس روابط خريطة الموقع</span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-slate-900 font-sans font-bold">
                          {totalCount} رابطاً معتمداً
                        </span>
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                        جميع صفحات المنصة ومقالات المدونة الـ 22 ومنتجات المتجر مفهرسة ومربوطة بروابط مباشرة وصريحة متوافقة 100% مع Google Search Console ومعايير Google AdSense.
                      </p>
                    </div>

                    {/* Action Buttons Top Bar */}
                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <button
                        onClick={handleCopyAll}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89628] hover:from-[#B89628] hover:to-[#997A1E] text-slate-900 text-xs font-bold transition-all shadow-md shadow-amber-950/30 border border-amber-300/40"
                        title="نسخ جميع روابط الموقع الـ 37 دفعة واحدة"
                      >
                        {allUrlsCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-slate-900" />
                            <span className="text-slate-900 font-bold">تم نسخ الـ 37 رابطاً!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-900" />
                            <span>نسخ كافة الروابط (37)</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={handleDownloadXmlFile}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#059669] hover:bg-[#047857] border border-emerald-400/30 text-white text-xs font-bold transition-all shadow-md shadow-emerald-950/40"
                        title="تنزيل ملف الخريطة بصيغة .xml على جهازك مباشرة"
                      >
                        <Download className="w-3.5 h-3.5 text-white" />
                        <span>تنزيل sitemap.xml</span>
                      </button>
                    </div>
                  </div>

                  {/* Mode Switcher Tabs */}
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/10">
                    <button
                      onClick={() => setSitemapViewMode('links')}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        sitemapViewMode === 'links'
                          ? 'bg-[#D4AF37] text-slate-900 shadow-sm'
                          : 'bg-white/10 text-white hover:bg-white/15'
                      }`}
                    >
                      <Link2 className="w-3.5 h-3.5" />
                      <span>قائمة الروابط التفاعلية المباشرة ({totalCount})</span>
                    </button>

                    <button
                      onClick={() => setSitemapViewMode('xml')}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        sitemapViewMode === 'xml'
                          ? 'bg-[#D4AF37] text-slate-900 shadow-sm'
                          : 'bg-white/10 text-white hover:bg-white/15'
                      }`}
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>كود Sitemap.xml الخام (XML Code Viewer)</span>
                    </button>
                  </div>
                </div>

                {/* VIEW 1: RAW XML VIEWER */}
                {sitemapViewMode === 'xml' && (
                  <div className="space-y-3 animate-fade-in">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-white rounded-xl border border-slate-200">
                      <div className="flex items-center gap-2 text-xs text-slate-700 font-bold">
                        <FileCode className="w-4 h-4 text-[#059669]" />
                        <span>معاينة كود XML الفعلي المعتمد (UTF-8) لـ Google & Bing</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleCopyXml}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#064E3B] text-white hover:bg-[#059669] text-xs font-bold transition-all"
                        >
                          {xmlCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-300" />
                              <span>تم نسخ كود XML!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-[#FAD961]" />
                              <span>نسخ كود XML كاملاً</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="relative rounded-2xl bg-[#09090B] border-2 border-slate-800 text-slate-200 p-4 text-[11px] font-mono leading-relaxed overflow-x-auto max-h-[460px] overflow-y-auto dir-ltr text-left selection:bg-[#059669] selection:text-white">
                      <pre className="whitespace-pre">
                        {rawXmlContent}
                      </pre>
                    </div>
                  </div>
                )}

                {/* VIEW 2: INTERACTIVE DIRECT LINKS LIST */}
                {sitemapViewMode === 'links' && (
                  <div className="space-y-5 animate-fade-in">
                    {/* Filter and Search Bar */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 p-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
                      <div className="relative flex-1">
                        <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={sitemapSearch}
                          onChange={(e) => setSitemapSearch(e.target.value)}
                          placeholder="ابحث في روابط الخريطة (مثال: post-1، الرياض، المخططات، privacy...)"
                          className="w-full pr-9 pl-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-all"
                        />
                        {sitemapSearch && (
                          <button
                            onClick={() => setSitemapSearch('')}
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs p-1"
                          >
                            ✕
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 overflow-x-auto shrink-0 pb-1 sm:pb-0">
                        {[
                          { id: 'all', label: `الكل (${totalCount})` },
                          { id: 'posts', label: `المقالات (${blogUrls.length})` },
                          { id: 'pages', label: `الصفحات (${corePages.length})` },
                          { id: 'products', label: `المنتجات (${productUrls.length})` },
                        ].map((btn) => (
                          <button
                            key={btn.id}
                            onClick={() => setSitemapFilter(btn.id as any)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                              sitemapFilter === btn.id
                                ? 'bg-[#064E3B] text-white shadow-sm'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {btn.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* SECTION 1: CORE PAGES */}
                    {filteredCorePages.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                          <h4 className="text-sm font-black text-[#064E3B] font-serif-arabic flex items-center gap-2">
                            <Globe className="w-4 h-4 text-[#D4AF37]" />
                            <span>1. روابط الصفحات والأقسام الرئيسية ({filteredCorePages.length} رابط)</span>
                          </h4>
                          <span className="text-[10px] text-slate-500 font-mono">Priority: 0.80 - 1.0</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {filteredCorePages.map((item) => {
                            const isCopied = copiedUrlKey === `core-${item.id}`;
                            return (
                              <div
                                key={item.id}
                                className="p-3.5 bg-white rounded-2xl border border-slate-200 hover:border-[#D4AF37] hover:shadow-md transition-all flex flex-col justify-between group"
                              >
                                <div>
                                  <div className="flex items-start justify-between gap-2">
                                    <h5 className="font-bold text-slate-900 text-xs group-hover:text-[#064E3B] transition-colors leading-snug">
                                      {item.title}
                                    </h5>
                                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#059669] border border-emerald-200 shrink-0">
                                      {item.priority}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                                    {item.desc}
                                  </p>
                                </div>

                                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                                  {/* Clickable Full URL */}
                                  <a
                                    href={item.fullUrl}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleNavigate(item);
                                    }}
                                    className="text-[11px] font-mono text-[#059669] hover:text-[#047857] hover:underline dir-ltr text-right truncate flex items-center gap-1 font-semibold"
                                    title={item.fullUrl}
                                  >
                                    <Link2 className="w-3 h-3 shrink-0 text-[#D4AF37]" />
                                    <span className="truncate">{item.fullUrl}</span>
                                  </a>

                                  <div className="flex items-center gap-1.5 shrink-0">
                                    <button
                                      onClick={() => handleCopyUrl(item.fullUrl, `core-${item.id}`)}
                                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                                      title="نسخ الرابط"
                                    >
                                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                                    </button>

                                    <button
                                      onClick={() => handleNavigate(item)}
                                      className="px-2.5 py-1 rounded-lg bg-[#064E3B] hover:bg-[#059669] text-white text-[10px] font-bold transition-all flex items-center gap-1"
                                    >
                                      <span>انتقال</span>
                                      <ArrowUpRight className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* SECTION 2: 22 REAL ESTATE BLOG ARTICLES */}
                    {filteredBlogUrls.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                          <h4 className="text-sm font-black text-[#064E3B] font-serif-arabic flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                            <span>2. روابط مقالات المدونة العقارية الـ 22 المفهرسة ({filteredBlogUrls.length} مقالاً)</span>
                          </h4>
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#059669]/15 text-[#047857] border border-[#059669]/30">
                            معتمدة EEAT 2026
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
                          {filteredBlogUrls.map((post) => {
                            const isCopied = copiedUrlKey === `post-${post.id}`;
                            return (
                              <div
                                key={post.id}
                                className="p-3 bg-white rounded-2xl border border-slate-200 hover:border-[#D4AF37] hover:shadow-md transition-all flex flex-col justify-between group"
                              >
                                <div>
                                  <div className="flex items-start gap-2">
                                    <span className="w-5 h-5 rounded-lg bg-[#18181B] text-[#FAD961] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                                      {post.index}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                      <h5 className="font-bold text-slate-900 text-xs leading-snug line-clamp-2 group-hover:text-[#064E3B] transition-colors">
                                        {post.title}
                                      </h5>
                                      <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-1">
                                        <span className="text-[#059669] font-semibold">{post.author.split('(')[0]}</span>
                                        <span>•</span>
                                        <span className="truncate">{post.desc}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                                  {/* Direct Clickable URL Link */}
                                  <a
                                    href={post.fullUrl}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleNavigate(post);
                                    }}
                                    className="text-[11px] font-mono text-[#059669] hover:text-[#047857] hover:underline dir-ltr text-right truncate flex items-center gap-1 font-semibold"
                                    title={post.fullUrl}
                                  >
                                    <Link2 className="w-3 h-3 shrink-0 text-[#D4AF37]" />
                                    <span className="truncate">{post.fullUrl}</span>
                                  </a>

                                  <div className="flex items-center gap-1.5 shrink-0">
                                    <button
                                      onClick={() => handleCopyUrl(post.fullUrl, `post-${post.id}`)}
                                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                                      title="نسخ رابط المقال"
                                    >
                                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                                    </button>

                                    <button
                                      onClick={() => handleNavigate(post)}
                                      className="px-2.5 py-1 rounded-lg bg-[#064E3B] hover:bg-[#059669] text-white text-[10px] font-bold transition-all flex items-center gap-1 shadow-sm"
                                      title="انتقال وقراءة المقال مباشرة"
                                    >
                                      <span>قراءة مباشرة</span>
                                      <ArrowUpRight className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* SECTION 3: PRODUCTS & ASSETS */}
                    {filteredProductUrls.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                          <h4 className="text-sm font-black text-[#064E3B] font-serif-arabic flex items-center gap-2">
                            <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                            <span>3. روابط الأصول والمنتجات المعروضة ({filteredProductUrls.length} أصل)</span>
                          </h4>
                          <span className="text-[10px] text-slate-500 font-mono">Priority: 0.80</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {filteredProductUrls.map((prod) => {
                            const isCopied = copiedUrlKey === `prod-${prod.id}`;
                            return (
                              <div
                                key={prod.id}
                                className="p-3 bg-white rounded-2xl border border-slate-200 hover:border-[#D4AF37] hover:shadow-md transition-all flex flex-col justify-between group"
                              >
                                <div className="flex items-center gap-2.5">
                                  <div className="w-9 h-9 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-200">
                                    <img src={prod.imageUrl} alt={prod.title} className="w-full h-full object-cover" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <span className="font-bold text-slate-900 text-xs block truncate group-hover:text-[#064E3B] transition-colors">
                                      {prod.title}
                                    </span>
                                    <span className="text-[10px] text-[#059669] font-bold block truncate">
                                      {prod.desc}
                                    </span>
                                  </div>
                                </div>

                                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                                  {/* Direct Clickable URL */}
                                  <a
                                    href={prod.fullUrl}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleNavigate(prod);
                                    }}
                                    className="text-[11px] font-mono text-[#059669] hover:text-[#047857] hover:underline dir-ltr text-right truncate flex items-center gap-1 font-semibold"
                                    title={prod.fullUrl}
                                  >
                                    <Link2 className="w-3 h-3 shrink-0 text-[#D4AF37]" />
                                    <span className="truncate">{prod.fullUrl}</span>
                                  </a>

                                  <div className="flex items-center gap-1.5 shrink-0">
                                    <button
                                      onClick={() => handleCopyUrl(prod.fullUrl, `prod-${prod.id}`)}
                                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                                      title="نسخ الرابط"
                                    >
                                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                                    </button>

                                    <button
                                      onClick={() => handleNavigate(prod)}
                                      className="px-2.5 py-1 rounded-lg bg-[#064E3B] hover:bg-[#059669] text-white text-[10px] font-bold transition-all flex items-center gap-1 shadow-sm"
                                      title="معاينة الأصل مباشرة"
                                    >
                                      <span>عرض الأصل</span>
                                      <ArrowUpRight className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {filteredCorePages.length === 0 && filteredBlogUrls.length === 0 && filteredProductUrls.length === 0 && (
                      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
                        <Compass className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                        <p className="text-xs font-bold text-slate-600">لا توجد روابط تطابق كلمة البحث "{sitemapSearch}"</p>
                        <button
                          onClick={() => { setSitemapSearch(''); setSitemapFilter('all'); }}
                          className="mt-2 text-xs text-[#059669] font-bold hover:underline"
                        >
                          إعادة ضبط البحث والتصفية
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })()}

        </div>

      </div>
    </div>
  );
};
