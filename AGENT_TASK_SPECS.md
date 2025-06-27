# Parallel Agent Task Specifications

## 🎨 **AGENT A: Tool Illustration Enhancement**

### Mission Statement

Replace current basic SVG illustrations with high-quality, cartoonish, vectorized illustrations based on real product photos.

### Required Deliverables

**Output**: `improved-tool-illustrations/` containing:

```
improved-tool-illustrations/
├── svg-illustrations/          # 20 enhanced SVG files
│   ├── dewalt-drill-20v.svg
│   ├── milwaukee-m18-hammer-drill.svg
│   └── [18 more tools].svg
├── reference-images/           # Source photos found online
│   ├── dewalt-drill-20v-ref.jpg
│   └── [19 more reference images]
├── design-process.md           # Documentation of approach
└── brand-style-guide.md        # Refined color schemes and styling
```

If the SVG files are deemed acceptable, they'll be used in `public/images/tools/`.

### Tool List (20 tools to enhance)

1. `dewalt-drill-20v` - DEWALT 20V MAX Cordless Drill Driver
2. `milwaukee-m18-hammer-drill` - Milwaukee M18 FUEL Hammer Drill
3. `ryobi-one-plus-drill` - RYOBI ONE+ 18V Cordless Drill
4. `dewalt-circular-saw` - DEWALT 20V MAX 7-1/4 in. Circular Saw
5. `ryobi-circular-saw` - RYOBI ONE+ 18V 6-1/2 in. Circular Saw
6. `milwaukee-m18-circular-saw` - Milwaukee M18 Circular Saw
7. `dewalt-angle-grinder` - DEWALT 20V MAX Angle Grinder
8. `milwaukee-m18-grinder` - Milwaukee M18 FUEL Grinder
9. `ryobi-pressure-washer` - RYOBI Electric Pressure Washer
10. `generac-pressure-washer` - Generac Gas Pressure Washer
11. `dewalt-battery-pack` - DEWALT 20V MAX Battery Pack
12. `milwaukee-m18-battery` - Milwaukee M18 High Output Battery
13. `dewalt-orbital-sander` - DEWALT 20V MAX Orbital Sander
14. `milwaukee-m18-sander` - Milwaukee M18 Orbital Sander
15. `dewalt-brad-nailer` - DEWALT 20V MAX Brad Nailer
16. `paslode-framing-nailer` - Paslode Cordless Framing Nailer
17. `dremel-rotary-tool` - Dremel 8220 Rotary Tool
18. `dewalt-air-compressor` - DEWALT 15 Gal Air Compressor
19. `ryobi-cordless-compressor` - RYOBI 18V Cordless Compressor
20. `milwaukee-rotary-hammer` - Milwaukee M18 Rotary Hammer

### Design Requirements

**Style**: Cartoonish, vectorized illustrations with personality
**Format**: SVG for scalability and small file sizes
**Consistency**: Unified visual language across all tools
**Brand Colors**:

- DEWALT: #FFD320 (yellow) + #2C2C2C (black)
- Milwaukee: #E31E24 (red) + #2C2C2C (black)
- Ryobi: #6ABE45 (green) + #2C2C2C (black)
- Dremel: #0066CC (blue) + #FF6600 (orange)
- Generac: #FF6600 (orange) + #2C2C2C (black)
- Paslode: #FF4500 (orange-red) + #2C2C2C (black)

### Process Strategy

1. **Research Phase**: Find high-quality product photos for each tool
   - Search Google Images, manufacturer websites, Home Depot product pages
   - Collect 2-3 reference angles per tool
   - Document source URLs for attribution

2. **Design Phase**: Create cartoonish vector interpretations
   - Simplify complex details while maintaining tool recognition
   - Add personality through subtle anthropomorphic features
   - Maintain professional appearance despite cartoon style
   - Ensure consistent lighting/shading approach

3. **Optimization Phase**: Perfect for web usage
   - Optimize SVG code for performance
   - Ensure proper viewBox and scaling
   - Test at multiple sizes (50px to 400px)
   - Validate accessibility (proper contrast ratios)

### Quality Gates

- ✅ All 20 tools recognizable and distinct
- ✅ Consistent cartoon style across all illustrations
- ✅ Brand colors properly applied
- ✅ SVG files under 3KB each
- ✅ Proper attribution for reference photos
- ✅ Professional quality despite cartoon approach

---

## 🎯 **AGENT B: Floating Wall UI Development**

### Mission Statement

Implement the enhanced floating wall card experience with smart arrangement, mobile responsiveness, and interactive features.

### Required Deliverables

**Output**: Complete UI implementation in main repository:

```
src/
├── components/
│   ├── FloatingCardWall.tsx    # Main container component
│   ├── FloatingCard.tsx        # Individual card component
│   ├── CardDetails.tsx         # Expanded card view
│   ├── FilterControls.tsx      # Filter/search UI
│   └── ShareModal.tsx          # Social sharing modal
├── hooks/
│   ├── useCardArrangement.ts   # Smart positioning logic
│   ├── useCardInteractions.ts  # Hover/focus/touch handling
│   └── useFilterState.ts       # Filter state management
├── utils/
│   ├── cardSorting.ts          # Arrangement algorithms
│   └── cardAnimations.ts       # Animation utilities
└── styles/
    └── floating-wall.css       # Card-specific styles
```

