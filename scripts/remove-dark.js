const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const exts = ['.tsx', '.ts', '.jsx', '.js', '.md'];
let changed = [];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    if (ent.name === 'node_modules' || ent.name === '.git') continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full);
    else if (exts.includes(path.extname(ent.name))) {
      processFile(full);
    }
  }
}

function processFile(file) {
  const original = fs.readFileSync(file, 'utf8');
  if (!original.includes('')) return;
  // Simple replace: remove the literal '' token
  const modified = original.split("").join('');
  if (modified !== original) {
    fs.writeFileSync(file, modified, 'utf8');
    const count = (original.match(//g) || []).length;
    changed.push({ file, count });
  }
}

walk(root);
console.log('Remove- updated files:', changed.length);
for (const c of changed) {
  console.log(`${c.file} -> ${c.count} replacements`);
}
if (changed.length === 0) console.log('No  occurrences found.');
else console.log('Done. Please run tests/build to verify.');
