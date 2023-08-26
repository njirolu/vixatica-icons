const fs = require('fs');
const path = require('path');
const template = require('lodash.template');
const forEach = require('lodash.foreach');
const transformer = require('./transform');

const ROOT_PROJECT_FOLDER = path.join(__dirname, '..');
const generatePath = path.join(ROOT_PROJECT_FOLDER, 'src/icons');
const templatePath = path.join(ROOT_PROJECT_FOLDER, 'templates');
const dirPathIcon = path.join(ROOT_PROJECT_FOLDER, 'svg');
const fileExtension = '.svg';

function camelCase(filename) {
  const baseName = filename.replace('.svg', '');
  const words = baseName.split('-');
  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

function getIconFilesDir(directoryPath, extension) {
  console.log(`Reading icon files in ${directoryPath}... `);
  const icons = [];

  fs.readdirSync(directoryPath).forEach((icon) => {
    const fullIconPath = path.join(directoryPath, icon);
    const iconInfo = fs.statSync(fullIconPath);

    if (iconInfo.isFile() && path.extname(icon) === extension) {
      const iconType = directoryPath.match(/svg\\(.+)/);
      const iconName = icon.replace(extension, '');
      const identifier = camelCase(icon) + camelCase(iconType[1]);
      const componentPath = `./icons/${identifier}.lite`;
      icons.push({
        path: fullIconPath,
        name: iconName,
        identifier,
        componentPath,
        type: iconType[1]
      });
    } else if (iconInfo.isDirectory()) {
      const subFiles = getIconFilesDir(fullIconPath, extension);
      icons.push(...subFiles);
    }
  });
  return icons;
}

function generateFilesIcon(icons) {
  const staticDataIcon = []
  icons.forEach((icon) => {
    const iconTemplate = path.join(templatePath, './icon.lite.jst');
    const iconContent = fs.readFileSync(icon.path, 'utf8');
    const iconTransformed = transformer(iconContent, icon.type);
    staticDataIcon.push({
      name: icon.name,
      identifier: icon.identifier,
      svg: template(iconTransformed)({  height: "'24'", width: "'24'", color: "'#666666'" }),
      type: icon.type
    })
    const result = fs.readFileSync(iconTemplate, 'utf8');
    const createIcon = template(result);
    const resultCreateIcon = createIcon({
      identifier: icon.identifier,
      content: iconTransformed,
      name: icon.name
    });
    const finalIcon = template(resultCreateIcon)({
      height: '{props.height || 24}',
      width: '{props.width || 24}',
      color: '{props.color || "#666666"}'
    });

    if (!fs.existsSync(generatePath)) {
      try {
        fs.mkdirSync(generatePath, { recursive: true });
      } catch (mkdirErr) {
        console.error('Error creating target directory:', mkdirErr);
      }
    }

    // Write the file
    try {
      fs.writeFileSync(path.join(generatePath, icon.identifier + '.lite.tsx'), finalIcon);
      console.log(`${icon.identifier} File has been written successfully.`);
    } catch (writeErr) {
      console.error('Error writing file:', writeErr);
    }
  });

  // Write static file data icon
  try {
    fs.writeFileSync(path.join(ROOT_PROJECT_FOLDER, 'static/data/icons.json'), JSON.stringify(staticDataIcon));
    console.log(`Static Data Icon File has been written successfully.`);
  } catch (writeErr) {
    console.error('Error writing file:', writeErr);
  }
  
}

function generateExportFilesIcon(icons) {
  console.log('Start generating export files for icons...');
  const exportFilePath = path.join(templatePath, 'export-icon.jst');
  const exportFileContent = fs.readFileSync(exportFilePath, 'utf8');
  const exportFileTemplate = template(exportFileContent)({ icons: icons, forEach: forEach });
  const targetPath = path.join(ROOT_PROJECT_FOLDER, 'src/index.ts');
  try {
    fs.writeFileSync(targetPath, exportFileTemplate);
    console.log('File has been written successfully.');
  } catch (writeErr) {
    console.error('Error writing file:', writeErr);
  }
  console.log('Export files generation completed.');
}

(function () {
  console.log('Initialization of Processing...');
  const icons = getIconFilesDir(dirPathIcon, fileExtension);
  generateFilesIcon(icons);
  generateExportFilesIcon(icons);
  console.log('Generation of all icon files completed.');
})();