### Core Features Required

#### 1. Floating Card Grid

- **Responsive masonry layout** (3-5 columns based on screen size)
- **Gentle floating animation** (subtle bob/drift effect)
- **Smart spacing** that prevents overlap while maintaining organic feel
- **Performance optimization** (virtual scrolling for 240 cards)

#### 2. Card Interactions

**Desktop Behavior**:

- **Default state**: Blurred review text, visible author/tool metadata
- **Hover state**: Sharp text, author portrait + tool image appear
- **Focus state**: Keyboard accessible version of hover
- **Click**: Expand to detailed view

**Mobile Behavior**:

- **Default state**: Clear metadata, preview of review text
- **Tap**: Expand to full review
- **Swipe**: Navigate between cards
- **Pull-to-refresh**: Load new arrangement

#### 3. Smart Arrangement Algorithm

- **Popularity weighting**: More-shared reviews get better positioning
- **Diversity spread**: Ensure variety of authors/tools visible in viewport
- **Reading flow**: Natural left-to-right, top-to-bottom scanning
- **Gentle clustering**: Related content loosely grouped but not rigid

#### 4. Filter & Search System

- **Author filter**: Show reviews by specific authors
- **Tool category filter**: Drills, saws, sanders, etc.
- **Mood filter**: Humorous, dramatic, technical, philosophical
- **Brand filter**: DEWALT, Milwaukee, Ryobi
- **Search**: Free-text search across review content

#### 5. Mobile-First Design

- **Touch-friendly**: All interactions work on mobile
- **Swipe gestures**: Natural mobile navigation
- **Performance**: Smooth 60fps animations on devices
- **Accessibility**: Screen reader support, keyboard navigation

### Technical Requirements

- **Framework**: React components in Astro project
- **Styling**: Tailwind CSS with custom animations
- **State Management**: React hooks + context for complex state
- **Performance**: Intersection Observer, virtual scrolling
- **TypeScript**: Full type safety for all components

### Design Specifications

- **Card dimensions**: Variable (small: 200x150, medium: 300x200, large: 400x250)
- **Colors**: Match brand colors from tool illustrations
- **Typography**: Readable fonts optimized for review content
- **Animations**: Subtle, purposeful, 60fps performance
- **Spacing**: Comfortable reading distance, proper visual hierarchy

### Quality Gates

- ✅ All 240 cards render without performance issues
- ✅ Smooth interactions on desktop and mobile
- ✅ Filters work correctly and performantly
- ✅ Accessibility compliance (WCAG 2.1 AA)
- ✅ TypeScript strict mode compliance
- ✅ Cross-browser compatibility (Chrome, Firefox, Safari)

---

## 📝 **AGENT C: Featured Content Generation** (My Focus)

### Mission Statement

Generate a curated subset of 24 high-quality reviews to test our LLM prompts and populate the floating wall for initial testing.

### Featured Review Matrix (24 total)

**Strategy**: Select diverse combinations that showcase different writing styles and tool categories.

#### Author Selection (8 authors)

- **Hemingway** (minimalist) - 3 reviews
- **Kafka** (surreal) - 3 reviews
- **Oscar Wilde** (witty) - 3 reviews
- **Virginia Woolf** (stream-of-consciousness) - 3 reviews
- **Dickens** (verbose) - 3 reviews
- **Lovecraft** (cosmic horror) - 3 reviews
- **Mark Twain** (folksy humor) - 3 reviews
- **Ayn Rand** (philosophical) - 3 reviews

#### Tool Categories (Ensure Coverage)

- **Drills**: 6 reviews (2 per brand)
- **Saws**: 6 reviews (2 per tool type)
- **Sanders**: 3 reviews
- **Grinders**: 3 reviews
- **Nailers**: 3 reviews
- **Compressors**: 3 reviews

#### Content Generation Approach

1. **Batch LLM Generation** using refined prompts
2. **Quality review** of all generated content
3. **Manual curation** to ensure entertainment value
4. **Metadata assignment** (mood, tone, reading time)

### Deliverables

- 24 markdown files in `src/content/reviews/`
- Proper frontmatter with all required fields
- 200-300 words per review (2-3 minute read time)
- Entertainment-focused, not genuinely helpful
- Distinct voice for each author

---

## 🔄 **Coordination Strategy**

### Timeline: Parallel 5-Day Sprint

- **Day 1-2**: Setup and initial work on all three streams
- **Day 3**: Progress check and integration testing
- **Day 4**: Refinement and quality assurance
- **Day 5**: Final integration and testing

### Integration Points

- **Agent A** outputs integrate into `public/images/tools/`
- **Agent B** outputs integrate into main codebase `src/components/`
- **Agent C** outputs integrate into `src/content/reviews/`

### Communication

- Daily progress updates in shared task tracking
- Blockers escalated immediately
- Integration testing every 2 days

Ready to begin parallel execution!
