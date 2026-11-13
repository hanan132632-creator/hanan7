import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function prerenderSeoRoutesPlugin(): Plugin {
  return {
    name: 'prerender-seo-routes',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const indexHtmlPath = path.join(distDir, 'index.html');
      if (!fs.existsSync(indexHtmlPath)) return;

      const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

      const writeRouteHtml = (
        routeRelPath: string,
        title: string,
        desc: string,
        canonicalUrl: string,
        jsonLdObj: Record<string, unknown>,
        semanticFallbackHtml = ''
      ) => {
        const safeTitle = escapeHtml(title);
        const safeDesc = escapeHtml(desc);

        let html = baseHtml
          .replace(/<title>.*?<\/title>/i, `<title>${safeTitle}</title>`)
          .replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${safeDesc}" />`)
          .replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i, `<meta property="og:title" content="${safeTitle}" />`)
          .replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i, `<meta property="og:description" content="${safeDesc}" />`)
          .replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i, `<meta property="og:url" content="${canonicalUrl}" />`)
          .replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i, `<link rel="canonical" href="${canonicalUrl}" />`);

        const jsonLdScript = `\n    <script type="application/ld+json">\n    ${JSON.stringify(jsonLdObj, null, 2)}\n    </script>\n  </head>`;
        html = html.replace('</head>', jsonLdScript);

        if (semanticFallbackHtml) {
          html = html.replace('<div id="root"></div>', `<div id="root">${semanticFallbackHtml}</div>`);
        }

        const outFile = path.join(distDir, `${routeRelPath}.html`);
        fs.mkdirSync(path.dirname(outFile), { recursive: true });
        fs.writeFileSync(outFile, html, 'utf8');
      };

      // 1. Prerender Blog Posts (/post/post-1 ... /post/post-33 and short links)
      const blogDataPath = path.resolve(__dirname, 'src/data/blogData.ts');
      if (fs.existsSync(blogDataPath)) {
        const content = fs.readFileSync(blogDataPath, 'utf8');
        const regex = /id:\s*['"](post-\d+)['"][\s\S]*?title:\s*['"]([^'"]*)['"][\s\S]*?excerpt:\s*['"]([^'"]*)['"][\s\S]*?category:\s*['"]([^'"]*)['"][\s\S]*?author:\s*['"]([^'"]*)['"][\s\S]*?date:\s*['"]([^'"]*)['"]/g;
        let match;
        while ((match = regex.exec(content)) !== null) {
          const id = match[1];
          const title = match[2];
          const excerpt = match[3];
          const category = match[4];
          const author = match[5];
          const date = match[6];

          const canonicalUrl = `https://hanan.pro/post/${id}`;

          const jsonLd = {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
            headline: title,
            description: excerpt,
            articleSection: category,
            author: {
              '@type': 'Person',
              name: author,
              jobTitle: 'مستشار عقاري وهندسي معتمد E-E-A-T 2026',
              worksFor: { '@type': 'Organization', name: 'عقارات النخبة', url: 'https://hanan.pro' }
            },
            publisher: { '@type': 'Organization', name: 'عقارات النخبة', url: 'https://hanan.pro' },
            datePublished: date
          };

          const fallback = `<main dir="rtl" style="max-width:800px;margin:2rem auto;padding:1rem;font-family:sans-serif"><article><h1>${escapeHtml(title)}</h1><p><strong>الكاتب:</strong> ${escapeHtml(author)} | <strong>تاريخ النشر:</strong> ${escapeHtml(date)}</p><p>${escapeHtml(excerpt)}</p></article></main>`;

          writeRouteHtml(`post/${id}`, `${title} | عقارات النخبة`, excerpt, canonicalUrl, jsonLd, fallback);

          if (id === 'post-30') {
            writeRouteHtml('usa', `${title} | عقارات النخبة`, excerpt, canonicalUrl, jsonLd, fallback);
          } else if (id === 'post-32') {
            writeRouteHtml('p32', `${title} | عقارات النخبة`, excerpt, canonicalUrl, jsonLd, fallback);
          } else if (id === 'post-33') {
            writeRouteHtml('p33', `${title} | عقارات النخبة`, excerpt, canonicalUrl, jsonLd, fallback);
          }
        }
      }

      // 1b. Prerender Product Pages (/product/prop-01 ... /product/royal-02)
      const mockDataPath = path.resolve(__dirname, 'src/data/mockData.ts');
      if (fs.existsSync(mockDataPath)) {
        const prodContent = fs.readFileSync(mockDataPath, 'utf8');
        const prodRegex = /id:\s*['"](prop-\d+|blueprint-\d+|canva-\d+|royal-\d+)['"][\s\S]*?title:\s*['"]([^'"]*)['"][\s\S]*?subtitle:\s*['"]([^'"]*)['"]/g;
        let pMatch;
        while ((pMatch = prodRegex.exec(prodContent)) !== null) {
          const pId = pMatch[1];
          const pTitle = pMatch[2];
          const pSub = pMatch[3];
          const canonicalUrl = `https://hanan.pro/product/${pId}`;
          const jsonLd = {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: pTitle,
            description: pSub,
            brand: { '@type': 'Brand', name: 'عقارات النخبة' },
            url: canonicalUrl
          };
          const fallback = `<main dir="rtl" style="max-width:800px;margin:2rem auto;padding:1rem;font-family:sans-serif"><h1>${escapeHtml(pTitle)}</h1><p>${escapeHtml(pSub)}</p></main>`;
          writeRouteHtml(`product/${pId}`, `${pTitle} | عقارات النخبة`, pSub, canonicalUrl, jsonLd, fallback);
        }
      }

      // 2. Prerender Legal, Author, Section, and Compliance Pages
      const staticPages: Array<{ route: string; title: string; desc: string }> = [
        {
          route: 'catalog',
          title: 'كتالوج العقارات الفاخرة والأصول الرقمية 2026 | عقارات النخبة',
          desc: 'تصفح الفلل والقصور الفاخرة بالرياض ودبي، المخططات المعمارية 2026، وقوالب كانفا الاحترافية.'
        },
        {
          route: 'blog',
          title: 'مدونة النخبة العقارية الموثقة E-E-A-T 2026 | عقارات النخبة',
          desc: 'مقالات ودراسات عقارية وهندسية محررة بيد بشرية معتمدة مع التراخيص والمصادر الرسمية لعام 2026.'
        },
        {
          route: 'calculator',
          title: 'حاسبة التمويل العقاري الذكية للفلل والقصور | عقارات النخبة',
          desc: 'حساب الأقساط الشهرية والتمويل العقاري التقديري لقصور وفلل الرياض ودبي.'
        },
        {
          route: 'author',
          title: 'ملف الكتّاب المعتمدين والتراخيص الرسمية E-E-A-T | عقارات النخبة',
          desc: 'توثيق بيانات وتراخيص كتّاب واستشاريي منصة عقارات النخبة المعتمدين برخص فال العقارية والجهات الهندسية الرسمية لعام 2026.'
        },
        {
          route: 'about',
          title: 'عن منصة عقارات النخبة والرؤية المستقبلية 2026',
          desc: 'المنصة العقارية الأولى للعقارات الفاخرة والأصول الرقمية والحلول المعمارية المعتمدة.'
        },
        {
          route: 'privacy',
          title: 'سياسة الخصوصية وحماية البيانات | عقارات النخبة',
          desc: 'التزام كامل بحماية بيانات المستخدمين وسياسة استخدام ملفات تعريف الارتباط الكوكيز.'
        },
        {
          route: 'terms',
          title: 'الشروط والأحكام لاتفاقية التداول العقاري والمنتجات الرقمية',
          desc: 'الشروط والأحكام المنظمة للخدمات العقارية والمنتجات المعمارية المعتمدة.'
        },
        {
          route: 'contact',
          title: 'اتصل بنا ورعاية العملاء 24/7 | عقارات النخبة',
          desc: 'تواصل مباشر مع مستشاري عقارات النخبة لطلب المعاينات الميدانية والدعم الفني.'
        },
        {
          route: 'domain_verify',
          title: 'توثيق ملكية الدومين والامتثال الرسمي لـ Google AdSense',
          desc: 'شهادة إثبات ملكية الدومين والامتثال الرسمي لـ Google AdSense ورخصة العمل.'
        }
      ];

      for (const page of staticPages) {
        const canonicalUrl = `https://hanan.pro/${page.route}`;
        writeRouteHtml(
          page.route,
          page.title,
          page.desc,
          canonicalUrl,
          {
            '@context': 'https://schema.org',
            '@type': page.route === 'author' ? 'Person' : 'WebPage',
            name: page.title,
            description: page.desc,
            url: canonicalUrl
          },
          `<main dir="rtl" style="max-width:800px;margin:2rem auto;padding:1rem;font-family:sans-serif"><h1>${escapeHtml(page.title)}</h1><p>${escapeHtml(page.desc)}</p></main>`
        );
      }
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), prerenderSeoRoutesPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
