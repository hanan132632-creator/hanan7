import React from 'react';
import { ProductItem, Currency } from '../types';
import { formatPrice } from '../utils/formatters';
import { X, Heart, ShoppingCart, Trash2, Eye } from 'lucide-react';

interface FavoritesDrawerProps {
  favorites: ProductItem[];
  currency: Currency;
  onClose: () => void;
  onRemoveFavorite: (product: ProductItem) => void;
  onAddToCart: (product: ProductItem) => void;
  onQuickView: (product: ProductItem) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  favorites,
  currency,
  onClose,
  onRemoveFavorite,
  onAddToCart,
  onQuickView,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col border-r border-[#D4AF37]/40 animate-in slide-in-from-left duration-300">
        
        {/* Header */}
        <div className="bg-[#18181B] text-white p-5 border-b border-[#D4AF37]/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#D4AF37] fill-current" />
            <h2 className="text-base font-bold font-serif-arabic text-[#FAD961]">
              قائمة المفضلة الملكية ({favorites.length})
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#27272A] hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Favorites Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {favorites.length === 0 ? (
            <div className="text-center py-16 space-y-3 text-slate-500">
              <Heart className="w-12 h-12 text-slate-300 mx-auto stroke-1" />
              <p className="text-xs font-bold">لم تقم بإضافة أي عنصر للمفضلة بعد</p>
              <p className="text-[11px]">اضغط على أيقونة القلب على أجهزة العقارات والمنتجات لحفظها هنا.</p>
            </div>
          ) : (
            favorites.map((product) => (
              <div
                key={product.id}
                className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3"
              >
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#D4AF37]/30"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate font-serif-arabic">
                    {product.title}
                  </h4>
                  <span className="text-[10px] text-[#059669] font-bold block">
                    {product.categoryLabel}
                  </span>
                  <span className="text-xs font-black text-[#064E3B] font-serif-arabic block mt-0.5">
                    {formatPrice(product.discountPriceSAR || product.priceSAR, currency)}
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => onQuickView(product)}
                    className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
                    title="معاينة"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onAddToCart(product)}
                    className="p-2 rounded-lg bg-[#D4AF37]/20 text-[#064E3B] hover:bg-[#D4AF37]/40"
                    title="إضافة للسلة"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onRemoveFavorite(product)}
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-600"
                    title="إزالة"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
