import React, { useState } from 'react';
import { BlogPost } from '../types';
import { MOCK_BLOG_POSTS } from '../data/mockData';
import { BookOpen, Clock, User, ArrowLeft, X, Sparkles } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog-section" className="py-12 bg-white border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#064E3B] text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>مدونة النخبة والامتثال الأدسنس 2026</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif-arabic">
              مقالات العقارات والتحول الرقمي
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              تحليلات استثمارية معتمدة ورؤى معمارية مخصصة للراغبين في اقتناء العقارات والمنتجات الرقمية.
            </p>
          </div>
        </div>

        {/* AdSense Native Responsive Leaderboard Banner Slot */}
        <div className="my-6 p-4 rounded-2xl bg-[#FAF8F5] border border-[#D4AF37]/30 text-center text-xs text-slate-400 font-medium shadow-inner flex flex-col items-center justify-center gap-1">
          <span className="text-[10px] uppercase font-bold text-[#059669] tracking-wider">
            مساحة إعلانية معتمدة Google AdSense Responsive Slot
          </span>
          <div className="w-full max-w-2xl h-14 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 rounded-xl flex items-center justify-center text-slate-500 text-xs border border-dashed border-slate-300">
            إعلان موصى به لعشاق العقارات والحلول الرقمية الفاخرة
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="bg-[#FAF8F5] rounded-3xl border border-[#D4AF37]/30 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] bg-[#18181B] overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 bg-[#18181B]/90 text-[#FAD961] text-[10px] font-bold px-3 py-1 rounded-full border border-[#D4AF37]/40">
                  {post.category}
                </span>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-medium mb-2">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#059669]" />
                      {post.author}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 font-serif-arabic leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">{post.date}</span>
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="flex items-center gap-1 text-xs font-bold text-[#064E3B] hover:text-[#059669] transition-colors"
                  >
                    <span>قراءة المقال الكامل</span>
                    <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Article Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#FAF8F5] border-2 border-[#D4AF37] rounded-3xl shadow-2xl overflow-hidden my-8">
            
            <div className="bg-[#18181B] text-white p-5 border-b border-[#D4AF37]/40 flex items-center justify-between">
              <span className="text-xs font-bold text-[#FAD961]">{selectedPost.category}</span>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-2 rounded-full bg-[#27272A] hover:bg-slate-700 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              <h1 className="text-2xl font-black text-slate-900 font-serif-arabic leading-snug">
                {selectedPost.title}
              </h1>

              <div className="flex items-center gap-4 text-xs text-slate-500 border-y border-slate-200 py-3">
                <span className="font-bold text-slate-800">{selectedPost.author}</span>
                <span>·</span>
                <span>{selectedPost.date}</span>
                <span>·</span>
                <span>{selectedPost.readTime}</span>
              </div>

              {/* In-Article AdSense Banner */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs text-emerald-800">
                إعلان متوافق مع AdSense: احصل على حاسبة التمويل العقاري المجانية من عقارات النخبة
              </div>

              <div className="text-xs sm:text-sm text-slate-800 leading-relaxed space-y-4 whitespace-pre-line font-medium">
                {selectedPost.content}
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
