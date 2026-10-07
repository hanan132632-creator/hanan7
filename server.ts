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
        reply: "أهلاً بك في عقارات النخبة ومتجر حنان الملكي! يسعدنا مساعدتك في اختيار العقار أو المنتج الرقمي الأنسب لمتطلباتك. يمكنك استخدام حاسبة التمويل أو استعراض المخططات والمنتجات التفاعلية مباشرة.",
      });
    }

    const systemInstruction = `أنت المساعد الملكي الذكي لمنصة "عقارات النخبة ومتجر حنان". 
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
      reply: "أهلاً بك في عقارات النخبة ومتجر حنان. يسعدنا تقديم الدعم المباشر لك عبر قسم اتصل بنا أو استعراض بطاقات العرض التفاعلية.",
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
      const host = req.get("host") || "ais-dev-on77w5qxpaes63voiv5adt-245902106769.europe-west2.run.app";
      const protocol = req.protocol === "http" && req.get("x-forwarded-proto") ? req.get("x-forwarded-proto") : (req.protocol || "https");
      const currentOrigin = `${protocol}://${host}`;
      content = content.replace(/https:\/\/[a-zA-Z0-9.\-_:]+\.europe-west2\.run\.app/g, currentOrigin);
      res.setHeader("Content-Type", "application/xml; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=3600");
      return res.status(200).send(content);
    }
    // Fallback XML if file is not on disk yet
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    return res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${req.protocol}://${req.get('host')}/</loc><priority>1.0</priority></url></urlset>`);
  } catch (err) {
    console.error("Error reading sitemap.xml:", err);
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    return res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${req.protocol}://${req.get('host')}/</loc><priority>1.0</priority></url></urlset>`);
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
      const host = req.get("host") || "ais-dev-on77w5qxpaes63voiv5adt-245902106769.europe-west2.run.app";
      const protocol = req.protocol === "http" && req.get("x-forwarded-proto") ? req.get("x-forwarded-proto") : (req.protocol || "https");
      const currentOrigin = `${protocol}://${host}`;
      content = content.replace(/https:\/\/[a-zA-Z0-9.\-_:]+\.europe-west2\.run\.app/g, currentOrigin);
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
    const host = req.get("host") || "ais-dev-on77w5qxpaes63voiv5adt-245902106769.europe-west2.run.app";
    const protocol = req.protocol === "http" && req.get("x-forwarded-proto") ? req.get("x-forwarded-proto") : (req.protocol || "https");
    const currentOrigin = `${protocol}://${host}`;
    if (content) {
      content = content.replace(/https:\/\/[a-zA-Z0-9.\-_:]+\.europe-west2\.run\.app/g, currentOrigin);
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      return res.status(200).send(content);
    }
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.status(200).send(`User-agent: *\nAllow: /\nSitemap: ${currentOrigin}/sitemap.xml`);
  } catch (err) {
    console.error("Error reading robots.txt:", err);
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.status(200).send(`User-agent: *\nAllow: /\nSitemap: ${req.protocol}://${req.get('host')}/sitemap.xml`);
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
