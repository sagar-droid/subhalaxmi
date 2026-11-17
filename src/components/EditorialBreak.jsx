import React from 'react';
import Reveal from './Reveal';

/** Full-bleed monochrome photograph with an optional pull-quote. */
export default function EditorialBreak({ imageUrl, alt = '', quote, cite }) {
  return (
    <Reveal as="section" className="editorial">
      <img className="editorial__img" src={imageUrl} alt={alt} loading="lazy" />
      {quote && (
        <div className="container editorial__quote">
          <blockquote>{quote}</blockquote>
          {cite && <cite>{cite}</cite>}
        </div>
      )}
    </Reveal>
  );
}
