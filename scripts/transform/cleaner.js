const Svgo = require('svgo');

const plugins = [
  { name: 'cleanupAttrs' },
  { name: 'removeDoctype' },
  { name: 'removeXMLProcInst' },
  { name: 'removeComments' },
  { name: 'removeMetadata' },
  { name: 'removeTitle' },
  { name: 'removeDesc' },
  { name: 'removeUselessDefs' },
  { name: 'removeEditorsNSData' },
  { name: 'removeEmptyAttrs' },
  { name: 'removeHiddenElems' },
  { name: 'removeEmptyText' },
  { name: 'removeViewBox' },
  { name: 'cleanupEnableBackground' },
  { name: 'minifyStyles' },
  { name: 'convertStyleToAttrs' },
  { name: 'convertColors' },
  { name: 'convertPathData' },
  { name: 'convertTransform' },
  { name: 'removeUnknownsAndDefaults' },
  { name: 'removeNonInheritableGroupAttrs' },
  { name: 'removeUnusedNS' },
  { name: 'cleanupNumericValues' },
  { name: 'cleanupListOfValues' },
  { name: 'moveElemsAttrsToGroup' },
  { name: 'moveGroupAttrsToElems' },
  { name: 'collapseGroups' },
  { name: 'removeRasterImages' },
  { name: 'mergePaths' },
  { name: 'convertShapeToPath' },
  { name: 'sortAttrs' },
  { name: 'removeDimensions' },
  { name: 'removeElementsByAttr' },
  { name: 'removeStyleElement' },
  { name: 'removeScriptElement' },
  { name: 'removeEmptyContainers' },
  {
    name: 'removeAttrs',
    params: {
      attrs: '(fill|stroke)'
    }
  }
];

function hasFillAttribute(node) {
  return node.attributes.fill !== undefined;
}

function hasStrokeAttribute(node) {
  return node.attributes.stroke !== undefined;
}

function getFillOrStrokeAttribute(node, iconType) {
  const notSVG = node.name !== 'svg';
  if (notSVG && hasFillAttribute(node)) {
    return { fill: '${ color }' };
  }

  if (notSVG && hasStrokeAttribute(node)) {
    return { stroke: '${ color }', fill: 'none' };
  }

  for (const child of node.children) {
    return getFillOrStrokeAttribute(child);
  }
}

function clean(svg, svgTree, iconType) {
  const attribute = getFillOrStrokeAttribute(svgTree, iconType);
  const config = {
    floatPrecision: 4,
    multipass: true,
    plugins: [
      ...plugins,
      {
        name: 'addAttributesToSVGElement',
        params: {
          attributes: [attribute, { height: '${ height }' }, { width: '${ width }' }]
        }
      }
    ]
  };

  try {
    const cleaned = Svgo.optimize(svg, config);
    return cleaned.data;
  } catch (error) {
    return error;
  }
}

module.exports = clean;
