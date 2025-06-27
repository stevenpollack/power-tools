#!/usr/bin/env node

import fs from "fs";

// Brand color schemes
const brandColors = {
  dewalt: { primary: "#FFD320", secondary: "#2C2C2C", accent: "#FF4444" },
  milwaukee: { primary: "#E31E24", secondary: "#2C2C2C", accent: "#FFD700" },
  ryobi: { primary: "#6ABE45", secondary: "#2C2C2C", accent: "#FFD700" },
  dremel: { primary: "#0066CC", secondary: "#2C2C2C", accent: "#FF6600" },
  generac: { primary: "#FF6600", secondary: "#2C2C2C", accent: "#FFD700" },
  paslode: { primary: "#FF4500", secondary: "#2C2C2C", accent: "#FFD700" },
};

// Tool templates with SVG content
const toolTemplates = {
  "angle-grinder": (
    brand,
    colors,
  ) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" style="background: white;">
    <!-- Main body -->
    <rect x="80" y="200" width="160" height="60" rx="30" fill="${colors.primary}" stroke="${colors.secondary}" stroke-width="3"/>
    <!-- Handle -->
    <rect x="120" y="140" width="25" height="80" rx="12" fill="${colors.secondary}"/>
    <rect x="125" y="150" width="15" height="60" rx="7" fill="${colors.primary}"/>
    <!-- Trigger -->
    <path d="M 145 190 Q 155 195 150 205 Q 145 210 140 205 Q 135 200 140 195 Z" fill="${colors.primary}" stroke="${colors.secondary}" stroke-width="2"/>
    <!-- Guard -->
    <path d="M 240 200 Q 300 180 320 240 Q 300 300 240 280 Z" fill="#666666" stroke="${colors.secondary}" stroke-width="2"/>
    <!-- Disc -->
    <circle cx="280" cy="240" r="40" fill="#C0C0C0" stroke="#888888" stroke-width="2"/>
    <circle cx="280" cy="240" r="5" fill="${colors.secondary}"/>
    <!-- Brand -->
    <text x="160" y="235" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="${colors.secondary}">${brand.toUpperCase()}</text>
    <!-- Power cord -->
    <rect x="60" y="220" width="20" height="8" rx="4" fill="${colors.secondary}"/>
  </svg>`,

  "battery-pack": (
    brand,
    colors,
  ) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" style="background: white;">
    <!-- Battery body -->
    <rect x="120" y="140" width="160" height="120" rx="15" fill="${colors.primary}" stroke="${colors.secondary}" stroke-width="3"/>
    <!-- Battery terminals -->
    <rect x="140" y="120" width="30" height="20" rx="5" fill="${colors.secondary}"/>
    <rect x="190" y="120" width="30" height="20" rx="5" fill="${colors.secondary}"/>
    <rect x="240" y="120" width="30" height="20" rx="5" fill="${colors.secondary}"/>
    <!-- Charge indicator -->
    <rect x="135" y="160" width="130" height="25" rx="5" fill="${colors.secondary}"/>
    <rect x="140" y="165" width="30" height="15" rx="3" fill="#00FF00"/>
    <rect x="175" y="165" width="30" height="15" rx="3" fill="#FFFF00"/>
    <rect x="210" y="165" width="30" height="15" rx="3" fill="#FF0000"/>
    <!-- Brand -->
    <text x="200" y="220" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="${colors.secondary}">${brand.toUpperCase()}</text>
    <!-- Voltage -->
    <text x="200" y="240" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="${colors.secondary}">18V</text>
  </svg>`,

  sander: (
    brand,
    colors,
  ) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" style="background: white;">
    <!-- Main body -->
    <rect x="100" y="160" width="200" height="80" rx="10" fill="${colors.primary}" stroke="${colors.secondary}" stroke-width="3"/>
    <!-- Handle -->
    <rect x="120" y="120" width="30" height="60" rx="15" fill="${colors.secondary}"/>
    <rect x="125" y="130" width="20" height="40" rx="10" fill="${colors.primary}"/>
    <!-- Base plate -->
    <rect x="120" y="260" width="160" height="20" rx="10" fill="#666666" stroke="${colors.secondary}" stroke-width="2"/>
    <!-- Sanding pad -->
    <rect x="130" y="270" width="140" height="15" rx="7" fill="#F4A460"/>
    <!-- Dust port -->
    <circle cx="280" cy="200" r="15" fill="${colors.secondary}"/>
    <circle cx="280" cy="200" r="8" fill="#444444"/>
    <!-- Brand -->
    <text x="200" y="205" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="${colors.secondary}">${brand.toUpperCase()}</text>
    <!-- Orbital indicator -->
    <circle cx="160" cy="180" r="5" fill="${colors.accent}" opacity="0.8"/>
  </svg>`,

  nailer: (
    brand,
    colors,
  ) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" style="background: white;">
    <!-- Main body -->
    <rect x="100" y="120" width="80" height="180" rx="10" fill="${colors.primary}" stroke="${colors.secondary}" stroke-width="3"/>
    <!-- Handle -->
    <rect x="80" y="160" width="30" height="100" rx="15" fill="${colors.secondary}"/>
    <rect x="85" y="170" width="20" height="80" rx="10" fill="${colors.primary}"/>
    <!-- Trigger -->
    <path d="M 110 220 Q 120 225 115 235 Q 110 240 105 235 Q 100 230 105 225 Z" fill="${colors.primary}" stroke="${colors.secondary}" stroke-width="2"/>
    <!-- Nail magazine -->
    <rect x="180" y="180" width="40" height="120" rx="8" fill="#666666" stroke="${colors.secondary}" stroke-width="2"/>
    <!-- Nose -->
    <rect x="120" y="300" width="20" height="60" rx="5" fill="${colors.secondary}"/>
    <rect x="125" y="350" width="10" height="20" rx="2" fill="#888888"/>
    <!-- Brand -->
    <text x="140" y="170" font-family="Arial, sans-serif" font-size="10" font-weight="bold" text-anchor="middle" fill="${colors.secondary}">${brand.toUpperCase()}</text>
    <!-- Air hose -->
    <circle cx="60" cy="200" r="8" fill="${colors.secondary}"/>
  </svg>`,

  compressor: (
    brand,
    colors,
  ) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" style="background: white;">
    <!-- Tank -->
    <circle cx="200" cy="220" r="80" fill="${colors.primary}" stroke="${colors.secondary}" stroke-width="3"/>
    <!-- Motor housing -->
    <rect x="160" y="120" width="80" height="60" rx="10" fill="${colors.secondary}"/>
    <rect x="170" y="130" width="60" height="40" rx="5" fill="${colors.primary}"/>
    <!-- Handle -->
    <rect x="150" y="100" width="100" height="15" rx="7" fill="${colors.secondary}"/>
    <rect x="140" y="105" width="15" height="20" rx="7" fill="${colors.secondary}"/>
    <rect x="245" y="105" width="15" height="20" rx="7" fill="${colors.secondary}"/>
    <!-- Pressure gauge -->
    <circle cx="220" cy="180" r="20" fill="white" stroke="${colors.secondary}" stroke-width="2"/>
    <circle cx="220" cy="180" r="15" fill="white"/>
    <text x="220" y="185" font-family="Arial, sans-serif" font-size="8" font-weight="bold" text-anchor="middle" fill="${colors.secondary}">PSI</text>
    <!-- Brand -->
    <text x="200" y="230" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="${colors.secondary}">${brand.toUpperCase()}</text>
    <!-- Wheels -->
    <circle cx="150" cy="300" r="15" fill="#333333"/>
    <circle cx="250" cy="300" r="15" fill="#333333"/>
    <!-- Air hose -->
    <rect x="280" y="200" width="40" height="8" rx="4" fill="${colors.secondary}"/>
  </svg>`,

  "pressure-washer": (
    brand,
    colors,
  ) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" style="background: white;">
    <!-- Main unit -->
    <rect x="120" y="180" width="160" height="120" rx="15" fill="${colors.primary}" stroke="${colors.secondary}" stroke-width="3"/>
    <!-- Handle -->
    <rect x="140" y="120" width="120" height="15" rx="7" fill="${colors.secondary}"/>
    <rect x="130" y="125" width="15" height="60" rx="7" fill="${colors.secondary}"/>
    <rect x="255" y="125" width="15" height="60" rx="7" fill="${colors.secondary}"/>
    <!-- Pump -->
    <rect x="160" y="200" width="80" height="40" rx="8" fill="${colors.secondary}"/>
    <rect x="170" y="210" width="60" height="20" rx="5" fill="${colors.primary}"/>
    <!-- Pressure gun -->
    <rect x="320" y="150" width="60" height="20" rx="10" fill="${colors.secondary}"/>
    <rect x="340" y="140" width="15" height="30" rx="7" fill="${colors.secondary}"/>
    <!-- Hose -->
    <path d="M 280 220 Q 320 200 350 160" stroke="${colors.secondary}" stroke-width="6" fill="none"/>
    <!-- Brand -->
    <text x="200" y="260" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="${colors.secondary}">${brand.toUpperCase()}</text>
    <!-- Wheels -->
    <circle cx="140" cy="320" r="20" fill="#333333"/>
    <circle cx="260" cy="320" r="20" fill="#333333"/>
  </svg>`,

  "rotary-tool": (
    brand,
    colors,
  ) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" style="background: white;">
    <!-- Main body -->
    <rect x="160" y="150" width="80" height="180" rx="15" fill="${colors.primary}" stroke="${colors.secondary}" stroke-width="3"/>
    <!-- Nose -->
    <rect x="180" y="120" width="40" height="30" rx="20" fill="${colors.secondary}"/>
    <!-- Collet -->
    <circle cx="200" cy="135" r="8" fill="#666666"/>
    <circle cx="200" cy="135" r="3" fill="#222222"/>
    <!-- Bit -->
    <rect x="198" y="100" width="4" height="35" fill="#888888"/>
    <circle cx="200" cy="100" r="3" fill="#666666"/>
    <!-- Speed control -->
    <circle cx="200" cy="200" r="15" fill="${colors.secondary}"/>
    <circle cx="200" cy="200" r="10" fill="${colors.primary}"/>
    <circle cx="200" cy="200" r="3" fill="${colors.secondary}"/>
    <!-- Brand -->
    <text x="200" y="260" font-family="Arial, sans-serif" font-size="10" font-weight="bold" text-anchor="middle" fill="${colors.secondary}">${brand.toUpperCase()}</text>
    <!-- Power cord -->
    <rect x="140" y="290" width="40" height="8" rx="4" fill="${colors.secondary}"/>
  </svg>`,

  "rotary-hammer": (
    brand,
    colors,
  ) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" style="background: white;">
    <!-- Main body -->
    <rect x="50" y="150" width="220" height="80" rx="10" fill="${colors.primary}" stroke="${colors.secondary}" stroke-width="3"/>
    <!-- Chuck -->
    <rect x="270" y="170" width="40" height="40" rx="20" fill="#666666" stroke="${colors.secondary}" stroke-width="2"/>
    <circle cx="290" cy="190" r="10" fill="#444444"/>
    <!-- SDS bit -->
    <rect x="310" y="188" width="50" height="4" fill="#888888"/>
    <polygon points="360,188 370,190 360,192" fill="#666666"/>
    <!-- Handle -->
    <rect x="50" y="230" width="30" height="120" rx="15" fill="${colors.secondary}"/>
    <rect x="55" y="240" width="20" height="100" rx="10" fill="${colors.primary}"/>
    <!-- Trigger -->
    <path d="M 80 280 Q 90 285 85 295 Q 80 300 75 295 Q 70 290 75 285 Z" fill="${colors.primary}" stroke="${colors.secondary}" stroke-width="2"/>
    <!-- Mode selector -->
    <circle cx="150" cy="170" r="12" fill="${colors.secondary}"/>
    <rect x="145" y="160" width="10" height="5" fill="${colors.accent}"/>
    <!-- Brand -->
    <text x="150" y="205" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="${colors.secondary}">${brand.toUpperCase()}</text>
    <!-- Vibration control -->
    <rect x="120" y="200" width="20" height="8" rx="4" fill="${colors.accent}"/>
  </svg>`,
};

