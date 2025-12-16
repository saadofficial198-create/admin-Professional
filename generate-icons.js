// generate-icons.js
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

// Filter SVG files
const files = fs.readdirSync(iconsDir).filter(file => file.endsWith('.svg'));

// 💡 Replace fill and stroke with "currentColor"
files.forEach(file => {
  const filePath = path.join(iconsDir, file);
  let svgContent = fs.readFileSync(filePath, 'utf8');

  // Replace fill and stroke with currentColor (skip fill="none")
  svgContent = svgContent
    .replace(/(fill|stroke)=["'](?!none)(.*?)["']/gi, '$1="currentColor"');

  fs.writeFileSync(filePath, svgContent);
});

// Generate imports & exports
const imports = files.map(file => {
  const name = toPascalCase(path.basename(file, '.svg'));
  return `import { ReactComponent as ${name} } from './${file}';`;
});

const exports = `export {\n  ${files.map(file => toPascalCase(path.basename(file, '.svg'))).join(',\n  ')}\n};\n`;

const content = `${imports.join('\n')}\n\n${exports}`;
fs.writeFileSync(outputFile, content);

console.log('✅ icons/index.js generated and SVGs updated with currentColor!');
