const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/posts.ts');

const postPrompts = {
  "p1": ["kyoto%20bamboo%20grove%20photography", "kyoto%20bamboo%20forest%20sunlight", "arashiyama%20bamboo%20path"],
  "p2": ["sahara%20desert%20dunes%20sunset", "morocco%20sahara%20stars%20night", "erg%20chebbi%20sand%20dunes"],
  "p3": ["milford%20sound%20new%20zealand%20waterfall", "fjordland%20kayak%20adventure", "milford%20sound%20cliffs"],
  "p4": ["hoi%20an%20ancient%20town%20lanterns%20night", "vietnam%20hoi%20an%20street", "thu%20bon%20river%20boats%20lanterns"],
  "p5": ["jokulsarlon%20glacier%20lagoon%20iceland", "iceland%20icebergs%20beach", "arctic%20glacier%20blue%20ice"],
  "p6": ["varanasi%20ghats%20ganges%20river%20sunrise", "india%20varanasi%20spiritual%20sunset", "varanasi%20boats%20morning%20fog"],
  "p7": ["mount%20batur%20bali%20sunrise%20volcano", "bali%20volcano%20hiking%20clouds", "indonesia%20sunrise%20mountains"],
  "p8": ["maasai%20mara%20wildebeest%20migration%20kenya", "kenya%20safari%20lions%20sunset", "mara%20river%20crossing%20wildlife"],
  "p9": ["oia%20santorini%20greece%20sunset", "santorini%20blue%20domes%20ocean", "greece%20islands%20cliffs"],
  "p10": ["machu%20picchu%20inca%20trail%20peru", "cusco%20mountains%20ruins", "peru%20machu%20picchu%20clouds"],
  "p11": ["thorsmork%20valley%20iceland%20hiking", "iceland%20volcanic%20river%20canyon", "iceland%20highlands%20nature"],
  "p12": ["amphawa%20floating%20market%20thailand", "thailand%20boat%20street%20food", "bangkok%20floating%20market%20canal"],
  "p13": ["naeroyfjord%20norway%20fjord%20rowboat", "norway%20fjords%20mountains%20water", "nordic%20landscape%20fjord"],
  "p14": ["goreme%20cappadocia%20hot%20air%20balloons", "turkey%20cappadocia%20sunrise", "cappadocia%20fairy%20chimneys"],
  "p15": ["fernando%20de%20noronha%20brazil%20beach", "brazil%20island%20dolphins%20clear%20water", "pernambuco%20coast%20beach"],
  "p16": ["chefchaouen%20morocco%20blue%20city", "morocco%20blue%20streets%20doors", "chefchaouen%20alleyway"],
  "p17": ["sintra%20portugal%20palace%20mist", "lisbon%20sintra%20castle%20forest", "portugal%20architecture%20nature"],
  "p18": ["fushimi%20inari%20taisha%20kyoto%20red%20gates", "kyoto%20torii%20gates%20mountain", "japan%20shrine%20path"],
  "p19": ["cape%20point%20south%20africa%20cliffs", "cape%20town%20ocean%20coastline", "south%20africa%20landscape%20waves"],
  "p20": ["ramen%20street%20shin%20yokohama%20japan", "japan%20ramen%20food%20bowl", "yokohama%20food%20stall"]
};

let content = fs.readFileSync(filePath, 'utf8');

const regex = /images:\s*\[([^\]]+)\]/g;

let count = 0;
const newContent = content.replace(/id:\s*"([^"]+)",[\s\S]*?images:\s*\[([^\]]+)\]/g, (match, id) => {
  const prompts = postPrompts[id] || ["beautiful%20travel%20landscape%20photography"];
  
  // Directly hit Pollinations without WSRV Cloudflare proxy!
  // This avoids 504 timeouts from Cloudflare waiting on the generator.
  // With our virtual DOM culling in PostCard.tsx, Pollinations will easily handle the load.
  const imagesArrayStr = prompts.map((p, i) => `"https://image.pollinations.ai/prompt/${p}%20realistic%20photography?width=1000&height=1000&seed=${i + 1}&nologo=true"`).join(',\n      ');
  
  count++;
  return match.replace(/images:\s*\[([^\]]+)\]/, `images: [\n      ${imagesArrayStr}\n    ]`);
});

fs.writeFileSync(filePath, newContent);
console.log(`Updated ${count} posts perfectly semantic images via Pollinations direct!`);
