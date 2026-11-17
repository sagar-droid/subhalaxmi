import React from 'react';
import { X } from 'lucide-react';
import { CATEGORIES, TONES } from '../data/products';
import { titleCase } from '../utils/format';

const PRICE_TIERS = [
  { id: 'all', label: 'Any price' },
  { id: 'under-1500', label: 'Under ₹1,500' },
  { id: '1500-2500', label: '₹1,500 – ₹2,500' },
  { id: 'above-2500', label: '₹2,500 & above' },
];

const SORTS = [
  { id: 'curated', label: 'Curated' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
];

function ChipGroup({ title, options, value, onChange, format = (o) => o.label }) {
  return (
    <div className="filter-group">
      <p className="eyebrow eyebrow--plain filter-group__title">{title}</p>
      <div className="chips">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            aria-pressed={value === o.id}
            className={`chip ${value === o.id ? 'is-active' : ''}`}
            onClick={() => onChange(o.id)}
          >
            {format(o)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function FilterDrawer({
  isOpen,
  onClose,
  selectedCategory,
  onSelectCategory,
  selectedTone,
  onSelectTone,
  priceTier,
  onSelectPriceTier,
  sortBy,
  onSelectSortBy,
  onResetFilters,
  resultCount,
}) {
  if (!isOpen) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="drawer__head">
          <h2 id="filter-title" className="drawer__title">
            Filter &amp; sort
          </h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close filters">
            <X />
          </button>
        </div>

        <div className="drawer__body">
          <ChipGroup
            title="Category"
            options={CATEGORIES}
            value={selectedCategory}
            onChange={onSelectCategory}
            format={(o) => (o.id === 'all' ? 'All pieces' : titleCase(o.label))}
          />
          <ChipGroup
            title="Gold finish"
            options={TONES}
            value={selectedTone}
            onChange={onSelectTone}
            format={(o) => (o.id === 'all' ? 'All finishes' : titleCase(o.label))}
          />
          <ChipGroup title="Price" options={PRICE_TIERS} value={priceTier} onChange={onSelectPriceTier} />

          <div className="filter-group">
            <p className="eyebrow eyebrow--plain filter-group__title">Sort by</p>
            <div role="radiogroup" aria-label="Sort by">
              {SORTS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  role="radio"
                  aria-checked={sortBy === s.id}
                  className={`option ${sortBy === s.id ? 'is-active' : ''}`}
                  onClick={() => onSelectSortBy(s.id)}
                >
                  <span>{s.label}</span>
                  <span className="radio" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="drawer__foot drawer__foot-row">
          <button type="button" className="text-link" onClick={onResetFilters}>
            Clear all
          </button>
          <button type="button" className="btn btn--solid" onClick={onClose} style={{ flex: 1, maxWidth: 260 }}>
            Show {resultCount} {resultCount === 1 ? 'piece' : 'pieces'}
          </button>
        </div>
      </aside>
    </div>
  );
}