// Tool mappings
const toolMappings = [
  {
    filename: "dewalt-15-gal-air-compressor.svg",
    brand: "dewalt",
    template: "compressor",
  },
  {
    filename: "dewalt-20v-angle-grinder.svg",
    brand: "dewalt",
    template: "angle-grinder",
  },
  {
    filename: "dewalt-20v-battery-pack.svg",
    brand: "dewalt",
    template: "battery-pack",
  },
  {
    filename: "dewalt-20v-brad-nailer.svg",
    brand: "dewalt",
    template: "nailer",
  },
  {
    filename: "dewalt-20v-orbital-sander.svg",
    brand: "dewalt",
    template: "sander",
  },
  {
    filename: "dremel-8220-rotary-tool.svg",
    brand: "dremel",
    template: "rotary-tool",
  },
  {
    filename: "generac-pressure-washer.svg",
    brand: "generac",
    template: "pressure-washer",
  },
  {
    filename: "milwaukee-m18-battery.svg",
    brand: "milwaukee",
    template: "battery-pack",
  },
  {
    filename: "milwaukee-m18-circular-saw.svg",
    brand: "milwaukee",
    template: "circular-saw",
  },
  {
    filename: "milwaukee-m18-grinder.svg",
    brand: "milwaukee",
    template: "angle-grinder",
  },
  {
    filename: "milwaukee-m18-sander.svg",
    brand: "milwaukee",
    template: "sander",
  },
  {
    filename: "milwaukee-rotary-hammer.svg",
    brand: "milwaukee",
    template: "rotary-hammer",
  },
  {
    filename: "paslode-framing-nailer.svg",
    brand: "paslode",
    template: "nailer",
  },
  {
    filename: "ryobi-circular-saw.svg",
    brand: "ryobi",
    template: "circular-saw",
  },
  {
    filename: "ryobi-cordless-compressor.svg",
    brand: "ryobi",
    template: "compressor",
  },
  {
    filename: "ryobi-pressure-washer.svg",
    brand: "ryobi",
    template: "pressure-washer",
  },
];

