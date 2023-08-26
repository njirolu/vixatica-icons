const svgson = require('svgson');

function parse(svg) {
  return svgson.parseSync(svg);
}

module.exports = parse;
