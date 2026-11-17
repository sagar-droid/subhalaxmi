import React, { useEffect, useRef, useState } from 'react';
import { Menu, ShoppingBag, X, ArrowUpRight } from 'lucide-react';
import ConcentricMark from './ConcentricMark';

export const NAV_ITEMS = [
  { id: 'shop', label: 'Shop', targetId: 'collection' },
  { id: 'about', label: 'The Craft', targetId: 'about' },
  { id: 'journal', label: 'Journal', targetId: 'journal' },
  { id: 'support', label: 'Care', targetId: 'support' },
];

export default function TopWordmark({ onOpenTray, trayCount = 0, activeNav, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bump, setBump] = useState(false);
  const prevCount = useRef(trayCount);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Pulse the bag counter whenever something is added
  useEffect(() => {
    if (trayCount > prevCount.current) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 500);
      prevCount.current = trayCount;
      return () => clearTimeout(t);
    }
    prevCount.current = trayCount;
    return undefined;
  }, [trayCount]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const go = (item) => {
    setMenuOpen(false);
    onNavigate(item);
  };

  return (
    <>
      <div className="announce" role="note">
        <span>Free 5-year re-dip on every piece</span>
        <span>Cash on delivery across India</span>
        <span>Shipped in velvet, discreetly</span>
      </div>

      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container site-header__inner">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              type="button"
              className="icon-btn menu-toggle"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu />
            </button>
            <nav className="site-nav" aria-label="Primary">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`site-nav__link ${activeNav === item.id ? 'is-active' : ''}`}
                  onClick={() => go(item)}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <a
            href="#top"
            className="brand"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label="Subhalaxmi home"
          >
            <ConcentricMark size={30} strokeWidth={1} />
            <span className="brand__text">
              <span className="brand__name">Subhalaxmi</span>
              <span className="brand__sub">Gold-Finish Jewellery</span>
            </span>
          </a>

          <div className="header-actions">
            <button type="button" className="bag-btn" onClick={onOpenTray} aria-label={`Open bag, ${trayCount} items`}>
              <ShoppingBag />
              <span className="bag-btn__label">Bag</span>
              <span className={`bag-btn__count ${bump ? 'bump' : ''}`}>{trayCount}</span>
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="mobile-menu__top">
            <span className="brand__name">Subhalaxmi</span>
            <button type="button" className="icon-btn" onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <X />
            </button>
          </div>
          <nav className="mobile-menu__links" aria-label="Mobile">
            {NAV_ITEMS.map((item, i) => (
              <button
                key={item.id}
                type="button"
                className="mobile-menu__link"
                style={{ animationDelay: `${80 + i * 70}ms` }}
                onClick={() => go(item)}
              >
                <small>0{i + 1}</small>
                {item.label}
              </button>
            ))}
          </nav>
          <a
            className="btn btn--solid btn--block"
            href="https://wa.me/?text=Hello%20Subhalaxmi,%20I%20am%20inquiring%20about%20your%20gold-finish%20jewellery."
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat with the atelier <ArrowUpRight />
          </a>
        </div>
      )}
    </>
  );
}
