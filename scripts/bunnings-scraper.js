// Bunnings Power Tools Category Analysis Script
const categories = [
  { name: "Air Compressors", url: "air-compressors" },
  { name: "Batteries & Chargers", url: "batteries-chargers" },
  { name: "Biscuit Joiners", url: "biscuit-joiners" },
  { name: "Drills", url: "drills" }, // Skip per user request
  { name: "Cordless Fans & Blowers", url: "cordless-fans-blowers" },
  { name: "Grinders", url: "grinders" },
  {
    name: "Heavy Duty & Construction Tools",
    url: "heavy-duty-construction-tools",
  },
  { name: "Multi Tools", url: "multi-tools" },
  { name: "Nail, Glue & Heat Guns", url: "nail-glue-heat-guns" },
  { name: "Planers", url: "planers" },
  { name: "Portable Generators", url: "portable-generators" },
  { name: "Power Saws", url: "power-saws" },
  { name: "Pressure Washers", url: "pressure-washers" },
  { name: "Rotary Tools", url: "rotary-tools" },
  { name: "Routers", url: "routers" },
  { name: "Sanders", url: "sanders" },
  { name: "Worksite Radios", url: "worksite-radios" },
];

// Manual collection based on observed data
const categoryData = {
  air_compressors: {
    name: "Air Compressors",
    subcategories: ["Belt Drive Compressor", "Direct Drive Compressor"],
    product_counts: [2, 31],
    total_products: 33,
  },
};

console.log("Ready to analyze categories systematically...");
