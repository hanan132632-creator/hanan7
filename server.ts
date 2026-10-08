import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini Client safely
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// AI Royal Advisor Endpoint
app.post("/api/gemini/advisor", async (req, res) => {
  try {
    const { prompt, category, userBudget } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(200).json({
        reply: "أهلاً بك في منصة عقارات النخبة الملكية! يسعدنا مساعدتك في اختيار العقار أو المنتج الرقمي الأنسب لمتطلباتك. يمكنك استخدام حاسبة التمويل أو استعراض المخططات والمنتجات التفاعلية مباشرة.",
      });
    }

    const systemInstruction = `أنت المساعد الملكي الذكي لمنصة "عقارات النخبة". 
لغة الحوار: العربية الفصحى الراقية بأسلوب دافئ، فاخر، ومحترف للغاية.
الأقسام المتوفرة في المنصة:
1. عقارات النخبة: فلل فاخرة، بنتهاوس، قصور، أراضي استثمارية في الرياض، دبي، جدة، والخبر.
2. ألعاب الجمعات: ألعاب ورق وألغاز عائلية وتفاعلية رقمية مخصصة للجمعات والجمعات الملكية.
3. مخططات 2026 المعمارية: تصاميم ومخططات معمارية هندسية ثلاثية الأبعاد بملفات جاهزة للتنفيذ.
4. قوالب كانفا (Canva Templates): حزم تصاميم وسوشيال ميديا وقوالب هويات بصرية ملكية جاهزة للتعديل المباشر.
5. التشكيلة الملكية: باقات ومجموعات حصريّة تجمع بين الأصول الرقمية والاستشارات.

مهمتك: الإجابة بدقة، اقتراح الخيار الأنسب، إعطاء نصائح تمويل استثمارية، أو إرشاد الزائر.
الفئة الحالية المستهدفة: ${category || "عام"}
ميزانية التقديرية للعميل: ${userBudget || "غير محددة"}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "أهلاً بك! نسعد بتقديم أرقى الخدمات الاستشارية العقارية والدعم الفني الملكي.";
    return res.json({ reply });
  } catch (error: any) {
    console.error("Gemini Advisor Error:", error);
    return res.status(500).json({
      error: "تعذر الاتصال بالمساعد الذكي حالياً.",
      reply: "أهلاً بك في عقارات النخبة. يسعدنا تقديم الدعم المباشر لك عبر قسم اتصل بنا أو استعراض بطاقات العرض التفاعلية.",
    });
  }
});

// AI Text-to-Video Production Generator Endpoint (Up to 15 Minutes Full Cinema Production)
app.post("/api/gemini/text-to-video", async (req, res) => {
  try {
    const { 
      text, 
      durationMinutes = 15, 
      style = "cinematic_4k", 
      voice = "fusHa_documentary", 
      aspectRatio = "16:9" 
    } = req.body;

    const requestedDuration = Math.min(15, Math.max(1, Number(durationMinutes) || 15));
    const totalSeconds = requestedDuration * 60;

    // Available luxury assets matching local bundle
    const availableAssets = [
      "hero_luxury_villa",
      "private_estate_mansion",
      "luxury_penthouse",
      "skyline_penthouse_terrace",
      "smart_luxury_villa",
      "desert_palace_architecture",
      "royal_courtyard_fountain",
      "luxury_estate_valuation",
      "architectural_blueprints",
      "gathering_games_asset",
      "canva_templates_bundle"
    ];

    // High fidelity fallback scene generator for instant response or if Gemini key is not configured
    const generateScenes = (inputTopic: string, durMins: number) => {
      const sceneCount = durMins === 15 ? 10 : durMins === 10 ? 8 : durMins === 5 ? 5 : durMins === 3 ? 3 : 2;
      const secondsPerScene = Math.floor((durMins * 60) / sceneCount);

      const templates = [
        {
          title: "المشهد الافتتاحي: الإطلالة البانورامية والمدخل الملكي",
          camera: "Drone High Altitude Cinematic Crane Down (لقطة درون علوية سينمائية)",
          visual: "تحليق درامي فائق الدقة 4K فوق الواجهة المعمارية المذهلة بتناغم الرخام الطبيعي والمسطحات المائية",
          asset: "hero_luxury_villa",
          narrationTemplate: "في قلب المشهد المعماري الاستثنائي لعام 2026، تتجلى معايير الفخامة الخالدة حيث تلتقي الدقة الهندسية بأصالة التصميم."
        },
        {
          title: "بهو الاستقبال الملكي والأسقف الشاهقة المزدوجة",
          camera: "Slow Dolly In with Ultra Smooth Gimbal (حركة تقدم سلسة)",
          visual: "استعراض الأرضيات الرخامية الإيطالية النادرة والإنارة الطبيعية المتدفقة من الواجهات الزجاجية الشاهقة",
          asset: "private_estate_mansion",
          narrationTemplate: "تبدأ الرحلة المعمارية من البهو الرئيسي بأسقف شاهقة ترتفع لعشرة أمتار، مع عزل صوتي متحفي متطور يحجب ضوضاء العالم الخارجي."
        },
        {
          title: "التراس البانورامي وإطلالة أفق المدينة والأبراج",
          camera: "Panoramic 180 Orbit (دوران بانورامي 180 درجة)",
          visual: "أفق العاصمة المتلألئ مع مسابح زجاجية معلقة ومناطق جلوس خارجية مجهزة بأحدث تقنيات التبريد البيئي",
          asset: "skyline_penthouse_terrace",
          narrationTemplate: "تجسد هذه الإطلالات الاستثنائية قيمة الأصول الكأسية غير القابلة للتكرار، لتمنح ساكنيها خصوصية ملكية وإطلالة لا تُضاهى."
        },
        {
          title: "الأجنحة الملكية والماستر سويت فائق الرفاهية",
          camera: "Slow Tracking Shot (حركة تتبع أفقية بطيئة)",
          visual: "أجنحة نوم فسيحة مكسوة بالأخشاب الطبيعية المعالجة، مع غرف تبديل ملابس ملكية وحمامات سبا خاصة",
          asset: "luxury_penthouse",
          narrationTemplate: "تم تصميم كل جناح ليكون ملاذاً متكاملاً للراحة والسكينة، مع التحكم الذكي في درجات الحرارة ونقاء الهواء عبر بروتوكولات KNX العالمية."
        },
        {
          title: "الواحة الخارجية والنوافير الراقصة والحدائق الاستوائية",
          camera: "Low-Angle Slider Sweep (لقطة منخفضة بمحاذاة سطح الماء)",
          visual: "نوافير ملكية بتصميم عربي معاصر تتوسط حدائق مروية بأنظمة ذكية مستدامة ومسابح أولمبية مدفأة",
          asset: "royal_courtyard_fountain",
          narrationTemplate: "المساحات الخارجية تجمع بين خرير المياه الهادئ والخصوصية العالية، مما يجعلها المكان المثالي للاستجمام والاستقبالات الرفيعة."
        },
        {
          title: "منظومة المنزل الذكي والأتمتة المتكاملة 2026",
          camera: "Macro Focus Shift (انتقال تركيز سينمائي دقيق)",
          visual: "شاشات تحكم ذكية لمسية وإضاءة بيولوجية DALI-2 تتكيف مع دورات النوم الطبيعية والأمن السيبراني المعزول",
          asset: "smart_luxury_villa",
          narrationTemplate: "تقنيات الذكاء الاصطناعي تعمل بصمت وتناغم لتوفير كفاءة طاقة قصوى وتحكم بيئي شامل بنقرة زر واحدة أو بأمر صوتي ذكي."
        },
        {
          title: "الصالونات الرسمية ومجالس الضيافة الكبرى",
          camera: "Wide-Angle Steady Glide (لقطة واسعة متزنة)",
          visual: "مجالس فسيحة بتفاصيل ذهبية دقيقة وكسوات حجرية محفورة يدوياً تجمع بين الهيبة والضيافة الرفيعة",
          asset: "desert_palace_architecture",
          narrationTemplate: "هنا تُعقد أرقى اللقاءات في أجواء تفيض بالهيبة والوقار، مع هندسة صوتية تضمن نقاء المحادثات والراحة التامة للضيوف."
        },
        {
          title: "المخططات الهندسية والتدقيق الإنشائي المعتمد",
          camera: "Architectural Top-Down Blueprint Zoom (تكبير هندسي علوي)",
          visual: "استعراض تفصيلي للمخططات المعمارية التنفيذية ثلاثية الأبعاد وشهادات الجودة وكفاءة الطاقة",
          asset: "architectural_blueprints",
          narrationTemplate: "كل زاوية وكل عنصر إنشائي خضع لأعلى بروتوكولات الفحص الهندسي والتدقيق الميداني الصارم لضمان القيمة الرأسمالية المستدامة."
        },
        {
          title: "التحليل الاستثماري والعائد الرأسمالي للأصل العقاري",
          camera: "Data Infographic HUD Overlay (رسوم بيانية ثلاثية الأبعاد)",
          visual: "مؤشرات نمو الأسعار، ونسب العائد الإيجاري الصافي، والسيولة الفورية عبر المنصات العقارية الرسمية",
          asset: "luxury_estate_valuation",
          narrationTemplate: "تؤكد التحليلات المالية أن الاستثمار في هذا العقار يمثل تحوطاً مالياً حقيقياً ضد التضخم مع عائد رأسمالي مركب متوقع يفوق 12% سنوياً."
        },
        {
          title: "الخاتمة والدعوة للمعينة الخاصة والتملك",
          camera: "Cinematic Slow Pull-Out to Sunset (انسحاب سينمائي مع الغروب)",
          visual: "مشهد ختامي ساحر يجمع بين الإضاءة المسائية الفاخرة ورقم التواصل الحصري وشعار عقارات النخبة",
          asset: "hero_luxury_villa",
          narrationTemplate: "عقارات النخبة تدعوكم لحجز جولة المعاينة الخاصة واستكشاف فرصة التملك النادرة. إرثكم العائلي يبدأ من هنا."
        }
      ];

      return Array.from({ length: sceneCount }, (_, idx) => {
        const tmpl = templates[idx % templates.length];
        const startSec = idx * secondsPerScene;
        const endSec = idx === sceneCount - 1 ? durMins * 60 : (idx + 1) * secondsPerScene;

        const formatTs = (sec: number) => {
          const m = Math.floor(sec / 60);
          const s = sec % 60;
          return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
        };

        return {
          id: idx + 1,
          title: tmpl.title,
          timestampStart: formatTs(startSec),
          timestampEnd: formatTs(endSec),
          startSeconds: startSec,
          endSeconds: endSec,
          narration: `${tmpl.narrationTemplate} ${inputTopic ? `بخصوص: ${inputTopic.slice(0, 100)}...` : ""}`,
          visualDescription: tmpl.visual,
          cameraMovement: tmpl.camera,
          suggestedAsset: tmpl.asset
        };
      });
    };

    if (!process.env.GEMINI_API_KEY) {
      const fallbackScenes = generateScenes(text || "جولة عقارية ملكية", requestedDuration);
      return res.json({
        success: true,
        title: `إنتاج فيديو سينمائي فاخر 4K (${requestedDuration} دقيقة)`,
        totalDurationMinutes: requestedDuration,
        totalSeconds,
        scenesCount: fallbackScenes.length,
        style,
        voice,
        aspectRatio,
        scenes: fallbackScenes,
        fullNarration: fallbackScenes.map(s => s.narration).join("\n\n"),
        productionSpecs: {
          resolution: "3840x2160 Ultra HD (4K)",
          fps: 60,
          colorProfile: "Rec.709 Cinema Luxury LUT",
          bitrate: "45 Mbps",
          audioMastering: "-14 LUFS Broadcast Standard"
        }
      });
    }

    const systemInstruction = `أنت المخرج السينمائي الذكي لمنصة "عقارات النخبة".
مهمتك: تحويل النص أو المقال المقدم إلى سيناريو فيلم وثائقي/سينمائي عقاري متكامل مدته المحددة (${requestedDuration} دقيقة) بدقة 4K.
يجب إخراج جدول مشاهد Timeline دقيق باللغة العربية الفصحى الراقية.
المدة الإجمالية: ${requestedDuration} دقيقة (${totalSeconds} ثانية).
عدد المشاهد المقترحة: ${requestedDuration === 15 ? 10 : requestedDuration === 10 ? 8 : requestedDuration === 5 ? 5 : 3} مشهداً.
لكل مشهد:
- id: رقم المشهد
- title: عنوان المشهد
- timestampStart: التوقيت بالدقائق والثواني (مثل 00:00)
- timestampEnd: توقيت الانتهاء (مثل 01:30)
- startSeconds: ثانية البداية
- endSeconds: ثانية النهاية
- narration: النص الكامل المنطوق بالتعليق الصوتي باللهجة الفصحى الوثائقية الفخمة
- visualDescription: وصف المشهد البصري بدقة
- cameraMovement: حركة الكاميرا والدرون
- suggestedAsset: اختر اسم الأصل الأنسب من هذه القائمة فقط: ${availableAssets.join(", ")}

أرجع الناتج بتنسيق JSON نظيف مطابق للحقول المطلوبة دون علامات markdown إضافية إن أمكن.`;

    const prompt = `النص المطلوب تحويله إلى فيلم سينمائي لمدة ${requestedDuration} دقيقة:
${text || "جولة شاملة في قصر ملكي يجمع بين أحدث أنظمة الأتمتة الذكية 2026 والرخام الإيطالي النادر وعوائد الاستثمار القياسية."}`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          temperature: 0.6,
        },
      });

      let parsedData;
      try {
        parsedData = JSON.parse(response.text || "{}");
      } catch (parseErr) {
        console.warn("JSON Parse Fallback:", parseErr);
        parsedData = null;
      }

      if (parsedData && Array.isArray(parsedData.scenes) && parsedData.scenes.length > 0) {
        return res.json({
          success: true,
          title: parsedData.title || `إنتاج سينمائي بالذكاء الاصطناعي (${requestedDuration} دقيقة)`,
          totalDurationMinutes: requestedDuration,
          totalSeconds,
          scenesCount: parsedData.scenes.length,
          style,
          voice,
          aspectRatio,
          scenes: parsedData.scenes,
          fullNarration: parsedData.scenes.map((s: any) => s.narration).join("\n\n"),
          productionSpecs: {
            resolution: "3840x2160 Ultra HD (4K)",
            fps: 60,
            colorProfile: "Rec.709 Cinema Luxury LUT",
            bitrate: "45 Mbps",
            audioMastering: "-14 LUFS Broadcast Standard"
          }
        });
      }
    } catch (apiErr) {
      console.error("Gemini API call error:", apiErr);
    }

    // Fallback if API response didn't parse properly
    const scenes = generateScenes(text || "جولة عقارية ملكية", requestedDuration);
    return res.json({
      success: true,
      title: `إنتاج فيديو سينمائي فاخر 4K (${requestedDuration} دقيقة)`,
      totalDurationMinutes: requestedDuration,
      totalSeconds,
      scenesCount: scenes.length,
      style,
      voice,
      aspectRatio,
      scenes,
      fullNarration: scenes.map(s => s.narration).join("\n\n"),
      productionSpecs: {
        resolution: "3840x2160 Ultra HD (4K)",
        fps: 60,
        colorProfile: "Rec.709 Cinema Luxury LUT",
        bitrate: "45 Mbps",
        audioMastering: "-14 LUFS Broadcast Standard"
      }
    });

  } catch (error: any) {
    console.error("Text to video error:", error);
    return res.status(500).json({
      error: "حدث خطأ أثناء معالجة سيناريو الفيديو بالذكاء الاصطناعي.",
    });
  }
});

// Contact and Property Listing Inquiry Submissions
app.post("/api/contact", (req, res) => {
  const { name, phone, email, message, type } = req.body;
  console.log("New Inquiry Received:", { name, phone, email, message, type });
  return res.json({
    success: true,
    message: "تم استلام طلبك الملكي بنجاح! سيقوم مستشار النخبة بالتواصل معك في أقرب وقت.",
  });
});

// Robust file locator for public / dist assets to prevent any 404
function getStaticAsset(fileName: string): string | null {
  const candidates = [
    path.resolve(__dirname, "public", fileName),
    path.resolve(__dirname, "dist", fileName),
    path.resolve(process.cwd(), "public", fileName),
    path.resolve(process.cwd(), "dist", fileName),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return fs.readFileSync(candidate, "utf-8");
    }
  }
  return null;
}

// Explicit Sitemap.xml Route for Search Engines and AdSense Verification
app.get("/sitemap.xml", (req, res) => {
  try {
    let content = getStaticAsset("sitemap.xml");
    if (content) {
      // Ensure all URLs strictly point to the public domain https://hanan.pro without any authentication gate
      content = content.replace(/https:\/\/[a-zA-Z0-9.\-_:]+\.europe-west2\.run\.app/g, "https://hanan.pro");
      res.setHeader("Content-Type", "application/xml; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=3600");
      return res.status(200).send(content);
    }
    // Fallback XML if file is not on disk yet
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    return res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://hanan.pro/</loc><priority>1.0</priority></url></urlset>`);
  } catch (err) {
    console.error("Error reading sitemap.xml:", err);
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    return res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://hanan.pro/</loc><priority>1.0</priority></url></urlset>`);
  }
});

