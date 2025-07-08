#!/usr/bin/env node

import fs from "fs";
import path from "path";

// Read the generation data
const data = JSON.parse(fs.readFileSync("review-generation-data.json", "utf8"));

// Human flourishes for realistic review elements
const humanFlourishes = {
  shopping: [
    "found this at my local Bunnings - surprisingly easy parking on a Saturday morning",
    "picked this up during their latest sale, couldn't resist the price",
    "the staff member at Bunnings was particularly helpful explaining the warranty",
    "noticed this on the display and was impressed by the build quality",
    "had to drive to three different stores before finding one in stock",
  ],
  delivery: [
    "arrived two days earlier than expected, well packaged",
    "delivery was prompt though the box looked like it had been through a war",
    "came with all accessories included, rare these days",
    "the courier actually waited while I checked the contents",
    "shipping was free over $99 which made the decision easy",
  ],
  unboxing: [
    "first impression out of the box - solid, reassuring weight",
    "the plastics feel substantial, not cheap like some competitors",
    "everything was well-organized in molded foam packaging",
    "included manual was actually readable, miracle of miracles",
    "the tool feels balanced in hand, good center of gravity",
  ],
  usage: [
    "used it for a weekend deck project, performed flawlessly",
    "battery lasted longer than advertised in real-world conditions",
    "the LED light is positioned perfectly, no shadows",
    "surprisingly quiet operation, neighbors didn't complain",
    "worked in 35°C heat without overheating issues",
  ],
  comparison: [
    "upgrading from my old corded model - night and day difference",
    "owned the previous generation, this is a significant improvement",
    "compared side-by-side with my mate's Milwaukee, holds its own",
    "my father swears by this brand, now I understand why",
    "been using Ryobi for years, thinking of switching after this",
  ],
  storage: [
    "fits perfectly in my existing tool cabinet",
    "the case is robust enough for daily site transport",
    "wish it came with wall mounting brackets",
    "stores easily on the shelf between other tools",
    "the compact design saves precious workshop space",
  ],
};

// Function to generate flourish
function generateFlourish(authorId, toolSlug) {
  const categories = Object.keys(humanFlourishes);
  const category =
    categories[Math.abs(authorId.length + toolSlug.length) % categories.length];
  const options = humanFlourishes[category];
  return options[
    Math.abs(
      (authorId + toolSlug).split("").reduce((a, b) => a + b.charCodeAt(0), 0),
    ) % options.length
  ];
}

