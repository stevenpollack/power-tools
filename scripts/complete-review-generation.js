#!/usr/bin/env node

import fs from "fs";
import path from "path";

// Read author data for style reference
const authors = {};
fs.readdirSync("authors").forEach((file) => {
  const author = JSON.parse(
    fs.readFileSync(path.join("authors", file), "utf8"),
  );
  authors[author.slug] = author;
});

// Read tool data for specification reference
const tools = {};
fs.readdirSync("tools").forEach((file) => {
  const tool = JSON.parse(fs.readFileSync(path.join("tools", file), "utf8"));
  tools[tool.slug] = tool;
});

// Function to calculate reading time
function calculateReadingTime(content) {
  const words = content.split(/\s+/).length;
  return Math.ceil(words / 220);
}

// Function to generate excerpt from content
function generateExcerpt(content) {
  const sentences = content.split(/[.!?]+/);
  if (sentences.length > 0) {
    return sentences[0].trim() + ".";
  }
  return content.substring(0, 100) + "...";
}

// Generate review content based on author style and tool
function generateReviewContent(author, tool, mood, tone, flourish) {
  const authorData = authors[author];
  const toolData = tools[tool];

  if (!authorData || !toolData) {
    return null;
  }

  // Generate content based on author's distinctive style
  switch (author) {
    case "ernest-hemingway":
      return generateHemingwayReview(toolData, flourish);
    case "oscar-wilde":
      return generateWildeReview(toolData, flourish);
    case "franz-kafka":
      return generateKafkaReview(toolData, flourish);
    case "virginia-woolf":
      return generateWoolfReview(toolData, flourish);
    case "charles-dickens":
      return generateDickensReview(toolData, flourish);
    case "mark-twain":
      return generateTwainReview(toolData, flourish);
    case "jane-austen":
      return generateAustenReview(toolData, flourish);
    case "edgar-allan-poe":
      return generatePoeReview(toolData, flourish);
    case "george-orwell":
      return generateOrwellReview(toolData, flourish);
    case "hp-lovecraft":
      return generateLovecraftReview(toolData, flourish);
    case "jack-kerouac":
      return generateKerouacReview(toolData, flourish);
    case "ayn-rand":
      return generateRandReview(toolData, flourish);
    default:
      return null;
  }
}

function generateHemingwayReview(tool, flourish) {
  const price = tool.pricing?.currentPrice || "unknown";
  const power = tool.specifications?.power || "standard power";
  const weight = tool.specifications?.weight || "good weight";

  return `The ${tool.brand} ${tool.category.toLowerCase()}. It works. ${flourish.charAt(0).toUpperCase() + flourish.slice(1)}. Good.

The power. ${power}. Enough. The weight. ${weight}. Right. Not too heavy. Not too light. Balanced. The way tools should be. The motor runs clean. No complaints. No fuss.

${tool.specifications?.keyFeatures?.[0] || "Professional construction"}. Important. A tool should be reliable. This one is. ${tool.specifications?.keyFeatures?.[1] || "Ergonomic design"}. Matters when you work long hours. Your hands know good tools from bad ones.

The price. $${price}. Fair. You get what you pay for. Nothing more. Nothing less. Value. It cuts. It drills. It works. That is what matters. Not marketing. Not promises. Performance.

Used it on the job. No problems. Started when I needed it to start. Stopped when I needed it to stop. Did the work without complaint. Like a good tool should. Like a good man should.

It is honest. Direct. No pretense. No unnecessary features. Just function. Clean function. That is enough. That is everything.`;
}

function generateWildeReview(tool, flourish) {
  const price = tool.pricing?.currentPrice || "a reasonable sum";
  const brand = tool.brand;

  return `One must confess, this ${brand} specimen possesses a certain mechanical elegance that speaks well of contemporary industrial aesthetics. ${flourish.charAt(0).toUpperCase() + flourish.slice(1)} - a detail that speaks volumes about the care taken in its presentation.

The machine's design philosophy appears to embrace both form and function with equal devotion, a rare achievement in our utilitarian age. The ${tool.specifications?.power || "motor"} delivers its promised performance with the quiet confidence of a well-bred gentleman at afternoon tea. Such restraint in power delivery suggests breeding rather than mere brute force.

One observes how the ${tool.specifications?.keyFeatures?.[0] || "construction quality"} demonstrates that even the most practical implements can aspire to beauty. The ergonomic considerations reveal a manufacturer who understands that comfort and efficiency are not mutually exclusive virtues. How refreshingly civilized!

The price point of $${price} represents what I can only describe as democratic luxury - quality made accessible without sacrificing refinement. In an age where mediocrity masquerades as excellence, this ${tool.category.toLowerCase()} maintains standards that would make even the most discriminating craftsman approve.

I find myself genuinely charmed by this mechanical companion. It performs its duties with theatrical precision while never forgetting its essential purpose. A tool, like conversation, succeeds best when it appears effortless yet achieves profound results.`;
}

