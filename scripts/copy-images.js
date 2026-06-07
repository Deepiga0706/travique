const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src', 'Assests', 'Images');
const destDir = path.join(__dirname, '..', 'public', 'images');

if (!fs.existsSync(srcDir)) {
  console.error('Source images directory does not exist:', srcDir);
  process.exit(1);
}

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
files.forEach(file => {
  const src = path.join(srcDir, file);
  const dest = path.join(destDir, file);
  try {
    fs.copyFileSync(src, dest);
    console.log('Copied', file);
  } catch (err) {
    console.error('Failed to copy', file, err.message);
  }
});

console.log('Done.');
