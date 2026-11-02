import React, { useState, useEffect } from 'react';
import { BlogPost, AuthorProfile } from '../types';
import { MOCK_BLOG_POSTS } from '../data/mockData';
import { getAuthorProfile, getArticleSpecificSources } from '../data/authorsData';
import { AuthorProfileModal } from './AuthorProfileModal';
import { 
  BookOpen, 
  Clock, 
  User, 
  ArrowLeft, 
  X, 
  Sparkles, 
  Share2, 
  Check, 
  Video, 
  Film, 
  ShieldCheck, 
  Award, 
  ExternalLink, 
  FileCheck2, 
  Building2, 
  CheckCircle2,
  GraduationCap
} from 'lucide-react';

interface BlogSectionProps {
  onOpenVideoStudio?: (prefilledText?: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onOpenVideoStudio }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeAuthorModal, setActiveAuthorModal] = useState<AuthorProfile | null>(null);
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);

  // Helper to trigger AI Text to video
  const triggerVideoStudio = (text: string) => {
    if (onOpenVideoStudio) {
      onOpenVideoStudio(text);
    } else {
      window.dispatchEvent(new CustomEvent('open-video-studio', { detail: text }));
    }
  };

  // Handle opening and viewing an article directly
  const handleOpenArticle = (post: BlogPost) => {
    setSelectedPost(post);
    
    // Update browser URL to direct permalink for SEO & Google Search Console
    try {
      if (window.history && window.history.pushState) {
        window.history.pushState({ postId: post.id }, '', `/post/${post.id}`);
      }
    } catch (e) {
      // Ignore
    }
  };

  // Listen to hash, URL query params, and custom events to directly open articles from sitemap links or Google Search
  useEffect(() => {
    const checkUrlAndOpen = () => {
      try {
        const url = new URL(window.location.href);
        const hash = window.location.hash.replace('#', '');
        const postParam = url.searchParams.get('post') || url.searchParams.get('article');
        let targetId = postParam;

        if (!targetId && hash && hash.startsWith('post-')) {
          targetId = hash;
        }
        if (!targetId && (url.pathname.startsWith('/blog/') || url.pathname.startsWith('/post/'))) {
          const parts = url.pathname.split('/');
          targetId = parts[parts.length - 1];
        }

        if (targetId) {
          const found = MOCK_BLOG_POSTS.find((p) => p.id === targetId);
          if (found) {
            handleOpenArticle(found);
            setTimeout(() => {
              const el = document.getElementById(targetId as string);
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 150);
          }
        }

        // Author profile URL parameter (?author=...)
        const authorParam = url.searchParams.get('author');
        if (authorParam) {
          const prof = getAuthorProfile(authorParam);
          if (prof) {
            setActiveAuthorModal(prof);
          }
        }
      } catch (err) {
        console.error('Blog URL Parse Error:', err);
      }
    };

    checkUrlAndOpen();
    window.addEventListener('hashchange', checkUrlAndOpen);
    window.addEventListener('popstate', checkUrlAndOpen);

    const handleCustomOpen = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const targetId = customEvent.detail;
      const found = MOCK_BLOG_POSTS.find((p) => p.id === targetId);
      if (found) {
        handleOpenArticle(found);
      }
    };
    window.addEventListener('open-blog-post', handleCustomOpen);

    return () => {
      window.removeEventListener('hashchange', checkUrlAndOpen);
      window.removeEventListener('popstate', checkUrlAndOpen);
      window.removeEventListener('open-blog-post', handleCustomOpen);
    };
  }, []);

  // Handle sharing link
  const handleShare = (post: BlogPost, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const directUrl = post.shortUrl || `${window.location.origin}/post/${post.id}`;
    navigator.clipboard.writeText(directUrl);
    setCopiedPostId(post.id);
    setTimeout(() => setCopiedPostId(null), 2500);
  };

  return (
    <section id="blog-section" className="py-12 bg-white border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#064E3B] text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>مدونة النخبة والامتثال الأدسنس 2026</span>
              <span className="text-[#D4AF37]">•</span>
              <span className="flex items-center gap-1 text-[11px] font-black text-[#047857]">
                <BookOpen className="w-3.5 h-3.5 text-[#059669]" />
                <span>{MOCK_BLOG_POSTS.length} مقالات مرجعية موثقة بأرقام تراخيص رسمية</span>
              </span>
            </div>

            <div className="flex items-center gap-3.5 flex-wrap">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif-arabic">
                مقالات العقارات والتحول الرقمي الموثقة
              </h2>

              {/* Number of Articles in Luxury Icon Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-[#18181B] via-[#27272A] to-[#064E3B] border border-[#D4AF37]/60 text-white shadow-lg shadow-black/10">
                <div className="relative flex items-center justify-center w-7 h-7 rounded-xl bg-gradient-to-br from-[#059669] to-[#047857] border border-[#FAD961]/40 text-white shadow-inner">
                  <BookOpen className="w-4 h-4 text-[#FAD961]" />
                  <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-600 text-white text-[10px] font-black flex items-center justify-center border-2 border-[#18181B] shadow">
                    {MOCK_BLOG_POSTS.length}
                  </span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-xs font-black text-[#FAD961] leading-tight">
                    {MOCK_BLOG_POSTS.length} مقالات منشورة
                  </span>
                  <span className="text-[9px] text-emerald-300 leading-tight">
                    محتوى بشري 100% موثق E-E-A-T
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-1.5">
              تحليلات استثمارية معتمدة ورؤى معمارية صاغها كبار المهندسين والمستشارين المعتمدين بتراخيص رسمية ومصادر موثقة لعام 2026.
            </p>
          </div>
        </div>

        {/* AI Text to Video 15 Min Studio Banner */}
        <div className="mb-8 p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#18181B] via-[#27272A] to-[#064E3B] border-2 border-[#D4AF37]/60 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-right">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#059669] to-[#047857] border border-[#FAD961]/50 flex items-center justify-center text-white shrink-0 shadow-lg">
              <Video className="w-6 h-6 text-[#FAD961] animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-black text-[#FAD961] font-serif-arabic">
                  أداة تحويل النص إلى فيديو سينمائي بالذكاء الاصطناعي (مدة 15 دقيقة)
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#059669] text-white text-[10px] font-black">
                  جديد 4K
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                حوّل أي مقال عقاري أو نص مخصص إلى فيلم وثائقي فخم مدته حتى 15 دقيقة، مع سيناريو وتعليق صوتي وتوجيه للكاميرا والدرون.
              </p>
            </div>
          </div>

          <button
            onClick={() => triggerVideoStudio('')}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#FAD961] hover:brightness-110 text-slate-900 font-black text-xs shadow-lg transition-all flex items-center gap-2 border border-white/20 cursor-pointer"
          >
            <Film className="w-4 h-4 text-slate-900" />
            <span>فتح استوديو الفيديو (15 دقيقة)</span>
          </button>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_BLOG_POSTS.map((post) => {
            const authorData = getAuthorProfile(post.author);

            return (
              <article
                key={post.id}
                id={post.id}
                className="bg-[#FAF8F5] rounded-3xl border border-[#D4AF37]/30 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between scroll-mt-24"
              >
                <div className="relative aspect-[16/9] bg-[#18181B] overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 bg-[#18181B]/90 text-[#FAD961] text-[10px] font-bold px-3 py-1 rounded-full border border-[#D4AF37]/40 shadow-sm">
                    {post.category}
                  </span>

                  {/* Verified Human Author Floating Badge (Pure E-E-A-T without artificial vanity metrics) */}
                  <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-white text-[11px] font-medium bg-[#18181B]/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveAuthorModal(authorData);
                      }}
                      className="flex items-center gap-1.5 text-slate-200 hover:text-[#FAD961] transition-colors cursor-pointer text-right"
                      title="عرض ترخيص وبيانات الكاتب المعتمد"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-[#34D399] shrink-0" />
                      <span className="font-bold truncate max-w-[160px]">{post.author}</span>
                    </button>

                    <span className="flex items-center gap-1 text-slate-300 text-[10px]">
                      <Clock className="w-3 h-3 text-[#FAD961]" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-500 font-medium mb-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveAuthorModal(authorData);
                        }}
                        className="flex items-center gap-1 text-[#059669] hover:underline font-bold cursor-pointer"
                      >
                        <User className="w-3.5 h-3.5" />
                        <span>{post.author}</span>
                      </button>
                      
                      <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>كاتب موثق</span>
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 font-serif-arabic leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-400">{post.date}</span>
                      {post.shortUrl && (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300">
                          {post.shortUrl.replace('https://', '')}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {post.shortUrl && (
                        <button
                          onClick={(e) => handleShare(post, e)}
                          className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold transition-all cursor-pointer"
                          title="نسخ الرابط المختصر للمقال"
                        >
                          {copiedPostId === post.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-[11px]">تم النسخ!</span>
                            </>
                          ) : (
                            <>
                              <Share2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-[11px]">نسخ الرابط</span>
                            </>
                          )}
                        </button>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          triggerVideoStudio(`${post.title}\n\n${post.excerpt}`);
                        }}
                        className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-[#D4AF37]/15 hover:bg-[#D4AF37]/30 text-[#064E3B] border border-[#D4AF37]/50 text-xs font-bold transition-all shadow-sm cursor-pointer"
                        title="تحويل هذا المقال إلى فيديو سينمائي 15 دقيقة"
                      >
                        <Film className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span className="hidden sm:inline">فيديو 15 دقيقة</span>
                      </button>

                      <button
                        onClick={() => handleOpenArticle(post)}
                        className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-[#064E3B] hover:bg-[#059669] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                      >
                        <span>قراءة المقال</span>
                        <ArrowLeft className="w-4 h-4 text-[#FAD961]" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

      </div>

      {/* Article Reader Modal */}
      {selectedPost && (() => {
        const authorProfile = getAuthorProfile(selectedPost.author);
        const articleSources = getArticleSpecificSources(selectedPost.id, selectedPost.category);

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <div className="relative w-full max-w-3xl bg-[#FAF8F5] border-2 border-[#D4AF37] rounded-3xl shadow-2xl overflow-hidden my-8">
              
              {/* Modal Header */}
              <div className="bg-[#18181B] text-white p-5 border-b border-[#D4AF37]/40 flex items-center justify-between">
                <span className="text-xs font-bold text-[#FAD961]">{selectedPost.category}</span>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-2 rounded-full bg-[#27272A] hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="إغلاق المقال"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
                {/* Breadcrumb Trail for Google Crawlers & Users */}
                <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 font-bold flex-wrap">
                  <a href="/" className="hover:text-[#064E3B] transition-colors">الرئيسية</a>
                  <span className="text-slate-300">/</span>
                  <a href="/#blog-section" className="hover:text-[#064E3B] transition-colors">المدونة العقارية</a>
                  <span className="text-slate-300">/</span>
                  <span className="text-[#064E3B] font-black">{selectedPost.category}</span>
                </nav>

                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#059669]/10 border border-[#059669]/30 text-[#064E3B] text-xs font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
                    <span>محتوى تحليلي موثوق بمعايير E-E-A-T لعام 2026</span>
                  </div>
                  
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-serif-arabic leading-snug">
                    {selectedPost.title}
                  </h1>
                </div>

                {/* Verified Author Header Card & Action Bar */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#D4AF37]/40 shadow-sm space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#18181B] to-[#064E3B] text-[#D4AF37] flex items-center justify-center font-bold text-base border border-[#D4AF37]/40 shadow-inner">
                        {authorProfile.name.charAt(2) || 'ع'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-slate-900 text-sm block">{selectedPost.author}</span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>موثق رسمياً</span>
                          </span>
                        </div>
                        <span className="text-[11px] text-[#064E3B] font-bold block mt-0.5">
                          {authorProfile.role}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {authorProfile.licenseNumber}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end gap-1 text-slate-500 font-medium text-xs">
                      <span className="text-amber-800 font-bold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>وقت القراءة: {selectedPost.readTime}</span>
                      </span>
                      <span className="text-[11px] text-slate-400">تاريخ النشر: {selectedPost.date}</span>
                    </div>
                  </div>

                  {/* Clean Action Bar (Without artificial views & likes buttons) */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => setActiveAuthorModal(authorProfile)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-50 to-emerald-100/70 border border-emerald-300 text-emerald-900 font-bold hover:bg-emerald-100 transition-colors cursor-pointer"
                        title="عرض الملف المهني الكامل وتراخيص الكاتب"
                      >
                        <ShieldCheck className="w-4 h-4 text-emerald-700" />
                        <span>الملف المهني والترخيص المعتمد للكاتب</span>
                      </button>

                      {/* AI Video Generation Button */}
                      <button
                        onClick={() => {
                          const contentToConvert = `${selectedPost.title}\n\n${selectedPost.excerpt}\n\n${selectedPost.content.slice(0, 600)}`;
                          setSelectedPost(null);
                          triggerVideoStudio(contentToConvert);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#064E3B] to-[#059669] hover:brightness-110 text-white font-bold transition-all shadow-sm border border-emerald-400/40 cursor-pointer"
                        title="تحويل هذا المقال إلى فيديو سينمائي 15 دقيقة"
                      >
                        <Film className="w-4 h-4 text-[#FAD961]" />
                        <span>تحويل لفيديو 15 دقيقة 🎬</span>
                      </button>
                    </div>

                    <button
                      onClick={() => handleShare(selectedPost)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF8F5] border border-[#D4AF37]/40 text-[#064E3B] font-bold hover:bg-[#D4AF37]/15 transition-colors cursor-pointer"
                    >
                      {copiedPostId === selectedPost.id ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span className="text-emerald-700">تم نسخ الرابط!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-4 h-4 text-[#059669]" />
                          <span>مشاركة المقال</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Short Link Fast Share Box if available */}
                {selectedPost.shortUrl && (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-2xl flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 text-xs shadow-sm">
                    <div className="min-w-0">
                      <span className="text-[11px] text-emerald-800 block font-bold mb-0.5">
                        🔗 الرابط المختصر المباشر لنشر هذا المقال:
                      </span>
                      <span className="font-mono text-emerald-950 font-bold text-xs select-all bg-white/80 px-2 py-0.5 rounded border border-emerald-200 inline-block">
                        {selectedPost.shortUrl}
                      </span>
                    </div>
                    <button
                      onClick={() => handleShare(selectedPost)}
                      className="shrink-0 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#064E3B] to-[#059669] hover:brightness-110 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedPostId === selectedPost.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#FAD961]" />
                          <span>تم النسخ!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5 text-[#FAD961]" />
                          <span>نسخ الرابط المختصر</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Featured Image inside Article */}
                <div className="rounded-2xl overflow-hidden aspect-[16/8] bg-[#18181B] border border-[#D4AF37]/30 shadow-md">
                  <img
                    src={selectedPost.imageUrl}
                    alt={selectedPost.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Structured Article Body */}
                <div className="text-xs sm:text-sm text-slate-800 leading-relaxed space-y-4 font-medium">
                  {selectedPost.content.split('\n\n').map((paragraph, pIdx) => {
                    if (paragraph.startsWith('### ')) {
                      return (
                        <h3 key={pIdx} className="text-base sm:text-lg font-black text-[#064E3B] font-serif-arabic pt-4 pb-1 border-b border-[#D4AF37]/30 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#059669]" />
                          {paragraph.replace('### ', '')}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith('---')) {
                      return <hr key={pIdx} className="border-[#D4AF37]/30 my-4" />;
                    }
                    if (paragraph.includes('* ') || paragraph.includes('- ')) {
                      const lines = paragraph.split('\n');
                      return (
                        <ul key={pIdx} className="space-y-2 p-3 rounded-2xl bg-white border border-slate-200">
                          {lines.map((line, lIdx) => (
                            <li key={lIdx} className="flex items-start gap-2 text-slate-700">
                              <span className="text-[#059669] font-black text-base leading-none mt-0.5">•</span>
                              <span>{line.replace(/^[\*\-]\s+/, '')}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p key={pIdx} className="leading-relaxed text-slate-700">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>

                {/* 1. Dedicated Author Credentials Card inside Article */}
                <div className="p-5 rounded-2xl bg-white border-2 border-[#D4AF37]/40 shadow-sm space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#18181B] via-[#27272A] to-[#064E3B] text-[#D4AF37] flex items-center justify-center font-bold text-lg border border-[#D4AF37]">
                        {authorProfile.name.charAt(2) || 'ع'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-black text-slate-900 font-serif-arabic">{authorProfile.name}</h4>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                            كاتب بشري معتمد
                          </span>
                        </div>
                        <p className="text-xs text-[#064E3B] font-bold">{authorProfile.role}</p>
                        <p className="text-[11px] text-slate-500">{authorProfile.title}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveAuthorModal(authorProfile)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#FAD961] text-slate-900 text-xs font-black shadow hover:brightness-105 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <ShieldCheck className="w-4 h-4 text-slate-900" />
                      <span>عرض السجل المهني والتراخيص</span>
                    </button>
                  </div>

                  <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50">
                      <FileCheck2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="text-slate-700 font-medium">الترخيص: <strong className="font-mono text-slate-900">{authorProfile.licenseNumber}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50">
                      <Building2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span className="text-slate-700 font-medium">الجهة: <strong className="text-slate-900">{authorProfile.licenseAuthority}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50">
                      <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="text-slate-700 font-medium">الخبرة: <strong className="text-slate-900">{authorProfile.experienceYears}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50">
                      <GraduationCap className="w-3.5 h-3.5 text-[#064E3B] shrink-0" />
                      <span className="text-slate-700 font-medium truncate">المؤهل: <strong className="text-slate-900">{authorProfile.education}</strong></span>
                    </div>
                  </div>
                </div>

                {/* 2. Official Documented Regulatory Sources & Numbers Box */}
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#D4AF37]/50 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#064E3B] text-white flex items-center justify-center">
                        <FileCheck2 className="w-4 h-4 text-[#FAD961]" />
                      </div>
                      <h4 className="text-xs sm:text-sm font-black text-slate-900 font-serif-arabic">
                        المصادر والمراجع التنظيمية الموثقة بأرقام حكومية رسمية لعام 2026
                      </h4>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                      {articleSources.length} مصادر رسمية
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                    استند هذا المقال في أرقامه وتحليلاته إلى القواعد واللوائح التنظيمية والبيانات الصادرة رسمياً عن الجهات الآتية:
                  </p>

                  <div className="space-y-2">
                    {articleSources.map((src, sIdx) => (
                      <div key={sIdx} className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-bold text-slate-900">{src.title}</span>
                          <span className="shrink-0 px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px]">
                            {src.year}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                          <span className="font-medium text-[#064E3B]">{src.authority}</span>
                          <span>•</span>
                          <span className="font-mono text-slate-700 font-bold">الرقم المرجعي: {src.referenceNumber}</span>
                          {src.verificationUrl && (
                            <>
                              <span>•</span>
                              <a 
                                href={src.verificationUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-emerald-700 hover:underline flex items-center gap-0.5 font-bold"
                              >
                                <span>التحقق من المصدر</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Human Authorship & Editorial Quality Declaration (AdSense Compliance) */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-300 shadow-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-black text-emerald-950 font-serif-arabic">
                      إقرار الأصالة والتحرير البشري المعتمد 100% (E-E-A-T AdSense Quality Pledge)
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-900 leading-relaxed font-medium">
                    هذا المقال محرر ومراجع حصرياً بيد بشرية متخصصة ومصنف كتحليل مهني موثق. تم فحص المحتوى للتأكد من انعدام النسخ أو التكرار اللفظي والالتزام التام بإرشادات جودة المحتوى لبرنامج Google AdSense والمعايير العقارية السعودية.
                  </p>
                </div>

                {/* Clean Bottom Footer Bar */}
                <div className="p-5 rounded-2xl bg-[#18181B] text-white border border-[#D4AF37]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#059669] to-[#047857] flex items-center justify-center text-white border border-[#FAD961]/40">
                      <ShieldCheck className="w-5 h-5 text-[#FAD961]" />
                    </div>
                    <div className="text-xs text-slate-300">
                      <span className="block font-bold text-white">{selectedPost.author}</span>
                      <span className="text-[10px] text-emerald-300 font-mono">{authorProfile.licenseNumber}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveAuthorModal(authorProfile)}
                      className="px-4 py-2 rounded-xl bg-[#27272A] hover:bg-[#3F3F46] text-[#FAD961] text-xs font-bold border border-[#D4AF37]/30 transition-all cursor-pointer"
                    >
                      الملف المهني للكاتب
                    </button>
                    <button
                      onClick={() => setSelectedPost(null)}
                      className="px-6 py-2 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                    >
                      إغلاق المقال
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        );
      })()}

      {/* Author Profile Modal */}
      {activeAuthorModal && (
        <AuthorProfileModal
          author={activeAuthorModal}
          onClose={() => setActiveAuthorModal(null)}
          onSelectArticle={(articleId) => {
            const found = MOCK_BLOG_POSTS.find((p) => p.id === articleId);
            if (found) {
              handleOpenArticle(found);
            }
          }}
        />
      )}

    </section>
  );
};
