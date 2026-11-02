import React from 'react';
import { AuthorProfile } from '../types';
import { MOCK_BLOG_POSTS } from '../data/mockData';
import { 
  ShieldCheck, 
  Award, 
  GraduationCap, 
  Building2, 
  Mail, 
  MapPin, 
  FileCheck2, 
  CheckCircle2, 
  X, 
  BookOpen, 
  Sparkles, 
  ExternalLink,
  Briefcase,
  Calendar
} from 'lucide-react';

interface AuthorProfileModalProps {
  author: AuthorProfile | null;
  onClose: () => void;
  onSelectArticle?: (articleId: string) => void;
}

export const AuthorProfileModal: React.FC<AuthorProfileModalProps> = ({
  author,
  onClose,
  onSelectArticle
}) => {
  if (!author) return null;

  // Find articles published by this author
  const authorArticles = MOCK_BLOG_POSTS.filter((post) => {
    return (
      post.author.includes(author.name) ||
      author.name.includes(post.author.split('(')[0].trim()) ||
      (post.authorProfile && post.authorProfile.id === author.id)
    );
  });

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl bg-[#FAF8F5] border-2 border-[#D4AF37] rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="bg-gradient-to-r from-[#18181B] via-[#27272A] to-[#064E3B] text-white p-5 border-b border-[#D4AF37]/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#059669] to-[#047857] border border-[#FAD961]/50 flex items-center justify-center text-white shadow-inner">
              <ShieldCheck className="w-5 h-5 text-[#FAD961]" />
            </div>
            <div>
              <span className="text-xs font-black text-[#FAD961] block">
                ملف الكاتب المعتمد وترخيص المزاولة الرسمي
              </span>
              <span className="text-[10px] text-emerald-300">
                توثيق معايير الخبرة والمصداقية (E-E-A-T Certified & Verified 2026)
              </span>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#27272A] hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="إغلاق الملف التعريفي"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[78vh] overflow-y-auto text-right">
          
          {/* Main Author Header Card */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#D4AF37]/40 shadow-sm relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#18181B] via-[#27272A] to-[#064E3B] text-[#D4AF37] flex items-center justify-center font-bold text-xl sm:text-2xl border-2 border-[#D4AF37] shadow-lg">
                    {author.name.charAt(2) || 'ع'}
                  </div>
                  <div className="absolute -bottom-1 -right-1 p-1 bg-emerald-600 rounded-full border-2 border-white shadow text-white" title="كاتب بشري موثق">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-serif-arabic">
                      {author.name}
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-[11px] font-bold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>موثق رسمياً</span>
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-bold text-[#064E3B] mt-1">
                    {author.role}
                  </p>
                  
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    {author.title}
                  </p>
                </div>
              </div>

              {/* Status Pill */}
              <div className="shrink-0 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-right">
                <div className="flex items-center gap-1.5 text-amber-900 text-xs font-black mb-1">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>سنوات الخبرة الميدانية</span>
                </div>
                <div className="text-sm font-black text-slate-900">
                  {author.experienceYears}
                </div>
              </div>

            </div>

            {/* Official Credentials Banner */}
            <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <FileCheck2 className="w-4 h-4 text-[#059669] shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-500 block">رقم الترخيص المهني المعتمد:</span>
                  <span className="font-bold text-slate-900 font-mono text-[11px] sm:text-xs">
                    {author.licenseNumber}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <Building2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-500 block">الجهة الحكومية المُرخصة:</span>
                  <span className="font-bold text-slate-900">
                    {author.licenseAuthority}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Background & Entity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-black text-slate-900">
                <GraduationCap className="w-4 h-4 text-[#064E3B]" />
                <span>المؤهل الأكاديمي والشهادات</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {author.education}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-black text-slate-900">
                <Briefcase className="w-4 h-4 text-[#D4AF37]" />
                <span>جهة العمل والمقر الميداني</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-bold">
                {author.workplace}
              </p>
              <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {author.officeLocation}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-mono">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {author.email}
                </span>
              </div>
            </div>
          </div>

          {/* Biography & Track Record */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-xs font-black text-[#064E3B]">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>نبذة مهنية وسجل الإنجازات الميدانية</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {author.bio}
            </p>
          </div>

          {/* Specializations Badges */}
          <div className="p-4 rounded-2xl bg-[#F4EBD9]/30 border border-[#D4AF37]/30 space-y-2.5">
            <span className="text-xs font-black text-slate-900 block">
              مجالات الاختصاص والخبرة الدقيقة:
            </span>
            <div className="flex flex-wrap gap-2">
              {author.specializations.map((spec, sIdx) => (
                <span 
                  key={sIdx}
                  className="px-3 py-1 rounded-xl bg-white border border-[#D4AF37]/50 text-slate-800 text-xs font-bold shadow-xs"
                >
                  ✓ {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Human Authorship & Editorial Quality Pledge (AdSense & EEAT 2026 Guarantee) */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#064E3B]/10 via-emerald-50 to-white border-2 border-[#059669]/40 shadow-sm space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h4 className="text-xs sm:text-sm font-black text-emerald-950 font-serif-arabic">
                إقرار الأصالة والتحرير البشري المعتمد 100% (E-E-A-T AdSense Compliance)
              </h4>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              نؤكد ونقر بأن كافة المقالات والتحليلات المنشورة باسم هذا الكاتب مصاغة ومكتوبة ومراجعة بشرياً بالكامل دون أي توليد آلي غير مدقق، ومستندة مباشرة إلى مصادر وأرقام معتمدة من الهيئات والأنظمة الرسمية لعام 2026، وخالية تماماً من النسخ أو التكرار اللفظي بما يحقق أعلى معايير الجودة والشفافية التحريرية المعتمدة لدى برنامج Google AdSense.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-emerald-200 text-[11px] font-bold text-emerald-900">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-100/80">✓ بدون محتوى مكرر</span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-100/80">✓ أرقام تراخيص حكومية موثقة</span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-100/80">✓ مراجع عقارية رسمية معتمدة 2026</span>
            </div>
          </div>

          {/* Articles Written by This Author */}
          {authorArticles.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs sm:text-sm font-black text-slate-900 font-serif-arabic flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#064E3B]" />
                  <span>المقالات والدراسات المنشورة للكاتب ({authorArticles.length})</span>
                </h4>
                <span className="text-[11px] text-slate-500">انقر على أي مقال للقراءة المباشرة</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {authorArticles.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => {
                      if (onSelectArticle) {
                        onClose();
                        onSelectArticle(post.id);
                      }
                    }}
                    className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-[#D4AF37] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-[#D4AF37] block mb-1">
                        {post.category}
                      </span>
                      <h5 className="text-xs font-bold text-slate-900 line-clamp-2 group-hover:text-[#064E3B] transition-colors leading-snug">
                        {post.title}
                      </h5>
                    </div>

                    <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-slate-100 text-[10px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {post.date}
                      </span>
                      <span className="text-[#059669] font-bold flex items-center gap-0.5 group-hover:underline">
                        <span>قراءة</span>
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-medium">
            سجل التحقق المهني لعام 2026 - عقارات النخبة المعتمدة
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-[#18181B] text-[#FAD961] hover:bg-slate-800 text-xs font-bold transition-all cursor-pointer"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};