// Sample generated reviews for key author-tool combinations
const sampleReviews = {
  "ernest-hemingway-bosch-professional-720w-125mm-corded-angle-grinder": {
    content: `The grinder. Bosch. Professional grade. Seven hundred and twenty watts of honest power. I found this at my local Bunnings - surprisingly easy parking on a Saturday morning. Good. A man needs parking when he buys tools.

The weight. One point nine kilograms. Solid. Not heavy. Not light. Right. The way a grinder should feel. Balanced. The cord stays out of the way. Important. A man cuts metal. He does not fight cords.

The motor spins. Fast. Clean. The restart protection works. You stop. You start again. Safe. The ergonomic grip fits the hand. Natural. No strain after hours of work. The disc. One hundred and twenty-five millimeters. Standard. Good. A man knows where to find replacement discs.

Ninety-nine dollars Australian. Fair price. Not cheap. Not expensive. Value. The professional construction shows. No plastic where metal belongs. No shortcuts. German engineering. Reliable. It cut through the steel bar stock clean. First try. Every try.

The sparks flew in clean arcs. Beautiful. Dangerous. Necessary. The blade stayed true. No wobble. No heat buildup. Cool running. The work went fast. Clean cuts. Square edges. Professional results.

It is a tool for working. Not showing off. Not collecting dust. Working. Every day. Hard materials. Metal. Steel. Stone when needed. It does the job. All of it. That is enough. That is everything.`,
  },

  "oscar-wilde-dewalt-18v-xr-brushless-impact-driver": {
    content: `One must confess, this DeWALT specimen possesses a certain mechanical elegance that speaks well of contemporary American industrial aesthetics. Delivery was prompt though the box looked like it had been through a war - rather like the reputation of the manufacturer itself.

The eighteen-volt battery system represents, I dare say, a triumph of modern convenience over the pedestrian tyranny of electrical cords. How delightfully liberating to work unencumbered by such mundane tethers! The brushless motor purrs with an efficiency that would make even the most discerning Parisian appreciate its refined engineering.

Three speed settings allow one to approach each fastening task with the appropriate level of force - much like conversation, where subtlety often achieves what brute enthusiasm cannot. The LED work light illuminates one's endeavors with a clarity that renders even the darkest corners amenable to precise work. How wonderfully democratic that such illumination comes standard rather than as an expensive afterthought.

The belt clip, while utilitarian, demonstrates a practical consideration for those of us who must occasionally engage in manual labor. The tool hangs naturally at one's side, ready for deployment with theatrical efficiency. At its price point, this implement represents remarkable value - rather like discovering a perfectly tailored suit at ready-to-wear prices.

I find myself genuinely impressed by this American confection. It drives screws with the authority of conviction while maintaining the delicacy necessary for precision work. A tool, like wit, succeeds best when it appears effortless.`,
  },

  "franz-kafka-makita-18v-brushless-compact-driver-drill": {
    content: `In the vast bureaucracy of modern tool-making, this Makita device emerges as both salvation and torment, a mechanical embodiment of our perpetual struggle against the insurmountable complexity of contemporary existence.

The eighteen-volt power system represents yet another layer in the intricate hierarchy of energy distribution that governs our mechanical lives. One finds oneself trapped within this system of batteries and chargers, each component dependent upon the others in an endless cycle of preparation and depletion. The brushless motor operates with a precision that suggests the presence of some invisible administrative authority, monitoring each revolution with bureaucratic thoroughness.

I had to drive to three different stores before finding one in stock - a pilgrimage through the labyrinthine retail distribution network that somehow seemed both futile and necessary. The compact design, while ostensibly convenient, serves mainly to intensify one's awareness of the tool's concentrated mechanical purpose. Twenty-one adjustable torque settings present themselves as choices, yet each setting merely defines another boundary within which one's drilling aspirations must be contained.

The LED work light illuminates the drilling site with a harsh efficiency that reminds one of the unforgiving fluorescent lighting in government offices. Under this illumination, each hole drilled becomes an act of penetration into the vast, indifferent surface of material reality. The variable speed trigger responds to the slightest pressure of one's finger, creating an unsettling intimacy between human intention and mechanical execution.

Despite these existential complications, the drill performs its function with remarkable reliability. It drives screws and bores holes with mechanical certainty, transforming abstract intentions into concrete results. In this transformation lies perhaps the only genuine consolation available in our mechanized age.`,
  },

  "virginia-woolf-ryobi-18v-one-palm-sander": {
    content: `How curious that this Ryobi implement should stir such unexpected contemplations of creation itself, the way its orbital motion mirrors the endless circling of thought around meaning, the gentle abrasion of surface against surface like the patient wearing away of pretense until truth emerges, smooth and honest.

The compact form nestures naturally in one's palm - shipping was free over $99 which made the decision easy, though such practical considerations seem almost vulgar when one contemplates the deeper implications of this small machine. Here is rhythm made manifest, the three hundred orbits per minute creating a meditation upon repetition, upon the thousand small actions that constitute the larger work of transformation.

One notices how the dust collection system draws away the debris of improvement, the paper particles that were once wood, now liberated from their former existence. Is this not precisely what we attempt in our daily struggles toward refinement? The variable speed control responds to the gentlest pressure, allowing one to modulate the intensity of change according to the material's willingness to be transformed.

The LED light casts its scientific illumination upon the work surface, revealing imperfections that daylight conceals. Under this harsh honesty, each stroke of the sander becomes an act of revelation, exposing the grain beneath, the natural pattern waiting to be discovered. The eighteen-volt battery liberates one from the tyranny of placement, allowing work to follow inspiration rather than proximity to power sources.

Between the tool's vibrations and the steady whisper of its motor, one finds an unexpected companionship in the work of refinement, this patient dialogue between human intention and mechanical precision, both working toward the same essential goal: the revelation of what lies beneath.`,
  },
};

// Function to calculate reading time
function calculateReadingTime(content) {
  const words = content.split(/\s+/).length;
  return Math.ceil(words / 220);
}

// Generate real content for sample reviews
console.log(
  "🎯 Generating real review content for sample author-tool combinations...",
);

let generatedCount = 0;
Object.entries(sampleReviews).forEach(([reviewKey, reviewData]) => {
  const filename = `${reviewKey}.md`;
  const filePath = path.join("reviews", filename);

  if (fs.existsSync(filePath)) {
    // Read current file to get frontmatter
    const currentContent = fs.readFileSync(filePath, "utf8");
    const frontmatterMatch = currentContent.match(/^---\n([\s\S]*?)\n---/);

    if (frontmatterMatch) {
      // Parse frontmatter and update reading time
      const frontmatterLines = frontmatterMatch[1].split("\n");
      const updatedLines = frontmatterLines.map((line) => {
        if (line.startsWith("readingTime:")) {
          const actualReadingTime = calculateReadingTime(reviewData.content);
          return `readingTime: ${actualReadingTime}`;
        }
        if (line.startsWith("excerpt:")) {
          // Generate excerpt from first sentence
          const firstSentence = reviewData.content.split(".")[0] + ".";
          return `excerpt: ${firstSentence}`;
        }
        return line;
      });

      const newFrontmatter = `---\n${updatedLines.join("\n")}\n---\n\n`;
      const newContent = newFrontmatter + reviewData.content;

      fs.writeFileSync(filePath, newContent);
      generatedCount++;
      console.log(`✅ Generated real content for ${reviewKey}`);
    }
  }
});

console.log(`\n📝 Generated ${generatedCount} real reviews!`);
console.log(
  "🔄 For the remaining reviews, you would typically use an LLM API to generate content based on the prompts stored in each file.",
);
console.log(
  "\n💡 Each placeholder file contains the complete prompt needed for LLM generation.",
);
console.log(
  "📋 The human flourishes and style guidelines are already embedded in each prompt.",
);
