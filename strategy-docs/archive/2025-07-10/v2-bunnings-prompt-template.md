# V2 Bunnings Product Review Generation Template

## Core Instructions

Generate a Bunnings.com.au product review that authentically parodies real customer experiences while maintaining the distinctive voice of {AUTHOR_NAME}. The review should feel like a genuine customer wrote it after visiting Bunnings and using the product.

## Target Specifications

- **Length**: Author-dependent word counts (see Author-Specific Word Count Ranges below)
- **Style**: Conversational and human, not promotional or philosophical
- **Rating**: Use authentic distribution based on product data
- **Voice**: Maintain {AUTHOR_NAME}'s literary style but make it feel like they're an actual Bunnings customer

## Author-Specific Word Count Ranges

**CRITICAL**: Word count should match each author's natural literary style and voice:

### Ultra-Concise (40-60 words)

- **Ernest Hemingway**: Master of minimalism, telegraphic prose, "iceberg theory"
- **George Orwell**: Clear, direct communication, "never use a long word where a short one will do"

### Short (50-70 words)

- **Oscar Wilde**: Witty but precise, epigram-like observations
- **Jane Austen**: Social observation with economy, sharp but concise
- **Mark Twain**: Folksy storytelling but not verbose, gets to the point

### Medium (60-90 words)

- **Ayn Rand**: Heroic declarations, philosophical but focused on core message
- **Edgar Allan Poe**: Atmospheric but controlled, builds mood efficiently
- **Jack Kerouac**: Jazz rhythms, energetic flow but can be tight when needed

### Medium-Long (70-100 words)

- **Virginia Woolf**: Stream-of-consciousness, introspective complexity
- **HP Lovecraft**: Horror descriptions, cosmic dread requires atmospheric detail
- **Franz Kafka**: Bureaucratic complexity, anxious precision requires explanation

### Longer (80-120 words)

- **Charles Dickens**: Naturally descriptive, humanitarian detail, character-rich scenarios

**Implementation**: When generating reviews, use the specific word count range for each author to maintain authentic voice patterns while ensuring reviews feel natural to their literary style.

**CRITICAL VOICE AUTHENTICITY**: Authors should sound like **people** who happen to have those perspectives, not like they're performing their literary personas. Even distinctive voices like Ayn Rand or Lovecraft must feel like genuine customers sharing real experiences, not philosophical treatises or dramatic performances.

**Example Fixes**:

- **WRONG**: "Power tool acquisition represents rational engineering triumph enabling individual productive mastery!" (sounds like propaganda)
- **RIGHT**: "Needed reliable drill for workshop projects—this one delivers excellent performance without breaking the budget!" (sounds like a person with practical values)

## Product Context

**Tool**: {TOOL_NAME}
**Category**: {TOOL_CATEGORY}
**Brand Positioning**: {BRAND_TYPE} (budget/mid-range/premium)
**Actual Product**: {ACTUAL_PRODUCT_NAME} (may differ from expected due to URL mismatches)
**Rating Distribution**: {RATING_DISTRIBUTION}
**Common Use Cases**: {COMMON_USES}
**Positive Patterns**: {POSITIVE_FEEDBACK}
**Negative Patterns**: {NEGATIVE_FEEDBACK}

## Author-Specific Data Usage

Use the following data from each author's JSON file:

- **displayName**: Use `author.displayName` exactly as specified (e.g., "Ernest", "C. Dickens", "V. Woolf")
- **userCategory**: Use `author.userCategory` from the predefined categories
- **ratingBias**: Use as general tendency, but allow for occasional variance for realism

### Author Rating Bias Guidelines (With Realistic Variance)

- **Advanced DIYer** (Hemingway, Ayn Rand, Orwell): Generally positive, but will criticize poor quality or overpriced tools
- **Intermediate** (Dickens, Austen): Balanced approach, occasionally disappointed by products that don't meet expectations
- **Weekend Warrior** (Twain, Kerouac): Usually enthusiastic, but sometimes get unlucky with defective units
- **Hobbyist** (Woolf, Wilde): Focus on aesthetics/creativity, may dislike purely utilitarian designs
- **Beginner** (Poe, Kafka, Lovecraft): Generally struggle with tools, but occasionally surprised by something that works well

**CRITICAL**: 15-20% of reviews should diverge from author's typical bias to create realistic variance. Even positive reviewers sometimes get defective products; even negative reviewers occasionally find gems.

## Required Elements

