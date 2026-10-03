import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, RefreshCw, Crown } from 'lucide-react';

interface AiRoyalAdvisorModalProps {
  onClose: () => void;
}

interface ChatMessage {
  sender: 'ai' | 'user';
  text: string;
}

export const AiRoyalAdvisorModal: React.FC<AiRoyalAdvisorModalProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: 'أهلاً بك في منصة عقارات النخبة والمتجر الرقمي! أنا مستشارك الملكي الذكي، كيف أستطيع خدمتك اليوم؟ يمكنك سؤالي عن التمويل العقاري، ترشيحات الفلل والقصور، ألعاب الجمعات، أو قوالب كانفا والمخططات.'
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (customText?: string) => {
    const promptToSend = customText || inputPrompt;
    if (!promptToSend.trim() || loading) return;

    // Append user message
    const newMessages: ChatMessage[] = [...messages, { sender: 'user', text: promptToSend }];
    setMessages(newMessages);
    if (!customText) setInputPrompt('');
    setLoading(true);

    try {
      const response = await fetch('/api/gemini/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptToSend }),
      });

      const data = await response.json();
      const replyText = data.reply || 'يسعدني تقديم أرقى النصائح والترشيحات لك دائماً.';

      setMessages((prev) => [...prev, { sender: 'ai', text: replyText }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'يسعدني إجابتك! يمكنك استعراض حاسبة التمويل العقاري الذكية أو اختيار أي منتج من قائمة العرض لمشاهدة التفاصيل المعتمدة مباشرة.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] border-2 border-[#D4AF37] rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[620px]">
        
        {/* Header Bar */}
        <div className="bg-[#18181B] text-white p-5 border-b border-[#D4AF37]/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#059669] via-[#047857] to-[#D4AF37] p-0.5 shadow-md">
              <div className="w-full h-full bg-[#18181B] rounded-[10px] flex items-center justify-center">
                <Crown className="w-5 h-5 text-[#FAD961]" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold font-serif-arabic text-[#FAD961] flex items-center gap-1.5">
                المساعد الملكي الذكي (AI Advisor)
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </h3>
              <p className="text-[11px] text-slate-300">
                مدعوم بالذكاء الاصطناعي لخدمة عملاء النخبة والمتجر الرقمي
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

        {/* Chat Stream Body */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  msg.sender === 'user'
                    ? 'bg-[#D4AF37] text-[#18181B]'
                    : 'bg-[#059669] text-white'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-[#18181B] text-white rounded-tl-none border border-[#D4AF37]/30'
                    : 'bg-white text-slate-800 rounded-tr-none border border-slate-200'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 font-bold p-2">
              <RefreshCw className="w-4 h-4 text-[#059669] animate-spin" />
              <span>جاري صياغة الإجابة الملكية...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-emerald-50/60 border-t border-slate-200 flex items-center gap-2 overflow-x-auto text-[11px] shrink-0">
          <span className="text-slate-500 font-bold shrink-0">مقترحات:</span>
          <button
            onClick={() => handleSendMessage('ما هي أفضل طريقة لحساب القسط الشهري للفيلا؟')}
            className="px-2.5 py-1 rounded-lg bg-white border border-[#D4AF37]/40 text-[#064E3B] font-medium shrink-0 hover:bg-[#D4AF37]/10"
          >
            حساب القسط الشهري
          </button>
          <button
            onClick={() => handleSendMessage('ما هي أفضل حزمة ألعاب للجمعات العائلية؟')}
            className="px-2.5 py-1 rounded-lg bg-white border border-[#D4AF37]/40 text-[#064E3B] font-medium shrink-0 hover:bg-[#D4AF37]/10"
          >
            أفضل ألعاب الجمعات
          </button>
          <button
            onClick={() => handleSendMessage('كيف أحصل على قوالب كانفا باللون الزمردي؟')}
            className="px-2.5 py-1 rounded-lg bg-white border border-[#D4AF37]/40 text-[#064E3B] font-medium shrink-0 hover:bg-[#D4AF37]/10"
          >
            قوالب كانفا الملكية
          </button>
        </div>

        {/* Chat Input Field */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0">
          <input
            type="text"
            placeholder="اكتب استفسارك العقاري أو الرقمي هنا..."
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 bg-[#FAF8F5] text-slate-900 placeholder-slate-400 text-xs sm:text-sm rounded-xl py-3 px-4 border border-[#D4AF37]/40 focus:outline-none focus:ring-2 focus:ring-[#059669]"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={loading || !inputPrompt.trim()}
            className="p-3 rounded-xl bg-gradient-to-r from-[#059669] to-[#047857] text-white font-bold disabled:opacity-50 hover:brightness-110 transition-all shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
