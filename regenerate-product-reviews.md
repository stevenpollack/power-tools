# Regenerate Product Reviews: V2 Bunnings Parody Enhancement

## Task Overview

Transform our existing verbose, promotional-style reviews into authentic, human-centered reviews that parody real Bunnings.com.au customer experiences. This involves analyzing actual customer reviews to extract realistic human patterns and creating a new generation pipeline.

## Context

- **Current State**: Reviews in `/reviews` are 200-300 words, read like advertisements
  - Example problem: "This is not mere machinery; it is an extension of rational will, a testament to the objective reality of cause and effect" (too philosophical, not human)
  - Too verbose and promotional, no authentic human experience
- **Target**: 50-120 word reviews with authentic human flourishes and experiences
  - Should feel like real customer reviews while maintaining author's voice
  - Include practical details, mundane experiences, specific use cases
- **Goal**: Create entertaining parody reviews that feel like real customer experiences
- **Output**: New reviews in `/reviews/v2` using pattern `{author.slug}-reviews-{tool.slug}.md`

## Phase 1: Data Collection & Analysis

### 1.1 Tool Data Collection & Validation ⚠️ (Updated Based on Discovery)
For each tool in `/tools` directory (35 total):

**URL Validation & Rating Extraction:**
- Navigate to the `bunningsUrl` property using Puppeteer MCP server
- **Critical Discovery**: URL mismatches confirmed (tools redirect to wrong products)
- **Primary Data to Extract**:
  - Current rating and review count (e.g., "4.6 (57)")
  - Actual product name/title (to verify URL correctness)
  - Product specifications and features from page
  - Category and brand information

**Review Content Strategy (Adapted for Limited Bunnings Review Data):**
- **Bunnings Reviews**: Extract any available review text (likely minimal)
- **Product Analysis**: Analyze tool specifications, features, and descriptions for realistic use cases
- **Category Research**: Research common experiences with tool type (drills, saws, sanders, etc.)
- **Brand Patterns**: Understand brand positioning (Ozito = budget-friendly, Milwaukee = professional, etc.)

### 1.2 Pattern Analysis & Tool Enhancement
Augment each existing tool JSON file in `/tools/` with scraped review analysis data:
```json
{
  "name": "Ryobi ONE+ 18V Cordless Drill/Driver Kit",
  "slug": "ryobi-one-plus-18v-drill",
  // ... existing tool properties ...
  "reviewAnalysis": {
    "scrapedFrom": "https://www.bunnings.com.au/ryobi-18v-one-4-piece-kit-r18x4c1422b_p0539762",
    "actualProduct": "Ryobi 18V ONE+ 4 Piece Kit", 
    "urlMismatch": true,
    "reviewsScrapped": 12,
    "averageReviewLength": 85,
    "commonUseCases": ["DIY projects", "furniture assembly", "deck building"],
    "positivePatterns": ["easy to use", "good battery life", "value for money"],
    "negativePatterns": ["chuck gets stuck", "not powerful enough for masonry"],
    "humanFlourishes": ["parking was a nightmare", "staff helped load into car", "dog loved the trip"],
    "experienceContext": ["weekend projects", "first-time tool buyer", "replacing old corded drill"],
    "bunningsSpecificDetails": ["store pickup experience", "staff knowledge", "parking challenges", "queue times"],
    "ratingDistribution": {
      "1star": 2,
      "2star": 3, 
      "3star": 8,
      "4star": 15,
      "5star": 7
    },
    "averageRating": 4.1
  }
}
```

**Schema Update Required**: Update `src/content.config.ts` tools collection schema to include optional `reviewAnalysis` object with above structure.

### 1.3 Execution Strategy (Revised Based on Discovery)
**Priority Order:**
1. **URL Validation First**: Check all 35 URLs to identify and document mismatches
2. **Rating Data Collection**: Extract rating/review count for authentic distribution modeling
3. **Content Strategy**: Since individual Bunnings reviews are limited, focus on:
   - Product feature analysis from Bunnings pages
   - Tool category research for realistic use cases
   - Brand positioning understanding

**Puppeteer Data Collection Process:**
- Use `mcp_puppeteer_navigate` to validate each bunningsUrl
- Extract rating button text (e.g., "4.6 (57)") for distribution analysis
- Capture product specifications and features from page
- Document URL redirects/mismatches with actual product found
- **If individual reviews are accessible**: Extract any available review text
- **Fallback**: Use product descriptions and category knowledge to infer realistic experiences

### 1.4 Progress Tracking (Updated Expectations)
- [ ] Content config schema updated for reviewAnalysis field
- [ ] Tool URLs validated: 0/35 
- [ ] Tool JSON files enhanced with available data: 0/35  
- [ ] Rating distributions extracted: 0/35
- [ ] URL mismatches documented: 0 found (expecting significant mismatches)
- [ ] Product specifications collected: 0/35
- [ ] Tool category patterns researched for realistic use cases
- [ ] Brand positioning analysis completed
- [ ] Fallback content pools developed for thin data scenarios