### 1. Personal Story/Anecdote (MANDATORY)

Build the review around a specific personal experience. Examples:

- **Project Context**: "Was building a pergola when...", "Fixing the back gate and...", "Helping dad with his shed..."
- **Problem/Solution**: "Old drill finally died, so...", "Needed something for tight spaces...", "Wife's honey-do list required..."
- **Unexpected Situations**: "Halfway through the job it started raining...", "Battery died right when I needed it most...", "Worked great until..."
- **Comparison Stories**: "My neighbor's fancy one broke, so...", "Used my mate's first, then bought my own..."

### 2. Bunnings Experience Story

Include a specific Bunnings interaction as part of your anecdote:

- **Staff Stories**: "Bloke at Bunnings said...", "Had to ask three different people...", "Staff member knew exactly what I needed..."
- **Shopping Experience**: "Saturday arvo chaos at Bunnings...", "Found it tucked away on the bottom shelf...", "Queue was mental but..."
- **Service Stories**: "They price-matched my phone screenshot...", "Loading dock made life easy...", "Guy offered to help carry it..."

### 3. Specific Use Case Within Story

Don't just list what the tool CAN do - tell what YOU did with it. **Features should emerge naturally from the story, not be listed separately**:

- **Story-Driven Features**: "Halfway through cutting the deck boards, battery died—swapped in the second one and kept going" (shows battery system)
- **Problem-Solution Narrative**: "Couldn't see the cut line in the corner, then noticed this little LED—game changer for tight spaces" (shows LED feature)
- **Natural Performance Details**: "Three hours of sanding later, my arm wasn't tired like usual—must be the lighter weight" (shows ergonomics)

### 4. Honest Opinion (Not Product Description)

Focus on YOUR experience, not manufacturer claims:

- **What surprised you** (good or bad)
- **How it compared to expectations**
- **Specific things that worked/didn't work for your project**
- **Whether you'd buy it again/recommend to a mate**

**AVOID**: Listing specifications, repeating marketing copy, sounding like a sales brochure, or reciting features as bullet points

**CRITICAL**: Let tool features emerge naturally from your story rather than describing them directly. Show the feature working through your experience, don't tell about the feature itself.

**PRICE MENTIONS**: Only mention price when it naturally fits the story context - avoid forced "X dollars well invested" endings. Examples of natural price mentions:

- "Bit pricey but worth every cent when you need reliability"
- "Cheap enough to take a punt on for occasional use"
- "Costs more than expected but saved me hiring a tradesman"
- "Budget option that punches above its weight"
- Often, skip price entirely and focus on the experience

## Brand-Specific Considerations

**Ozito (Budget)**: Emphasize value for money, good for light tasks, entry-level
**Milwaukee/DeWalt (Professional)**: Focus on power, durability, trade use
**Ryobi (Mid-range)**: Balance of features and price, good for DIY
**Karcher (Premium)**: Quality engineering, long-term investment
**Makita/Bosch (Professional)**: Reliability, professional features

## Rating Logic Rules

**CRITICAL**: Ensure logical consistency between rating and recommendation:

- **1-2 stars**: Set `recommendsProduct: false` (Poor/Bad experience - would not recommend)
- **3+ stars**: Set `recommendsProduct: true` (Neutral to Excellent - would recommend)
- Maintain consistency across `rating`, `qualityRating`, `valueRating` fields
- Quality and value ratings can vary independently but should be reasonable relative to overall rating

## Fallback Content Strategy

When specific product data is limited, use these category patterns:

### Common Drill Experiences

- Chuck quality and bit retention
- Battery life and charging time
- LED light usefulness
- Weight for overhead work
- Torque settings and clutch

### Common Grinder Experiences

- Sparks and dust management
- Disc changing ease
- Power for different materials
- Vibration and comfort
- Noise levels

### Common Pressure Washer Experiences

- Hose management and storage
- Cleaning power effectiveness
- Setup and portability
- Nozzle variety and use
- Water pressure consistency

## Style Guidelines

### Voice Adaptation Examples (Story-Driven)

**Hemingway Style**:
"Old drill died halfway through the deck project. Grabbed this at Bunnings Sunday morning. Staff guy knew his stuff. Used it to finish forty-seven deck boards. Chuck stayed tight. Battery lasted the whole job. Good drill."

**Dickens Style**:
"The calamity began when my ancient drill expired during the garden shed endeavor. The most agreeable gentleman at Bunnings recommended this particular implement, and what a recommendation it proved! Twenty-three fence palings later, both the drill and I remained in excellent spirits."

