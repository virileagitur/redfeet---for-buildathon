const fs = require('fs');
const path = require('path');

const unsplashUrls = [
  "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&fit=crop",
  "https://images.unsplash.com/photo-1539039153429-c3c4af4e7cd5?w=800&fit=crop",
  "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&fit=crop",
  "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&fit=crop",
  "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&fit=crop",
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&fit=crop",
  "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&fit=crop",
  "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&fit=crop",
  "https://images.unsplash.com/photo-1507499739999-097706ad8914?w=800&fit=crop",
  "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&fit=crop",
  "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&fit=crop",
  "https://images.unsplash.com/photo-1506665531195-3566af2b548e?w=800&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&fit=crop",
  "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&fit=crop",
  "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&fit=crop",
  "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&fit=crop",
  "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&fit=crop",
  "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800&fit=crop",
  "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&fit=crop",
  "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&fit=crop",
];

const unsplashAvatars = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150&h=150&fit=crop&crop=face"
];

function replaceInFile(filePath, isAvatar = false) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let urlCount = 0;
  
  const regex = /https:\/\/images\.pexels\.com\/photos\/[^"']+/g;
  
  content = content.replace(regex, () => {
    const list = isAvatar ? unsplashAvatars : unsplashUrls;
    const url = list[urlCount % list.length];
    urlCount++;
    return url;
  });

  fs.writeFileSync(filePath, content);
  console.log(`Reverted ${urlCount} URLs in ${path.basename(filePath)}`);
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
