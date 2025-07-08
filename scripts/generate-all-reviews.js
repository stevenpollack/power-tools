#!/usr/bin/env node

import fs from "fs";
import path from "path";

// Read all authors and tools
const authors = fs
  .readdirSync("authors")
  .map((file) =>
    JSON.parse(fs.readFileSync(path.join("authors", file), "utf8")),
  );

const tools = fs
  .readdirSync("tools")
  .map((file) => JSON.parse(fs.readFileSync(path.join("tools", file), "utf8")));

// Find existing reviews
const existingReviews = new Set();
fs.readdirSync("reviews").forEach((file) => {
  if (file.endsWith(".md")) {
    // Extract author and tool from filename: author-reviews-tool.md
    const match = file.match(/^(.+)-reviews-(.+)\.md$/);
    if (match) {
      const [, authorSlug, toolSlug] = match;
      existingReviews.add(`${authorSlug}-${toolSlug}`);
    }
  }
});

console.log(`Found ${existingReviews.size} existing reviews`);
console.log(`Total combinations needed: ${authors.length * tools.length}`);
console.log(
  `Missing reviews to generate: ${authors.length * tools.length - existingReviews.size}`,
);

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

// Mood/tone combinations for variety
const moodToneCombos = [
  { mood: "technical", tone: "formal" },
  { mood: "technical", tone: "earnest" },
  { mood: "dramatic", tone: "formal" },
  { mood: "dramatic", tone: "earnest" },
  { mood: "humorous", tone: "casual" },
  { mood: "humorous", tone: "satirical" },
  { mood: "philosophical", tone: "formal" },
  { mood: "philosophical", tone: "casual" },
];

// Generate flourish for each author-tool combo
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

// Calculate reading time
function calculateReadingTime(content) {
  const words = content.split(/\s+/).length;
  return Math.ceil(words / 220); // 220 WPM as specified
}

// Create prompt for LLM
function createPrompt(author, tool, mood, tone, flourish) {
  return `Generate a power tool review in the distinctive style of ${author.name} for the ${tool.name}.

**Context:**
- Author: ${author.name} (${author.lifespan}) - ${author.nationality}
- Literary Movement: ${author.literaryMovement}
- Tool: ${tool.name} by ${tool.brand}
- Category: ${tool.category}
- Key Features: ${tool.specifications.keyFeatures.join(", ")}
- Price: $${tool.pricing.currentPrice} ${tool.pricing.currency}

**Style Guidelines:**
- Writing Style: ${author.styleAnalysis.summary}
- Vocabulary: ${author.styleAnalysis.vocabulary}
- Sentence Structure: ${author.styleAnalysis.sentenceStructure}
- Key Themes: ${author.styleAnalysis.themes.join(", ")}
- Unique Quirks: ${author.styleAnalysis.quirks.join(", ")}

**Review Requirements:**
- Length: 200-300 words
- Mood: ${mood} (${mood === "humorous" ? "entertaining and funny" : mood === "dramatic" ? "intense and emotional" : mood === "technical" ? "focused on specifications" : "deep and contemplative"})
- Tone: ${tone} (${tone === "formal" ? "elevated and literary" : tone === "casual" ? "relaxed and conversational" : tone === "satirical" ? "witty and mocking" : "sincere and heartfelt"})
- Purpose: Pure entertainment, NOT genuine product advice
- Voice: Stay absolutely true to ${author.name}'s distinctive writing style

**Human Flourish to Include:**
Naturally incorporate this realistic detail: "${flourish}"

**Important Notes:**
- This is satirical content for entertainment purposes
- Include specific tool features naturally within the narrative
- Make it engaging and memorable while maintaining the author's voice
- End with a conclusion that feels authentically "${author.name}"
- The human flourish should feel organic to the review, not forced

Generate the review content only (no frontmatter or metadata):`;
}

// Generate missing reviews
let generatedCount = 0;
const missingCombos = [];

