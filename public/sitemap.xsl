<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html dir="rtl" lang="ar">
      <head>
        <title>خريطة الموقع المعتمدة (Sitemap.xml) - عقارات النخبة ومتجر حنان الملكي</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style type="text/css">
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans Arabic", "Tajawal", Cairo, sans-serif;
            background-color: #FAF8F5;
            color: #1E293B;
            padding: 24px 16px;
            direction: rtl;
            text-align: right;
            line-height: 1.6;
          }
          .container {
            max-width: 1100px;
            margin: 0 auto;
            background: #FFFFFF;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.06);
            border: 1px solid #E2E8F0;
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #18181B 0%, #27272A 60%, #064E3B 100%);
            color: #FFFFFF;
            padding: 32px 28px;
            border-bottom: 3px solid #D4AF37;
          }
          .badge {
            display: inline-block;
            background: rgba(212, 175, 55, 0.2);
            color: #FAD961;
            border: 1px solid rgba(212, 175, 55, 0.5);
            padding: 4px 12px;
            border-radius: 9999px;
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 12px;
          }
          h1 {
            font-size: 26px;
            font-weight: 800;
            margin-bottom: 8px;
            color: #FFFFFF;
          }
          p.desc {
            color: #CBD5E1;
            font-size: 13px;
            max-width: 750px;
          }
          .meta-stats {
            margin-top: 18px;
            display: flex;
            gap: 16px;
            flex-wrap: wrap;
          }
          .stat-pill {
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.15);
            padding: 6px 14px;
            border-radius: 12px;
            font-size: 12px;
            color: #F8FAFC;
          }
          .stat-pill strong {
            color: #FAD961;
            font-size: 14px;
          }
          .content-body {
            padding: 24px;
          }
          .info-box {
            background: #F0FDF4;
            border: 1px solid #BBF7D0;
            border-radius: 12px;
            padding: 14px 18px;
            margin-bottom: 24px;
            font-size: 13px;
            color: #166534;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 10px;
          }
          .info-box a.btn-home {
            background: #059669;
            color: white;
            text-decoration: none;
            padding: 6px 16px;
            border-radius: 8px;
            font-weight: bold;
            font-size: 12px;
          }
          .info-box a.btn-home:hover {
            background: #047857;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
          }
          th {
            background: #F8FAFC;
            color: #475569;
            font-weight: 700;
            text-align: right;
            padding: 12px 14px;
            border-bottom: 2px solid #E2E8F0;
            font-size: 12px;
          }
          td {
            padding: 12px 14px;
            border-bottom: 1px solid #F1F5F9;
            vertical-align: middle;
          }
          tr:hover td {
            background-color: #F8FAFC;
          }
          .url-link {
            color: #059669;
            text-decoration: none;
            font-weight: 600;
            display: inline-block;
            word-break: break-all;
          }
          .url-link:hover {
            color: #047857;
            text-decoration: underline;
          }
          .tag-priority {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 6px;
            font-weight: bold;
            font-size: 11px;
            background: #FEF3C7;
            color: #92400E;
          }
          .tag-freq {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 6px;
            font-size: 11px;
            background: #E2E8F0;
            color: #334155;
          }
          .btn-open {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 6px;
            background: #059669;
            color: white;
            text-decoration: none;
            font-size: 11px;
            font-weight: bold;
          }
          .btn-open:hover {
            background: #047857;
          }
          .footer-note {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #94A3B8;
            border-top: 1px solid #E2E8F0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="badge">Google Search Console &amp; AdSense Compliant</span>
            <h1>خريطة الموقع الرسمية الشاملة (Sitemap.xml)</h1>
            <p class="desc">
              تتضمن هذه الخريطة كافة عناوين URL والروابط الرسمية المعتمدة لمنصة عقارات النخبة ومتجر حنان، بما في ذلك الصفحات الرئيسية، مقالات المدونة العقارية المعتمدة الـ 22، والمنتجات الرقمية.
            </p>
            <div class="meta-stats">
              <div class="stat-pill">
                عدد الروابط المفهرسة: <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong>
              </div>
              <div class="stat-pill">
                البروتوكول: <strong>Sitemaps.org 0.9 XML</strong>
              </div>
              <div class="stat-pill">
                حالة الفهرسة: <strong>معتمد ونشط 2026</strong>
              </div>
            </div>
          </div>

          <div class="content-body">
            <div class="info-box">
              <span>جميع الروابط أدناه نشطة ومفهرسة لمحركات البحث. يمكنك النقر على أي رابط لفتحه واستعراض المحتوى فوراً.</span>
              <a href="/" class="btn-home">العودة للرئيسية</a>
            </div>

            <table>
              <thead>
                <tr>
                  <th style="width: 45px;">#</th>
                  <th>عنوان الرابط (URL Location)</th>
                  <th style="width: 100px;">الأولوية (Priority)</th>
                  <th style="width: 110px;">دورية التحديث</th>
                  <th style="width: 110px;">آخر تعديل</th>
                  <th style="width: 90px; text-align: center;">إجراء</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td><xsl:value-of select="position()"/></td>
                    <td>
                      <a class="url-link" href="{sitemap:loc}">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td>
                      <span class="tag-priority">
                        <xsl:value-of select="sitemap:priority"/>
                      </span>
                    </td>
                    <td>
                      <span class="tag-freq">
                        <xsl:value-of select="sitemap:changefreq"/>
                      </span>
                    </td>
                    <td style="color: #64748B; font-size: 11px;">
                      <xsl:value-of select="sitemap:lastmod"/>
                    </td>
                    <td style="text-align: center;">
                      <a class="btn-open" href="{sitemap:loc}">فتح الرابط</a>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>

          <div class="footer-note">
            تم توليد هذه الصفحة آلياً عبر محول XSL لخريطة الموقع XML | متوافقة مع إرشادات مشرفي المواقع من Google وGoogle AdSense 2026
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
