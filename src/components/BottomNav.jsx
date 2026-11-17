import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import ConcentricMark from './ConcentricMark';
import { NAV_ITEMS } from './TopWordmark';
import { titleCase } from '../utils/format';

/** Site footer: brand, shop categories, navigation and an oversized wordmark. */
export default function BottomNav({ onNavigate, categories = [], onShopCategory }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <ConcentricMark size={44} strokeWidth={1} strokeColor="#ffffff" />
            <p>
              Gold-finish jewellery, made for wearing — not for locking away. No vault leases, no wealth
              anxiety.
            </p>
            <a
              className="btn btn--light btn--sm"
              href="https://wa.me/?text=Hello%20Subhalaxmi,%20I%20am%20inquiring%20about%20your%20gold-finish%20jewellery."
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp concierge <ArrowUpRight />
            </a>
          </div>

          <div className="footer__col">
            <h4>Shop</h4>
            <ul>
              {categories
                .filter((c) => c.id !== 'all')
                .map((c) => (
                  <li key={c.id}>
                    <button type="button" onClick={() => onShopCategory(c.id)}>
                      {titleCase(c.label)}
                    </button>
                  </li>
                ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4>Explore</h4>
            <ul>
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button type="button" onClick={() => onNavigate(item)}>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4>Ateliers</h4>
            <ul>
              <li><span style={{ fontWeight: 300 }}>Jaipur</span></li>
              <li><span style={{ fontWeight: 300 }}>Thrissur</span></li>
              <li><span style={{ fontWeight: 300 }}>Varanasi</span></li>
            </ul>
          </div>
        </div>

        <div className="footer__wordmark" aria-hidden="true">
          SUBHALAXMI
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Subhalaxmi</span>
          <span>Democratised beauty, worn fearlessly</span>
        </div>
      </div>
    </footer>
  );
}