authors.forEach((author) => {
  tools.forEach((tool) => {
    const comboKey = `${author.slug}-${tool.slug}`;
    if (!existingReviews.has(comboKey)) {
      // Assign mood/tone based on author and tool for consistency
      const comboIndex =
        (author.slug.length + tool.slug.length) % moodToneCombos.length;
      const { mood, tone } = moodToneCombos[comboIndex];

      const flourish = generateFlourish(author.slug, tool.slug);

      missingCombos.push({
        author,
        tool,
        mood,
        tone,
        flourish,
        filename: `${author.slug}-reviews-${tool.slug}.md`,
      });
    }
  });
});

console.log(`\nFound ${missingCombos.length} combinations to generate`);

// Create sample reviews with placeholder content for now
// In practice, these would be generated by LLM
missingCombos.forEach((combo, index) => {
  const { author, tool, mood, tone, flourish, filename } = combo;

  const slug = `${author.slug}-${tool.slug}`;
  const dateCreated = "2025-07-04";

  // Generate excerpt based on author style
  let excerpt;
  switch (author.slug) {
    case "ernest-hemingway":
      excerpt = `The ${tool.brand} ${tool.category.toLowerCase()}. It worked.`;
      break;
    case "oscar-wilde":
      excerpt = `One must confess, this ${tool.brand} specimen possesses a certain mechanical elegance.`;
      break;
    case "franz-kafka":
      excerpt = `In the vast bureaucracy of modern tool-making, this ${tool.brand} device emerges as both salvation and torment.`;
      break;
    case "virginia-woolf":
      excerpt = `How curious that this ${tool.brand} implement should stir such unexpected contemplations of creation itself.`;
      break;
    default:
      excerpt = `A thoughtful examination of the ${tool.name} in practice.`;
  }

  // Estimate reading time for placeholder content (will be recalculated for real content)
  const estimatedReadingTime = 2;

  const frontmatter = `---
slug: ${slug}
llm: claude-4-sonnet
author: ${author.slug}
tool: ${tool.slug}
excerpt: ${excerpt}
mood: ${mood}
tone: ${tone}
readingTime: ${estimatedReadingTime}
shareCount: 0
dateCreated: "${dateCreated}"
lastUpdated: "${dateCreated}"
---

`;

  // Generate actual review content using the prompt
  const prompt = createPrompt(author, tool, mood, tone, flourish);

  // For now, create placeholder that shows the prompt
  const content = `[PLACEHOLDER - This review needs to be generated using the following prompt:]

${prompt}

[Expected output: A ${mood} ${tone} review of the ${tool.name} written authentically in ${author.name}'s distinctive literary style, incorporating the human flourish: "${flourish}"]

Word count target: 200-300 words
Reading time: 2-3 minutes`;

  fs.writeFileSync(path.join("reviews", filename), frontmatter + content);
  generatedCount++;

  if ((index + 1) % 50 === 0) {
    console.log(
      `Generated ${index + 1}/${missingCombos.length} review templates...`,
    );
  }
});

console.log(`\n✅ Generated ${generatedCount} new review template files!`);
console.log(`📋 Total reviews now: ${existingReviews.size + generatedCount}`);
console.log(
  `🎯 Complete matrix: ${authors.length} authors × ${tools.length} tools = ${authors.length * tools.length} reviews`,
);

// Save generation data for reference
fs.writeFileSync(
  "review-generation-data.json",
  JSON.stringify(
    {
      authors: authors.map((a) => ({ slug: a.slug, name: a.name })),
      tools: tools.map((t) => ({ slug: t.slug, name: t.name, brand: t.brand })),
      generated: missingCombos.length,
      existing: existingReviews.size,
      total: authors.length * tools.length,
    },
    null,
    2,
  ),
);

console.log("\n💾 Saved generation data to review-generation-data.json");
console.log(
  "\n🔄 Next step: Replace placeholder content with actual LLM-generated reviews",
);
