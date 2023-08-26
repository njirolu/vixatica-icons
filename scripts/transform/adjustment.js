function adjustment(svg) {
  return svg
    .replace(/height="(\${[^}]+})"/g, 'height=$1')
    .replace(/width="(\${[^}]+})"/g, 'width=$1')
    .replace(/stroke="(\${[^}]+})"/g, 'stroke=$1')
    .replace(/fill="(\${[^}]+})"/g, 'fill=$1');
}

module.exports = adjustment;
