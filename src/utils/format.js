const SMALL_WORDS = new Set(['and', 'of', 'the', 'a', 'an', 'in', 'on', 'for', 'to', 'with', 'by', 'or', 'vs']);

/** "ROYAL RAJPUTANA CHOKER" → "Royal Rajputana Choker" (words with digits stay uppercase) */
export function titleCase(input = '') {
  return String(input)
    .toLowerCase()
    .split(' ')
    .map((word, i) => {
      if (!word) return word;
      if (i > 0 && SMALL_WORDS.has(word)) return word;
      return word
        .split('-')
        .map((part) =>
          /\d/.test(part) ? part.toUpperCase() : part.replace(/(^|[/(])(\p{L})/gu, (_, p, ch) => p + ch.toUpperCase())
        )
        .join('-');
    })
    .join(' ');
}

export const parseRupees = (value = '') => Number(String(value).replace(/[^\d]/g, '')) || 0;

export const formatRupees = (n) => `₹${Math.round(n).toLocaleString('en-IN')}`;

export const savingsPercent = (price, real) =>
  real ? Math.floor((1 - price / real) * 1000) / 10 : 0;
