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

const fixes = [
  { regex: /FeaturedKrest Delivery/g, replace: 'FeaturedKrest' },
  { regex: /ServicesKrest Delivery/g, replace: 'ServicesKrest' },
  { regex: /about-krest-delivery/g, replace: 'about-krest' },
  { regex: /Krest Delivery\.js/g, replace: 'Krest.js' },
  { regex: /import ([a-zA-Z]+)Krest Delivery/g, replace: 'import $1Krest' },
  { regex: /export default function ([a-zA-Z]+)Krest Delivery/g, replace: 'export default function $1Krest' },
  { regex: /function ([a-zA-Z]+)Krest Delivery/g, replace: 'function $1Krest' },
];

walkDir(path.join(__dirname, 'app'), function(filePath) {
  if (filePath.endsWith('.js') || filePath.endsWith('.html')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    for (let r of fixes) {
      content = content.replace(r.regex, r.replace);
    }
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Fixed syntax in: ' + filePath);
    }
  }
});
