import React, { useState } from 'react';
import { ProductItem, Currency } from '../types';
import { formatPrice } from '../utils/formatters';
import { downloadFreeAmericanPartyGame } from '../utils/freeGameDownload';
import { 
  X, 
  ShoppingCart, 
  Download, 
  Building2, 
  Check, 
  Star, 
  Sparkles, 
  FileText, 
  Layers,
  CheckCircle2,
  Share2
} from 'lucide-react';

interface QuickViewModalProps {
  product: ProductItem | null;
  currency: Currency;
  onClose: () => void;
  onAddToCart: (product: ProductItem) => void;
  onDirectBuy: (product: ProductItem) => void;
  onOpenMortgageCalculator?: (product: ProductItem) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  currency,
  onClose,
  onAddToCart,
  onDirectBuy,
  onOpenMortgageCalculator,
}) => {
  const [copiedShortLink, setCopiedShortLink] = useState(false);

  if (!product) return null;

  const isRealEstate = product.category === 'real_estate';
  const isFreeProduct = product.isFree || product.priceSAR === 0;

  const handleCopyShortLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedShortLink(true);
    setTimeout(() => setCopiedShortLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] border-2 border-[#D4AF37] rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Header Bar */}
        <div className="bg-[#18181B] text-white p-5 border-b border-[#D4AF37]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-base font-bold font-serif-arabic text-[#FAD961]">
              نافذة المعاينة التفاعلية والتنزيل المباشر VIP
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#27272A] hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Asset Media Showcase */}
          <div className="md:col-span-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-xl bg-[#18181B]">
              <img
                src={product.imageUrl}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="w-full h-72 object-cover"
              />
              <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-[#18181B]/90 text-[#FAD961] border border-[#D4AF37]/40 backdrop-blur-md">
                {product.badgeText || product.categoryLabel}
              </span>
            </div>

            {/* Quick Spec Highlights */}
            {isRealEstate && product.propertyDetails && (
              <div className="grid grid-cols-3 gap-2 text-center text-xs p-3 rounded-xl bg-white border border-slate-200">
                <div className="p-2 bg-[#FAF8F5] rounded-lg">
                  <span className="text-slate-400 block text-[10px]">المساحة</span>
                  <span className="font-bold text-slate-900">{product.propertyDetails.areaSqM} م²</span>
                </div>
                <div className="p-2 bg-[#FAF8F5] rounded-lg">
                  <span className="text-slate-400 block text-[10px]">الغرف</span>
                  <span className="font-bold text-slate-900">{product.propertyDetails.bedrooms} غرف نوم</span>
                </div>
                <div className="p-2 bg-[#FAF8F5] rounded-lg">
                  <span className="text-slate-400 block text-[10px]">الموقع</span>
                  <span className="font-bold text-[#059669]">{product.propertyDetails.city}</span>
                </div>
              </div>
            )}

            {!isRealEstate && product.digitalDetails && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                  <span>الملفات جاهزة للتنزيل المباشر الفوري</span>
                </div>
                <p className="text-[11px] text-emerald-700">
                  الصيغة: {product.digitalDetails.fileFormat} ({product.digitalDetails.fileSize})
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Title, Description, Features & Actions */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-6">
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-amber-600 font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>تقييم ملكي {product.rating}</span>
                <span className="text-slate-400">({product.reviewsCount} تقييم)</span>
              </div>

              <h1 className="text-2xl font-black text-slate-900 font-serif-arabic leading-tight">
                {product.title}
              </h1>

              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {product.description}
              </p>

              {/* Features List */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-slate-900 border-b border-slate-200 pb-1">
                  المميزات والمواصفات المعتمدة:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pricing and Action Buttons */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              {isFreeProduct ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="text-xs font-bold text-slate-600">السعر:</span>
                    <span className="text-lg font-black text-[#064E3B] font-serif-arabic flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-[#059669]" />
                      <span>مجاناً 100% (هدية المنصة للجمعات)</span>
                    </span>
                  </div>

                  {/* Short Link Share Box */}
                  <div className="p-3 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-between gap-2 text-xs">
                    <div className="truncate">
                      <span className="text-[10px] text-slate-400 block font-bold">رابط اللعبة المختصر للنشر السريع:</span>
                      <span className="font-mono text-emerald-800 font-bold text-xs select-all">
                        {product.shortUrl || `${window.location.origin}/game`}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopyShortLink(product.shortUrl || `${window.location.origin}/game`)}
                      className="shrink-0 px-3 py-1.5 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#064E3B] font-bold text-xs hover:bg-[#D4AF37]/30 transition-all flex items-center gap-1 cursor-pointer"
                    >
                      {copiedShortLink ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>تم النسخ!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5 text-[#B8860B]" />
                          <span>نسخ الرابط</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Direct Free Download Button */}
                  <button
                    onClick={() => {
                      downloadFreeAmericanPartyGame();
                    }}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#059669] to-[#047857] hover:brightness-110 text-white font-black text-sm shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-5 h-5 text-[#FAD961] animate-pulse" />
                    <span>تنزيل اللعبة مجاناً الآن فوراً (PDF وبطاقات جاهزة)</span>
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-bold text-slate-500">السعر النهائي المعروض:</span>
                    <div className="text-left">
                      <span className="text-2xl font-black text-[#064E3B] font-serif-arabic">
                        {formatPrice(product.discountPriceSAR || product.priceSAR, currency)}
                      </span>
                      {product.discountPriceSAR && (
                        <span className="text-xs text-slate-400 line-through mr-2">
                          {formatPrice(product.priceSAR, currency)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        onAddToCart(product);
                        onClose();
                      }}
                      className="py-3 px-4 rounded-xl bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#064E3B] border border-[#D4AF37]/50 font-bold text-xs transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4 text-[#B8860B]" />
                      <span>إضافة للسلة</span>
                    </button>

                    <button
                      onClick={() => {
                        onDirectBuy(product);
                        onClose();
                      }}
                      className="py-3 px-4 rounded-xl bg-gradient-to-r from-[#059669] to-[#047857] hover:brightness-110 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      {isRealEstate ? (
                        <>
                          <Building2 className="w-4 h-4 text-[#FAD961]" />
                          <span>حجز وعقد ملكي</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 text-[#FAD961]" />
                          <span>شراء وتنزيل مباشر</span>
                        </>
                      )}
                    </button>
                  </div>

                  {isRealEstate && onOpenMortgageCalculator && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenMortgageCalculator(product);
                      }}
                      className="w-full py-2.5 rounded-xl bg-[#18181B] text-[#D4AF37] hover:bg-[#27272A] border border-[#D4AF37]/40 text-xs font-bold transition-all flex items-center justify-center gap-2"
                    >
                      <span>فتح حاسبة التمويل لهذا العقار</span>
                    </button>
                  )}
                </>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
