import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Reveal from './Reveal';
import { EDITORIAL_ARTICLES } from '../data/products';
import { titleCase } from '../utils/format';

export default function JournalSection() {
  const [activeArticle, setActiveArticle] = useState(null);

  return (
    <section id="journal" className="section">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">Journal</p>
            <h2 className="display h2">
              The archive of <em>illusion</em>
            </h2>
          </div>
          <p className="section-head__aside">
            Essays on value, craft and the quiet freedom of wearing your celebrations out loud.
          </p>
        </Reveal>

        <div className="essays">
          {EDITORIAL_ARTICLES.map((article, i) => {
            const open = activeArticle === article.id;
            return (
              <Reveal as="article" key={article.id} className="essay" delay={i * 120}>
                <div className="essay__top">
                  <span className="essay__no">No. 0{i + 1}</span>
                  <span>{article.readTime.toLowerCase()}</span>
                </div>
                <p className="eyebrow eyebrow--plain">{titleCase(article.date)}</p>
                <h3 className="essay__title">{titleCase(article.title)}</h3>
                <p className="essay__excerpt">{article.excerpt}</p>
                <button
                  type="button"
                  className="text-link essay__toggle"
                  aria-expanded={open}
                  aria-controls={`essay-${article.id}`}
                  onClick={() => setActiveArticle(open ? null : article.id)}
                  style={{ alignSelf: 'flex-start' }}
                >
                  {open ? 'Close essay' : 'Read essay'} <Plus />
                </button>
                <div id={`essay-${article.id}`} className={`collapse ${open ? 'is-open' : ''}`}>
                  <div>
                    <p className="essay__more">
                      “When gold is freed from the burden of speculative capital, it returns to its pure function: a
                      celebration of form and occasion. Subhalaxmi ornaments don’t ask you to sign promissory notes
                      or insure against burglary. They only ask to be worn in the light.”
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
