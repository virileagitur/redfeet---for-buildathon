const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/posts.ts');

const postKeywords = {
  "p1": "kyoto,bamboo",
  "p2": "desert,dunes",
  "p3": "milfordsound,nature",
  "p4": "hoian,lanterns",
  "p5": "glacier,iceland",
  "p6": "varanasi,ganges",
  "p7": "bali,volcano",
  "p8": "safari,kenya",
  "p9": "santorini,greece",
  "p10": "machupicchu,peru",
  "p11": "iceland,valley",
  "p12": "floatingmarket,thailand",
  "p13": "norway,fjord",
  "p14": "cappadocia,balloons",
  "p15": "brazil,beach",
  "p16": "chefchaouen,morocco",
  "p17": "sintra,portugal",
  "p18": "fushimi,kyoto",
  "p19": "southafrica,cliffs",
  "p20": "ramen,japan"
};

let content = fs.readFileSync(filePath, 'utf8');

let globalLock = 1;
let count = 0;

const newContent = content.replace(/id:\s*"([^"]+)",[\s\S]*?images:\s*\[([^\]]+)\]/g, (match, id) => {
  const keywords = postKeywords[id] || "travel,landscape";
  
  // Create 3 unique locked URLs using loremflickr
  // format: https://loremflickr.com/1000/1000/keywords?lock=ID
  const urls = [
    `"https://loremflickr.com/1000/1000/${keywords}?lock=${globalLock++}"`,
    `"https://loremflickr.com/1000/1000/${keywords}?lock=${globalLock++}"`,
    `"https://loremflickr.com/1000/1000/${keywords}?lock=${globalLock++}"`
  ];
  
  count++;
  return match.replace(/images:\s*\[([^\]]+)\]/, `images: [\n      ${urls.join(',\n      ')}\n    ]`);
});

fs.writeFileSync(filePath, newContent);
console.log(`Updated ${count} posts with robust LoremFlickr semantic images!`);