## Phase 2: Prompt Template Development

### 2.1 Create v2-bunnings-prompt-template.md
Develop a new generation template that:
- Integrates tool-specific review insights
- Maintains author's distinctive voice
- Includes realistic human experiences
- Targets 50-120 word length
- Incorporates Bunnings-specific context (parking, staff interactions, store experience)

### 2.2 Template Requirements
- **Author Voice**: Preserve literary style while making it conversational
- **Tool Integration**: Reference specific features from scraped review patterns
- **Human Elements**: Include mundane details that make reviews feel authentic
- **Bunnings Context**: Store experience, staff interactions, practical considerations
- **Rating Authenticity**: Use scraped rating distribution to assign realistic ratings per author bias
- **Content Fallbacks**: Incorporate backup content pools when scraped data is thin
- **Entertainment Value**: Maintain parody element while feeling realistic

## Phase 3: Review Migration & Generation

### 3.1 Existing Review Migration
- Move all existing reviews from `/reviews/` to `/reviews/v1/` directory
- Maintain existing file structure and naming patterns
- Update any references in codebase if necessary

### 3.2 V2 Generation Pipeline
- Use enhanced tool data with embedded review insights
- Apply v2 prompt template
- Generate all 12 authors × 35 tools = 420 reviews in single batch
- Place in `/reviews/v2/` directory
- Both review sets will coexist side-by-side

### 3.3 Quality Validation
- Length check: 50-120 words
- Style consistency with author
- Human authenticity
- Entertainment value
- Bunnings context integration

## Success Criteria

- [ ] Content config schema updated for reviewAnalysis field
- [ ] All 35 tools validated and enhanced with available Bunnings data
- [ ] Rating distributions extracted from all accessible products  
- [ ] URL mismatches documented and corrected tool data collected
- [ ] Realistic use case patterns developed from product analysis + category research
- [ ] Existing reviews moved to `/reviews/v1/` directory
- [ ] v2 prompt template created and tested with fallback content strategy
- [ ] All 420 v2 reviews generated in single batch
- [ ] Reviews maintain author voice while feeling authentically human
- [ ] Length targets met (50-120 words vs original 200-300)
- [ ] Bunnings-specific context naturally integrated
- [ ] Rating distributions reflect realistic patterns based on extracted data
- [ ] Fallback content seamlessly integrated to compensate for limited Bunnings review data

## Technical Notes

- **Schema Updates**: 
  - Update `src/content.config.ts` tools collection to include optional `reviewAnalysis` object
  - Reviews must conform to existing schema in `src/content.config.ts`
- **Directory Structure**:
  - Move existing reviews: `/reviews/*.md` → `/reviews/v1/*.md`
  - Generate new reviews: `/reviews/v2/{author.slug}-reviews-{tool.slug}.md`
- **Tool Enhancement**: Augment existing JSON files in `/tools/` with `reviewAnalysis` data
- **Naming**: Follow existing pattern `{author.slug}-reviews-{tool.slug}.md`
- **Metadata**: Include all required frontmatter fields

## Progress Log

### Data Collection Phase
- **Started**: [DATE]
- **Tools Scraped**: 0/35
- **Current Tool**: [TOOL_NAME]
- **Challenges**: [DOCUMENT_ISSUES]
- **Insights**: [KEY_FINDINGS]

### Template Development Phase
- **Started**: [DATE]
- **Template Status**: Not started
- **Test Generations**: 0
- **Template Refinements**: 0

### Generation Phase
- **Started**: [DATE]
- **Reviews Generated**: 0/420
- **Current Author**: [AUTHOR_NAME]
- **Batch Size**: [NUMBER]

## Discovery Phase Insights ⚠️

**Critical Findings from Bunnings Investigation:**

1. **Limited Individual Review Text**: Bunnings displays ratings and counts (e.g., "4.6 (57)") but has minimal individual customer review content compared to platforms like Amazon
2. **URL Mismatches Confirmed**: Multiple tools redirect to wrong products (Makita drill → Holman plumbing part)
3. **Rating Data Available**: Can extract authentic rating distributions for realistic review assignment
4. **Product Data Rich**: Bunnings pages contain detailed specifications, features, and descriptions useful for realistic use case development

**Strategic Implications:**
- Pivot from review text scraping to product data + rating extraction
- Strengthen fallback content strategy significantly
- Focus on category research and brand positioning analysis
- Use extracted ratings for authentic distribution modeling

## Decision Points & Edge Cases

**URL Mismatches**: Document mismatch but collect data from actual product found. Note both expected vs actual product in analysis file.

