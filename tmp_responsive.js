const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (!dirPath.includes('.next') && !dirPath.includes('node_modules')) {
       let isDirectory = fs.statSync(dirPath).isDirectory();
       isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
    }
  });
}

const fixes = [
  // Padding Y adjustments
  { regex: /\bpy-32\b/g, replace: 'py-16 md:py-32' },
  { regex: /\bpy-24\b/g, replace: 'py-12 md:py-24' },
  { regex: /\bpt-48\b/g, replace: 'pt-28 md:pt-48' },
  { regex: /\bpt-40\b/g, replace: 'pt-24 md:pt-40' },
  { regex: /\bpt-32\b/g, replace: 'pt-20 md:pt-32' },
  { regex: /\bp-16\b/g, replace: 'p-8 md:p-16' },
  { regex: /\bp-12\b/g, replace: 'p-6 md:p-12' },
  { regex: /\bp-10\b/g, replace: 'p-6 md:p-10' },
  { regex: /\bgap-16\b/g, replace: 'gap-8 md:gap-16' },
  { regex: /\bgap-24\b/g, replace: 'gap-12 md:gap-24' },
  
  // Font sizes: add smaller mobile variants if they are massive
  { regex: /\btext-6xl md:text-8xl\b/g, replace: 'text-4xl md:text-8xl' },
  { regex: /\btext-5xl md:text-8xl\b/g, replace: 'text-4xl md:text-8xl' },
  { regex: /\btext-5xl md:text-7xl\b/g, replace: 'text-4xl md:text-7xl' },
  { regex: /\btext-4xl md:text-7xl\b/g, replace: 'text-3xl md:text-7xl' },
  { regex: /\btext-4xl md:text-6xl\b/g, replace: 'text-3xl md:text-6xl' },
  { regex: /\btext-5xl\b(?!\s*md:)/g, replace: 'text-4xl md:text-5xl' },
  { regex: /\btext-6xl\b(?!\s*md:)/g, replace: 'text-4xl md:text-6xl' },
  { regex: /\btext-7xl\b(?!\s*md:)/g, replace: 'text-5xl md:text-7xl' },
  { regex: /\btext-8xl\b(?!\s*md:)/g, replace: 'text-5xl md:text-8xl' },
  
  // Widths/Heights adjustments for overflow problems
  { regex: /\bw-\[800px\]\b/g, replace: 'w-[400px] md:w-[800px]' },
  { regex: /\bh-\[800px\]\b/g, replace: 'h-[400px] md:h-[800px]' },
  { regex: /\bw-\[600px\]\b/g, replace: 'w-[300px] md:w-[600px]' },
  { regex: /\bh-\[600px\]\b/g, replace: 'h-[300px] md:h-[600px]' },
  { regex: /\bh-\[500px\] md:h-\[700px\]\b/g, replace: 'h-[350px] md:h-[700px]' },
  { regex: /\bh-\[400px\] md:h-\[600px\]\b/g, replace: 'h-[300px] md:h-[600px]' }
];

walkDir(path.join(__dirname, 'app'), function(filePath) {
  if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    for (let r of fixes) {
      content = content.replace(r.regex, r.replace);
    }
    // Deep cleanup for accidental duplicates
    content = content.replace(/md:py-32 md:py-32/g, 'md:py-32');
    content = content.replace(/md:text-8xl md:text-8xl/g, 'md:text-8xl');
    content = content.replace(/md:text-7xl md:text-7xl/g, 'md:text-7xl');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Mobile Optimized: ' + filePath);
    }
  }
});
