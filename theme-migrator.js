const fs = require('fs');
const path = require('path');

const directoryPaths = [
  path.join(__dirname, 'components'),
  path.join(__dirname, 'src', 'app'),
  path.join(__dirname, 'src', 'features')
];

const replaceMap = {
  'bg-[#1A1D23]': 'bg-card',
  'bg-[#0B0E11]': 'bg-background',
  'border-white/10': 'border-border',
  'border-white/5': 'border-border',
  'border-white/15': 'border-border',
  'bg-white/5': 'bg-muted',
  'bg-white/10': 'bg-muted',
  'text-gray-400': 'text-muted-foreground',
  'text-gray-500': 'text-muted-foreground',
  'text-white': 'text-foreground'
};

// Ignore text-white inside buttons or primary bg
const safeReplace = (content) => {
  let updatedContent = content;
  
  for (const [search, replace] of Object.entries(replaceMap)) {
    if (search === 'text-white') {
      // replace text-white only if not near a primary color like #FF5722
      // For simplicity, we just replace it globally and we can fix primary buttons later if they break, 
      // but actually let's try a regex for text-white that skips if #FF5722 is on the same line
      const lines = updatedContent.split('\n');
      updatedContent = lines.map(line => {
        if (line.includes('#FF5722') || line.includes('bg-[#FF5722]')) {
          return line;
        }
        return line.split(search).join(replace);
      }).join('\n');
    } else {
      updatedContent = updatedContent.split(search).join(replace);
    }
  }
  return updatedContent;
};

const walkSync = (dir, filelist = []) => {
  if (!fs.existsSync(dir)) return filelist;
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else if (dirFile.endsWith('.tsx') || dirFile.endsWith('.ts')) {
      filelist.push(dirFile);
    }
  });
  return filelist;
};

let files = [];
directoryPaths.forEach(dir => {
  files = files.concat(walkSync(dir));
});

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const updatedContent = safeReplace(content);
  if (content !== updatedContent) {
    fs.writeFileSync(file, updatedContent, 'utf8');
    console.log(`Updated ${file}`);
  }
});

console.log('Migration complete!');
