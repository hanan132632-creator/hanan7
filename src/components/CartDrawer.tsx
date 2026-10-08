import React, { useState } from 'react';
import { CartItem, Currency } from '../types';
import { formatPrice } from '../utils/formatters';
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowLeft, Tag, ShieldCheck } from 'lucide-react';

interface CartDrawerProps {
  cart: CartItem[];
  currency: Currency;
  onClose: () => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: (discountCode?: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  cart,
  currency,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [coupon, setCoupon] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0); // e.g. 0.1 for 10%
  const [couponMsg, setCouponMsg] = useState('');

  const subtotalSAR = cart.reduce((acc, item) => {
    const p = item.product.discountPriceSAR || item.product.priceSAR;
    return acc + p * item.quantity;
  }, 0);

  const discountAmountSAR = subtotalSAR * appliedDiscount;
  const finalTotalSAR = subtotalSAR - discountAmountSAR;

  const handleApplyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'HANAN10' || coupon.trim().toUpperCase() === 'ROYAL VIP') {
      setAppliedDiscount(0.1);
      setCouponMsg('تم تطبيق الخصم الملكي 10% بنجاح! ✨');
    } else {
      setCouponMsg('كود غير فعال. جرب الكود الملكي: HANAN10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col border-r border-[#D4AF37]/40 animate-in slide-in-from-left duration-300">
        
        {/* Header */}
        <div className="bg-[#18181B] text-white p-5 border-b border-[#D4AF37]/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-base font-bold font-serif-arabic text-[#FAD961]">
              سلة المشتريات الملكية ({cart.length})
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#27272A] hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3 text-slate-500">
              <ShoppingCart className="w-12 h-12 text-slate-300 mx-auto stroke-1" />
              <p className="text-xs font-bold">سلتك فارغة حالياً</p>
              <p className="text-[11px]">تصفح عقارات النخبة وأضف طلباتك الفاخرة.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3"
              >
                <img
                  src={item.product.imageUrl}
                  alt={item.product.title}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#D4AF37]/30"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate font-serif-arabic">
                    {item.product.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 block">
                    {item.product.categoryLabel}
                  </span>
                  <span className="text-xs font-black text-[#064E3B] font-serif-arabic block mt-0.5">
                    {formatPrice(item.product.discountPriceSAR || item.product.priceSAR, currency)}
                  </span>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="text-slate-400 hover:text-rose-600 transition-colors"
                    title="حذف"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-1.5 bg-[#FAF8F5] border border-slate-200 rounded-lg p-1 text-xs">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, -1)}
                      className="p-0.5 rounded hover:bg-slate-200 text-slate-700"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-bold text-slate-900 px-1">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, 1)}
                      className="p-0.5 rounded hover:bg-slate-200 text-slate-700"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Coupon & Summary Footer */}
        {cart.length > 0 && (
          <div className="p-4 bg-white border-t border-slate-200 space-y-3 shrink-0">
            
            {/* Coupon Code Input */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="كود الخصم (جرّب: HANAN10)"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 bg-[#FAF8F5] text-xs py-2 px-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#059669]"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="px-3 py-2 bg-[#18181B] text-[#D4AF37] hover:bg-[#27272A] rounded-xl text-xs font-bold transition-all"
                >
                  تطبيق
                </button>
              </div>
              {couponMsg && (
                <p className="text-[10px] text-emerald-700 font-bold">{couponMsg}</p>
              )}
            </div>

            {/* Calculations Summary */}
            <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex justify-between">
                <span>المجموع الفرعي:</span>
                <span className="font-bold text-slate-900">{formatPrice(subtotalSAR, currency)}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>خصم كود (10%):</span>
                  <span>- {formatPrice(discountAmountSAR, currency)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-black text-slate-900 pt-1 border-t border-slate-200 font-serif-arabic">
                <span>الإجمالي الكلي:</span>
                <span className="text-[#064E3B] text-lg">{formatPrice(finalTotalSAR, currency)}</span>
              </div>
            </div>

            <button
              onClick={() => onProceedToCheckout(coupon)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#059669] via-[#047857] to-[#064E3B] text-white font-bold text-xs shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <span>متابعة إتمام الدفع والتنزيل الفوري</span>
              <ArrowLeft className="w-4 h-4 text-[#FAD961]" />
            </button>

            <span className="text-[10px] text-slate-400 flex items-center justify-center gap-1 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
              دفع مالي مشفر وآمن 100% مع ضمان الفاتورة الرسمية.
            </span>

          </div>
        )}

      </div>
    </div>
  );
};
