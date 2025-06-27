#!/usr/bin/env node

import fs from "fs";

// Featured review combinations (24 total)
const featuredCombinations = [
  // Hemingway (3 reviews) - minimalist style
  {
    authorId: "ernest-hemingway",
    toolId: "dewalt-20v-max-cordless-drill",
    mood: "technical",
    tone: "earnest",
  },
  {
    authorId: "ernest-hemingway",
    toolId: "milwaukee-m18-circular-saw",
    mood: "technical",
    tone: "earnest",
  },
  {
    authorId: "ernest-hemingway",
    toolId: "dewalt-20v-angle-grinder",
    mood: "dramatic",
    tone: "earnest",
  },

  // Kafka (3 reviews) - surreal bureaucratic
  {
    authorId: "franz-kafka",
    toolId: "milwaukee-m18-fuel-hammer-drill",
    mood: "philosophical",
    tone: "formal",
  },
  {
    authorId: "franz-kafka",
    toolId: "ryobi-one-plus-18v-drill",
    mood: "philosophical",
    tone: "formal",
  },
  {
    authorId: "franz-kafka",
    toolId: "dewalt-20v-battery-pack",
    mood: "philosophical",
    tone: "formal",
  },

  // Oscar Wilde (3 reviews) - witty ornate
  {
    authorId: "oscar-wilde",
    toolId: "paslode-cordless-framing-nailer",
    mood: "humorous",
    tone: "satirical",
  },
  {
    authorId: "oscar-wilde",
    toolId: "dremel-8220-rotary-tool",
    mood: "humorous",
    tone: "satirical",
  },
  {
    authorId: "oscar-wilde",
    toolId: "milwaukee-m18-high-output-battery",
    mood: "humorous",
    tone: "satirical",
  },

  // Virginia Woolf (3 reviews) - stream of consciousness
  {
    authorId: "virginia-woolf",
    toolId: "dewalt-20v-orbital-sander",
    mood: "philosophical",
    tone: "formal",
  },
  {
    authorId: "virginia-woolf",
    toolId: "milwaukee-m18-orbital-sander",
    mood: "philosophical",
    tone: "formal",
  },
  {
    authorId: "virginia-woolf",
    toolId: "ryobi-one-plus-circular-saw",
    mood: "philosophical",
    tone: "casual",
  },

  // Dickens (3 reviews) - verbose melodramatic
  {
    authorId: "charles-dickens",
    toolId: "generac-gas-pressure-washer",
    mood: "dramatic",
    tone: "formal",
  },
  {
    authorId: "charles-dickens",
    toolId: "dewalt-15-gal-air-compressor",
    mood: "dramatic",
    tone: "formal",
  },
  {
    authorId: "charles-dickens",
    toolId: "milwaukee-m18-fuel-grinder",
    mood: "technical",
    tone: "formal",
  },

  // Lovecraft (3 reviews) - cosmic horror
  {
    authorId: "hp-lovecraft",
    toolId: "milwaukee-m18-rotary-hammer",
    mood: "dramatic",
    tone: "formal",
  },
  {
    authorId: "hp-lovecraft",
    toolId: "ryobi-18v-cordless-compressor",
    mood: "dramatic",
    tone: "formal",
  },
  {
    authorId: "hp-lovecraft",
    toolId: "dewalt-20v-brad-nailer",
    mood: "dramatic",
    tone: "formal",
  },

  // Mark Twain (3 reviews) - folksy humor
  {
    authorId: "mark-twain",
    toolId: "ryobi-electric-pressure-washer",
    mood: "humorous",
    tone: "casual",
  },
  {
    authorId: "mark-twain",
    toolId: "dewalt-20v-circular-saw",
    mood: "humorous",
    tone: "casual",
  },
  {
    authorId: "mark-twain",
    toolId: "milwaukee-m18-battery",
    mood: "humorous",
    tone: "casual",
  },

  // Ayn Rand (3 reviews) - philosophical objectivist
  {
    authorId: "ayn-rand",
    toolId: "milwaukee-m18-circular-saw",
    mood: "philosophical",
    tone: "formal",
  },
  {
    authorId: "ayn-rand",
    toolId: "dewalt-20v-battery-pack",
    mood: "technical",
    tone: "formal",
  },
  {
    authorId: "ayn-rand",
    toolId: "ryobi-cordless-compressor",
    mood: "philosophical",
    tone: "earnest",
  },
];