// Add circular saw template
toolTemplates["circular-saw"] = (
  brand,
  colors,
) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" style="background: white;">
  <!-- Main body -->
  <path d="M 50 200 L 300 200 L 320 220 L 320 280 L 300 300 L 50 300 Q 30 300 30 280 L 30 220 Q 30 200 50 200 Z" fill="${colors.primary}" stroke="${colors.secondary}" stroke-width="3"/>
  <!-- Motor housing -->
  <circle cx="120" cy="180" r="40" fill="${colors.secondary}"/>
  <circle cx="120" cy="180" r="30" fill="${colors.primary}"/>
  <!-- Handle -->
  <rect x="40" y="150" width="25" height="100" rx="12" fill="${colors.secondary}"/>
  <rect x="45" y="160" width="15" height="80" rx="7" fill="${colors.primary}"/>
  <!-- Trigger -->
  <path d="M 65 210 Q 75 215 70 225 Q 65 230 60 225 Q 55 220 60 215 Z" fill="${colors.primary}" stroke="${colors.secondary}" stroke-width="2"/>
  <!-- Blade guard -->
  <path d="M 180 250 Q 250 220 280 280 Q 250 340 180 310 Z" fill="#666666" stroke="${colors.secondary}" stroke-width="2"/>
  <!-- Saw blade -->
  <circle cx="240" cy="280" r="60" fill="#C0C0C0" stroke="#888888" stroke-width="2"/>
  <circle cx="240" cy="280" r="5" fill="${colors.secondary}"/>
  <!-- Base plate -->
  <rect x="200" y="320" width="120" height="15" rx="7" fill="#666666" stroke="${colors.secondary}" stroke-width="2"/>
  <!-- Brand -->
  <text x="150" y="235" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="${colors.secondary}">${brand.toUpperCase()}</text>
</svg>`;

console.log("🎨 Generating tool illustrations...");

toolMappings.forEach(({ filename, brand, template }) => {
  const colors = brandColors[brand];
  const svgContent = toolTemplates[template](brand, colors);

  fs.writeFileSync(`public/images/tools/${filename}`, svgContent);
  console.log(`✅ Created ${filename}`);
});

console.log(`\n🎯 Generated ${toolMappings.length} tool illustrations!`);
console.log("All tools now have stylized SVG illustrations.");
