import React, { useState } from 'react';
import Reveal from './Reveal';
import { parseRupees, formatRupees } from '../utils/format';

const PILLARS = [
  {
    label: 'Gravitational core',
    title: 'Annealed bell-brass alloy',
    text: 'Not hollow plastic or chippable pot metal. Our artisans forge solid, dense brass with a reassuring, heirloom heft.',
  },
  {
    label: 'Layered finish',
    title: 'Dual-bath gold-tone coat',
    text: 'Long, layered immersion baths build a deep, even gold tone — warm and rich, never brassy or glittery.',
  },
  {
    label: 'Ceramic seal',
    title: 'Nano-optical anti-tarnish',
    text: 'A baked, clear ceramic shield against sweat, humidity and sulphur. No green skin staining — and a five-year wear guarantee.',
  },
];

const TIERS = {
  minimal: {
    label: 'Daily essentials',
    desc: 'Herringbone chain + minimal solitaire + drop studs',
    realGoldPrice: '₹1,45,000',
    subhalaxmiPrice: '₹1,990',
    peaceOfMind: 'Wear it to the office, the gym, the café — without a second thought.',
  },
  festive: {
    label: 'Festive parure',
    desc: 'Temple choker + two Kadambari bangles + Mayur chandbalis',
    realGoldPrice: '₹4,80,000',
    subhalaxmiPrice: '₹4,250',
    peaceOfMind: 'Travel by train or plane with zero locker or insurance headaches.',
  },
  bridal: {
    label: 'Full bridal suite',
    desc: 'Padmavati haram + choker + kadas + matha patti + rings',
    realGoldPrice: '₹9,20,000',
    subhalaxmiPrice: '₹7,850',
    peaceOfMind: 'Put the other nine lakhs towards a home, a honeymoon, or the future.',
  },
};

export default function ScienceSection() {
  const [activeTier, setActiveTier] = useState('bridal');
  const current = TIERS[activeTier];
  const real = parseRupees(current.realGoldPrice);
  const ours = parseRupees(current.subhalaxmiPrice);
  const kept = real - ours;
  const pct = ((kept / real) * 100).toFixed(1);
  const oursWidth = Math.max((ours / real) * 100, 1.5);

  return (
    <section id="about" className="section section--dark">
      <div className="container">
        <Reveal className="science__intro">
          <div>
            <p className="eyebrow">The craft</p>
            <h2 className="display h2" style={{ marginTop: 18 }}>
              The science of looking <em>priceless</em>.
            </h2>
          </div>
          <p className="lead">
            Gold in a vault doesn’t shine. Subhalaxmi was born to rescue wedding luxury from multi-lakh debts and
            constant worry. Every piece pairs heavy brass with a rich gold-tone finish — light on the pocket, heavy on
            the look.
          </p>
        </Reveal>

        <ol className="pillars">
          {PILLARS.map((p, i) => (
            <Reveal as="li" key={p.title} className="pillar" delay={i * 120}>
              <span className="pillar__num">0{i + 1}</span>
              <span className="pillar__label">{p.label}</span>
              <h3 className="pillar__title">{p.title}</h3>
              <p className="pillar__text">{p.text}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="audit">
          <div className="audit__head">
            <div>
              <p className="eyebrow">Financial reality check</p>
              <h3 className="display h3">Bank locker vs. Subhalaxmi</h3>
            </div>
            <div className="segmented" role="tablist" aria-label="Jewellery set">
              {Object.entries(TIERS).map(([id, tier]) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={activeTier === id}
                  className={activeTier === id ? 'is-active' : ''}
                  onClick={() => setActiveTier(id)}
                >
                  {tier.label}
                </button>
              ))}
            </div>
          </div>

          <div className="audit__body">
            <div>
              <p className="audit__desc">{current.desc}</p>

              <div className="bar-row">
                <div className="bar-row__top">
                  <span className="bar-row__label">Real gold</span>
                  <span className="bar-row__value">{current.realGoldPrice}</span>
                </div>
                <div className="bar">
                  <div className="bar__fill" style={{ width: '100%' }} />
                </div>
                <p className="bar-row__note">Debt risk · locker fees · locked away 360 days a year</p>
              </div>

              <div className="bar-row">
                <div className="bar-row__top">
                  <span className="bar-row__label" style={{ color: 'var(--color-bone)' }}>
                    Subhalaxmi gold finish
                  </span>
                  <span className="bar-row__value">{current.subhalaxmiPrice}</span>
                </div>
                <div className="bar">
                  <div className="bar__fill bar__fill--brand" style={{ width: `${oursWidth}%` }} />
                </div>
                <p className="bar-row__note">The same presence on camera and on stage</p>
              </div>
            </div>

            <div className="audit__result" aria-live="polite">
              <p className="eyebrow eyebrow--plain">You keep</p>
              <div className="audit__keep">{formatRupees(kept)}</div>
              <div className="audit__pct">{pct}% of your capital, preserved</div>
              <p className="audit__peace">{current.peaceOfMind}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
