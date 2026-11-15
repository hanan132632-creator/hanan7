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

function stripMarkdownInline(str: string): string {
  return str.replace(/\*\*(.*?)\*\*/g, '$1').replace(/`/g, '').trim();
}

function renderMarkdownToHtml(content: string): string {
  if (!content) return '';
  const blocks = content.split(/\n\n+/);
  return blocks
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('### ')) {
        return `<h2 style="color:#064E3B;font-size:1.25rem;margin-top:1.75rem;margin-bottom:0.75rem;border-bottom:1px solid #e2e8f0;padding-bottom:0.4rem;">${escapeHtml(stripMarkdownInline(trimmed.replace(/^###\s+/, '')))}</h2>`;
      }
      if (trimmed.startsWith('---')) {
        return '<hr style="border:none;border-top:1px solid #e2e8f0;margin:1.5rem 0;" />';
      }
      if (/^(\*|-|\d+\.)\s+/m.test(trimmed)) {
        const items = trimmed
          .split('\n')
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line) => `<li>${escapeHtml(stripMarkdownInline(line.replace(/^(\*|-|\d+\.)\s+/, '')))}</li>`)
          .join('');
        return `<ul style="padding-right:1.25rem;margin:1rem 0;line-height:1.9;">${items}</ul>`;
      }
      return `<p style="line-height:1.9;margin:0.9rem 0;color:#334155;">${escapeHtml(stripMarkdownInline(trimmed))}</p>`;
    })
    .join('\n');
}

interface ParsedPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
}