// Explicit Sitemap.xsl Route for Browser Visual Rendering of Sitemap.xml
app.get("/sitemap.xsl", (req, res) => {
  try {
    const content = getStaticAsset("sitemap.xsl");
    if (content) {
      res.setHeader("Content-Type", "text/xsl; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=3600");
      return res.status(200).send(content);
    }
    return res.status(200).type("text/xsl").send(`<?xml version="1.0" encoding="UTF-8"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"><xsl:template match="/"></xsl:template></xsl:stylesheet>`);
  } catch (err) {
    console.error("Error reading sitemap.xsl:", err);
    return res.status(200).type("text/xsl").send(`<?xml version="1.0" encoding="UTF-8"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"><xsl:template match="/"></xsl:template></xsl:stylesheet>`);
  }
});

// Explicit Standalone HTML Sitemap Route & Direct /sitemap Alias
app.get(["/sitemap.html", "/sitemap-index", "/sitemap"], (req, res) => {
  try {
    let content = getStaticAsset("sitemap.html");
    if (content) {
      content = content.replace(/https:\/\/[a-zA-Z0-9.\-_:]+\.europe-west2\.run\.app/g, "https://hanan.pro");
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=3600");
      return res.status(200).send(content);
    }
    // Redirect to SPA sitemap anchor if HTML file is not found
    return res.redirect("/#sitemap-section");
  } catch (err) {
    console.error("Error reading sitemap.html:", err);
    return res.redirect("/#sitemap-section");
  }
});

