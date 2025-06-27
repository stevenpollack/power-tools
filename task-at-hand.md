# Tool Collection Agent - Mission Tracking

## Mission Overview
- **Role**: Tool Collection Agent (Agent 2 of 3)
- **Objective**: Collect 20 popular Home Depot power tools with complete data & imagery
- **Timeline**: 2 weeks
- **Integration**: Combines with 12 authors (Stream 1) for 240 review combinations

## Required Deliverables
- `tools-research-package.zip` containing:
  - `tools-data.json` (structured tool data)
  - `categories.json` (tool categorization) 
  - `images/` (20 product images, 800x800px min)
  - `scraping-script.js` (data collection script)
  - `methodology.md` (process documentation)

## Target Tool Distribution
**High Priority (2-3 tools each)**:
- Drills (427 products) → 3 tools
- Power Saws (268 products) → 3 tools
- Batteries & Chargers (189 products) → 2 tools
- Pressure Washers (167 products) → 2 tools
- Grinders (150 products) → 2 tools

**Medium Priority (1-2 tools each)**:
- Nail, Glue & Heat Guns (147 products) → 2 tools
- Sanders (86 products) → 2 tools
- Rotary Tools (40 products) → 1 tool
- Heavy Duty & Construction Tools (34 products) → 1 tool
- Air Compressors (33 products) → 2 tools

**Total**: 20 tools

## Selection Methodology
1. Sort each category by review count (popularity proxy)
2. Select top tools ensuring brand diversity
3. Capture complete data per TypeScript schema
4. Ethical scraping with 1 req/second rate limit

## Progress Tracking
- [ ] Clarify mission requirements
- [ ] Setup development environment
- [ ] Research Home Depot data sources
- [ ] Develop scraping strategy
- [ ] Implement data collection script
- [ ] Execute data collection
- [ ] Process and validate data
- [ ] Collect and optimize images
- [ ] Generate final deliverable package
- [ ] Documentation and quality assurance

## Questions & Clarifications ✅ RESOLVED
1. **Data Source**: Hybrid approach - API first, fallback to scraping
2. **Brand Diversity**: Prioritize popularity over brand balance, analyze distribution post-collection
3. **Tool Variants**: Most popular variant per tool-brand family (avoid brand duplicates per category)
4. **Image Storage**: Both local copies + source URLs for attribution
5. **Pricing**: Capture current price (including sale prices) with timestamp
6. **Review Counts**: Single point-in-time measurement (June 27, 2025)

## Implementation Strategy
### Phase 1: Research & Setup
- Investigate Home Depot API availability
- Analyze site structure for scraping approach
- Setup development environment with rate limiting

### Phase 2: Data Collection Script
- Implement hybrid data collection (API + scraping)
- Category-by-category collection with popularity sorting
- Brand-family deduplication logic
- Image download with local storage

### Phase 3: Data Processing & Validation
- Validate against TypeScript schema
- Statistical analysis of brand distribution
- Quality assurance of collected data
- Generate final deliverable package

## Implementation Notes
- Collection Date: June 27, 2025
- Rate Limit: 1 request/second to respect Home Depot servers
- Fallback Strategy: Manual collection if automated methods fail
