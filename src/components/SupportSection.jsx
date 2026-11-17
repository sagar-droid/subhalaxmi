import React, { useState } from 'react';
import { Plus, ArrowUpRight, ArrowRight, Check } from 'lucide-react';
import Reveal from './Reveal';
import { CARE_GUIDELINES } from '../data/products';
import { titleCase } from '../utils/format';

export default function SupportSection() {
  const [openItem, setOpenItem] = useState(CARE_GUIDELINES[0]?.num);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryNeed, setInquiryNeed] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setInquiryName('');
      setInquiryPhone('');
      setInquiryNeed('');
    }, 4000);
  };

  return (
    <section id="support" className="section section--mist">
      <div className="container support__grid">
        <Reveal>
          <p className="eyebrow">Client care</p>
          <h2 className="display h2" style={{ marginTop: 18 }}>
            Five years of <em>shine</em>, guaranteed.
          </h2>
          <p className="lead">
            A little care keeps the gold tone glowing for years. And if it ever dims within five, we’ll refinish it
            — on us.
          </p>

          <div className="accordion">
            {CARE_GUIDELINES.map((item) => {
              const open = openItem === item.num;
              return (
                <div key={item.num} className={`acc-item ${open ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="acc-trigger"
                    aria-expanded={open}
                    aria-controls={`care-${item.num}`}
                    onClick={() => setOpenItem(open ? null : item.num)}
                  >
                    <span className="acc-num">{item.num}</span>
                    <span className="acc-title">{titleCase(item.title)}</span>
                    <Plus className="acc-icon" strokeWidth={1.5} />
                  </button>
                  <div id={`care-${item.num}`} className={`collapse ${open ? 'is-open' : ''}`}>
                    <div className="acc-panel">
                      <p>{item.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal className="concierge" delay={150}>
          <p className="eyebrow">Concierge</p>
          <h3 className="display h3">Speak to the atelier</h3>
          <p>
            Sizing for kadas, custom lengths for bridal harams, or claiming your complimentary refinish — our
            Jaipur and South India team is on call.
          </p>

          <a
            href="https://wa.me/?text=Hello%20Subhalaxmi,%20I%20am%20inquiring%20about%20your%20gold-finish%20jewellery."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--solid btn--block"
          >
            Chat on WhatsApp <ArrowUpRight />
          </a>

          <div className="divider-text">or request a callback</div>

          <form onSubmit={handleSubmit} className="form-stack">
            <div className="field">
              <input
                id="inq-name"
                type="text"
                required
                placeholder=" "
                autoComplete="name"
                value={inquiryName}
                onChange={(e) => setInquiryName(e.target.value)}
              />
              <label htmlFor="inq-name">Full name</label>
            </div>
            <div className="field">
              <input
                id="inq-phone"
                type="tel"
                required
                placeholder=" "
                autoComplete="tel"
                value={inquiryPhone}
                onChange={(e) => setInquiryPhone(e.target.value)}
              />
              <label htmlFor="inq-phone">WhatsApp / mobile number</label>
            </div>
            <div className="field">
              <input
                id="inq-need"
                type="text"
                placeholder=" "
                value={inquiryNeed}
                onChange={(e) => setInquiryNeed(e.target.value)}
              />
              <label htmlFor="inq-need">Piece of interest (optional)</label>
            </div>

            <button type="submit" className="btn btn--ghost btn--block" disabled={submitted}>
              {submitted ? (
                <>
                  Request received <Check />
                </>
              ) : (
                <>
                  Request a callback <ArrowRight className="nudge" />
                </>
              )}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
