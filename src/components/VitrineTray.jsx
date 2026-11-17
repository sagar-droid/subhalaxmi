import React, { useState } from 'react';
import { X, Plus, Minus, ArrowRight, ArrowLeft, Check, ShoppingBag } from 'lucide-react';
import { titleCase, formatRupees } from '../utils/format';

const STEPS = [
  { id: 'review', label: 'Bag' },
  { id: 'address', label: 'Delivery' },
  { id: 'confirmed', label: 'Done' },
];

const PAYMENT_METHODS = [
  { id: 'cod', label: 'Cash on delivery', note: 'Verified by call' },
  { id: 'upi', label: 'UPI / card', note: 'Instant payment' },
];

export default function VitrineTray({ isOpen, onClose, items = [], onUpdateQuantity, onRemoveItem, onClearTray }) {
  const [checkoutStep, setCheckoutStep] = useState('review');
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'cod',
  });

  if (!isOpen) return null;

  const count = items.reduce((acc, i) => acc + i.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.priceNum * item.quantity, 0);
  const estimatedRealGold = subtotal * 140; // ~140× equivalent for real gold
  const kept = estimatedRealGold - subtotal;

  const update = (key) => (e) => setShippingAddress({ ...shippingAddress, [key]: e.target.value });

  const handleDispatchOrder = (e) => {
    e.preventDefault();
    setCheckoutStep('confirmed');
  };

  const resetAndClose = () => {
    onClearTray();
    setCheckoutStep('review');
    onClose();
  };

  const stepIndex = STEPS.findIndex((s) => s.id === checkoutStep);

  return (
    <div className="overlay" onClick={onClose}>
      <aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bag-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="drawer__head">
          <h2 id="bag-title" className="drawer__title">
            Your bag<sup>({count})</sup>
          </h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close bag">
            <X />
          </button>
        </div>

        {items.length > 0 && (
          <ol className="steps" aria-label="Checkout progress">
            {STEPS.map((s, i) => (
              <li
                key={s.id}
                data-n={i < stepIndex ? '✓' : i + 1}
                className={i <= stepIndex ? 'is-active' : ''}
                aria-current={i === stepIndex ? 'step' : undefined}
              >
                {s.label}
              </li>
            ))}
          </ol>
        )}

        <div className="drawer__body">
          {checkoutStep === 'review' &&
            (items.length === 0 ? (
              <div className="bag-empty">
                <ShoppingBag size={36} strokeWidth={1.2} style={{ margin: '0 auto' }} />
                <p>Your bag is empty.</p>
                <button type="button" className="btn btn--ghost" onClick={onClose}>
                  Explore the collection
                </button>
              </div>
            ) : (
              <div>
                {items.map((item) => (
                  <div key={item.id} className="bag-item">
                    <img src={item.image} alt="" />
                    <div className="bag-item__info">
                      <div>
                        <div className="bag-item__title">{titleCase(item.name)}</div>
                        <div className="bag-item__meta">{titleCase(item.toneLabel)}</div>
                      </div>
                      <div className="bag-item__row">
                        <div className="stepper">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus />
                          </button>
                          <span aria-live="polite">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus />
                          </button>
                        </div>
                        <span className="bag-item__price">{formatRupees(item.priceNum * item.quantity)}</span>
                      </div>
                      <div style={{ marginTop: 10 }}>
                        <button type="button" className="remove-link" onClick={() => onRemoveItem(item.id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}

          {checkoutStep === 'address' && (
            <form id="dispatch-form" onSubmit={handleDispatchOrder} className="form-stack">
              <p className="eyebrow eyebrow--plain" style={{ marginBottom: 4 }}>
                Delivery details
              </p>
              <div className="field">
                <input id="ship-name" required placeholder=" " autoComplete="name" value={shippingAddress.name} onChange={update('name')} />
                <label htmlFor="ship-name">Recipient name</label>
              </div>
              <div className="field">
                <input id="ship-phone" type="tel" required placeholder=" " autoComplete="tel" value={shippingAddress.phone} onChange={update('phone')} />
                <label htmlFor="ship-phone">Mobile number</label>
              </div>
              <div className="field">
                <input id="ship-address" required placeholder=" " autoComplete="street-address" value={shippingAddress.address} onChange={update('address')} />
                <label htmlFor="ship-address">Street address</label>
              </div>
              <div className="field-row">
                <div className="field">
                  <input id="ship-city" required placeholder=" " autoComplete="address-level2" value={shippingAddress.city} onChange={update('city')} />
                  <label htmlFor="ship-city">City</label>
                </div>
                <div className="field">
                  <input id="ship-pin" required placeholder=" " inputMode="numeric" autoComplete="postal-code" value={shippingAddress.pincode} onChange={update('pincode')} />
                  <label htmlFor="ship-pin">Pincode</label>
                </div>
              </div>

              <p className="eyebrow eyebrow--plain" style={{ marginTop: 32 }}>
                Payment
              </p>
              <div className="pay-options" role="radiogroup" aria-label="Payment method">
                {PAYMENT_METHODS.map((m) => {
                  const active = shippingAddress.paymentMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      className={`pay-option ${active ? 'is-active' : ''}`}
                      onClick={() => setShippingAddress({ ...shippingAddress, paymentMethod: m.id })}
                    >
                      <span className="radio" style={{ marginTop: 1 }} />
                      <span>
                        {m.label}
                        <small>{m.note}</small>
                      </span>
                    </button>
                  );
                })}
              </div>
            </form>
          )}

          {checkoutStep === 'confirmed' && (
            <div className="confirm">
              <div className="confirm__icon">
                <Check strokeWidth={1.5} />
              </div>
              <p className="eyebrow eyebrow--plain">Order placed</p>
              <h3 className="display h3">Your pieces are being prepared</h3>
              <p>
                We’ll send dispatch and tracking details to {shippingAddress.phone || 'your phone'}. Every order ships
                in a velvet pouch with a complimentary 5-year care passport.
              </p>
              <button type="button" className="btn btn--solid" onClick={resetAndClose}>
                Continue shopping
              </button>
            </div>
          )}
        </div>

        {checkoutStep === 'review' && items.length > 0 && (
          <div className="drawer__foot">
            <div className="savings">
              <div className="savings__row">
                <span>Real gold equivalent</span>
                <s>{formatRupees(estimatedRealGold)}</s>
              </div>
              <div className="savings__row savings__row--strong">
                <span>You keep</span>
                <span>{formatRupees(kept)}</span>
              </div>
            </div>
            <div className="total-row">
              <span className="total-row__label">Subtotal</span>
              <span className="total-row__value">{formatRupees(subtotal)}</span>
            </div>
            <button type="button" className="btn btn--solid btn--block" onClick={() => setCheckoutStep('address')}>
              Checkout <ArrowRight className="nudge" />
            </button>
          </div>
        )}

        {checkoutStep === 'address' && (
          <div className="drawer__foot">
            <div className="total-row">
              <span className="total-row__label">Total</span>
              <span className="total-row__value">{formatRupees(subtotal)}</span>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                type="button"
                className="icon-btn"
                style={{ width: 54, height: 54 }}
                onClick={() => setCheckoutStep('review')}
                aria-label="Back to bag"
              >
                <ArrowLeft />
              </button>
              <button type="submit" form="dispatch-form" className="btn btn--solid" style={{ flex: 1 }}>
                Place order <ArrowRight className="nudge" />
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
