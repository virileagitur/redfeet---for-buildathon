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

const pexelsAvatars = [
  "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200",
  "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200",
  "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200",
  "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=200",
  "https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=200",
  "https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=200",
  "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200",
  "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200"
];

function replaceInFile(filePath, isAvatar = false) {
  let content = fs.readFileSync(filePath, 'utf8');
  let urlCount = 0;
  
  const regex = /https:\/\/images\.unsplash\.com\/photo-[^"']+/g;
  
  content = content.replace(regex, () => {
    const list = isAvatar ? pexelsAvatars : pexelsUrls;
    const url = list[urlCount % list.length];
    urlCount++;
    return url;
  });

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${urlCount} URLs in ${path.basename(filePath)}`);
}

const files = [
  { path: 'src/data/posts.ts', isAvatar: false },
  { path: 'src/data/countries.ts', isAvatar: false },
  { path: 'src/data/users.ts', isAvatar: true },
  { path: 'src/components/NavBar/NavBar.tsx', isAvatar: true },
  { path: 'src/components/Stories/Stories.tsx', isAvatar: true },
  { path: 'src/components/LightboxModal/LightboxModal.tsx', isAvatar: true },
  { path: 'src/app/page.tsx', isAvatar: true },
];

files.forEach(f => replaceInFile(path.join(__dirname, f.path), f.isAvatar));
