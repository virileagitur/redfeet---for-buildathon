const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/posts.ts');

// Paul Jarvis and other photographers' beautiful landscape/travel IDs on Picsum
const landscapeIds = [
  10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 28, 29, 37, 38, 40, 41, 46, 57, 58, 68, 74, 82, 87, 88, 89, 104, 114, 122, 124, 128, 137, 163, 175, 184, 192, 197, 215, 237, 240, 244, 252, 281, 282, 283, 292, 295, 301, 306, 311, 325, 327, 331, 342, 345, 349, 350, 355, 364, 365, 366, 367, 369, 373, 380
];

let idIdx = 0;
function getNextPicsum() {
  const id = landscapeIds[idIdx % landscapeIds.length];
  idIdx++;
  return `"https://picsum.photos/id/${id}/1000/1000"`;
}

let content = fs.readFileSync(filePath, 'utf8');

const regex = /images:\s*\[([^\]]+)\]/g;
let count = 0;

const newContent = content.replace(regex, (match) => {
  // Replace each post's images with 3 unique Picsum photos
  const img1 = getNextPicsum();
  const img2 = getNextPicsum();
  const img3 = getNextPicsum();
  count++;
  return `images: [\n      ${img1},\n      ${img2},\n      ${img3}\n    ]`;
});

fs.writeFileSync(filePath, newContent);
console.log(`Updated ${count} posts with bulletproof Picsum URLs!`);