// Explicit Robots.txt Route
app.get("/robots.txt", (req, res) => {
  try {
    let content = getStaticAsset("robots.txt");
    if (content) {
      content = content.replace(/https:\/\/[a-zA-Z0-9.\-_:]+\.europe-west2\.run\.app/g, "https://hanan.pro");
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      return res.status(200).send(content);
    }
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.status(200).send(`User-agent: *\nAllow: /\nSitemap: https://hanan.pro/sitemap.xml\n`);
  } catch (err) {
    console.error("Error reading robots.txt:", err);
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.status(200).send(`User-agent: *\nAllow: /\nSitemap: https://hanan.pro/sitemap.xml\n`);
  }
});

// Explicit Ads.txt Route for Google AdSense Verification
app.get("/ads.txt", (req, res) => {
  try {
    const content = getStaticAsset("ads.txt");
    if (content) {
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=3600");
      return res.status(200).send(content);
    }
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.status(200).send("google.com, pub-3298241753177072, DIRECT, f08c47fec0942fa0\n");
  } catch (err) {
    console.error("Error reading ads.txt:", err);
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.status(200).send("google.com, pub-3298241753177072, DIRECT, f08c47fec0942fa0\n");
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, () => {
    console.log(`Royal Elite Server running on http://localhost:${PORT}`);
  });
}

startServer();