function generateKafkaReview(tool, flourish) {
  const category = tool.category.toLowerCase();
  const brand = tool.brand;

  return `In the vast bureaucracy of modern tool-making, this ${brand} device emerges as both salvation and torment, a mechanical embodiment of our perpetual struggle against the insurmountable complexity of contemporary existence.

${flourish.charAt(0).toUpperCase() + flourish.slice(1)} - a journey through the labyrinthine retail distribution network that somehow seemed both futile and necessary. The ${tool.specifications?.power || "power system"} represents yet another layer in the intricate hierarchy of energy distribution that governs our mechanical lives.

One finds oneself trapped within this system of operation and maintenance, each component dependent upon the others in an endless cycle of preparation and use. The ${tool.specifications?.keyFeatures?.[0] || "primary function"} operates with a precision that suggests the presence of some invisible administrative authority, monitoring each operation with bureaucratic thoroughness.

The ${category} presents itself as a choice, yet merely defines another boundary within which one's aspirations must be contained. Under the harsh illumination of necessity, each task becomes an act of penetration into the vast, indifferent surface of material reality. The variable controls respond to the slightest pressure, creating an unsettling intimacy between human intention and mechanical execution.

Despite these existential complications, the tool performs its function with remarkable reliability. It transforms abstract intentions into concrete results with mechanical certainty. In this transformation lies perhaps the only genuine consolation available in our mechanized age - the possibility that purpose might emerge from the endless complexity of modern existence.`;
}

function generateWoolfReview(tool, flourish) {
  const category = tool.category.toLowerCase();
  const features = tool.specifications?.keyFeatures || [];

  return `How curious that this ${tool.brand} implement should stir such unexpected contemplations of creation itself, the way its operation mirrors the endless circling of thought around meaning, the gentle transformation of materials like the patient wearing away of pretense until truth emerges.

${flourish.charAt(0).toUpperCase() + flourish.slice(1)}, though such practical considerations seem almost vulgar when one contemplates the deeper implications of this small machine. Here is rhythm made manifest, the steady pulse creating a meditation upon repetition, upon the thousand small actions that constitute the larger work of transformation.

One notices how the ${features[0] || "primary function"} draws away the debris of improvement, the particles that were once whole, now liberated from their former existence. Is this not precisely what we attempt in our daily struggles toward refinement? The controls respond to the gentlest pressure, allowing one to modulate the intensity of change according to the material's willingness to be transformed.

The illumination casts its scientific light upon the work surface, revealing imperfections that daylight conceals. Under this harsh honesty, each action becomes an act of revelation, exposing the pattern beneath, the natural structure waiting to be discovered. The freedom from cords liberates one from the tyranny of placement, allowing work to follow inspiration rather than proximity to power sources.

Between the tool's vibrations and the steady whisper of its motor, one finds an unexpected companionship in the work of refinement, this patient dialogue between human intention and mechanical precision, both working toward the same essential goal: the revelation of what lies beneath the surface of things.`;
}

function generateDickensReview(tool, flourish) {
  const price = tool.pricing?.currentPrice || "a considerable sum";
  const brand = tool.brand;
  const category = tool.category.toLowerCase();

  return `Behold, dear reader, the magnificent spectacle that is the ${brand} ${category}! This mechanical marvel, this triumph of industrial ingenuity, ${flourish} - as if the very forces of commerce had conspired to deliver unto my humble workshop this most extraordinary implement of productivity!

What a curious thing is modern machinery, I mused, as I first beheld this splendid contraption. ${tool.specifications?.power || "Its powerful motor"}, humming with purposeful energy, speaks to the very soul of progress itself! The ${tool.specifications?.keyFeatures?.[0] || "construction"} reminds one of the specialized tools employed by the finest craftsmen of our industrious age.

The various controls, each designed for its particular mission, present themselves like characters in one of my novels - each with its own distinct purpose, yet all working in harmonious concert toward the common goal of transformation. The ${tool.specifications?.keyFeatures?.[1] || "ergonomic design"} demonstrates a consideration for the working man that speaks well of modern manufacturing sensibilities.

I employed this marvel upon my workshop projects, and the transformation was nothing short of miraculous! The accumulated evidence of countless labors vanished beneath the steady application of mechanical precision. Even Mrs. Pemberton from next door paused in her gardening to witness this resurrection of neglected materials.

At $${price}, this ${brand} represents not merely a purchase, but an investment in the very dignity of honest work. It stands ready to wage eternal war against the forces of deterioration and neglect, a noble soldier in the endless campaign for improvement and progress!`;
}