// LLM Prompt template for generating reviews
const createPrompt = (author, tool, styleAnalysis, mood, tone) => {
  return `Generate a power tool review in the distinctive style of ${author.name} for the ${tool.name}.

**Context:**
- Author: ${author.name} (${author.lifespan}) - ${author.nationality}
- Literary Movement: ${author.literaryMovement}
- Tool: ${tool.name} by ${tool.brand}
- Category: ${tool.category}
- Key Features: ${tool.specifications.keyFeatures.join(", ")}

**Style Guidelines:**
- Writing Style: ${styleAnalysis.summary}
- Vocabulary: ${styleAnalysis.vocabulary}
- Sentence Structure: ${styleAnalysis.sentenceStructure}
- Key Themes: ${styleAnalysis.themes.join(", ")}
- Unique Quirks: ${styleAnalysis.quirks.join(", ")}

**Review Requirements:**
- Length: 200-300 words
- Mood: ${mood} (${mood === "humorous" ? "entertaining and funny" : mood === "dramatic" ? "intense and emotional" : mood === "technical" ? "focused on specifications" : "deep and contemplative"})
- Tone: ${tone} (${tone === "formal" ? "elevated and literary" : tone === "casual" ? "relaxed and conversational" : tone === "satirical" ? "witty and mocking" : "sincere and heartfelt"})
- Purpose: Pure entertainment, NOT genuine product advice
- Voice: Stay absolutely true to ${author.name}'s distinctive writing style

**Important Notes:**
- This is satirical content for entertainment purposes
- Include specific tool features naturally within the narrative
- Make it engaging and memorable while maintaining the author's voice
- End with a conclusion that feels authentically "${author.name}"

Generate the review content only (no frontmatter or metadata):`;
};

console.log("📝 Starting featured review generation...");
console.log(`Generating ${featuredCombinations.length} reviews\n`);

// This would be where we call the LLM API
// For now, create placeholder files with the structure

featuredCombinations.forEach((combo, index) => {
  const slug = `${combo.authorId}-reviews-${combo.toolId}`;
  const dateCreated = new Date().toISOString();

  // Calculate reading time (assume 200 words per minute)
  const estimatedWords = 250;
  const readingTime = Math.ceil(estimatedWords / 200);

  const frontmatter = `---
authorId: ${combo.authorId}
toolId: ${combo.toolId}
featured: true
mood: ${combo.mood}
tone: ${combo.tone}
readingTime: ${readingTime}
shareCount: 0
dateCreated: "${dateCreated}"
lastUpdated: "${dateCreated}"
---

`;

  const placeholderContent = `# ${combo.authorId} Reviews ${combo.toolId}

[Generated review content would go here]

This is a placeholder for the ${combo.mood} ${combo.tone} review of the ${combo.toolId} written in the style of ${combo.authorId}.

The actual review will be generated using LLM with the following approach:
- Author style analysis will inform the writing voice
- Tool specifications will be naturally incorporated
- Entertainment value prioritized over practical advice
- Authentic voice maintenance throughout

Word count target: 200-300 words
Reading time: ${readingTime} minute${readingTime > 1 ? "s" : ""}
`;

  const filename = `src/content/reviews/${slug}.md`;
  fs.writeFileSync(filename, frontmatter + placeholderContent);

  console.log(`✅ Created ${filename}`);
});

console.log(
  `\n🎯 Generated ${featuredCombinations.length} featured review templates!`,
);
console.log("\n📋 Summary by Author:");

const authorCounts = {};
featuredCombinations.forEach((combo) => {
  authorCounts[combo.authorId] = (authorCounts[combo.authorId] || 0) + 1;
});

Object.entries(authorCounts).forEach(([authorId, count]) => {
  console.log(`   ${authorId}: ${count} reviews`);
});

console.log("\n🔄 Next steps:");
console.log("1. Replace placeholder content with actual LLM-generated reviews");
console.log("2. Quality review all generated content");
console.log("3. Adjust mood/tone assignments if needed");
console.log("4. Test floating wall display with real content");

// Save the combinations for reference
fs.writeFileSync(
  "featured-review-combinations.json",
  JSON.stringify(featuredCombinations, null, 2),
);
console.log(
  "\n💾 Saved combinations to featured-review-combinations.json for reference",
);
