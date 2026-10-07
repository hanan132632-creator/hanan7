import React from 'react';
import { ProductItem, Currency } from '../types';
import { formatPrice } from '../utils/formatters';
import { 
  Eye, 
  ShoppingCart, 
  Heart, 
  Calculator, 
  Star, 
  Download, 
  Building2, 
  Sparkles,
  BedDouble,
  Maximize2,
  FileCheck
} from 'lucide-react';

interface ProductCardProps {
  product: ProductItem;
  currency: Currency;
  isFavorite: boolean;
  onToggleFavorite: (product: ProductItem) => void;
  onAddToCart: (product: ProductItem) => void;
  onQuickView: (product: ProductItem) => void;
  onCalculateMortgage?: (product: ProductItem) => void;
  onDirectBuy: (product: ProductItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onQuickView,
  onCalculateMortgage,
  onDirectBuy,
}) => {
  const isRealEstate = product.category === 'real_estate';

  return (
    <div id={product.id} className="group relative rounded-3xl bg-white border border-[#D4AF37]/30 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full hover:-translate-y-1 scroll-mt-24">
      
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#18181B]">
        <img
          src={product.imageUrl}
          alt={product.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Top Badges & Favorite Toggle */}
        <div className="absolute top-3 right-3 left-3 flex items-center justify-between z-10">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#18181B]/90 text-[#FAD961] border border-[#D4AF37]/40 backdrop-blur-md shadow-md flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            {product.badgeText || product.categoryLabel}
          </span>

          <button
            onClick={() => onToggleFavorite(product)}
            className={`p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
              isFavorite 
                ? 'bg-[#059669] text-white scale-110' 
                : 'bg-[#18181B]/70 text-slate-300 hover:text-white border border-white/20'
            }`}
            title="حفظ في المفضلة"
          >
            <Heart className="w-4 h-4 fill-current" />
          </button>
        </div>

        {/* Floating Quick Stats on Image for Real Estate */}
        {isRealEstate && product.propertyDetails && (
          <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-white text-[11px] font-medium bg-[#18181B]/80 backdrop-blur-md p-2 rounded-xl border border-white/10">
            <span className="flex items-center gap-1">
              <Maximize2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              {product.propertyDetails.areaSqM} م²
            </span>
            <span className="flex items-center gap-1">
              <BedDouble className="w-3.5 h-3.5 text-emerald-400" />
              {product.propertyDetails.bedrooms} غرف
            </span>
            <span className="flex items-center gap-1 text-[#FAD961]">
              <Building2 className="w-3.5 h-3.5" />
              {product.propertyDetails.city}
            </span>
          </div>
        )}

        {/* Digital Product Format Badge */}
        {!isRealEstate && product.digitalDetails && (
          <div className="absolute bottom-3 right-3 text-white text-[10px] font-bold bg-[#059669]/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-emerald-400/40 flex items-center gap-1">
            <FileCheck className="w-3 h-3 text-[#FAD961]" />
            <span>تنزيل فوري {product.digitalDetails.fileFormat.split(' ')[0]}</span>
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          {/* Unboxed Metadata Header */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
            <span className="text-[#059669] font-bold">{product.categoryLabel}</span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-bold text-slate-800">{product.rating}</span>
              <span className="text-slate-400 text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title & Subtitle */}
          <h3 className="text-base font-bold text-slate-900 group-hover:text-[#059669] transition-colors font-serif-arabic line-clamp-1">
            {product.title}
          </h3>
          <p className="text-slate-600 text-xs line-clamp-2 mt-1 leading-relaxed">
            {product.subtitle}
          </p>
        </div>

        {/* Features Bullet Preview */}
        <div className="space-y-1 bg-[#FAF8F5] p-2.5 rounded-xl border border-slate-200/80 text-[11px] text-slate-700">
          {product.features.slice(0, 2).map((feat, idx) => (
            <div key={idx} className="flex items-center gap-1.5 line-clamp-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669] shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>

        {/* Pricing Block */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">السعر الملكي:</span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-[#064E3B] font-serif-arabic">
                {formatPrice(product.discountPriceSAR || product.priceSAR, currency)}
              </span>
              {product.discountPriceSAR && (
                <span className="text-xs text-slate-400 line-through">
                  {formatPrice(product.priceSAR, currency)}
                </span>
              )}
            </div>
          </div>

          {/* Real Estate Mortgage Trigger */}
          {isRealEstate && onCalculateMortgage && (
            <button
              onClick={() => onCalculateMortgage(product)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#18181B] text-[#D4AF37] hover:bg-[#27272A] border border-[#D4AF37]/40 text-[11px] font-bold transition-all"
              title="حاسبة التمويل العقاري"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>تمويل</span>
            </button>
          )}
        </div>

        {/* Interactive Action Buttons */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <button
            onClick={() => onQuickView(product)}
            className="flex items-center justify-center gap-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-slate-600" />
            <span>معاينة</span>
          </button>

          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center justify-center gap-1 py-2 rounded-xl bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#064E3B] border border-[#D4AF37]/40 text-xs font-bold transition-colors"
            title="إضافة للسلة"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>السلة</span>
          </button>

          <button
            onClick={() => onDirectBuy(product)}
            className="flex items-center justify-center gap-1 py-2 rounded-xl bg-gradient-to-r from-[#059669] to-[#047857] hover:brightness-110 text-white text-xs font-bold shadow-md transition-all"
          >
            {isRealEstate ? (
              <>
                <Building2 className="w-3.5 h-3.5 text-[#FAD961]" />
                <span>حجز</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-[#FAD961]" />
                <span>شراء</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
