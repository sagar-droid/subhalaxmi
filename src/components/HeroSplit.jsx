import React from 'react';
import { ArrowRight } from 'lucide-react';
import ConcentricMark from './ConcentricMark';
import { titleCase } from '../utils/format';

const TICKER = [
  'Light on the pocket, heavy on the look',
  'Rich gold-tone finish',
  'Solid brass core',
  'Anti-tarnish ceramic seal',
  'Hypoallergenic',
  'Free 5-year re-dip',
  'Handcrafted in Jaipur, Thrissur & Varanasi',
];

export default function HeroSplit({ onEnterClick, onLearnClick, featured, onFeatureClick }) {
  return (
    <>
      <section className="hero" id="top">
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="eyebrow rise">Gold-finish jewellery · Handcrafted in India</p>

            <h1 className="display h1 hero__title rise" style={{ animationDelay: '100ms' }}>
              Light on the pocket,
              <br />
              <em>heavy</em> on the look.
            </h1>

            <p className="lead rise" style={{ animationDelay: '200ms' }}>
              Not gold — but you’d never know it. A rich gold-tone finish over solid brass gives every piece the
              warmth and presence of a family heirloom, at a tiny fraction of the price, with nothing to lock away.
            </p>

            <div className="hero__actions rise" style={{ animationDelay: '300ms' }}>
              <button type="button" className="btn btn--solid" onClick={onEnterClick}>
                Shop the collection <ArrowRight className="nudge" />
              </button>
              <button type="button" className="btn btn--ghost" onClick={onLearnClick}>
                How it’s made
              </button>
            </div>

            <div className="hero__stats rise" style={{ animationDelay: '400ms' }}>
              <div>
                <div className="stat__value">₹790</div>
                <div className="stat__label">Pieces from</div>
              </div>
              <div>
                <div className="stat__value">5 yrs</div>
                <div className="stat__label">Free re-dip</div>
              </div>
              <div>
                <div className="stat__value">99%</div>
                <div className="stat__label">Less than real gold</div>
              </div>
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero__mark" aria-hidden="true">
              <ConcentricMark size={240} strokeWidth={1.2} strokeColor="#d6d6d7" />
            </div>
            <div className="hero__arch">
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1400&q=85"
                alt="Gold-finish necklace on display"
                loading="eager"
              />
            </div>
            {featured && (
              <button type="button" className="hero__tag" onClick={() => onFeatureClick(featured)}>
                <img src={featured.image} alt="" />
                <span>
                  <span className="hero__tag-kicker">Featured piece</span>
                  <span className="hero__tag-name" style={{ display: 'block' }}>
                    {titleCase(featured.name)}
                  </span>
                  <span className="hero__tag-price">From ₹{featured.priceNum.toLocaleString('en-IN')}</span>
                </span>
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="marquee__item">
              {t}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