**Limited Review Data**: When Bunnings review content is minimal:
1. Extract available rating/count data for distribution modeling
2. Analyze product specifications and features for realistic use cases
3. Research tool category patterns (drill experiences, saw challenges, etc.)
4. Use comprehensive backup content pools (see below)
5. Note data limitations in analysis file

**Data Quality Strategy**: Focus on authentic elements that can be extracted:
- Accurate rating distributions from Bunnings
- Product specifications and feature analysis
- Category-appropriate use cases and challenges
- Brand positioning understanding (budget vs professional)

**Author Prioritization for Testing**: Start with authors who have distinct, recognizable voices:
1. Ernest Hemingway (sparse, direct)
2. Charles Dickens (descriptive, human-focused)  
3. Virginia Woolf (stream-of-consciousness, introspective)

## Enhanced Fallback Content Strategy ⚠️ (Critical Due to Limited Bunnings Data)

Given the discovery that Bunnings has limited individual review text, these backup content pools become essential:

### Generic Human Flourishes
- **Timing**: "bought this Sunday morning", "needed it for weekend project", "picked up during lunch break"
- **Context**: "replacing my old corded one", "first power tool purchase", "upgrading from cheap version"
- **Physical**: "easier on the wrists", "lighter than expected", "fits well in toolbox"
- **Social**: "recommended by mate", "saw neighbor using one", "tradesman at work mentioned it"

### Bunnings-Specific Experiences
- **Store Navigation**: "took ages to find someone", "helpful staff in power tools section", "they knew exactly where it was"
- **Parking**: "busy Saturday, had to park miles away", "got lucky with a close spot", "loading bay was helpful"
- **Practical**: "easy to load in ute", "came with clear instructions", "price matched competitor"
- **Service**: "staff offered to carry it", "explained warranty clearly", "suggested accessories I needed"

### Category-Specific Use Cases & Common Patterns
**Drills**: 
- Use cases: deck building, furniture assembly, hanging pictures, general DIY, driving screws
- Common positives: battery life, chuck quality, LED light, power for wood
- Common negatives: chuck slipping, battery takes time to charge, heavy for overhead work

**Circular Saws**: 
- Use cases: cutting decking, framing, renovations, sheet goods, fence building
- Common positives: clean cuts, blade quality, dust extraction, easy depth adjustment
- Common negatives: cord management (corded), battery drain (cordless), saw dust mess

**Grinders**: 
- Use cases: rust removal, cutting metal, sharpening tools, concrete prep, tile cutting
- Common positives: power, disc change system, guard adjustability
- Common negatives: dust/sparks, noise, vibration, disc wear

**Sanders**: 
- Use cases: deck restoration, furniture refinishing, paint prep, smoothing surfaces
- Common positives: smooth finish, dust collection, pad adhesion, variable speed
- Common negatives: pad wear, dust bag filling, vibration, cord length

**Pressure Washers**: 
- Use cases: driveway cleaning, deck maintenance, car washing, fence cleaning, patio prep
- Common positives: cleaning power, hose length, nozzle variety, easy setup
- Common negatives: hose kinking, pump noise, detergent mixing, storage space

**Impact Drivers**:
- Use cases: deck screws, lag bolts, heavy-duty fastening, automotive work
- Common positives: torque power, bit retention, speed, one-handed operation
- Common negatives: loud operation, overkill for small screws, bit wear

### Realistic Negatives (Use Sparingly)
- **Minor Issues**: "chuck occasionally sticks", "battery could last longer", "bit heavy for overhead work"
- **Context Problems**: "not powerful enough for hardwood", "overkill for my needs", "wish I'd bought bigger model"

**Usage Guidelines**: Rotate these elements to avoid repetition. Match severity to rating distribution. Ensure they feel natural within each author's voice.

### Author Rating Bias Considerations
Consider each author's likely approach to rating products:
- **Hemingway**: Practical, honest; would rate based on functionality (bias toward 3-4 stars)
- **Dickens**: Appreciates craftsmanship and human stories; generous but detailed (bias toward 4-5 stars)
- **Woolf**: Introspective, considers broader implications; thoughtful ratings (bias toward 3-4 stars)
- **Wilde**: Aesthetic focus, witty observations; ratings based on style and cleverness (bias toward 3-5 stars)
- **Austen**: Social dynamics, value assessment; practical considerations (bias toward 3-4 stars)

Use the scraped rating distribution as a baseline, then adjust based on author personality and the specific review content.

## Notes & Observations

[Use this section to document insights, challenges, and decisions made during the process]

### Data Collection Insights
- **URL Accuracy**: [Document any systematic URL issues]
- **Review Patterns**: [Note common themes across products]
- **Bunnings Specifics**: [Document store-specific experiences mentioned]

### Template Development Insights  
- **Author Voice Balance**: [How to maintain literary style while being conversational]
- **Length Constraints**: [Techniques for staying within 50-120 words]
- **Human Authenticity**: [What makes reviews feel real vs promotional]
