const adjustment = require('./adjustment');
const clean = require('./cleaner');
const parse = require('./parse');

function transformer(svg, iconType) {
  const parsed = parse(svg);
  const cleaned = clean(svg, parsed, iconType);
  const adjustmented = adjustment(cleaned);
  return adjustmented;
}

module.exports = transformer;
