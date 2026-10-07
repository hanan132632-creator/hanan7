import React, { useState, useMemo } from 'react';
import {
  Compass,
  Link2,
  Copy,
  Check,
  Search,
  BookOpen,
  Globe,
  ShoppingBag,
  Download,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { MOCK_BLOG_POSTS, MOCK_PRODUCTS } from '../data/mockData';
import { LegalTabType, ProductItem } from '../types';

interface SitemapSectionProps {
  onOpenLegalTab: (tab: LegalTabType) => void;
  onSelectPost: (postId: string) => void;
  onSelectProduct: (product: ProductItem) => void;
  onScrollToCatalog: () => void;
}

export const SitemapSection: React.FC<SitemapSectionProps> = ({
  onOpenLegalTab,
  onSelectPost,
  onSelectProduct,
  onScrollToCatalog,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'posts' | 'pages' | 'products'>('all');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [allCopied, setAllCopied] = useState(false);

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://ais-dev-on77w5qxpaes63voiv5adt-245902106769.europe-west2.run.app';

  // 1. Core Pages & Sections (10)
  const corePages = useMemo(() => [
    {
      id: 'home',
      tabKey: null,
      title: 'الصفحة الرئيسية والواجهة الملكية',
      url: `${origin}/`,
      path: '/',
      desc: 'الواجهة الملكية وحاسبة التمويل العقاري وأحدث المعروضات الحصرية',
      type: 'page',
      priority: '1.0'
    },
    {
      id: 'catalog',
      tabKey: null,
      title: 'كتالوج العقارات والمتجر الملكي الشامل',
      url: `${origin}/?section=catalog`,
      path: '/?section=catalog',
      desc: 'الفلل والقصور والمنتجات الرقمية وألعاب الجمعات ومخططات 2026',
      type: 'page',
      priority: '0.95'
    },
    {
      id: 'blog-section',
      tabKey: null,
      title: 'مدونة النخبة العقارية 2026 (22 مقالاً)',
      url: `${origin}/?section=blog-section`,
      path: '/?section=blog-section',
      desc: 'تحليلات عقارية موثوقة بمعايير EEAT لكبار الخبراء والمستشارين',
      type: 'page',
      priority: '0.95'
    },
    {
      id: 'sitemap-section',
      tabKey: 'sitemap' as LegalTabType,
      title: 'خريطة الموقع وفهرس الروابط التفاعلية',
      url: `${origin}/?tab=sitemap`,
      path: '/?tab=sitemap',
      desc: 'الفهرس المعتمد لكافة روابط المنصة الـ 37 دون أي أخطاء',
      type: 'page',
      priority: '0.90'
    },
    {
      id: 'about',
      tabKey: 'about' as LegalTabType,
      title: 'من نحن (نبذة عن منصة عقارات النخبة)',
      url: `${origin}/?tab=about`,
      path: '/?tab=about',
      desc: 'رؤية المنصة الملكية ومعايير الوساطة والاستشارات الفاخرة',
      type: 'page',
      priority: '0.80'
    },
    {
      id: 'privacy',
      tabKey: 'privacy' as LegalTabType,
      title: 'سياسة الخصوصية وحماية البيانات',
      url: `${origin}/?tab=privacy`,
      path: '/?tab=privacy',
      desc: 'حماية بيانات العملاء وسياسة ملفات تعريف الارتباط الكوكيز',
      type: 'page',
      priority: '0.80'
    },
    {
      id: 'terms',
      tabKey: 'terms' as LegalTabType,
      title: 'الشروط والأحكام والاتفاقية القانونية',
      url: `${origin}/?tab=terms`,
      path: '/?tab=terms',
      desc: 'قواعد التداول وتراخيص الاستخدام والتحميل الرقمي',
      type: 'page',
      priority: '0.80'
    },
    {
      id: 'contact',
      tabKey: 'contact' as LegalTabType,
      title: 'اتصل بنا ورعاية العملاء 24/7',
      url: `${origin}/?tab=contact`,
      path: '/?tab=contact',
      desc: 'قنوات التواصل المباشر وطلب المعاينات الميدانية',
      type: 'page',
      priority: '0.80'
    },
    {
      id: 'domain_verify',
      tabKey: 'domain_verify' as LegalTabType,
      title: 'توثيق ملكية الدومين والامتثال لجوجل أدسنس',
      url: `${origin}/?tab=domain_verify`,
      path: '/?tab=domain_verify',
      desc: 'إثبات ملكية النطاق الرسمي والمطابقة لمعايير Google AdSense',
      type: 'page',
      priority: '0.85'
    },
    {
      id: 'calculator',
      tabKey: null,
      title: 'حاسبة التمويل العقاري الذكية للفلل والقصور',
      url: `${origin}/?calculator=mortgage`,
      path: '/?calculator=mortgage',
      desc: 'حساب الأقساط الشهرية والتمويل البنكي الفوري بنسبة مرابحة تقديرية',
      type: 'page',
      priority: '0.85'
    }
  ], [origin]);

  // 2. Blog Articles (22)
  const blogItems = useMemo(() => {
    return MOCK_BLOG_POSTS.map((post, idx) => ({
      id: post.id,
      index: idx + 1,
      title: post.title,
      url: `${origin}/?post=${post.id}`,
      path: `/?post=${post.id}`,
      desc: post.excerpt,
      category: post.category,
      author: post.author,
      date: post.date,
      type: 'post',
      priority: '0.85'
    }));
  }, [origin]);

  // 3. Products & Assets (5)
  const productItems = useMemo(() => {
    return MOCK_PRODUCTS.map((prod) => ({
      id: prod.id,
      title: prod.title,
      url: `${origin}/?product=${prod.id}`,
      path: `/?product=${prod.id}`,
      desc: `${prod.categoryLabel} • ${prod.priceSAR.toLocaleString()} ر.س`,
      imageUrl: prod.imageUrl,
      rawProduct: prod,
      type: 'product',
      priority: '0.80'
    }));
  }, [origin]);

  // Filtered lists
  const q = searchQuery.toLowerCase().trim();

  const filteredCore = useMemo(() => {
    if (activeFilter !== 'all' && activeFilter !== 'pages') return [];
    return corePages.filter(p => !q || p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.url.toLowerCase().includes(q));
  }, [corePages, activeFilter, q]);

  const filteredPosts = useMemo(() => {
    if (activeFilter !== 'all' && activeFilter !== 'posts') return [];
    return blogItems.filter(p => !q || p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.url.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }, [blogItems, activeFilter, q]);

  const filteredProducts = useMemo(() => {
    if (activeFilter !== 'all' && activeFilter !== 'products') return [];
    return productItems.filter(p => !q || p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.url.toLowerCase().includes(q));
  }, [productItems, activeFilter, q]);

  const totalResultsCount = filteredCore.length + filteredPosts.length + filteredProducts.length;

  // Handle direct in-app link opening
  const handleDirectLinkClick = (item: any) => {
    if (item.type === 'post') {
      onSelectPost(item.id);
    } else if (item.type === 'product' && item.rawProduct) {
      onSelectProduct(item.rawProduct);
    } else if (item.type === 'page') {
      if (item.tabKey) {
        onOpenLegalTab(item.tabKey);
      } else if (item.id === 'catalog') {
        onScrollToCatalog();
      } else if (item.id === 'blog-section') {
        const el = document.getElementById('blog-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (item.id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (item.id === 'calculator') {
        window.dispatchEvent(new CustomEvent('open-mortgage-calc'));
      }
    }
  };

  const handleCopySingle = (url: string, key: string) => {
    navigator.clipboard.writeText(url);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleCopyAll = () => {
    const allUrls = [
      ...corePages.map(p => p.url),
      ...blogItems.map(b => b.url),
      ...productItems.map(pr => pr.url)
    ];
    navigator.clipboard.writeText(allUrls.join('\n'));
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2500);
  };

  const handleDownloadXml = () => {
    const rawXml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${corePages.map(p => `  <url>
    <loc>${p.url}</loc>
    <lastmod>2026-10-07</lastmod>
    <changefreq>daily</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
${blogItems.map(b => `  <url>
    <loc>${b.url}</loc>
    <lastmod>2026-10-07</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${b.priority}</priority>
  </url>`).join('\n')}
${productItems.map(pr => `  <url>
    <loc>${pr.url}</loc>
    <lastmod>2026-10-07</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${pr.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    const blob = new Blob([rawXml], { type: 'application/xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="sitemap-section" className="py-16 bg-[#F4F1EA] border-t-2 border-[#D4AF37]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Banner */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-[#18181B] via-[#27272A] to-[#064E3B] text-white rounded-3xl border-2 border-[#D4AF37] shadow-xl mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#059669]/30 text-[#FAD961] text-xs font-bold mb-3 border border-[#D4AF37]/40">
                <Compass className="w-4 h-4 text-[#D4AF37]" />
                <span>خريطة الموقع وفهرس الروابط المباشر (37 رابطاً)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-serif-arabic text-white flex flex-wrap items-center gap-3">
                <span>تصفح روابط المنصة وافتح أي رابط مباشرة</span>
                <span className="text-xs px-3 py-1 rounded-full bg-[#D4AF37] text-slate-900 font-sans font-black shadow-sm">
                  37 رابطاً نشطاً
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
                اضغط على أي رابط في القائمة أدناه ليفتح لك المحتوى مباشرة أمامك دون أي تحويل خارجي وبدون أي خطأ 404. تم ترتيب كافة الروابط تحت بعضها لتسهيل الوصول والتصفح السريع.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={handleCopyAll}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89628] hover:from-[#B89628] hover:to-[#997A1E] text-slate-900 text-xs font-black transition-all shadow-md shadow-amber-950/30"
                title="نسخ كافة روابط الموقع الـ 37 لاستخدامها في Google Search Console"
              >
                {allCopied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-900" />
                    <span>تم نسخ كافة الـ 37 رابطاً!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>نسخ جميع الروابط الـ 37</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownloadXml}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#18181B] hover:bg-[#27272A] border border-[#D4AF37]/50 text-[#FAD961] text-xs font-bold transition-all shadow-sm"
                title="تنزيل ملف الخريطة بصيغة sitemap.xml على جهازك مباشرة"
              >
                <Download className="w-4 h-4 text-[#D4AF37]" />
                <span>تنزيل ملف sitemap.xml</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Counter Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center">
              <span className="text-[11px] text-slate-400 block mb-0.5">إجمالي الروابط</span>
              <span className="text-xl font-black text-[#FAD961] font-mono">37</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center">
              <span className="text-[11px] text-slate-400 block mb-0.5">مقالات المدونة الموثقة</span>
              <span className="text-xl font-black text-emerald-400 font-mono">22</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center">
              <span className="text-[11px] text-slate-400 block mb-0.5">الصفحات والخدمات</span>
              <span className="text-xl font-black text-amber-300 font-mono">10</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center">
              <span className="text-[11px] text-slate-400 block mb-0.5">الأصول والمنتجات</span>
              <span className="text-xl font-black text-blue-300 font-mono">5</span>
            </div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بالاسم أو الرابط (مثال: post-1، الرياض، حطين، سياسة الخصوصية، حاسبة التمويل...)"
              className="w-full pr-10 pl-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-all font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs px-1.5 py-0.5"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 shrink-0">
            {[
              { id: 'all', label: `كافة الروابط (37)` },
              { id: 'posts', label: `المقالات الـ 22` },
              { id: 'pages', label: `الصفحات الرئيسية (10)` },
              { id: 'products', label: `الأصول والمنتجات (5)` },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setActiveFilter(btn.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeFilter === btn.id
                    ? 'bg-[#064E3B] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* RESULTS: All Links Rendered Directly Under Each Other */}
        <div className="space-y-6">

          {/* SECTION 1: Core Pages */}
          {filteredCore.length > 0 && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-black text-[#064E3B] font-serif-arabic flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#D4AF37]" />
                  <span>1. روابط الصفحات والأقسام الرئيسية ({filteredCore.length} رابطاً)</span>
                </h3>
                <span className="text-[11px] text-slate-500 font-mono">Priority: 0.80 - 1.0</span>
              </div>

              <div className="space-y-2.5">
                {filteredCore.map((item, idx) => {
                  const isCopied = copiedKey === `core-${item.id}`;
                  return (
                    <div
                      key={item.id}
                      className="p-3 sm:p-3.5 rounded-xl border border-slate-200 hover:border-[#D4AF37] hover:bg-amber-50/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                    >
                      <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                        <span className="w-6 h-6 rounded-lg bg-slate-900 text-[#FAD961] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 font-mono">
                          {idx + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-[#064E3B] transition-colors">
                              {item.title}
                            </h4>
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#059669] border border-emerald-200">
                              الأولوية {item.priority}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                            {item.desc}
                          </p>
                          <span className="text-[11px] font-mono text-[#059669] dir-ltr text-right block font-medium truncate mt-1">
                            {item.url}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <button
                          onClick={() => handleCopySingle(item.url, `core-${item.id}`)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5"
                          title="نسخ الرابط"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700 font-bold">تم النسخ</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>نسخ</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleDirectLinkClick(item)}
                          className="px-3 py-1.5 rounded-lg bg-[#064E3B] hover:bg-[#059669] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                          title="فتح وتصفح القسم مباشرة"
                        >
                          <span>فتح مباشرة</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SECTION 2: Blog Posts (22) */}
          {filteredPosts.length > 0 && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-black text-[#064E3B] font-serif-arabic flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                  <span>2. مقالات المدونة العقارية المعتمدة ({filteredPosts.length} مقالاً موثقاً EEAT)</span>
                </h3>
                <span className="text-[11px] text-slate-500 font-mono">Priority: 0.85</span>
              </div>

              <div className="space-y-2.5">
                {filteredPosts.map((post) => {
                  const isCopied = copiedKey === `post-${post.id}`;
                  return (
                    <div
                      key={post.id}
                      className="p-3 sm:p-3.5 rounded-xl border border-slate-200 hover:border-[#D4AF37] hover:bg-emerald-50/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                    >
                      <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                        <span className="w-6 h-6 rounded-lg bg-[#18181B] text-[#FAD961] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 font-mono">
                          {post.index}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-[#064E3B] transition-colors leading-snug">
                              {post.title}
                            </h4>
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                              {post.category}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                            <span className="text-[#059669] font-bold">{post.author}</span>
                            <span>•</span>
                            <span>{post.date}</span>
                          </div>
                          <span className="text-[11px] font-mono text-[#059669] dir-ltr text-right block font-medium truncate mt-1">
                            {post.url}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <button
                          onClick={() => handleCopySingle(post.url, `post-${post.id}`)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5"
                          title="نسخ رابط المقال"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700 font-bold">تم النسخ</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>نسخ</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleDirectLinkClick(post)}
                          className="px-3.5 py-1.5 rounded-lg bg-[#064E3B] hover:bg-[#059669] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                          title="فتح المقال وقراءته مباشرة في الموقع"
                        >
                          <span>قراءة المقال مباشرة</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SECTION 3: Products & Assets (5) */}
          {filteredProducts.length > 0 && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-black text-[#064E3B] font-serif-arabic flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                  <span>3. روابط الأصول والمنتجات المعروضة ({filteredProducts.length} أصل)</span>
                </h3>
                <span className="text-[11px] text-slate-500 font-mono">Priority: 0.80</span>
              </div>

              <div className="space-y-2.5">
                {filteredProducts.map((prod, idx) => {
                  const isCopied = copiedKey === `prod-${prod.id}`;
                  return (
                    <div
                      key={prod.id}
                      className="p-3 sm:p-3.5 rounded-xl border border-slate-200 hover:border-[#D4AF37] hover:bg-amber-50/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                    >
                      <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-200 mt-0.5 sm:mt-0">
                          <img src={prod.imageUrl} alt={prod.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-[#064E3B] transition-colors leading-snug">
                              {prod.title}
                            </h4>
                            <span className="text-[10px] text-[#059669] font-bold">
                              {prod.desc}
                            </span>
                          </div>
                          <span className="text-[11px] font-mono text-[#059669] dir-ltr text-right block font-medium truncate mt-1">
                            {prod.url}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <button
                          onClick={() => handleCopySingle(prod.url, `prod-${prod.id}`)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5"
                          title="نسخ رابط الأصل"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700 font-bold">تم النسخ</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>نسخ</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleDirectLinkClick(prod)}
                          className="px-3.5 py-1.5 rounded-lg bg-[#064E3B] hover:bg-[#059669] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                          title="معاينة تفاصيل الأصل مباشرة"
                        >
                          <span>عرض الأصل</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Empty search state */}
          {totalResultsCount === 0 && (
            <div className="p-8 bg-white rounded-2xl text-center border border-slate-200 space-y-2">
              <Compass className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs font-bold text-slate-700">لم يتم العثور على نتائج للبحث "{searchQuery}"</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
                className="text-xs text-[#059669] font-bold hover:underline"
              >
                إعادة ضبط البحث وعرض كافة الروابط الـ 37
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
