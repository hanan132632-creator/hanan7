import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryFilterBar } from './components/CategoryFilterBar';
import { ProductCard } from './components/ProductCard';
import { MortgageCalculatorModal } from './components/MortgageCalculatorModal';
import { QuickViewModal } from './components/QuickViewModal';
import { AiRoyalAdvisorModal } from './components/AiRoyalAdvisorModal';
import { CartDrawer } from './components/CartDrawer';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { PropertySubmitModal } from './components/PropertySubmitModal';
import { BlogSection } from './components/BlogSection';
import { SitemapSection } from './components/SitemapSection';
import { LegalPageModal } from './components/LegalPageModal';
import { Footer } from './components/Footer';

import { ProductItem, CategoryType, Currency, CartItem, LegalTabType } from './types';
import { MOCK_PRODUCTS } from './data/mockData';
import { Crown, Sparkles, Filter, Building2, Layers } from 'lucide-react';

export default function App() {
  // State variables
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [currency, setCurrency] = useState<Currency>('SAR');

  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<ProductItem[]>([]);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isAiAdvisorOpen, setIsAiAdvisorOpen] = useState(false);
  const [isMortgageCalcOpen, setIsMortgageCalcOpen] = useState(false);
  const [selectedMortgageProduct, setSelectedMortgageProduct] = useState<ProductItem | null>(null);
  
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPropertySubmitOpen, setIsPropertySubmitOpen] = useState(false);
  const [legalTabModal, setLegalTabModal] = useState<LegalTabType | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 4500);
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      const matchesQuery = searchQuery === '' || 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  // Counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryType, number> = {
      all: MOCK_PRODUCTS.length,
      real_estate: 0,
      gathering_games: 0,
      blueprints_2026: 0,
      canva_templates: 0,
      royal_collection: 0,
    };

    MOCK_PRODUCTS.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category] += 1;
      }
    });

    return counts;
  }, []);

  // Handlers
  const handleToggleFavorite = (product: ProductItem) => {
    setFavorites((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleAddToCart = (product: ProductItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { product, quantity: 1 }];
      }
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleDirectBuy = (product: ProductItem) => {
    handleAddToCart(product);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOpenMortgageCalc = (product?: ProductItem) => {
    setSelectedMortgageProduct(product || null);
    setIsMortgageCalcOpen(true);
  };

  const scrollToCatalog = () => {
    const element = document.getElementById('catalog');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToBlog = () => {
    const element = document.getElementById('blog-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSitemap = () => {
    const element = document.getElementById('sitemap-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      setLegalTabModal('sitemap');
    }
  };

  // Global listeners for direct in-app links (Quick View & Mortgage Calculator)
  useEffect(() => {
    const handleQuickViewEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const prodId = customEvent.detail;
      const found = MOCK_PRODUCTS.find((p) => p.id === prodId);
      if (found) {
        setQuickViewProduct(found);
      }
    };
    const handleMortgageEvent = () => {
      setIsMortgageCalcOpen(true);
    };
    window.addEventListener('open-quick-view-product', handleQuickViewEvent);
    window.addEventListener('open-mortgage-calc', handleMortgageEvent);
    return () => {
      window.removeEventListener('open-quick-view-product', handleQuickViewEvent);
      window.removeEventListener('open-mortgage-calc', handleMortgageEvent);
    };
  }, []);

  // Google Search & Direct Sitemap Navigation Router
  useEffect(() => {
    const handleRouteFromUrl = () => {
      try {
        const url = new URL(window.location.href);
        const pathname = url.pathname.toLowerCase();
        const hash = window.location.hash.replace('#', '').toLowerCase();
        const searchParams = url.searchParams;

        const tabParam = (searchParams.get('tab') || searchParams.get('page'))?.toLowerCase();
        const postParam = (searchParams.get('post') || searchParams.get('article'))?.toLowerCase();
        const prodParam = (searchParams.get('product') || searchParams.get('prop'))?.toLowerCase();
        const sectionParam = searchParams.get('section')?.toLowerCase();

        // 1. Sitemap Entry from Google or direct link
        if (
          pathname === '/sitemap' ||
          pathname === '/sitemap.html' ||
          hash === 'sitemap' ||
          tabParam === 'sitemap'
        ) {
          setLegalTabModal('sitemap');
          return;
        }

        // 2. Legal / Compliance Pages Entry
        const validTabs: LegalTabType[] = ['about', 'privacy', 'terms', 'contact', 'domain_verify'];
        for (const tab of validTabs) {
          if (pathname === `/${tab}` || hash === tab || tabParam === tab) {
            setLegalTabModal(tab);
            return;
          }
        }

        // 3. Direct Article Entry (e.g. ?post=post-1, #post-1, /blog/post-1)
        let targetPostId = postParam;
        if (!targetPostId && hash.startsWith('post-')) {
          targetPostId = hash;
        }
        if (!targetPostId && (pathname.startsWith('/blog/') || pathname.startsWith('/post/'))) {
          const parts = pathname.split('/');
          targetPostId = parts[parts.length - 1];
        }

        if (targetPostId) {
          window.dispatchEvent(new CustomEvent('open-blog-post', { detail: targetPostId }));
          setTimeout(() => {
            const el = document.getElementById(targetPostId as string) || document.getElementById('blog-section');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 250);
          return;
        }

        // 4. Direct Product Entry (e.g. ?product=prop-01, #prop-01)
        let targetProdId = prodParam;
        if (!targetProdId && (hash.startsWith('prop-') || hash.startsWith('game-') || hash.startsWith('blueprint-') || hash.startsWith('canva-') || hash.startsWith('royal-'))) {
          targetProdId = hash;
        }
        if (targetProdId) {
          const foundProd = MOCK_PRODUCTS.find((p) => p.id.toLowerCase() === targetProdId);
          if (foundProd) {
            setQuickViewProduct(foundProd);
            return;
          }
        }

        // 5. Section Scrolling
        if (sectionParam === 'catalog' || hash === 'catalog') {
          setTimeout(scrollToCatalog, 150);
        } else if (sectionParam === 'blog-section' || hash === 'blog-section') {
          setTimeout(scrollToBlog, 150);
        }
      } catch (e) {
        console.error('URL Route Error:', e);
      }
    };

    handleRouteFromUrl();
    window.addEventListener('hashchange', handleRouteFromUrl);
    window.addEventListener('popstate', handleRouteFromUrl);

    return () => {
      window.removeEventListener('hashchange', handleRouteFromUrl);
      window.removeEventListener('popstate', handleRouteFromUrl);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800 font-sans flex flex-col dir-rtl">
      
      {/* Glassmorphic Luxury Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currency={currency}
        setCurrency={setCurrency}
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        favoritesCount={favorites.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenAiAdvisor={() => setIsAiAdvisorOpen(true)}
        onOpenPropertySubmit={() => setIsPropertySubmitOpen(true)}
        onOpenLegalTab={(tab) => setLegalTabModal(tab)}
        onScrollToBlog={scrollToBlog}
        onScrollToCatalog={scrollToCatalog}
        onScrollToSitemap={scrollToSitemap}
      />

      {/* Hero Section */}
      <Hero
        onOpenMortgageCalculator={() => handleOpenMortgageCalc()}
        onOpenAiAdvisor={() => setIsAiAdvisorOpen(true)}
        onScrollToCatalog={scrollToCatalog}
      />

      {/* Filter Bar */}
      <CategoryFilterBar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        counts={categoryCounts}
      />

      {/* Product Catalog Section */}
      <main id="catalog" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Catalog Title Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase text-[#059669] tracking-wider block mb-1">
              المعروضات الحصرية المتاحة
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif-arabic flex items-center gap-2">
              <span>التشكيلة الملكية المعتمدة</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#064E3B]">
                {filteredProducts.length} عنصر
              </span>
            </h2>
          </div>

          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-rose-600 font-bold hover:underline self-start sm:self-center"
            >
              مسح البحث ("{searchQuery}")
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-900 font-serif-arabic">
              لم نجد نتائج مطابقة لمفردات البحث
            </h3>
            <p className="text-xs text-slate-500">
              جرّب التصفية بفئة أخرى أو ابحث باسم قصر، أو لعبة جمعات، أو قالب كانفا.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-[#18181B] text-[#D4AF37] text-xs font-bold"
            >
              عرض كافة المنتجات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currency={currency}
                isFavorite={favorites.some((f) => f.id === product.id)}
                onToggleFavorite={handleToggleFavorite}
                onAddToCart={handleAddToCart}
                onQuickView={(p) => setQuickViewProduct(p)}
                onCalculateMortgage={(p) => handleOpenMortgageCalc(p)}
                onDirectBuy={handleDirectBuy}
              />
            ))}
          </div>
        )}

      </main>

      {/* Blog & AdSense Compliance Section */}
      <BlogSection />

      {/* Direct Interactive Sitemap Section (37 Links directly under each other) */}
      <SitemapSection
        onOpenLegalTab={(tab) => setLegalTabModal(tab)}
        onSelectPost={(postId) => {
          window.dispatchEvent(new CustomEvent('open-blog-post', { detail: postId }));
          setTimeout(() => {
            const el = document.getElementById('blog-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        }}
        onSelectProduct={(product) => setQuickViewProduct(product)}
        onScrollToCatalog={scrollToCatalog}
      />

      {/* Footer */}
      <Footer
        onOpenLegalTab={(tab) => setLegalTabModal(tab)}
        onOpenPropertySubmit={() => setIsPropertySubmitOpen(true)}
        onScrollToSitemap={scrollToSitemap}
      />

      {/* --- MODALS & DRAWERS --- */}

      {/* AI Royal Advisor Modal */}
      {isAiAdvisorOpen && (
        <AiRoyalAdvisorModal onClose={() => setIsAiAdvisorOpen(false)} />
      )}

      {/* Mortgage Calculator Modal */}
      {isMortgageCalcOpen && (
        <MortgageCalculatorModal
          product={selectedMortgageProduct}
          currency={currency}
          onClose={() => setIsMortgageCalcOpen(false)}
          onRequestConsultation={(title, monthlyPay) => {
            setIsMortgageCalcOpen(false);
            showNotification(`تم تسجيل طلب الاستشارة للتمويل العقاري لعقار (${title}) بقسط شهري مقدر (${monthlyPay}). سيقوم مستشار النخبة بالتواصل معك فوراً.`);
          }}
        />
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          currency={currency}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
          onDirectBuy={handleDirectBuy}
          onOpenMortgageCalculator={(p) => handleOpenMortgageCalc(p)}
        />
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <CartDrawer
          cart={cart}
          currency={currency}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveCartItem}
          onProceedToCheckout={() => {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
          }}
        />
      )}

      {/* Favorites Drawer */}
      {isFavoritesOpen && (
        <FavoritesDrawer
          favorites={favorites}
          currency={currency}
          onClose={() => setIsFavoritesOpen(false)}
          onRemoveFavorite={handleToggleFavorite}
          onAddToCart={handleAddToCart}
          onQuickView={(p) => {
            setIsFavoritesOpen(false);
            setQuickViewProduct(p);
          }}
        />
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal
          cart={cart}
          currency={currency}
          onClose={() => setIsCheckoutOpen(false)}
          onSuccessOrder={() => setCart([])}
        />
      )}

      {/* Property Submit Modal */}
      {isPropertySubmitOpen && (
        <PropertySubmitModal onClose={() => setIsPropertySubmitOpen(false)} />
      )}

      {/* Legal Pages Modal */}
      {legalTabModal && (
        <LegalPageModal
          initialTab={legalTabModal}
          onClose={() => setLegalTabModal(null)}
          onSelectPost={(postId) => {
            setLegalTabModal(null);
            window.location.hash = postId;
            window.dispatchEvent(new CustomEvent('open-blog-post', { detail: postId }));
            setTimeout(() => {
              const el = document.getElementById(postId);
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
          }}
          onNavigateToHash={(hash) => {
            setLegalTabModal(null);
            window.location.hash = hash;
            const targetId = hash.replace('#', '');
            setTimeout(() => {
              const el = document.getElementById(targetId);
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
          }}
        />
      )}

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 left-6 sm:left-auto sm:max-w-md z-50 bg-[#18181B] text-white p-4 rounded-2xl border-2 border-[#D4AF37] shadow-2xl flex items-start gap-3 animate-fade-in">
          <div className="p-2 rounded-xl bg-[#059669] text-white shrink-0 mt-0.5">
            <Crown className="w-5 h-5 text-[#FAD961]" />
          </div>
          <div className="flex-1 text-xs sm:text-sm font-medium leading-relaxed">
            {toastMessage}
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white p-1"
          >
            ✕
          </button>
        </div>
      )}

    </div>
  );
}