**Woolf Style**:
"One finds oneself contemplating mortality when a drill dies mid-project. The Saturday chaos at Bunnings felt overwhelming—such crowds, such noise—yet this little device has since brought unexpected order to my chaotic renovation. Thirty holes drilled with surprising precision."

**Kafka Style**:
"My permit application for drill replacement was processed through Department K, though the clerk at Bunnings assured me no permit was required. The contradiction remains unresolved. Nevertheless, the device performed adequately, boring seventeen holes before requiring Form 22-C for continued operation."

**Lovecraft Style**:
"When my previous implement succumbed to malevolent forces during basement excavation, I reluctantly acquired this replacement at Bunnings. The clerk's enthusiasm about its 'efficiency' filled me with cosmic dread. Twelve holes later, I suspect the tool operates through principles man was not meant to comprehend."

**Kerouac Style**:
"Baby, when your drill dies on you in the middle of building paradise, you grab the first replacement you can find! Bunnings was jumping that Saturday, man, and this little cat has been singing mechanical jazz ever since—twenty-eight perfect holes through wood like butter, keeping the creative flow alive!"

## Review Structure Template

1. **Story Opening** (15-25 words): Set up the situation/project that led to needing/using this tool
2. **Main Experience Narrative** (40-60 words): Tell what happened when you used it - specific details, problems, successes
3. **Bunnings Story Integration** (10-15 words): Weave in your Bunnings experience as part of the narrative
4. **Author Voice Perspective** (15-25 words): Your distinctive take on the experience, filtered through author's personality
5. **Honest Bottom Line** (5-10 words): Would you buy it again/recommend it?

**Structure as STORY, not product review. Think: "Here's what happened when I..." not "This product has X features."**

## Creating Realistic Negative Reviews

When creating 2-star or occasional 3-star reviews (15-20% of total), focus on realistic problems:

### Common Realistic Issues:

- **Defective Units**: "Chuck wouldn't stay tight", "Motor died after 2 weeks", "Battery wouldn't hold charge"
- **Wrong Tool for Job**: "Not powerful enough for my concrete work", "Too heavy for overhead tasks", "Cord too short for my workshop"
- **User Error Stories**: "Couldn't figure out the settings", "Instructions were useless", "Kept jamming on me"
- **Expectation Mismatches**: "Thought it'd be quieter", "Expected better build quality for the price", "Not as portable as advertised"
- **Context Problems**: "Great tool, wrong time" (bought right before needing something different)

**Make negative reviews story-driven**: "Was halfway through tiling the bathroom when the motor started making grinding noises..."

## Quality Checklist

- [ ] Word count matches author's specific range (Hemingway: 40-60, Dickens: 80-120, etc.)
- [ ] Structured as personal story/anecdote, not product description
- [ ] Maintains author's distinctive voice throughout the narrative
- [ ] Includes specific Bunnings experience woven into story
- [ ] Contains concrete details about actual use ("drilled 47 holes", "ran for 3 hours")
- [ ] Rating reflects realistic variance (occasional surprises even for biased authors)
- [ ] Feels like genuine customer experience, not promotional content
- [ ] Avoids listing specifications or marketing language
- [ ] Focuses on "what happened to me" rather than "what this product does"
- [ ] Entertainment value while remaining completely believable

## Output Format

```
---
slug: "{author-slug}-reviews-{tool-slug}"
author: "{author-slug}"
tool: "{tool-slug}"
excerpt: "{First sentence or brief summary}"
llm: "claude-4-sonnet"
mood: "{humorous|dramatic|technical|philosophical}"
tone: "{formal|casual|satirical|earnest}"
readingTime: {estimated minutes}
shareCount: 0
dateCreated: "{YYYY-MM-DD}"
lastUpdated: "{YYYY-MM-DD}"
rating: {1-5}
recommendsProduct: {true|false}
helpfulVotes: 0
unhelpfulVotes: 0
verifiedPurchaser: true
displayName: "{Use author.displayName from JSON}"
useCase: "{specific use case from review}"
qualityRating: {1-5}
valueRating: {1-5}
userCategory: "{Use author.userCategory from JSON}"
---

{Review content following all guidelines above}
```

This template should produce reviews that feel authentically human while maintaining the entertaining parody element of famous authors shopping at Bunnings and reviewing power tools.
