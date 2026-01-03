import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const fs = require('fs');
const path = require('path');

const toPascalCase = (str) =>
  str
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())
    .replace(/\s+/g, '');

const iconsDir = path.join(process.cwd(), 'src', 'assets', 'icons');
const outputFile = path.join(iconsDir, 'index.js');

// Read SVG files
const files = fs.readdirSync(iconsDir).filter(f => f.endsWith('.svg'));

// ---- COLOR PROCESSING ----
files.forEach(file => {
  if (file.startsWith('keep-')) return; // 🔒 keep original colors

  const filePath = path.join(iconsDir, file);
  let svgContent = fs.readFileSync(filePath, 'utf8');

  svgContent = svgContent.replace(
    /(fill|stroke)=["'](?!none)(.*?)["']/gi,
    '$1="currentColor"'
  );

  fs.writeFileSync(filePath, svgContent);
});

// ---- IMPORT / EXPORT NAME LOGIC ----
const nameCounter = new Map();

const imports = [];
const exportNames = [];

files.forEach(file => {
  // remove keep- ONLY for variable name
  const cleanName = file.startsWith('keep-')
    ? file.replace(/^keep-/, '')
    : file;

  const rawName = path.basename(cleanName, '.svg').toLowerCase();
  let baseName = toPascalCase(rawName);


  // Handle duplicates
  if (nameCounter.has(baseName)) {
    const count = nameCounter.get(baseName) + 1;
    nameCounter.set(baseName, count);
    baseName = `${baseName}-${count}`;
  } else {
    nameCounter.set(baseName, 0);
  }

  imports.push(
    `import { ReactComponent as ${baseName} } from './${file}';`
  );

  exportNames.push(baseName);
});

const content = `
${imports.join('\n')}

export {
  ${exportNames.join(',\n  ')}
};
`;

fs.writeFileSync(outputFile, content.trim());

console.log('✅ icons/index.js generated with keep-, color-safe & duplicate-safe exports!');
