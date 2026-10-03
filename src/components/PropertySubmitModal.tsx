import React, { useState } from 'react';
import { X, Building2, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

interface PropertySubmitModalProps {
  onClose: () => void;
}

export const PropertySubmitModal: React.FC<PropertySubmitModalProps> = ({ onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    ownerName: '',
    phone: '',
    city: 'الرياض',
    propertyType: 'فيلا فاخرة',
    askingPrice: '',
    details: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#FAF8F5] border-2 border-[#D4AF37] rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#18181B] text-white p-5 border-b border-[#D4AF37]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-base font-bold font-serif-arabic text-[#FAD961]">
              عرض عقارك المباشر مع عقارات النخبة
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#27272A] hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <p className="text-xs text-slate-600">
              أدخل بيانات عقارك وسيتم معاينته وتوثيقه بواسطة خبراء عقارات النخبة وعرضه مباشرة للعملاء والمستثمرين.
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">اسم المالك / الوكيل المعتمد:</label>
              <input
                type="text"
                required
                placeholder="الاسم الثلاثي"
                value={formData.ownerName}
                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-[#059669] outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">رقم التواصل (واتساب):</label>
                <input
                  type="tel"
                  required
                  placeholder="05XXXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-[#059669] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">المدينة / الحي:</label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-[#059669] outline-none"
                >
                  <option value="الرياض">الرياض</option>
                  <option value="دبي">دبي</option>
                  <option value="جدة">جدة</option>
                  <option value="الخبر">الخبر</option>
                  <option value="أخرى">مدينة أخرى</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">نوع العقار:</label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-[#059669] outline-none"
                >
                  <option value="فيلا فاخرة">فيلا فاخرة / قصر</option>
                  <option value="بنتهاوس">بنتهاوس / شقة VIP</option>
                  <option value="أرض استثمارية">أرض استثمارية</option>
                  <option value="مبنى تجاري">مبنى تجاري</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">السعر المطلوب (ر.س):</label>
                <input
                  type="text"
                  placeholder="مثال: 12,500,000"
                  value={formData.askingPrice}
                  onChange={(e) => setFormData({ ...formData, askingPrice: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-[#059669] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">تفاصيل إضافية ومساحة البناء:</label>
              <textarea
                rows={3}
                placeholder="اذكر أهم المميزات المعمارية ورقم الرخصة العقارية إن وجدت..."
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-[#059669] outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#059669] to-[#047857] text-white font-bold text-xs shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-[#FAD961]" />
              <span>إرسال طلب العرض للمعاينة والتوثيق</span>
            </button>
          </form>
        ) : (
          <div className="p-8 space-y-4 text-center">
            <CheckCircle2 className="w-12 h-12 text-[#059669] mx-auto" />
            <h3 className="text-lg font-bold text-slate-900 font-serif-arabic">
              تم استلام بيانات عقارك بنجاح!
            </h3>
            <p className="text-xs text-slate-600">
              سيقوم مستشار عقارات النخبة بالتواصل معك مباشرة عبر الهاتف للبدء في المعاينة والتصوير ثلاثي الأبعاد 3D.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-[#18181B] text-[#D4AF37] text-xs font-bold"
            >
              تم
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
