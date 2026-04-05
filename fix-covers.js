const fs = require('fs');
const path = require('path');

const pexelsUrls = [
  "https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/37833/pexels-photo-37833.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/1841143/pexels-photo-1841143.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/258160/pexels-photo-258160.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/164041/pexels-photo-164041.jpeg?auto=compress&cs=tinysrgb&w=1200",
];

const filePath = path.join(__dirname, 'src/data/users.ts');
let content = fs.readFileSync(filePath, 'utf8');

let index = 0;
content = content.replace(/coverPhoto: "https:\/\/images\.pexels\.com\/photos\/[0-9]+\/pexels-photo-[0-9]+\.jpeg\?[^"]+"/g, () => {
    const url = pexelsUrls[index % pexelsUrls.length];
    index++;
    return `coverPhoto: "${url}"`;
});

fs.writeFileSync(filePath, content);
console.log(`Fixed ${index} cover photos in users.ts`);
