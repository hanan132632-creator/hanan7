import React, { useState } from 'react';
import { CartItem, Currency } from '../types';
import { formatPrice } from '../utils/formatters';
import { X, CheckCircle2, Download, Printer, ShieldCheck, Crown, FileText, Building2 } from 'lucide-react';

interface CheckoutModalProps {
  cart: CartItem[];
  currency: Currency;
  onClose: () => void;
  onSuccessOrder: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  cart,
  currency,
  onClose,
  onSuccessOrder,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    paymentMethod: 'mada',
  });

  const orderNumber = `ROYAL-${Math.floor(100000 + Math.random() * 900000)}`;

  const totalSAR = cart.reduce((acc, item) => {
    const p = item.product.discountPriceSAR || item.product.priceSAR;
    return acc + p * item.quantity;
  }, 0);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.email) return;
    setStep('success');
  };

  const handleFinish = () => {
    onSuccessOrder();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#FAF8F5] border-2 border-[#D4AF37] rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-[#18181B] text-white p-5 border-b border-[#D4AF37]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-base font-bold font-serif-arabic text-[#FAD961]">
              {step === 'form' ? 'إتمام الشراء والدفع الآمن' : 'الفاتورة والتنزيل المباشر VIP'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#27272A] hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmitOrder} className="p-6 space-y-5">
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-800 border-b border-slate-200 pb-1">
                بيانات المشتري الرسمية:
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">الاسم الكريم كامل:</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: م. عبد الله العتيبي"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl py-2.5 px-3 text-xs focus:ring-2 focus:ring-[#059669] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">رقم الجوال (الواتساب):</label>
                  <input
                    type="tel"
                    required
                    placeholder="05XXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl py-2.5 px-3 text-xs focus:ring-2 focus:ring-[#059669] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">البريد الإلكتروني:</label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl py-2.5 px-3 text-xs focus:ring-2 focus:ring-[#059669] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800">طريقة الدفع المفضل:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'mada', label: 'مدى (Mada)' },
                  { id: 'apple', label: 'Apple Pay' },
                  { id: 'visa', label: 'فيزا / ماستركارد' },
                ].map((p) => (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => setFormData({ ...formData, paymentMethod: p.id })}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                      formData.paymentMethod === p.id
                        ? 'bg-[#059669] text-white border-emerald-600'
                        : 'bg-white text-slate-700 border-slate-300'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Total Order Summary */}
            <div className="p-4 rounded-xl bg-[#18181B] text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block">إجمالي الفاتورة النهائية:</span>
                <span className="text-xl font-black text-[#FAD961] font-serif-arabic">
                  {formatPrice(totalTotalSAR(cart), currency)}
                </span>
              </div>
              <span className="text-xs text-emerald-400 font-bold bg-[#059669]/20 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
                تأكيد ودفع آمن
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#059669] to-[#047857] text-white font-bold text-xs shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#FAD961]" />
              <span>إتمام الدفع واستلام الفاتورة والروابط مباشرة</span>
            </button>
          </form>
        ) : (
          /* Success Invoice & Download Screen */
          <div className="p-6 space-y-6 text-center">
            
            <div className="w-16 h-16 rounded-full bg-[#059669]/10 border-2 border-[#059669] flex items-center justify-center mx-auto text-[#059669]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs text-emerald-700 font-bold block">تم إتمام الطلب الملكي بنجاح!</span>
              <h3 className="text-xl font-black text-slate-900 font-serif-arabic mt-1">
                رقم الفاتورة المعتمد: {orderNumber}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                تم إرسال نسخة الفاتورة والعقود إلى البريد الإلكتروني: {formData.email}
              </p>
            </div>

            {/* Instant File Download Box for Digital Goods */}
            <div className="p-4 rounded-2xl bg-white border border-[#D4AF37]/50 space-y-3 text-right">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-200 pb-2">
                <FileText className="w-4 h-4 text-[#059669]" />
                المنتجات الجاهزة للتنزيل والمعاينة الفورية:
              </h4>

              <div className="space-y-2 max-h-40 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between text-xs p-2 rounded-lg bg-[#FAF8F5]">
                    <span className="font-bold text-slate-800 line-clamp-1">{item.product.title}</span>
                    <button
                      onClick={() => alert(`جاري تنزيل ملفات ${item.product.title} المعتمدة...`)}
                      className="px-3 py-1 rounded-lg bg-[#059669] text-white font-bold text-[10px] flex items-center gap-1 hover:brightness-110"
                    >
                      <Download className="w-3 h-3" />
                      <span>تنزيل فوري</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-300"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة الفاتورة</span>
              </button>

              <button
                onClick={handleFinish}
                className="px-6 py-2 rounded-xl bg-[#18181B] text-[#D4AF37] text-xs font-bold hover:bg-[#27272A]"
              >
                إغلاق والعودة للموقع
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

function totalTotalSAR(cart: CartItem[]): number {
  return cart.reduce((acc, item) => {
    const p = item.product.discountPriceSAR || item.product.priceSAR;
    return acc + p * item.quantity;
  }, 0);
}
