import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Check } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from './data/products';
import TopWordmark from './components/TopWordmark';
import HeroSplit from './components/HeroSplit';
import ProductGrid from './components/ProductGrid';
import FilterDrawer from './components/FilterDrawer';
import ProductModal from './components/ProductModal';
import VitrineTray from './components/VitrineTray';
import EditorialBreak from './components/EditorialBreak';
import ScienceSection from './components/ScienceSection';
import JournalSection from './components/JournalSection';
import SupportSection from './components/SupportSection';
import BottomNav from './components/BottomNav';
import { titleCase } from './utils/format';

const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function App() {
  // Navigation State
  const [activeNav, setActiveNav] = useState('shop');

  // Filter States
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTone, setSelectedTone] = useState('all');
  const [priceTier, setPriceTier] = useState('all');
  const [sortBy, setSortBy] = useState('curated');

  // Modal, Tray & Toast States
  const [inspectedProduct, setInspectedProduct] = useState(null);
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const [trayItems, setTrayItems] = useState([
    // Start with 1 sample item to demonstrate the bag
    { ...PRODUCTS[0], quantity: 1 },
  ]);
  const [toast, setToast] = useState(null);

  // Highlight the header link for the section currently in view
  useEffect(() => {
    const handleScroll = () => {
      const pos = window.scrollY + 200;
      const order = [
        ['support', 'support'],
        ['journal', 'journal'],
        ['about', 'about'],
      ];
      const hit = order.find(([elId]) => {
        const el = document.getElementById(elId);
        return el && pos >= el.offsetTop;
      });
      setActiveNav(hit ? hit[1] : 'shop');
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock page scroll + close on Escape while any overlay is open
  const anyOverlayOpen = isFilterOpen || isTrayOpen || Boolean(inspectedProduct);
  useEffect(() => {
    if (!anyOverlayOpen) return undefined;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (inspectedProduct) setInspectedProduct(null);
      else if (isTrayOpen) setIsTrayOpen(false);
      else setIsFilterOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [anyOverlayOpen, inspectedProduct, isTrayOpen]);

  // Auto-hide toast
  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (selectedCategory !== 'all') list = list.filter((p) => p.category === selectedCategory);
    if (selectedTone !== 'all') list = list.filter((p) => p.tone === selectedTone);

    if (priceTier === 'under-1500') list = list.filter((p) => p.priceNum < 1500);
    else if (priceTier === '1500-2500') list = list.filter((p) => p.priceNum >= 1500 && p.priceNum <= 2500);
    else if (priceTier === 'above-2500') list = list.filter((p) => p.priceNum > 2500);

    if (sortBy === 'price-asc') list.sort((a, b) => a.priceNum - b.priceNum);
    else if (sortBy === 'price-desc') list.sort((a, b) => b.priceNum - a.priceNum);

    return list;
  }, [selectedCategory, selectedTone, priceTier, sortBy]);

  const activeFilterCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedTone !== 'all' ? 1 : 0) +
    (priceTier !== 'all' ? 1 : 0) +
    (sortBy !== 'curated' ? 1 : 0);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedTone('all');
    setPriceTier('all');
    setSortBy('curated');
  };

  // Tray handlers
  const handleAddToTray = useCallback((product) => {
    setTrayItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setToast({ id: Date.now(), text: `${titleCase(product.name)} added to your bag` });
  }, []);

  const handleRemoveItem = (productId) => {
    setTrayItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
    } else {
      setTrayItems((prev) => prev.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item)));
    }
  };

  const handleNavigate = (item) => {
    setActiveNav(item.id);
    scrollToId(item.targetId);
  };

  const handleShopCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    scrollToId('collection');
  };

  const totalTrayCount = trayItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: 'var(--color-bone)' }}>
      <TopWordmark
        onOpenTray={() => setIsTrayOpen(true)}
        trayCount={totalTrayCount}
        activeNav={activeNav}
        onNavigate={handleNavigate}
      />

      <main>
        <HeroSplit
          onEnterClick={() => scrollToId('collection')}
          onLearnClick={() => scrollToId('about')}
          featured={PRODUCTS[4]}
          onFeatureClick={setInspectedProduct}
        />

        <ProductGrid
          products={filteredProducts}
          onProductClick={setInspectedProduct}
          onAddToTray={handleAddToTray}
          onOpenFilter={() => setIsFilterOpen(true)}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          categories={CATEGORIES}
          activeFilterCount={activeFilterCount}
          onResetFilters={handleResetFilters}
        />

        <EditorialBreak
          imageUrl="https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1920&q=85"
          alt="Gold jewellery in soft light"
          quote="Gold was never meant to live in a locker."
          cite="The Subhalaxmi philosophy"
        />

        <ScienceSection />

        <EditorialBreak
          imageUrl="https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?auto=format&fit=crop&w=1920&q=85"
          alt="Close-up of gold texture"
          quote="Worn at every celebration. Feared at none."
          cite="Made in Jaipur · Thrissur · Varanasi"
        />

        <JournalSection />

        <SupportSection />
      </main>

      <BottomNav onNavigate={handleNavigate} categories={CATEGORIES} onShopCategory={handleShopCategory} />

      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedTone={selectedTone}
        onSelectTone={setSelectedTone}
        priceTier={priceTier}
        onSelectPriceTier={setPriceTier}
        sortBy={sortBy}
        onSelectSortBy={setSortBy}
        onResetFilters={handleResetFilters}
        resultCount={filteredProducts.length}
      />

      <ProductModal
        product={inspectedProduct}
        onClose={() => setInspectedProduct(null)}
        onAddToTray={handleAddToTray}
      />

      <VitrineTray
        isOpen={isTrayOpen}
        onClose={() => setIsTrayOpen(false)}
        items={trayItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearTray={() => setTrayItems([])}
      />

      {toast && !isTrayOpen && (
        <div key={toast.id} className="toast" role="status">
          <Check />
          <span className="toast__text">{toast.text}</span>
          <button
            type="button"
            onClick={() => {
              setToast(null);
              setInspectedProduct(null);
              setIsTrayOpen(true);
            }}
          >
            View bag
          </button>
        </div>
      )}
    </div>
  );
}
