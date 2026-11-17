import React, { useEffect, useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { titleCase, parseRupees } from '../utils/format';

export default function ProductCard({ product, onClick, onAdd, index = 0 }) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return undefined;
    const t = setTimeout(() => setAdded(false), 1600);
    return () => clearTimeout(t);
  }, [added]);

  const name = titleCase(product.name);
  const realGold = parseRupees(product.realGoldCost);

  return (
    <article className="card" style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}>
      <div style={{ position: 'relative' }}>
        <button type="button" className="card__media" onClick={() => onClick(product)} aria-label={`View ${name}`}>
          <img src={product.image} alt={name} loading="lazy" />
          <span className="card__badge">{titleCase(product.toneLabel)}</span>
          <span className="card__view">Quick view</span>
        </button>
        <div className="card__add-wrap">
          <button
            type="button"
            className="card__add-btn"
            onClick={() => {
              onAdd(product);
              setAdded(true);
            }}
            aria-label={`Add ${name} to bag`}
          >
            {added ? <Check /> : <Plus />}
          </button>
        </div>
      </div>

      <div className="card__body" onClick={() => onClick(product)}>
        <p className="card__meta">{titleCase(product.categoryLabel)}</p>
        <h3 className="card__title">{name}</h3>
        <div className="card__price">
          <span>From ₹{product.priceNum.toLocaleString('en-IN')}</span>
          {realGold > 0 && <s aria-label={`Real gold price ${product.realGoldCost}`}>{product.realGoldCost}</s>}
        </div>
      </div>
    </article>
  );
}
