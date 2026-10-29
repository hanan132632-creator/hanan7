/**
 * Free Game Download and Short URL Helper for American Style Party Game 2026
 */

export const SHORT_GAME_URL = 'https://hanan.pro/game';
export const SHORT_ARTICLE_URL = 'https://hanan.pro/usa';

export function downloadFreeAmericanPartyGame() {
  const htmlContent = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>لعبة السهرة الملكية بأسلوب أمريكي 2026 - النسخة الكاملة المجانية</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Cairo', sans-serif;
      background: #0f172a;
      color: #f8fafc;
      padding: 24px;
      line-height: 1.6;
    }
    .header {
      text-align: center;
      padding: 32px 20px;
      background: linear-gradient(135deg, #064E3B 0%, #1e293b 100%);
      border: 2px solid #D4AF37;
      border-radius: 24px;
      margin-bottom: 28px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }
    .badge {
      display: inline-block;
      background: #D4AF37;
      color: #0f172a;
      font-weight: 900;
      padding: 6px 16px;
      border-radius: 50px;
      font-size: 13px;
      margin-bottom: 12px;
      text-transform: uppercase;
    }
    h1 { font-size: 26px; color: #FAD961; margin-bottom: 8px; }
    p.sub { font-size: 14px; color: #cbd5e1; }
    .rules-box {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 18px;
      padding: 20px;
      margin-bottom: 28px;
    }
    .rules-box h2 { color: #34d399; font-size: 18px; margin-bottom: 12px; }
    .rules-list { margin-right: 20px; font-size: 14px; color: #e2e8f0; }
    .rules-list li { margin-bottom: 8px; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
    }
    .card {
      background: #1e293b;
      border: 1px solid #D4AF37;
      border-radius: 16px;
      padding: 18px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: transform 0.2s;
      page-break-inside: avoid;
    }
    .card-tag {
      font-size: 11px;
      font-weight: 700;
      color: #38bdf8;
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
    }
    .card-title {
      font-size: 16px;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 10px;
    }
    .card-desc {
      font-size: 13px;
      color: #cbd5e1;
      margin-bottom: 12px;
    }
    .card-penalty {
      font-size: 12px;
      color: #f43f5e;
      background: rgba(244, 63, 94, 0.1);
      padding: 6px 10px;
      border-radius: 8px;
      border: 1px dashed #f43f5e;
      font-weight: 600;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      padding: 20px;
      border-top: 1px solid #334155;
      font-size: 13px;
      color: #94a3b8;
    }
    @media print {
      body { background: #ffffff; color: #000000; padding: 10px; }
      .header, .rules-box, .card { background: #ffffff !important; color: #000000 !important; border: 1px solid #000000 !important; }
      .card-title, .card-desc, .rules-box h2 { color: #000000 !important; }
      .card-penalty { background: #f1f5f9 !important; color: #000000 !important; }
      .no-print { display: none; }
    }
    .btn-print {
      background: #059669;
      color: #ffffff;
      border: none;
      padding: 12px 24px;
      font-family: inherit;
      font-weight: 700;
      font-size: 15px;
      border-radius: 12px;
      cursor: pointer;
      margin: 15px 0;
      box-shadow: 0 4px 12px rgba(5,150,105,0.4);
    }
  </style>
</head>
<body>

  <div class="header">
    <span class="badge">🎁 هدية مجانية 100% لجمعات 2026</span>
    <h1>لعبة السهرة الملكية بأسلوب أمريكي 2026</h1>
    <p class="sub">مستوحاة من أشهر ألعاب التحديات والمواقف الأمريكية (USA Party Games & Trivia) - جاهزة للعب الفوري أو الطباعة</p>
    <div class="no-print">
      <button class="btn-print" onclick="window.print()">🖨️ طباعة بطاقات اللعبة (Print Cards / PDF)</button>
    </div>
  </div>

  <div class="rules-box">
    <h2>🎯 طريقة اللعب وقواعد السهرة الملكية (30 ثانية لكل دور):</h2>
    <ol class="rules-list">
      <li><strong>تقسيم الفرق:</strong> يتم تقسيم الحضور إلى فريقين (فريق الذهب ضد فريق الزمرد).</li>
      <li><strong>مؤقت التحدي:</strong> يفتح أي لاعب مؤقت الجوال على 45 ثانية عند سحب الكارت.</li>
      <li><strong>الهدف:</strong> الإجابة أو تنفيذ التحدي قبل انتهاء الوقت للحصول على نقطة الفريق.</li>
      <li><strong>العقوبة:</strong> في حال الفشل أو التردد لأكثر من 5 ثوانٍ، يطبق الحكم العقوبة المكتوبة بالكارت!</li>
    </ol>
  </div>

  <div class="grid">
    <!-- Cards Set 1: Rapid Fire / Minute to Win it -->
    <div class="card">
      <div class="card-tag"><span>تحدي المواقف السريعة</span><span>#01</span></div>
      <div class="card-title">اذكر 5 أشياء باللون الذهبي في 10 ثوانٍ!</div>
      <div class="card-desc">يجب أن تذكر 5 أشياء حقيقية موجودة في الحياة باللون الذهبي الخالص دون تكرار ودون توقف.</div>
      <div class="card-penalty">العقوبة: غناء مقطع لأغنية شعبية بصوت مرتفع!</div>
    </div>

    <div class="card">
      <div class="card-tag"><span>تحدي تمثيل صامت (Charades)</span><span>#02</span></div>
      <div class="card-title">مثّل دور "ملياردير اشترى جزيرة خاصة"</div>
      <div class="card-desc">بدون نطق حرف واحد، مثّل لفريقك المشهد وعليهم التخمين خلال 30 ثانية فقط!</div>
      <div class="card-penalty">العقوبة: الوقوف كالتمثال لدقيقة كاملة.</div>
    </div>

    <div class="card">
      <div class="card-tag"><span>تحدي الكلمات الممنوعة (Taboo)</span><span>#03</span></div>
      <div class="card-title">اشرح كلمة "طائرة خاصة" لفريقك</div>
      <div class="card-desc">ممنوع نطق الكلمات التالية: (طيران - جناح - مطار - سماء - سفر).</div>
      <div class="card-penalty">العقوبة: تقليد صوت جرس الباب 3 مرات.</div>
    </div>

    <div class="card">
      <div class="card-tag"><span>تحدي الذاكرة وسرعة البديهة</span><span>#04</span></div>
      <div class="card-title">اذكر 4 عواصم خليجية وعالمية تبدأ بحرف الراء</div>
      <div class="card-desc">الوقت المتاح 15 ثانية فقط دون الاستعانة بالإنترنت!</div>
      <div class="card-penalty">العقوبة: شرب نصف كأس ماء مثلج دفعة واحدة.</div>
    </div>

    <div class="card">
      <div class="card-tag"><span>أسئلة الصراحة والمفارقات (Would You Rather)</span><span>#05</span></div>
      <div class="card-title">لو خُيرت بين: فيلا بحي حطين أو بنتهاوس ببرج خليفة؟</div>
      <div class="card-desc">يجب أن تختار خياراً واحداً مع إعطاء 3 أسباب مقنعة في 20 ثانية، ويصوت المجلس على إقناعك!</div>
      <div class="card-penalty">العقوبة: إهداء الكارت للاعب المنافس.</div>
    </div>

    <div class="card">
      <div class="card-tag"><span>تحدي الـ 60 ثانية الأمريكي</span><span>#06</span></div>
      <div class="card-title">تحدي النطق السريع (Tongue Twisters)</div>
      <div class="card-desc">ردد جملة "خيط حرير على حيط خليل" 5 مرات متتالية بأقصى سرعة دون أي تلعثم!</div>
      <div class="card-penalty">العقوبة: التحدث باللغة الفصحى لبقية السهرة.</div>
    </div>

    <div class="card">
      <div class="card-tag"><span>تحدي الذكاء العقاري والمالي</span><span>#07</span></div>
      <div class="card-title">ما هو اختصار REITs العقاري؟</div>
      <div class="card-desc">سؤال تريفيا أمريكي ذكي: اشرح باختصار فائدة صناديق الريت في كلمة واحدة!</div>
      <div class="card-penalty">العقوبة: تقديم الضيافة والشاي للفريق المنافس.</div>
    </div>

    <div class="card">
      <div class="card-tag"><span>تحدي التمثيل الفوري والمواقف</span><span>#08</span></div>
      <div class="card-title">مثّل دور "وسيط عقاري يبيع قصر بـ 50 مليون"</div>
      <div class="card-desc">تكلم لمدة 30 ثانية بأفخم أسلوب مقنع لبيع خيمة أو قلم موجود بالغرفة كأنه قصر أثري!</div>
      <div class="card-penalty">العقوبة: إعطاء نقطتين للفريق المنافس.</div>
    </div>
  </div>

  <div class="footer">
    <p>تم تصميم هذه النسخة المجانية كهدية سهرات 2026 من منصة <strong>عقارات النخبة</strong> (https://hanan.pro)</p>
    <p>رابط المشاركة المباشر السريع: <a href="https://hanan.pro/game" style="color:#D4AF37;">https://hanan.pro/game</a></p>
  </div>

</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'لعبة_السهرة_الملكية_الأمريكية_2026_مجاناً.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