function parseBlogPosts(source: string): ParsedPost[] {
  const posts: ParsedPost[] = [];
  const chunks = source.split(/(?=id:\s*['"]post-\d+['"])/);
  for (const chunk of chunks) {
    const idMatch = chunk.match(/^id:\s*['"](post-\d+)['"]/);
    if (!idMatch) continue;

    const titleMatch = chunk.match(/title:\s*['"]([^'"]*)['"]/);
    const excerptMatch = chunk.match(/excerpt:\s*['"]([^'"]*)['"]/);
    const contentMatch = chunk.match(/content:\s*`([\s\S]*?)`,\s*\n\s*category:/);
    const categoryMatch = chunk.match(/category:\s*['"]([^'"]*)['"]/);
    const authorMatch = chunk.match(/author:\s*['"]([^'"]*)['"]/);
    const dateMatch = chunk.match(/date:\s*['"]([^'"]*)['"]/);
    const readTimeMatch = chunk.match(/readTime:\s*['"]([^'"]*)['"]/);

    if (titleMatch && excerptMatch) {
      posts.push({
        id: idMatch[1],
        title: titleMatch[1],
        excerpt: excerptMatch[1],
        content: contentMatch ? contentMatch[1] : excerptMatch[1],
        category: categoryMatch ? categoryMatch[1] : 'العقارات الفاخرة',
        author: authorMatch ? authorMatch[1] : 'م. حنان العلي (مستشارة استثمار عقاري معتمدة)',
        date: dateMatch ? dateMatch[1] : '2026',
        readTime: readTimeMatch ? readTimeMatch[1] : '7 دقائق قراءة',
      });
    }
  }
  return posts;
}

interface ParsedProduct {
  id: string;
  title: string;
  subtitle: string;
  categoryLabel: string;
  priceSAR: string;
  description: string;
}

function parseProducts(source: string): ParsedProduct[] {
  const products: ParsedProduct[] = [];
  const chunks = source.split(/(?=id:\s*['"](?:prop|blueprint|canva|royal)-\d+['"])/);
  for (const chunk of chunks) {
    const idMatch = chunk.match(/^id:\s*['"]((?:prop|blueprint|canva|royal)-\d+)['"]/);
    if (!idMatch) continue;

    const titleMatch = chunk.match(/title:\s*['"]([^'"]*)['"]/);
    const subMatch = chunk.match(/subtitle:\s*['"]([^'"]*)['"]/);
    const catMatch = chunk.match(/categoryLabel:\s*['"]([^'"]*)['"]/);
    const priceMatch = chunk.match(/priceSAR:\s*(\d+)/);
    const descMatch = chunk.match(/description:\s*['"]([^'"]*)['"]/);

    if (titleMatch && subMatch) {
      products.push({
        id: idMatch[1],
        title: titleMatch[1],
        subtitle: subMatch[1],
        categoryLabel: catMatch ? catMatch[1] : 'عقارات النخبة',
        priceSAR: priceMatch ? priceMatch[1] : '0',
        description: descMatch ? descMatch[1] : subMatch[1],
      });
    }
  }
  return products;
}

interface ParsedFaq {
  question: string;
  answer: string;
  relatedPostId: string;
  relatedPostLabel: string;
}

function parseFaqItems(source: string): ParsedFaq[] {
  const items: ParsedFaq[] = [];
  const regex =
    /question:\s*'([^']*)'[\s\S]*?answer:\s*\n?\s*'([^']*)'[\s\S]*?relatedPostId:\s*'([^']*)'[\s\S]*?relatedPostLabel:\s*'([^']*)'/g;
  let m;
  while ((m = regex.exec(source)) !== null) {
    items.push({
      question: m[1],
      answer: m[2],
      relatedPostId: m[3],
      relatedPostLabel: m[4],
    });
  }
  return items;
}

function prerenderSeoRoutesPlugin(): Plugin {
  return {
    name: 'prerender-seo-routes',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const indexHtmlPath = path.join(distDir, 'index.html');
      if (!fs.existsSync(indexHtmlPath)) return;

      const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

      // Resolve hashed hero & snagging image filenames in dist/assets/
      let heroImageUrl = 'https://hanan.pro/';
      let snaggingImageUrl = '';
      const assetsDir = path.join(distDir, 'assets');
      if (fs.existsSync(assetsDir)) {
        const assetFiles = fs.readdirSync(assetsDir);
        const heroFile = assetFiles.find((f) => f.startsWith('hero_luxury_villa_') && f.endsWith('.jpg'));
        const snagFile = assetFiles.find((f) => f.startsWith('villa_snagging_inspection_') && f.endsWith('.jpg'));
        if (heroFile) heroImageUrl = `https://hanan.pro/assets/${heroFile}`;
        if (snagFile) snaggingImageUrl = `https://hanan.pro/assets/${snagFile}`;
      }

      const blogDataPath = path.resolve(__dirname, 'src/data/blogData.ts');
      const posts = fs.existsSync(blogDataPath) ? parseBlogPosts(fs.readFileSync(blogDataPath, 'utf8')) : [];

      const mockDataPath = path.resolve(__dirname, 'src/data/mockData.ts');
      const products = fs.existsSync(mockDataPath) ? parseProducts(fs.readFileSync(mockDataPath, 'utf8')) : [];

      const faqDataPath = path.resolve(__dirname, 'src/data/seoFaqData.ts');
      const faqs = fs.existsSync(faqDataPath) ? parseFaqItems(fs.readFileSync(faqDataPath, 'utf8')) : [];

      const writeRouteHtml = (
        routeRelPath: string,
        title: string,
        desc: string,
        canonicalUrl: string,
        jsonLdGraphs: Array<Record<string, unknown>>,
        semanticFallbackHtml = '',
        ogType = 'website',
        ogImage = heroImageUrl
      ) => {
        const safeTitle = escapeHtml(title);
        const safeDesc = escapeHtml(desc);

        let html = baseHtml
          .replace(/<title>.*?<\/title>/i, `<title>${safeTitle}</title>`)
          .replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${safeDesc}" />`)
          .replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i, `<meta property="og:title" content="${safeTitle}" />`)
          .replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i, `<meta property="og:description" content="${safeDesc}" />`)
          .replace(/<meta\s+property="og:type"\s+content=".*?"\s*\/?>/i, `<meta property="og:type" content="${ogType}" />`)
          .replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i, `<meta property="og:url" content="${canonicalUrl}" />`)
          .replace(/<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:title" content="${safeTitle}" />`)
          .replace(/<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:description" content="${safeDesc}" />`)
          .replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i, `<link rel="canonical" href="${canonicalUrl}" />`);

        if (ogImage && ogImage.endsWith('.jpg')) {
          html = html.replace('</head>', `    <meta property="og:image" content="${ogImage}" />\n    <meta name="twitter:image" content="${ogImage}" />\n  </head>`);
        }

        const jsonLdScript = `\n    <script type="application/ld+json">\n    ${JSON.stringify(jsonLdGraphs.length === 1 ? jsonLdGraphs[0] : jsonLdGraphs, null, 2)}\n    </script>\n  </head>`;
        html = html.replace('</head>', jsonLdScript);

        if (semanticFallbackHtml) {
          html = html.replace('<div id="root"></div>', `<div id="root">${semanticFallbackHtml}</div>`);
        }

        const outFile = path.join(distDir, `${routeRelPath}.html`);
        fs.mkdirSync(path.dirname(outFile), { recursive: true });
        fs.writeFileSync(outFile, html, 'utf8');
      };

      // 1. Prerender ALL 33 Blog Posts with FULL indexable HTML & Rich Snippets
      for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const canonicalUrl = `https://hanan.pro/post/${post.id}`;
        const postImage = post.id === 'post-33' && snaggingImageUrl ? snaggingImageUrl : heroImageUrl;
        const plainWords = stripMarkdownInline(post.content).split(/\s+/).filter(Boolean).length;

        const relatedPosts = posts.filter((p) => p.id !== post.id).slice(0, 3);

        const schemas: Array<Record<string, unknown>> = [
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
            headline: post.title,
            description: post.excerpt,
            articleSection: post.category,
            inLanguage: 'ar-SA',
            isAccessibleForFree: true,
            wordCount: plainWords,
            ...(postImage.endsWith('.jpg') ? { image: [postImage] } : {}),
            author: {
              '@type': 'Person',
              name: post.author,
              url: 'https://hanan.pro/author',
              jobTitle: 'مستشار عقاري وهندسي معتمد E-E-A-T 2026',
              worksFor: { '@type': 'Organization', name: 'عقارات النخبة', url: 'https://hanan.pro/' },
            },
            publisher: {
              '@type': 'Organization',
              name: 'عقارات النخبة',
              url: 'https://hanan.pro/',
            },
            datePublished: post.date,
            dateModified: '2026-03-01',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: 'https://hanan.pro/' },
              { '@type': 'ListItem', position: 2, name: 'المدونة العقارية', item: 'https://hanan.pro/blog' },
              { '@type': 'ListItem', position: 3, name: post.title, item: canonicalUrl },
            ],
          },
        ];

        const renderedBody = renderMarkdownToHtml(post.content);
        const relatedLinksHtml = relatedPosts
          .map(
            (rel) =>
              `<li style="margin:0.4rem 0;"><a href="/post/${rel.id}" style="color:#064E3B;font-weight:bold;text-decoration:none;">${escapeHtml(rel.title)}</a></li>`
          )
          .join('');

        const fallbackHtml = `<main dir="rtl" style="max-width:860px;margin:2rem auto;padding:1.5rem;background:#ffffff;border-radius:16px;font-family:Cairo,Tajawal,sans-serif;color:#1e293b;">
  <nav aria-label="Breadcrumb" style="font-size:0.85rem;margin-bottom:1rem;color:#64748b;">
    <a href="/" style="color:#064E3B;text-decoration:none;">الرئيسية</a> /
    <a href="/blog" style="color:#064E3B;text-decoration:none;">المدونة العقارية</a> /
    <span>${escapeHtml(post.category)}</span>
  </nav>
  <article>
    <h1 style="font-size:1.75rem;color:#0f172a;line-height:1.45;margin-bottom:0.75rem;">${escapeHtml(post.title)}</h1>
    <p style="font-size:0.9rem;color:#475569;margin-bottom:1.25rem;">
      <strong>الكاتب المعتمد:</strong> <a href="/author" style="color:#064E3B;">${escapeHtml(post.author)}</a> ·
      <strong>التصنيف:</strong> ${escapeHtml(post.category)} ·
      <strong>وقت القراءة:</strong> ${escapeHtml(post.readTime)} ·
      <strong>التاريخ:</strong> ${escapeHtml(post.date)}
    </p>
    <p style="font-size:1.05rem;line-height:1.8;background:#FAF8F5;padding:1rem;border-radius:12px;color:#0f172a;">${escapeHtml(post.excerpt)}</p>
    ${renderedBody}
    <aside style="margin-top:1.75rem;padding:1rem;background:#f8fafc;border:1px solid #cbd5e1;border-radius:12px;font-size:0.85rem;color:#475569;line-height:1.75;">
      <strong>إخلاء مسؤولية تثقيفي:</strong> المعلومات الواردة في هذا المقال لأغراض التوعية والتحليل العام فقط ولا تُعد توصية استثمارية أو مالية أو ضريبية ملزمة أو ضماناً لأي عائد مالي. للتواصل: <a href="mailto:contact@hanan.pro" style="color:#064E3B;">contact@hanan.pro</a> · <a href="/about" style="color:#064E3B;">من نحن</a> · <a href="/privacy" style="color:#064E3B;">سياسة الخصوصية</a> · <a href="/terms" style="color:#064E3B;">الشروط والأحكام</a> · <a href="/contact" style="color:#064E3B;">اتصل بنا</a>
    </aside>
    <section style="margin-top:2rem;padding-top:1.25rem;border-top:1px solid #e2e8f0;">
      <h2 style="font-size:1.15rem;color:#064E3B;margin-bottom:0.75rem;">مقالات مرجعية ذات صلة</h2>
      <ul style="padding-right:1.25rem;">${relatedLinksHtml}</ul>
      <p style="margin-top:1rem;"><a href="/" style="color:#064E3B;font-weight:bold;">العودة إلى منصة عقارات النخبة</a> · <a href="/catalog" style="color:#064E3B;font-weight:bold;">استعراض الفلل والقصور</a></p>
    </section>
  </article>
</main>`;

        writeRouteHtml(`post/${post.id}`, `${post.title} | عقارات النخبة`, post.excerpt, canonicalUrl, schemas, fallbackHtml, 'article', postImage);

        if (post.id === 'post-30') {
          writeRouteHtml('usa', `${post.title} | عقارات النخبة`, post.excerpt, canonicalUrl, schemas, fallbackHtml, 'article', postImage);
        } else if (post.id === 'post-32') {
          writeRouteHtml('p32', `${post.title} | عقارات النخبة`, post.excerpt, canonicalUrl, schemas, fallbackHtml, 'article', postImage);
        } else if (post.id === 'post-33') {
          writeRouteHtml('p33', `${post.title} | عقارات النخبة`, post.excerpt, canonicalUrl, schemas, fallbackHtml, 'article', postImage);
        }
      }

      // 2. Prerender ALL Products (/product/prop-01 ... /product/royal-02)
      for (const prod of products) {
        const canonicalUrl = `https://hanan.pro/product/${prod.id}`;
        const schemas: Array<Record<string, unknown>> = [
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: prod.title,
            description: prod.description,
            category: prod.categoryLabel,
            ...(heroImageUrl.endsWith('.jpg') ? { image: [heroImageUrl] } : {}),
            brand: { '@type': 'Brand', name: 'عقارات النخبة' },
            offers: {
              '@type': 'Offer',
              priceCurrency: 'SAR',
              price: prod.priceSAR,
              availability: 'https://schema.org/InStock',
              url: canonicalUrl,
            },
            url: canonicalUrl,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: 'https://hanan.pro/' },
              { '@type': 'ListItem', position: 2, name: 'الكتالوج', item: 'https://hanan.pro/catalog' },
              { '@type': 'ListItem', position: 3, name: prod.title, item: canonicalUrl },
            ],
          },
        ];

        const fallback = `<main dir="rtl" style="max-width:860px;margin:2rem auto;padding:1.5rem;background:#fff;border-radius:16px;font-family:Cairo,Tajawal,sans-serif;">
  <nav aria-label="Breadcrumb" style="font-size:0.85rem;margin-bottom:1rem;color:#64748b;">
    <a href="/">الرئيسية</a> / <a href="/catalog">كتالوج العقارات</a> / <span>${escapeHtml(prod.title)}</span>
  </nav>
  <h1 style="font-size:1.75rem;color:#0f172a;">${escapeHtml(prod.title)}</h1>
  <p style="font-weight:bold;color:#064E3B;">${escapeHtml(prod.subtitle)} — السعر: ${Number(prod.priceSAR).toLocaleString('en-US')} ر.س</p>
  <p style="line-height:1.9;color:#334155;">${escapeHtml(prod.description)}</p>
  <p style="margin-top:1.5rem;"><a href="/calculator" style="color:#064E3B;font-weight:bold;">حساب التمويل العقاري</a> · <a href="/blog" style="color:#064E3B;font-weight:bold;">الأدلة العقارية E-E-A-T</a></p>
</main>`;

        writeRouteHtml(`product/${prod.id}`, `${prod.title} | عقارات النخبة`, prod.description, canonicalUrl, schemas, fallback, 'product');
      }

      // 3. Prerender Static Category, E-E-A-T & Legal Pages
      const staticPages: Array<{ route: string; title: string; desc: string; label: string }> = [
        {
          route: 'catalog',
          label: 'كتالوج العقارات',
          title: 'كتالوج العقارات الفاخرة والمخططات الهندسية 2026 | عقارات النخبة',
          desc: 'تصفح الفلل والقصور الفاخرة بالرياض ودبي، المخططات المعمارية المعتمدة 2026، وقوالب التسويق العقاري الاحترافية.',
        },
        {
          route: 'blog',
          label: 'المدونة العقارية',
          title: 'مدونة النخبة العقارية الموثقة E-E-A-T 2026 | عقارات النخبة',
          desc: 'مقالات ودراسات عقارية وهندسية محررة بيد بشرية معتمدة مع التراخيص والمصادر الرسمية لعام 2026.',
        },
        {
          route: 'calculator',
          label: 'حاسبة التمويل العقاري',
          title: 'حاسبة التمويل العقاري الذكية للفلل والقصور | عقارات النخبة',
          desc: 'حساب الأقساط الشهرية والتمويل العقاري التقديري لقصور وفلل الرياض ودبي.',
        },
        {
          route: 'author',
          label: 'ملف الكتّاب والتراخيص',
          title: 'ملف الكتّاب المعتمدين والتراخيص الرسمية E-E-A-T | عقارات النخبة',
          desc: 'توثيق بيانات وتراخيص كتّاب واستشاريي منصة عقارات النخبة المعتمدين برخص فال وتقييم لعام 2026.',
        },
        {
          route: 'about',
          label: 'عن المنصة',
          title: 'عن منصة عقارات النخبة والرؤية المستقبلية 2026',
          desc: 'المنصة العقارية الأولى للفلل والقصور الفاخرة والمخططات المعمارية المعتمدة والاستشارات الاستثمارية.',
        },
        {
          route: 'privacy',
          label: 'سياسة الخصوصية',
          title: 'سياسة الخصوصية وحماية البيانات | عقارات النخبة',
          desc: 'التزام كامل بحماية بيانات المستخدمين وسياسة استخدام ملفات تعريف الارتباط.',
        },
        {
          route: 'terms',
          label: 'الشروط والأحكام',
          title: 'الشروط والأحكام لاتفاقية التداول العقاري والمنتجات الرقمية',
          desc: 'الشروط والأحكام المنظمة للخدمات العقارية والمنتجات المعمارية المعتمدة.',
        },
        {
          route: 'contact',
          label: 'اتصل بنا',
          title: 'اتصل بنا ورعاية العملاء 24/7 | عقارات النخبة',
          desc: 'تواصل مباشر مع مستشاري عقارات النخبة لطلب المعاينات الميدانية والاستشارات الهندسية.',
        },
        {
          route: 'domain_verify',
          label: 'توثيق الدومين',
          title: 'توثيق ملكية الدومين والامتثال الرسمي لـ Google AdSense',
          desc: 'شهادة إثبات ملكية الدومين والامتثال الرسمي لـ Google AdSense.',
        },
      ];

      for (const page of staticPages) {
        const canonicalUrl = `https://hanan.pro/${page.route}`;
        const listLinks =
          page.route === 'blog'
            ? `<ul>${posts.map((p) => `<li><a href="/post/${p.id}">${escapeHtml(p.title)}</a></li>`).join('')}</ul>`
            : page.route === 'catalog'
            ? `<ul>${products.map((pr) => `<li><a href="/product/${pr.id}">${escapeHtml(pr.title)} — ${escapeHtml(pr.subtitle)}</a></li>`).join('')}</ul>`
            : '';

        const schemas: Array<Record<string, unknown>> = [
          {
            '@context': 'https://schema.org',
            '@type': page.route === 'author' ? 'ProfilePage' : 'WebPage',
            name: page.title,
            description: page.desc,
            url: canonicalUrl,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: 'https://hanan.pro/' },
              { '@type': 'ListItem', position: 2, name: page.label, item: canonicalUrl },
            ],
          },
        ];

        const fallback = `<main dir="rtl" style="max-width:860px;margin:2rem auto;padding:1.5rem;background:#fff;border-radius:16px;font-family:Cairo,Tajawal,sans-serif;">
  <nav aria-label="Breadcrumb"><a href="/">الرئيسية</a> / <span>${escapeHtml(page.label)}</span></nav>
  <h1>${escapeHtml(page.title)}</h1>
  <p>${escapeHtml(page.desc)}</p>
  ${listLinks}
</main>`;

        writeRouteHtml(page.route, page.title, page.desc, canonicalUrl, schemas, fallback);
      }

      // 4. Enhance dist/index.html (Homepage) with Rich Snippets (FAQPage + ItemList + Real Hero Image)
      //    AND Full Semantic HTML inside <div id="root"> so Googlebot indexes all internal links & copy on byte 1!
      let homeHtml = baseHtml;

      const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      };

      const itemListSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'أبرز العقارات الفاخرة والأدلة العقارية الموثقة 2026',
        itemListElement: [
          ...products.slice(0, 6).map((pr, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: pr.title,
            url: `https://hanan.pro/product/${pr.id}`,
          })),
          ...posts.slice(0, 6).map((po, idx) => ({
            '@type': 'ListItem',
            position: Math.min(6, products.length) + idx + 1,
            name: po.title,
            url: `https://hanan.pro/post/${po.id}`,
          })),
        ],
      };

      const homeExtraHead = `${heroImageUrl.endsWith('.jpg') ? `\n    <meta property="og:image" content="${heroImageUrl}" />\n    <meta name="twitter:image" content="${heroImageUrl}" />` : ''}
    <script type="application/ld+json">
    ${JSON.stringify([faqSchema, itemListSchema], null, 2)}
    </script>
  </head>`;
      homeHtml = homeHtml.replace('</head>', homeExtraHead);

      const homeSemanticHtml = `<main dir="rtl" style="max-width:1120px;margin:0 auto;padding:1.5rem;font-family:Cairo,Tajawal,sans-serif;color:#1e293b;">
  <header style="border-bottom:1px solid #e2e8f0;padding-bottom:1rem;margin-bottom:2rem;">
    <nav aria-label="التنقل الرئيسي" style="display:flex;flex-wrap:wrap;gap:1rem;font-weight:bold;">
      <a href="/">عقارات النخبة</a>
      <a href="/catalog">كتالوج الفلل والقصور والمخططات</a>
      <a href="/blog">مدونة النخبة العقارية (${posts.length})</a>
      <a href="/author">ملف الكتّاب والتراخيص الرسمية</a>
      <a href="/calculator">حاسبة التمويل العقاري</a>
      <a href="/about">من نحن</a>
      <a href="/contact">اتصل بنا</a>
    </nav>
  </header>
  <section>
    <h1 style="font-size:2rem;color:#0f172a;margin-bottom:0.75rem;">عقارات النخبة الفاخرة — فلل وقصور للبيع في الرياض ودبي 2026 والمخططات الهندسية المعتمدة</h1>
    <p style="line-height:1.85;color:#334155;">المنصة العقارية والهندسية الموثقة لاقتناء الفلل والقصور الفاخرة في حي حطين والملقا بالرياض وداون تاون دبي، مع دراسات استثمارية بشرية معتمدة بمعايير E-E-A-T وتراخيص فال وتقييم ومخططات كود البناء السعودي 2026.</p>
  </section>
  <section style="margin-top:2rem;">
    <h2>أبرز الفلل والقصور والمخططات الهندسية 2026</h2>
    <ul>
      ${products.map((pr) => `<li><a href="/product/${pr.id}">${escapeHtml(pr.title)}</a> — ${escapeHtml(pr.subtitle)}</li>`).join('\n      ')}
    </ul>
  </section>
  <section style="margin-top:2rem;">
    <h2>مقالات ودراسات عقارية موثقة بمعايير E-E-A-T لعام 2026</h2>
    <ul>
      ${posts.map((po) => `<li><a href="/post/${po.id}">${escapeHtml(po.title)}</a> — ${escapeHtml(po.author)}</li>`).join('\n      ')}
    </ul>
  </section>
  <section style="margin-top:2rem;">
    <h2>الأسئلة الشائعة حول الاستثمار والتمويل العقاري في الرياض ودبي</h2>
    ${faqs
      .map(
        (f) =>
          `<article style="margin-bottom:1rem;"><h3>${escapeHtml(f.question)}</h3><p>${escapeHtml(f.answer)} <a href="/post/${f.relatedPostId}">${escapeHtml(f.relatedPostLabel)}</a></p></article>`
      )
      .join('\n    ')}
  </section>
  <footer style="margin-top:2rem;padding-top:1rem;border-top:1px solid #e2e8f0;font-size:0.85rem;">
    <a href="/about">عن المنصة</a> · <a href="/privacy">سياسة الخصوصية</a> · <a href="/terms">الشروط والأحكام</a> · <a href="/domain_verify">توثيق الدومين</a> · <a href="/sitemap.xml">sitemap.xml</a>
  </footer>
</main>`;

      homeHtml = homeHtml.replace('<div id="root"></div>', `<div id="root">${homeSemanticHtml}</div>`);
      fs.writeFileSync(indexHtmlPath, homeHtml, 'utf8');
    },
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
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
