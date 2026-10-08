import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  ShoppingCart, 
  Heart, 
  Sparkles, 
  PlusCircle, 
  Globe, 
  Menu, 
  X,
  Crown,
  BookOpen,
  Compass,
  Video,
  Film
} from 'lucide-react';
import { Currency } from '../types';
import { MOCK_BLOG_POSTS } from '../data/mockData';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  cartCount: number;
  favoritesCount: number;
  onOpenCart: () => void;
  onOpenFavorites: () => void;
  onOpenAiAdvisor: () => void;
  onOpenPropertySubmit: () => void;
  onOpenLegalTab: (tab: any) => void;
  onScrollToBlog?: () => void;
  onScrollToCatalog?: () => void;
  onScrollToSitemap?: () => void;
  onOpenVideoStudio?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  currency,
  setCurrency,
  cartCount,
  favoritesCount,
  onOpenCart,
  onOpenFavorites,
  onOpenAiAdvisor,
  onOpenPropertySubmit,
  onOpenLegalTab,
  onScrollToBlog,
  onScrollToCatalog,
  onScrollToSitemap,
  onOpenVideoStudio,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 text-white transition-all shadow-xl">
      
      {/* Eye-Catching Top Navigation Bar (شريط علوي فاخر وجذاب يلفت النظر) */}
      <div className="bg-gradient-to-r from-[#064E3B] via-[#059669] via-[#D4AF37] to-[#047857] text-white py-2 px-4 border-b border-[#FAD961]/40 shadow-inner">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-bold">
          
          {/* Welcome Tagline */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FAD961] animate-ping" />
            <span className="text-[#FAD961] font-extrabold tracking-wide">
              مرحباً بكم في منصة عقارات النخبة الملكية
            </span>
          </div>

          {/* User Requested Navigation Links */}
          <nav className="flex items-center gap-3 sm:gap-5 mx-auto sm:mx-0 overflow-x-auto no-scrollbar py-0.5">
            <button
              onClick={() => onOpenLegalTab('contact')}
              className="hover:text-[#FAD961] transition-colors whitespace-nowrap flex items-center gap-1 font-extrabold"
            >
              <span>اتصل بنا</span>
            </button>

            <span className="text-white/40">|</span>

            <button
              onClick={() => onOpenLegalTab('about')}
              className="hover:text-[#FAD961] transition-colors whitespace-nowrap font-extrabold"
            >
              <span>من نحن</span>
            </button>

            <span className="text-white/40">|</span>

            <button
              onClick={() => onOpenLegalTab('terms')}
              className="hover:text-[#FAD961] transition-colors whitespace-nowrap font-extrabold"
            >
              <span>شروط الاستخدام</span>
            </button>

            <span className="text-white/40">|</span>

            <button
              onClick={() => onOpenLegalTab('privacy')}
              className="hover:text-[#FAD961] transition-colors whitespace-nowrap font-extrabold"
            >
              <span>سياسة الخصوصية</span>
            </button>

            <span className="text-white/40">|</span>

            <button
              onClick={() => {
                if (onScrollToBlog) onScrollToBlog();
                else onOpenLegalTab('domain_verify');
              }}
              className="hover:text-[#FAD961] transition-colors whitespace-nowrap font-extrabold flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#FAD961]" />
              <span>المدونة</span>
              <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-black rounded-full bg-[#18181B] text-[#FAD961] border border-[#FAD961]/50 shadow-sm">
                {MOCK_BLOG_POSTS.length}
              </span>
            </button>

            <span className="text-white/40">|</span>

            <button
              onClick={() => {
                if (onScrollToSitemap) onScrollToSitemap();
                else onOpenLegalTab('sitemap');
              }}
              className="hover:text-[#FAD961] transition-colors whitespace-nowrap font-extrabold flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 shadow-sm"
              title="عرض خريطة الموقع وفهرس الروابط الـ 37 مباشرة"
            >
              <Compass className="w-3.5 h-3.5 text-[#FAD961]" />
              <span>خريطة الموقع</span>
              <span className="w-4 h-4 rounded-full bg-[#D4AF37] text-slate-900 text-[10px] font-black flex items-center justify-center">
                37
              </span>
            </button>

            <span className="text-white/40">|</span>

            <button
              onClick={() => {
                if (onScrollToCatalog) onScrollToCatalog();
              }}
              className="hover:text-[#FAD961] transition-colors whitespace-nowrap font-black text-[#FAD961] flex items-center gap-1 px-2 py-0.5 rounded-lg bg-black/20 border border-[#FAD961]/30"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-[#FAD961]" />
              <span>المتجر</span>
            </button>

            <span className="text-white/40">|</span>

            {/* Top Bar AI Video Studio Button */}
            <button
              onClick={() => {
                if (onOpenVideoStudio) onOpenVideoStudio();
                else window.dispatchEvent(new CustomEvent('open-video-studio', { detail: '' }));
              }}
              className="hover:text-[#FAD961] transition-colors whitespace-nowrap font-black text-[#FAD961] flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-emerald-950/70 to-black border border-emerald-500/40 shadow-sm"
              title="استوديو تحويل النص إلى فيديو سينمائي بالذكاء الاصطناعي (مدة 15 دقيقة)"
            >
              <Video className="w-3.5 h-3.5 text-[#FAD961] animate-pulse" />
              <span>استوديو الفيديو 15 دقيقة</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            </button>
          </nav>

        </div>
      </div>

      {/* Main Glassmorphic Header */}
      <div className="glass-header border-b border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Brand Logo Zone - Larger Font & Metallic Gold Styling */}
            <div className="flex items-center gap-3 shrink-0">
              <a href="#" className="flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FAD961] via-[#D4AF37] to-[#059669] p-[2.5px] shadow-xl group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-[#18181B] rounded-[13px] flex items-center justify-center">
                    <Crown className="w-7 h-7 text-[#FAD961]" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-black tracking-tight font-serif-arabic bg-gradient-to-r from-[#FAD961] via-[#D4AF37] to-[#F59E0B] bg-clip-text text-transparent drop-shadow-md">
                    عقارات النخبة
                  </span>
                  <span className="text-[11px] text-emerald-400 font-bold tracking-wide">
                    المنصة الملكية المعتمدة VIP
                  </span>
                </div>
              </a>
            </div>

          {/* Smart Search Bar Zone */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="ابحث عن قصر، فيلا، قالب كانفا، أو لعبة جمعات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#27272A]/90 text-slate-100 placeholder-slate-400 text-xs sm:text-sm rounded-xl py-2.5 pr-10 pl-4 border border-[#D4AF37]/30 focus:border-[#059669] focus:ring-1 focus:ring-[#059669] outline-none transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-[#D4AF37] absolute right-3.5 top-3" />
            </div>
          </div>

          {/* Desktop Right Action Zone */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* Currency Switcher */}
            <div className="flex items-center bg-[#27272A] border border-[#D4AF37]/30 rounded-xl p-1 text-xs">
              <Globe className="w-3.5 h-3.5 text-[#D4AF37] mx-1.5" />
              {(['SAR', 'AED', 'USD'] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-2 py-1 rounded-lg font-bold transition-colors ${
                    currency === c 
                      ? 'bg-[#059669] text-white shadow' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* AI Video Studio Button */}
            <button
              onClick={() => {
                if (onOpenVideoStudio) onOpenVideoStudio();
                else window.dispatchEvent(new CustomEvent('open-video-studio', { detail: '' }));
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-950/90 via-[#18181B] to-slate-900 text-[#FAD961] text-xs font-bold border border-[#D4AF37]/50 shadow-md hover:brightness-110 transition-all cursor-pointer"
              title="استوديو تحويل النص إلى فيديو سينمائي 15 دقيقة"
            >
              <Video className="w-4 h-4 text-[#FAD961]" />
              <span>فيديو 15 دقيقة</span>
            </button>

            {/* AI Royal Advisor Button */}
            <button
              onClick={onOpenAiAdvisor}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#059669] to-[#047857] text-white text-xs font-semibold shadow-md hover:brightness-110 transition-all border border-emerald-400/30"
            >
              <Sparkles className="w-4 h-4 text-[#FAD961] animate-pulse" />
              <span>المساعد الذكي</span>
            </button>

            {/* Property Submission CTA */}
            <button
              onClick={onOpenPropertySubmit}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#D4AF37]/15 text-[#FAD961] hover:bg-[#D4AF37]/25 border border-[#D4AF37]/40 text-xs font-medium transition-all"
            >
              <PlusCircle className="w-4 h-4 text-[#D4AF37]" />
              <span>عرض عقارك</span>
            </button>

            {/* Favorites Button */}
            <button
              onClick={onOpenFavorites}
              className="relative p-2.5 rounded-xl bg-[#27272A] border border-slate-700 hover:border-[#D4AF37] text-slate-300 hover:text-white transition-all"
              title="المفضلة"
            >
              <Heart className="w-4 h-4 text-[#D4AF37]" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#059669] text-white text-[10px] font-bold flex items-center justify-center border-2 border-[#18181B]">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Cart Drawer Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#B8860B] text-[#18181B] font-bold text-xs transition-all shadow-lg"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>السلة</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#064E3B] text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-lg bg-[#D4AF37] text-[#18181B] font-bold"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#064E3B] text-white text-[9px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#27272A] border border-slate-700 text-slate-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Search Bar Row */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="ابحث عن عقارات، ألعاب، أو قوالب..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#27272A] text-slate-100 placeholder-slate-400 text-xs rounded-xl py-2 pr-9 pl-3 border border-[#D4AF37]/30 focus:outline-none"
            />
            <Search className="w-4 h-4 text-[#D4AF37] absolute right-3 top-2.5" />
          </div>
        </div>

      </div>
    </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#18181B] border-b border-[#D4AF37]/30 px-4 py-4 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs text-slate-400">العملة المفضلة:</span>
            <div className="flex gap-1">
              {(['SAR', 'AED', 'USD'] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-2 py-1 rounded text-xs font-bold ${
                    currency === c ? 'bg-[#059669] text-white' : 'bg-[#27272A] text-slate-300'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAiAdvisor(); }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-gradient-to-r from-[#059669] to-[#047857] text-white text-xs font-bold"
            >
              <Sparkles className="w-4 h-4 text-[#FAD961]" />
              <span>المساعد الذكي VIP</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenVideoStudio) onOpenVideoStudio();
                else window.dispatchEvent(new CustomEvent('open-video-studio', { detail: '' }));
              }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-gradient-to-r from-emerald-950/80 to-[#18181B] border border-[#D4AF37]/50 text-[#FAD961] text-xs font-bold"
            >
              <Video className="w-4 h-4" />
              <span>فيديو 15 دقيقة (AI)</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenPropertySubmit(); }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#FAD961] text-xs font-bold"
            >
              <PlusCircle className="w-4 h-4" />
              <span>عرض عقارك</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onScrollToSitemap) onScrollToSitemap();
                else onOpenLegalTab('sitemap');
              }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold"
            >
              <Compass className="w-4 h-4 text-[#FAD961]" />
              <span>خريطة الموقع (37)</span>
            </button>
          </div>

          <div className="grid grid-cols-4 gap-1 pt-2 border-t border-white/10 text-center">
            <button
              onClick={() => { setMobileMenuOpen(false); if (onScrollToBlog) onScrollToBlog(); }}
              className="flex flex-col items-center gap-1 text-[11px] text-slate-300 hover:text-white"
            >
              <BookOpen className="w-4 h-4 text-[#FAD961]" />
              <span>المدونة ({MOCK_BLOG_POSTS.length})</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onScrollToSitemap) onScrollToSitemap();
                else onOpenLegalTab('sitemap');
              }}
              className="flex flex-col items-center gap-1 text-[11px] text-[#FAD961] font-bold"
            >
              <Compass className="w-4 h-4 text-[#D4AF37]" />
              <span>الخريطة (37)</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenFavorites(); }}
              className="flex flex-col items-center gap-1 text-[11px] text-slate-300"
            >
              <Heart className="w-4 h-4 text-[#D4AF37]" />
              <span>المفضلة ({favoritesCount})</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenLegalTab('contact'); }}
              className="flex flex-col items-center gap-1 text-[11px] text-slate-300"
            >
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>اتصل بنا</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
