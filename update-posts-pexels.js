const fs = require('fs');
const path = require('path');

const pexelsUrls = [
  "https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/37833/pexels-photo-37833.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1841143/pexels-photo-1841143.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/258160/pexels-photo-258160.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/164041/pexels-photo-164041.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1450082/pexels-photo-1450082.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/143577/pexels-photo-143577.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1835368/pexels-photo-1835368.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1480800/pexels-photo-1480800.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/2166927/pexels-photo-2166927.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/260024/pexels-photo-260024.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/587930/pexels-photo-587930.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1359672/pexels-photo-1359672.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1574843/pexels-photo-1574843.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/210204/pexels-photo-210204.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/196667/pexels-photo-196667.jpeg?auto=compress&cs=tinysrgb&w=800",
];

function replaceInFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let urlCount = 0;
  
  const regex = /https:\/\/images\.unsplash\.com\/photo-[^"']+/g;
  
  content = content.replace(regex, () => {
    const url = pexelsUrls[urlCount % pexelsUrls.length];
    urlCount++;
    return url;
  });

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${urlCount} URLs to Pexels in ${path.basename(filePath)}`);
}

// ONLY running it on posts.ts so we don't accidentally ruin page.tsx's Hero Image or User Avatars again!
const files = [
  { path: 'src/data/posts.ts' },
];

files.forEach(f => replaceInFile(path.join(__dirname, f.path)));
