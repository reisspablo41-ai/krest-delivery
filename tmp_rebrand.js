const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

const replacements = [
  { regex: /HUSS GROUP Transport Service PTY LTD/g, replace: 'Krest Delivery' },
  { regex: /HUSS GROUP/g, replace: 'Krest Delivery' },
  { regex: /HUSS\b/g, replace: 'Krest' },
  { regex: /Amarex/g, replace: 'Krest Delivery' },
  { regex: /amarex/g, replace: 'krest-delivery' },
  { regex: /AMAREX/g, replace: 'KREST DELIVERY' },
  { regex: /huss-white\.png/g, replace: 'krest-logo.png' }, // Adjust if a specific logo is provided later
  { regex: /huss-black\.png/g, replace: 'krest-logo.png' }
];

walkDir(path.join(__dirname, 'app'), function(filePath) {
  if (filePath.endsWith('.js') || filePath.endsWith('.html')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    for (let r of replacements) {
      content = content.replace(r.regex, r.replace);
    }
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated content: ' + filePath);
    }
  }
});

// Rename specific files/folders
const renamePaths = [
  { old: 'app/about-amarex', new: 'app/about-krest' },
  { old: 'app/Components/FeaturedAmarex.js', new: 'app/Components/FeaturedKrest.js' },
  { old: 'app/Components/ServicesAmarex.js', new: 'app/Components/ServicesKrest.js' }
];

renamePaths.forEach(p => {
  const oldP = path.join(__dirname, p.old);
  const newP = path.join(__dirname, p.new);
  if (fs.existsSync(oldP)) {
    fs.renameSync(oldP, newP);
    console.log('Renamed: ' + oldP + ' -> ' + newP);
  }
});
