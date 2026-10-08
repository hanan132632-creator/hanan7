<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html dir="rtl" lang="ar">
      <head>
        <title>خريطة الموقع المعتمدة (Sitemap.xml) - https://hanan.pro</title>
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
            max-width: 1150px;
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
          .badge-row {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            margin-bottom: 12px;
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
          }
          .badge-green {
            background: rgba(16, 185, 129, 0.2);
            color: #6EE7B7;
            border: 1px solid rgba(16, 185, 129, 0.4);
          }
          h1 {
            font-size: 26px;
            font-weight: 800;
            margin-bottom: 8px;
            color: #FFFFFF;
          }
          p.desc {
            color: #CBD5E1;
            font-size: 13.5px;
            max-width: 850px;
            line-height: 1.6;
          }
          .meta-stats {
            margin-top: 18px;
            display: flex;
            gap: 12px;
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
          .controls-bar {
            display: flex;
            gap: 12px;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            margin-bottom: 20px;
            background: #F8FAFC;
            padding: 14px 18px;
            border-radius: 14px;
            border: 1px solid #E2E8F0;
          }
          .search-input {
            flex: 1;
            min-width: 240px;
            padding: 10px 14px;
            border: 1px solid #CBD5E1;
            border-radius: 8px;
            font-size: 13px;
            outline: none;
            direction: rtl;
          }
          .search-input:focus {
            border-color: #059669;
            box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1);
          }
          .btn-group {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
          }
          .btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 8px 14px;
            border-radius: 8px;
            font-size: 12px;
            font-weight: bold;
            cursor: pointer;
            text-decoration: none;
            border: none;
            transition: all 0.15s ease;
          }
          .btn-home {
            background: #059669;
            color: white;
          }
          .btn-home:hover {
            background: #047857;
          }
          .btn-secondary {
            background: #1E293B;
            color: white;
          }
          .btn-secondary:hover {
            background: #0F172A;
          }
          .btn-outline {
            background: white;
            color: #334155;
            border: 1px solid #CBD5E1;
          }
          .btn-outline:hover {
            background: #F1F5F9;
          }
          .table-wrapper {
            overflow-x: auto;
            border: 1px solid #E2E8F0;
            border-radius: 12px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
            background: white;
          }
          th {
            background: #F8FAFC;
            color: #475569;
            font-weight: 700;
            text-align: right;
            padding: 12px 14px;
            border-bottom: 2px solid #E2E8F0;
            font-size: 12px;
            white-space: nowrap;
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
          .action-cells {
            display: flex;
            gap: 6px;
            align-items: center;
            justify-content: center;
          }
          .btn-open {
            display: inline-block;
            padding: 5px 12px;
            border-radius: 6px;
            background: #059669;
            color: white;
            text-decoration: none;
            font-size: 11.5px;
            font-weight: bold;
            cursor: pointer;
          }
          .btn-open:hover {
            background: #047857;
          }
          .btn-copy {
            display: inline-block;
            padding: 5px 10px;
            border-radius: 6px;
            background: #F1F5F9;
            color: #334155;
            border: 1px solid #CBD5E1;
            font-size: 11px;
            font-weight: 600;
            cursor: pointer;
          }
          .btn-copy:hover {
            background: #E2E8F0;
          }
          .footer-note {
            text-align: center;
            padding: 24px;
            font-size: 12.5px;
            color: #64748B;
            border-top: 1px solid #E2E8F0;
            background: #F8FAFC;
          }
          .toast {
            position: fixed;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%);
            background: #0F172A;
            color: #FFFFFF;
            padding: 10px 20px;
            border-radius: 9999px;
            font-size: 13px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            display: none;
            z-index: 9999;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="badge-row">
              <span class="badge">Google Search Console &amp; AdSense Compliant</span>
              <span class="badge badge-green">مفتوح ومباشر بدون تسجيل دخول (No Login Required)</span>
              <span class="badge">النطاق الرسمي: hanan.pro</span>
            </div>
            <h1>خريطة الموقع الرسمية الشاملة (Sitemap.xml)</h1>
            <p class="desc">
              تتضمن هذه الخريطة كافة عناوين URL والروابط الرسمية المعتمدة لمنصة عقارات النخبة (hanan.pro)، بما في ذلك الصفحة الرئيسية، مقالات المدونة العقارية المعتمدة الـ 24، والمنتجات الرقمية. الروابط متاحة بصورة حرة ومباشرة لكافة روبوتات الفهرسة والمستخدمين دون أي حاجز تسجيل دخول.
            </p>
            <div class="meta-stats">
              <div class="stat-pill">
                عدد الروابط المفهرسة: <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong>
              </div>
              <div class="stat-pill">
                النطاق الأساسي: <strong>hanan.pro</strong>
              </div>
              <div class="stat-pill">
                البروتوكول: <strong>Sitemaps.org 0.9 XML</strong>
              </div>
              <div class="stat-pill">
                حالة الفهرسة: <strong>جاهز ومعتمد 2026</strong>
              </div>
            </div>
          </div>

          <div class="content-body">
            <div class="controls-bar">
              <input type="text" id="filterInput" class="search-input" placeholder="🔍 ابحث في الروابط (رقم المقال، القسم، الرابط)..." onkeyup="filterTable()" />
              <div class="btn-group">
                <button type="button" class="btn btn-secondary" onclick="copyAllLinks()">📋 نسخ كافة الروابط (37)</button>
                <a href="/sitemap.html" class="btn btn-outline">استعراض HTML Sitemap</a>
                <a href="/" class="btn btn-home">زيارة الموقع الرئيسي</a>
              </div>
            </div>

            <div class="table-wrapper">
              <table id="sitemapTable">
                <thead>
                  <tr>
                    <th style="width: 45px;">#</th>
                    <th>عنوان الرابط الرسمي (URL Location)</th>
                    <th style="width: 90px;">الأولوية</th>
                    <th style="width: 100px;">دورية التحديث</th>
                    <th style="width: 105px;">آخر تعديل</th>
                    <th style="width: 150px; text-align: center;">إجراءات مباشرة</th>
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="sitemap:urlset/sitemap:url">
                    <tr>
                      <td style="color: #64748B; font-weight: bold;"><xsl:value-of select="position()"/></td>
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
                        <div class="action-cells">
                          <a class="btn-open" href="{sitemap:loc}">فتح الرابط</a>
                          <button type="button" class="btn-copy" onclick="copySingleLink('{sitemap:loc}')">نسخ</button>
                        </div>
                      </td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </div>
          </div>

          <div class="footer-note">
            تم توليد هذه الصفحة آلياً عبر محول XSL لخريطة الموقع XML | معتمدة ومفتوحة للزواحف ومحركات البحث Googlebot وBingbot وGoogle AdSense 2026 | خالية من أي تسجيل دخول
          </div>
        </div>

        <div id="toast" class="toast">تم النسخ بنجاح!</div>

        <script type="text/javascript">
          function showToast(text) {
            var t = document.getElementById('toast');
            if (!t) return;
            t.innerText = text;
            t.style.display = 'block';
            setTimeout(function() {
              t.style.display = 'none';
            }, 3000);
          }

          function copySingleLink(url) {
            if (navigator.clipboard &amp;&amp; navigator.clipboard.writeText) {
              navigator.clipboard.writeText(url).then(function() {
                showToast('تم نسخ الرابط: ' + url);
              });
            } else {
              var ta = document.createElement('textarea');
              ta.value = url;
              document.body.appendChild(ta);
              ta.select();
              document.execCommand('copy');
              document.body.removeChild(ta);
              showToast('تم نسخ الرابط بنجاح');
            }
          }

          function copyAllLinks() {
            var links = [];
            var nodes = document.querySelectorAll('#sitemapTable tbody tr td a.url-link');
            for (var i = 0; i &lt; nodes.length; i++) {
              links.push(nodes[i].innerText.trim());
            }
            var text = links.join('\n');
            if (navigator.clipboard &amp;&amp; navigator.clipboard.writeText) {
              navigator.clipboard.writeText(text).then(function() {
                showToast('تم نسخ جميع الروابط الـ (' + links.length + ') بنجاح!');
              });
            } else {
              var ta = document.createElement('textarea');
              ta.value = text;
              document.body.appendChild(ta);
              ta.select();
              document.execCommand('copy');
              document.body.removeChild(ta);
              showToast('تم نسخ جميع الروابط بنجاح!');
            }
          }

          function filterTable() {
            var q = document.getElementById('filterInput').value.toLowerCase();
            var rows = document.querySelectorAll('#sitemapTable tbody tr');
            for (var i = 0; i &lt; rows.length; i++) {
              var text = rows[i].innerText.toLowerCase();
              if (text.indexOf(q) !== -1) {
                rows[i].style.display = '';
              } else {
                rows[i].style.display = 'none';
              }
            }
          }

          // Smart Navigation Handler:
          // If the user clicks "فتح الرابط" while viewing in any preview host or localhost,
          // smoothly navigate on the active working server to immediately display the content without triggering external Google Account sign-in!
          document.addEventListener('DOMContentLoaded', function() {
            var openBtns = document.querySelectorAll('a.btn-open, a.url-link');
            openBtns.forEach(function(btn) {
              btn.addEventListener('click', function(e) {
                var href = btn.getAttribute('href');
                if (!href) return;
                try {
                  var targetUrl = new URL(href, window.location.href);
                  // If we are currently browsing on preview or dev domain (not yet live hanan.pro in DNS),
                  // navigate on the current working host so the user experiences zero 404 and zero login prompts!
                  if (window.location.hostname !== 'hanan.pro' &amp;&amp; window.location.hostname !== 'www.hanan.pro') {
                    e.preventDefault();
                    var localDestination = window.location.origin + targetUrl.pathname + targetUrl.search + targetUrl.hash;
                    window.location.href = localDestination;
                  }
                } catch(err) {
                  // Standard navigation fallback
                }
              });
            });
          });
        </script>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
