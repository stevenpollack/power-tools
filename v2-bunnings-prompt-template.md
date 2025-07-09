# V2 Bunnings Product Review Generation Template

## Core Instructions

Generate a Bunnings.com.au product review that authentically parodies real customer experiences while maintaining the distinctive voice of {AUTHOR_NAME}. The review should feel like a genuine customer wrote it after visiting Bunnings and using the product.

## Target Specifications

- **Length**: 50-120 words (significantly shorter than v1 reviews)
- **Style**: Conversational and human, not promotional or philosophical
- **Rating**: Use authentic distribution based on product data
- **Voice**: Maintain {AUTHOR_NAME}'s literary style but make it feel like they're an actual Bunnings customer

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
Don't just list what the tool CAN do - tell what YOU did with it:
- **Concrete Examples**: "Cut 47 fence palings", "Drilled 12 holes through brick", "Sanded the entire back deck"
- **Real Problems**: "Cord kept getting tangled", "Dust everywhere despite the collection bag", "Chuck started slipping after heavy use"
- **Practical Details**: "Ran for 3 hours straight", "Went through two 5.0Ah batteries", "Had to stop every 20 minutes to clear chips"

### 4. Honest Opinion (Not Product Description)
Focus on YOUR experience, not manufacturer claims:
- **What surprised you** (good or bad)
- **How it compared to expectations**
- **Specific things that worked/didn't work for your project**
- **Whether you'd buy it again/recommend to a mate**

**AVOID**: Listing specifications, repeating marketing copy, sounding like a sales brochure

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

- [ ] 50-120 words total
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
