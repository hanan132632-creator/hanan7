import React, { useState } from 'react';
import { ProductItem, Currency } from '../types';
import { formatPrice } from '../utils/formatters';
import { Calculator, X, Building2, Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface MortgageCalculatorModalProps {
  product?: ProductItem | null;
  currency: Currency;
  onClose: () => void;
  onRequestConsultation: (propertyTitle: string, monthlyPay: string) => void;
}

export const MortgageCalculatorModal: React.FC<MortgageCalculatorModalProps> = ({
  product,
  currency,
  onClose,
  onRequestConsultation,
}) => {
  const initialPrice = product ? (product.discountPriceSAR || product.priceSAR) : 5000000;
  
  const [propertyPrice, setPropertyPrice] = useState<number>(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(15); // 15%
  const [tenureYears, setTenureYears] = useState<number>(20); // 20 years
  const [interestRate, setInterestRate] = useState<number>(3.5); // 3.5%

  // Calculation Logic
  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const loanAmount = propertyPrice - downPaymentAmount;
  const totalMonths = tenureYears * 12;
  const monthlyInterestRate = (interestRate / 100) / 12;

  // Monthly Payment formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
  const monthlyPayment = monthlyInterestRate > 0
    ? (loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths))) /
      (Math.pow(1 + monthlyInterestRate, totalMonths) - 1)
    : loanAmount / totalMonths;

  const totalRepayment = downPaymentAmount + (monthlyPayment * totalMonths);
  const totalInterestPaid = totalRepayment - propertyPrice;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] border-2 border-[#D4AF37] rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Header Bar */}
        <div className="bg-[#18181B] text-white p-6 border-b border-[#D4AF37]/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#059669] to-[#064E3B] text-[#FAD961] shadow-lg">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif-arabic text-[#FAD961]">
                حاسبة التمويل العقاري الذكية VIP
              </h2>
              <p className="text-xs text-slate-300">
                {product ? product.title : 'احسب القسط الشهري والدفعة الأولى لعقارك الفاخر'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#27272A] hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          
          {/* Controls Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Property Price Input */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                سعر العقار التقديري:
              </label>
              <div className="relative">
                <input
                  type="number"
                  step={100000}
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Number(e.target.value) || 0)}
                  className="w-full bg-white border border-[#D4AF37]/50 rounded-xl py-2.5 px-3 text-slate-900 font-bold text-sm focus:ring-2 focus:ring-[#059669] outline-none"
                />
                <span className="absolute left-3 top-2.5 text-xs font-bold text-[#059669]">
                  {currency}
                </span>
              </div>
            </div>

            {/* Down Payment Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span>الدفعة الأولى ({downPaymentPercent}%):</span>
                <span className="text-[#059669]">{formatPrice(downPaymentAmount, currency)}</span>
              </div>
              <input
                type="range"
                min={5}
                max={50}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full accent-[#059669] cursor-pointer"
              />
            </div>

            {/* Loan Tenure Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span>مدة التمويل:</span>
                <span className="text-[#064E3B]">{tenureYears} سنة ({totalMonths} شهر)</span>
              </div>
              <input
                type="range"
                min={5}
                max={30}
                step={1}
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full accent-[#059669] cursor-pointer"
              />
            </div>

            {/* Profit Rate Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span>معدل المرابحة التقديري:</span>
                <span className="text-amber-600 font-extrabold">{interestRate}% سنوياً</span>
              </div>
              <input
                type="range"
                min={1}
                max={8}
                step={0.25}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-[#D4AF37] cursor-pointer"
              />
            </div>

          </div>

          {/* Results Visual Breakdown Box */}
          <div className="p-5 rounded-2xl bg-[#18181B] text-white border border-[#D4AF37]/50 shadow-xl space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs text-slate-400 block font-medium">القسط الشهري التقديري:</span>
                <span className="text-2xl font-black text-[#FAD961] font-serif-arabic">
                  {formatPrice(monthlyPayment, currency)} <span className="text-xs text-slate-300">/ شهرياً</span>
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-400 block font-medium">الدفعة الأولى المطلوبة:</span>
                <span className="text-xl font-bold text-emerald-400 font-serif-arabic">
                  {formatPrice(downPaymentAmount, currency)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-300">
              <div>
                <span className="text-slate-400 block">مبلغ التمويل الصافي:</span>
                <span className="font-bold text-white">{formatPrice(loanAmount, currency)}</span>
              </div>
              <div>
                <span className="text-slate-400 block">إجمالي الفوائد/المرابحة:</span>
                <span className="font-bold text-amber-400">{formatPrice(totalInterestPaid, currency)}</span>
              </div>
              <div>
                <span className="text-slate-400 block">إجمالي السداد الكلي:</span>
                <span className="font-bold text-emerald-300">{formatPrice(totalRepayment, currency)}</span>
              </div>
            </div>

            {/* Visual Bar Breakdown */}
            <div className="space-y-1 pt-1">
              <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex">
                <div
                  style={{ width: `${(downPaymentAmount / totalRepayment) * 100}%` }}
                  className="bg-[#D4AF37] h-full"
                  title="الدفعة الأولى"
                />
                <div
                  style={{ width: `${(loanAmount / totalRepayment) * 100}%` }}
                  className="bg-[#059669] h-full"
                  title="مبلغ التمويل"
                />
                <div
                  style={{ width: `${(totalInterestPaid / totalRepayment) * 100}%` }}
                  className="bg-amber-600 h-full"
                  title="المرابحة"
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]" /> الدفعة الأولى
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#059669]" /> التمويل
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-600" /> المرابحة
                </span>
              </div>
            </div>

          </div>

          {/* Action Trigger */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-[#059669]" />
              الحسابات استرشادية وتخضع للموافقة البنكية الرسمية.
            </span>

            <button
              onClick={() => onRequestConsultation(product?.title || 'عقار ملكي', formatPrice(monthlyPayment, currency))}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#059669] to-[#047857] text-white font-bold text-xs shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <Building2 className="w-4 h-4 text-[#FAD961]" />
              <span>طلب استشارة تمويل عقاري VIP</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
