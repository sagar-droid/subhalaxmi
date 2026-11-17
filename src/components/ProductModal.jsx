import React, { useEffect, useState } from 'react';
import { X, ShoppingBag, Check, MessageCircle, ShieldCheck, RefreshCw, Truck } from 'lucide-react';
import { titleCase, parseRupees, savingsPercent } from '../utils/format';

const SPEC_LABELS = {
  core: 'Core metal',
  plating: 'Finish',
  coating: 'Protective coat',
  weight: 'Weight',
  stones: 'Stones',
  origin: 'Atelier',
};

export default function ProductModal({ product, onClose, onAddToTray }) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setAdded(false);
  }, [product?.id]);

  useEffect(() => {
    if (!added) return undefined;
    const t = setTimeout(() => setAdded(false), 2500);
    return () => clearTimeout(t);
  }, [added]);

  if (!product) return null;

  const name = titleCase(product.name);
  const real = parseRupees(product.realGoldCost);
  const pct = savingsPercent(product.priceNum, real);

  const whatsappMessage = encodeURIComponent(
    `Hello Subhalaxmi, I'd like to order "${name}" (${product.price}). Please share availability and sizing.`
  );

  return (
    <div className="overlay overlay--center" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="icon-btn modal__close" onClick={onClose} aria-label="Close">
          <X />
        </button>

        <div className="modal__media">
          <img src={product.image} alt={name} />
          <span className="card__badge">{titleCase(product.toneLabel)}</span>
        </div>

        <div className="modal__body">
          <p className="eyebrow">{titleCase(product.categoryLabel)}</p>
          <h2 id="modal-title" className="display modal__title">
            {name}
          </h2>
          <p className="modal__price">{product.price.replace(' - ', ' – ')}</p>

          <div className="compare">
            <div className="compare__cell">
              <div className="compare__label">Real gold</div>
              <div className="compare__value">
                <s>{product.realGoldCost}</s>
              </div>
            </div>
            <div className="compare__cell compare__cell--brand">
              <div className="compare__label">Subhalaxmi</div>
              <div className="compare__value">₹{product.priceNum.toLocaleString('en-IN')}</div>
            </div>
            <div className="compare__foot">{pct}% less — with the same rich look</div>
          </div>

          <p className="modal__desc">{product.description}</p>

          <dl className="specs">
            {Object.entries(product.specs).map(([key, val]) => (
              <div key={key} className="specs__row">
                <dt>{SPEC_LABELS[key] || key}</dt>
                <dd>{val}</dd>
              </div>
            ))}
          </dl>

          <div className="modal__actions">
            <button
              type="button"
              className="btn btn--solid btn--block"
              onClick={() => {
                onAddToTray(product);
                setAdded(true);
              }}
            >
              {added ? (
                <>
                  Added to bag <Check />
                </>
              ) : (
                <>
                  Add to bag <ShoppingBag />
                </>
              )}
            </button>
            <a
              href={`https://wa.me/?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost btn--block"
            >
              Order on WhatsApp <MessageCircle />
            </a>
          </div>

          <ul className="assurances">
            <li>
              <ShieldCheck />
              Anti-tarnish ceramic seal
            </li>
            <li>
              <RefreshCw />
              Free re-dip for 5 years
            </li>
            <li>
              <Truck />
              Cash on delivery
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
