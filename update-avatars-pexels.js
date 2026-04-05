const fs = require('fs');
const path = require('path');

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

function replaceInFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let urlCount = 0;
  
  // We ONLY want to replace unsplash images that are NOT the hero image.
  // The hero image is: https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1400&fit=crop
  const heroImage = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1400&fit=crop";
  
  // Split the file by the hero image so we don't accidentally replace it
  const parts = content.split(heroImage);
  
  const regex = /https:\/\/images\.unsplash\.com\/photo-[^"']+/g;
  
  const modifiedParts = parts.map(part => {
    return part.replace(regex, (match) => {
      // just in case
      if (match === heroImage) return match;
      const url = pexelsAvatars[urlCount % pexelsAvatars.length];
      urlCount++;
      return url;
    });
  });

  fs.writeFileSync(filePath, modifiedParts.join(heroImage));
  console.log(`Updated ${urlCount} unseen URLs in ${path.basename(filePath)}`);
}

const files = [
  { path: 'src/data/users.ts' },
  { path: 'src/app/page.tsx' },
  { path: 'src/components/Stories/Stories.tsx' },
  { path: 'src/components/NavBar/NavBar.tsx' }
];

files.forEach(f => replaceInFile(path.join(__dirname, f.path)));