function generateTwainReview(tool, flourish) {
  const category = tool.category.toLowerCase();
  const brand = tool.brand;

  return `Well now, I reckon I've seen my share of contraptions in my time, but this here ${brand} ${category} is something else entirely. ${flourish.charAt(0).toUpperCase() + flourish.slice(1)}, and I'm mighty glad I did. Sometimes the best adventures start with the most ordinary decisions.

Now, I ain't no expert on these mechanical marvels, but I know what works and what don't, and this little fellow works just fine. The ${tool.specifications?.keyFeatures?.[0] || "main feature"} gives it enough gumption to tackle whatever project you've got in mind. Reminds me of the determination we felt navigating the river currents - steady progress toward wherever you're headed.

The ${tool.specifications?.keyFeatures?.[1] || "design"} is particularly appealing to an old river rat like myself. No complications to trip you up, no hunting around for this or that - just pick it up and get to work wherever the work needs doing. That's the kind of freedom that makes a man appreciate the ingenuity of modern times.

The various settings are a marvel of engineering, though I confess I mostly just use the middle setting and call it good. The illumination feature is a thoughtful touch - lights up the work area better than a riverboat's lantern on a moonless night.

For the price, this ${brand} represents honest value - no fancy frills or unnecessary complications, just solid performance that gets the job done. Sometimes the simplest tools are the most reliable, like a good fishing line or a well-worn pair of boots. This ${category} has earned its place in my workshop, right next to my daddy's old hand tools.`;
}

function generateAustenReview(tool, flourish) {
  const price = tool.pricing?.currentPrice || "a reasonable expense";
  const brand = tool.brand;
  const category = tool.category.toLowerCase();

  return `It is a truth universally acknowledged that a homeowner in possession of a substantial project must be in want of a proper ${category}. How fortunate, then, that the ${brand} should present itself as such an admirably suitable solution to this most pressing domestic requirement.

Upon first acquaintance, one cannot help but be struck by the machine's elegant proportions and dignified bearing. ${flourish.charAt(0).toUpperCase() + flourish.slice(1)}, displaying that rare combination of knowledge and courtesy that speaks well of modern commercial sensibilities. Such attention to customer service suggests manufacturers who understand their obligations to society.

The ${tool.specifications?.keyFeatures?.[0] || "primary feature"} deserves particular commendation, for what could be more considerate than equipment that performs its duties without disturbing the neighborhood's morning tranquility? Such thoughtful design speaks to engineers who understand that true refinement lies in the harmonious balance of efficiency and propriety.

The ${tool.specifications?.keyFeatures?.[1] || "secondary feature"} demonstrates an admirable attention to detail, suggesting that environmental consciousness and practical performance need not be mutually exclusive. Such innovation speaks to a progressive understanding of domestic responsibility.

The operation exhibits an intelligence that borders on the prescient, anticipating one's needs with the intuitive grace of a perfectly trained household staff. At $${price}, this ${brand} represents an investment in domestic excellence that any prudent household would find entirely reasonable. It performs its duties with quiet competence, never drawing undue attention to itself - the very model of mechanical propriety.`;
}

function generatePoeReview(tool, flourish) {
  const category = tool.category.toLowerCase();
  const brand = tool.brand;

  return `In the shadow-haunted realm of mechanical implements, where the boundary between utility and obsession grows ever more obscure, I encountered this ${brand} ${category} - a device that would prove to entrance my very soul with its dark mechanical poetry.

${flourish.charAt(0).toUpperCase() + flourish.slice(1)}, a circumstance that seemed orchestrated by some malevolent fate, as if the universe conspired to deliver this instrument of both creation and potential destruction into my trembling hands.

The ${tool.specifications?.power || "motor"} thrums with a hypnotic rhythm, each revolution marking time like the beating of some vast, metallic heart. Its sound penetrates the consciousness, creating an almost mesmeric state wherein the boundary between operator and machine begins to dissolve into something approaching unity - or perhaps madness.

The ${tool.specifications?.keyFeatures?.[0] || "primary mechanism"} operates with a precision that suggests intelligence, perhaps even malice. Each cut, each bore, each transformation becomes an act of penetration into the very essence of matter itself. Under the harsh illumination of its work light, shadows dance and writhe, creating phantoms that exist only in the peripheral vision of the obsessed craftsman.

Yet despite - or perhaps because of - these unsettling qualities, the tool performs with an efficiency that borders on the supernatural. It transforms raw materials with the inexorable certainty of time itself, leaving behind results that speak to capabilities beyond mere mechanical function. In its relentless operation, one glimpses something approaching the sublime - or the damned.`;
}

