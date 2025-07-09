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
- **ratingBias**: Apply the `author.ratingBias` to influence review ratings

### Author Rating Bias Guidelines
- **Advanced DIYer** (Hemingway, Ayn Rand, Orwell): Knowledgeable, practical assessments
- **Intermediate** (Dickens, Austen): Appreciates quality, social considerations  
- **Weekend Warrior** (Twain, Kerouac): Enthusiastic but intermittent use
- **Hobbyist** (Woolf, Wilde): Creative/aesthetic focus over pure utility
- **Beginner** (Poe, Kafka, Lovecraft): Uncertainty, focus on problems or complexity

## Required Elements

### 1. Authentic Human Experience
Include ONE of these realistic details:
- **Timing context**: "Picked up Sunday morning", "needed for weekend project", "bought during lunch break"
- **Personal context**: "replacing my old one", "first cordless tool", "upgrading from cheaper model"
- **Physical experience**: "lighter than expected", "easier on the wrists", "fits well in toolbox"
- **Social context**: "mate recommended it", "saw neighbor using one", "tradesman mentioned it"

### 2. Bunnings-Specific Detail
Include ONE Bunnings store experience:
- **Staff interaction**: "helpful bloke in power tools", "took ages to find someone", "explained warranty clearly"
- **Store logistics**: "busy Saturday, parked miles away", "easy to load in ute", "got lucky with close spot"
- **Service elements**: "price matched competitor", "staff carried it to car", "loading bay was helpful"
- **Product availability**: "last one on shelf", "special order came in quick", "plenty in stock"

### 3. Category-Appropriate Use Case
Reference realistic application based on tool type:

**Drills**: deck building, furniture assembly, hanging pictures, driving screws
**Circular Saws**: cutting decking, framing, sheet goods, fence repairs
**Grinders**: rust removal, cutting metal, sharpening tools, tile cutting
**Sanders**: deck restoration, furniture refinishing, paint prep
**Pressure Washers**: driveway cleaning, car washing, deck maintenance
**Impact Drivers**: deck screws, lag bolts, heavy-duty fastening

### 4. Authentic Positive/Negative Balance
Based on product rating distribution, include appropriate feedback:

**For 4+ star products**: Focus on positive aspects, minor quibbles if any
**For 3-4 star products**: Balanced view, acknowledge limitations
**For <3 star products**: Honest about problems, may still find value

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

### Voice Adaptation Examples

**Hemingway Style**: 
"Bought this Sunday. Good drill. Chuck holds tight. Used it on deck boards. Battery lasts long enough. Staff at Bunnings knew their stuff. Worth the money."

**Dickens Style**:
"A most agreeable experience acquiring this implement! The helpful gentleman in the power tools section possessed an encyclopedic knowledge of batteries, and the drill itself proved most capable during my recent garden shed construction."

**Woolf Style**: 
"There's something rather meditative about the rhythm of drilling, the way this tool becomes an extension of one's intentions. Purchased during a particularly frantic Saturday at Bunnings—such crowds!—yet it's brought order to my renovation chaos."

**Kafka Style**:
"The drill requires completion of Form 7-B before initial use, though the manual neglects to specify where one obtains this document. The Bunnings clerk directed me to Customer Service, who informed me that Tool Authorization falls under a different department entirely."

**Lovecraft Style**:
"The implement's motor emits frequencies that should not be heard by human ears, and its vibrations seem to resonate with dimensions beyond our understanding. I acquired it at Bunnings despite growing unease about the clerk's too-eager assistance."

**Kerouac Style**:
"Man this drill is ALIVE, you know? Got it at Bunnings and the cats there were cool, and now I'm drilling holes like Charlie Parker blowing bebop—spontaneous creation through mechanical jazz, baby, building the American dream one screw at a time!"

## Review Structure Template

1. **Opening Context** (10-15 words): Brief setup of purchase/use situation
2. **Main Experience** (25-40 words): Core product performance and use case
3. **Bunnings Detail** (8-12 words): Store experience or interaction
4. **Author Voice Flourish** (10-15 words): Distinctive perspective or observation
5. **Conclusion/Rating Justification** (5-10 words): Why this rating

## Quality Checklist

- [ ] 50-120 words total
- [ ] Maintains author's distinctive voice
- [ ] Includes authentic human detail
- [ ] References Bunnings store experience
- [ ] Uses appropriate use case for tool category
- [ ] Rating aligns with author bias and product data
- [ ] Feels conversational, not promotional
- [ ] No overly philosophical or verbose language
- [ ] Brand positioning appropriate (budget vs premium)
- [ ] Entertainment value while remaining believable

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
