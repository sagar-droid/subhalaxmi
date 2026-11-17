import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import ProductCard from './ProductCard';
import Reveal from './Reveal';
import { titleCase } from '../utils/format';

export default function ProductGrid({
  products,
  onProductClick,
  onAddToTray,
  onOpenFilter,
  selectedCategory,
  onSelectCategory,
  categories,
  activeFilterCount = 0,
  onResetFilters,
}) {
  return (
    <section id="collection" className="section">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">The collection</p>
            <h2 className="display h2">
              Democratised <em>royalty</em>
            </h2>
          </div>
          <p className="section-head__aside">
            Chokers, kadas, jhumkas and full bridal parures — each one cast in dense brass and finished in
            a rich gold tone. Showing <strong style={{ fontWeight: 500 }}>{products.length}</strong>{' '}
            {products.length === 1 ? 'piece' : 'pieces'}.
          </p>
        </Reveal>

        <div className="toolbar">
          <div className="chips" role="tablist" aria-label="Categories">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat.id}
                className={`chip ${selectedCategory === cat.id ? 'is-active' : ''}`}
                onClick={() => onSelectCategory(cat.id)}
              >
                {cat.id === 'all' ? 'All pieces' : titleCase(cat.label)}
              </button>
            ))}
          </div>
          <button
            type="button"
            className={`chip filter-btn ${activeFilterCount > 0 ? 'is-active' : ''}`}
            onClick={onOpenFilter}
            aria-label={`Filter and sort${activeFilterCount ? `, ${activeFilterCount} active` : ''}`}
          >
            <SlidersHorizontal />
            <span className="filter-btn__label">Filter &amp; sort</span>
            {activeFilterCount > 0 && <span className="chip__badge">{activeFilterCount}</span>}
          </button>
        </div>

        {products.length === 0 ? (
          <div className="empty">
            <p>Nothing matches those filters — yet.</p>
            <button type="button" className="btn btn--ghost" onClick={onResetFilters}>
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {products.map((product, i) => (
              <ProductCard
                key={product.id}
                index={i}
                product={product}
                onClick={onProductClick}
                onAdd={onAddToTray}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