function generateOrwellReview(tool, flourish) {
  const category = tool.category.toLowerCase();
  const brand = tool.brand;
  const price = tool.pricing?.currentPrice || "the stated price";

  return `The ${brand} ${category} arrived as advertised, though one cannot help but observe how even the most mundane commercial transactions now require constant vigilance against the erosion of straightforward communication.

${flourish.charAt(0).toUpperCase() + flourish.slice(1)}, a simple enough transaction that nonetheless required navigating the increasingly complex bureaucracy of modern retail distribution. The machine itself performs adequately, though one notes how marketing materials consistently employ language designed to obscure rather than illuminate actual capabilities.

The ${tool.specifications?.keyFeatures?.[0] || "primary function"} operates within expected parameters, demonstrating that functional design can still emerge despite the tendency toward unnecessary complication. The controls respond predictably to input, a refreshing contrast to the deliberately confusing interfaces that characterize so much contemporary technology.

One observes how the ${tool.specifications?.keyFeatures?.[1] || "secondary feature"} serves its stated purpose without the elaborate obfuscation that typically accompanies such implementations. The work light illuminates the task area effectively, though one might question whether such features represent genuine improvement or merely the accumulation of complexity for its own sake.

At $${price}, the transaction remains within reasonable bounds, though one cannot ignore how pricing structures increasingly reflect market manipulation rather than actual value. The tool accomplishes its intended function competently, which in our current environment constitutes a modest victory for clarity over confusion, function over propaganda.`;
}

function generateLovecraftReview(tool, flourish) {
  const category = tool.category.toLowerCase();
  const brand = tool.brand;

  return `From the cyclopean workshops of industrial manufacture comes this ${brand} ${category}, an implement whose very existence speaks to humanity's relentless drive to impose order upon the chaotic forces that govern material reality.

${flourish.charAt(0).toUpperCase() + flourish.slice(1)}, though I confess that the significance of this mundane detail pales before the cosmic implications of the machine's deeper purpose. For what are we but insignificant beings attempting to carve meaning from the vast, indifferent substance of existence itself?

The ${tool.specifications?.power || "motor"} generates forces that dwarf human comprehension, channeling energies that existed long before our species crawled from primordial slime. Its ${tool.specifications?.keyFeatures?.[0] || "primary mechanism"} operates according to principles that reveal the fundamental insignificance of human ambition when measured against the inexorable mathematics of mechanical precision.

Each operation becomes a ritual of transformation, a desperate attempt to impose human will upon materials that existed eons before consciousness emerged to trouble the universe with questions of purpose. The illumination reveals surfaces and textures that suggest patterns beyond mortal understanding, geometries that hint at realities too vast for comprehension.

Yet in its relentless functionality, the tool provides a strange comfort - the knowledge that even in our cosmic insignificance, we possess the ability to create, to transform, to leave some small mark upon the universe before the inevitable darkness reclaims all our works. In this mechanical precision lies perhaps our only defense against the overwhelming awareness of our own temporal existence.`;
}

function generateKerouacReview(tool, flourish) {
  const category = tool.category.toLowerCase();
  const brand = tool.brand;

  return `Man, this ${brand} ${category} just spoke to me, you know? Like really spoke to me in that way that tools sometimes do when you're ready to hear what they're saying about work and creation and the beautiful necessity of making things happen in this wild, spinning world of ours.

${flourish.charAt(0).toUpperCase() + flourish.slice(1)} and I knew right then that this was going to be one of those experiences, one of those moments when the universe just lines up perfectly and delivers exactly what you need when you need it most, which is the way life works when you're paying attention to the signs.

The ${tool.specifications?.keyFeatures?.[0] || "primary feature"} just flows, man, just absolutely flows with this rhythm that gets into your bones and makes the work feel like jazz, like improvisation, like you're creating something beautiful and necessary with every movement, every cut, every precise application of power to purpose.

Used it on this project that had been calling to me for weeks, this thing that needed doing but I hadn't found the right approach until this machine showed me the way forward, showed me how to transform raw possibility into actual reality with grace and efficiency and that particular kind of joy that comes from tools that understand their purpose.

The whole experience reminded me of those long nights driving cross-country, when the road and the car and your own restless energy all combine into something larger than the sum of their parts, something that carries you forward into whatever's waiting around the next bend in this endless, beautiful highway of creation and discovery.`;
}

function generateRandReview(tool, flourish) {
  const category = tool.category.toLowerCase();
  const brand = tool.brand;
  const price = tool.pricing?.currentPrice || "its market value";

  return `To wield this ${brand} ${category} is to experience the uncompromised triumph of engineering, a tangible manifestation of human reason's capacity to transform raw material into purposeful form. This is not mere machinery; it is an extension of rational will, a testament to the objective reality of cause and effect.

${flourish.charAt(0).toUpperCase() + flourish.slice(1)}, a circumstance that exemplifies the efficiency achieved when commercial systems operate according to rational principles rather than bureaucratic obstruction. The transaction proceeded with the clarity that characterizes all genuine value exchanges.

The ${tool.specifications?.keyFeatures?.[0] || "primary mechanism"} embodies the principle of productive efficiency, where every component serves a singular, rational purpose. This represents the embodiment of purposeful action, where design follows function with unwavering logical consistency. The ${tool.specifications?.keyFeatures?.[1] || "secondary feature"} demonstrates the manufacturer's commitment to excellence rather than compromise.

Its operation liberates the individual from the constraints of inferior alternatives, enabling the pursuit of objectives unconstrained by the limitations imposed by substandard equipment. The precision of its function reflects the mathematical certainty that underlies all genuine achievement.

At $${price}, this implement represents the rational exchange of value for value, the fundamental principle upon which all honest commerce depends. It serves those who understand that quality results from the uncompromising application of reason to the challenge of creation. This ${category} stands as an argument for the power of human intelligence when directed toward the achievement of productive goals.`;
}

// Process all review files
console.log("🎯 Generating content for all remaining placeholder reviews...");

const reviewFiles = fs
  .readdirSync("reviews")
  .filter((file) => file.endsWith(".md"));
let processedCount = 0;
let generatedCount = 0;

reviewFiles.forEach((filename) => {
  const filePath = path.join("reviews", filename);
  const content = fs.readFileSync(filePath, "utf8");

  // Check if it's a placeholder file
  if (content.includes("[PLACEHOLDER")) {
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1];
      const authorMatch = frontmatter.match(/author: (.+)/);
      const toolMatch = frontmatter.match(/tool: (.+)/);
      const moodMatch = frontmatter.match(/mood: (.+)/);
      const toneMatch = frontmatter.match(/tone: (.+)/);

      if (authorMatch && toolMatch) {
        const authorSlug = authorMatch[1];
        const toolSlug = toolMatch[1];
        const mood = moodMatch ? moodMatch[1] : "technical";
        const tone = toneMatch ? toneMatch[1] : "formal";

        // Extract flourish from the placeholder content
        const flourishMatch = content.match(/flourish: "([^"]+)"/);
        const flourish = flourishMatch
          ? flourishMatch[1]
          : "found this at my local hardware store";

        // Generate new content
        const newContent = generateReviewContent(
          authorSlug,
          toolSlug,
          mood,
          tone,
          flourish,
        );

        if (newContent) {
          // Update reading time and excerpt
          const readingTime = calculateReadingTime(newContent);
          const excerpt = generateExcerpt(newContent);

          // Update frontmatter
          const updatedFrontmatter = frontmatter
            .replace(/readingTime: \d+/, `readingTime: ${readingTime}`)
            .replace(/excerpt: .+/, `excerpt: ${excerpt}`);

          // Create new file content
          const newFileContent = `---\n${updatedFrontmatter}\n---\n\n${newContent}`;

          fs.writeFileSync(filePath, newFileContent);
          generatedCount++;

          if (generatedCount % 25 === 0) {
            console.log(`Generated ${generatedCount} reviews...`);
          }
        }
      }
    }
  }
  processedCount++;
});

console.log(`\n✅ Processing complete!`);
console.log(`📊 Processed ${processedCount} files`);
console.log(`🎯 Generated ${generatedCount} new reviews`);
console.log(`📝 Total reviews: ${reviewFiles.length}`);
