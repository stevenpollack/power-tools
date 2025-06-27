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

Implement the enhanced floating wall card experience with smart arrangement, mobile responsiveness, and interactive features. You are working as a junior developer following senior-level architectural decisions and best practices.

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
├── stores/
│   ├── cardStore.ts            # Nano Stores for card state
│   ├── filterStore.ts          # Nano Stores for filter state
│   └── uiStore.ts              # Nano Stores for UI state (modals, etc.)
├── hooks/
│   ├── useCardArrangement.ts   # Smart positioning logic
│   └── useCardInteractions.ts  # Hover/focus/touch handling
└── utils/
    ├── cardSorting.ts          # Arrangement algorithms
    └── cardAnimations.ts       # Animation utilities
```

### CRITICAL: State Management Architecture

**MANDATORY**: Use [Nano Stores](https://docs.astro.build/en/recipes/sharing-state-islands/) for all shared state between components. This is the Astro-recommended pattern for islands architecture.

**Required Nano Stores Setup**:

```typescript
// src/stores/cardStore.ts
import { map, atom } from "nanostores";

export const cardArrangement = atom("masonry"); // 'masonry' | 'grid' | 'list'
export const selectedCard = atom<string | null>(null);
export const cardInteractions = map({
  hoveredCard: null as string | null,
  expandedCard: null as string | null,
  isCardDetailsOpen: false,
});

// src/stores/filterStore.ts
export const activeFilters = map({
  author: null as string | null,
  category: null as string | null,
  mood: null as string | null,
  brand: null as string | null,
  searchTerm: "",
});

// src/stores/uiStore.ts
export const uiState = map({
  isShareModalOpen: false,
  isMobileMenuOpen: false,
  viewportWidth: 0,
  scrollPosition: 0,
});
```

**Usage Pattern**: Import stores in components and use `useStore()` hook from `@nanostores/react`.

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

### MANDATORY: UI Component Standards

**Use shadcn/ui components** for all interactive elements. The project already has shadcn/ui installed.

**Required shadcn/ui Components to Use**:

- `Button` - for all clickable actions (filters, close buttons, CTAs)
- `Card` - as base structure for FloatingCard component
- `Badge` - for author names, tool categories, mood indicators
- `Dialog` - for CardDetails expanded view
- `Input` - for search functionality in FilterControls
- `Sheet` - for mobile filter menu (if implementing drawer-style)
- `ScrollArea` - for content that might overflow

**Installation Commands** (already available in project):

```bash
# These are already installed, but for reference:
npx shadcn@latest add button card badge dialog input sheet scroll-area
```

### MANDATORY: Tailwind CSS Best Practices

**DO NOT create separate CSS files**. Use Tailwind utilities exclusively with these patterns:

**✅ CORRECT Tailwind Patterns**:

```tsx
// Use Tailwind utilities directly in className
<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">

// Use @apply in global CSS ONLY for component-level abstractions
// In src/styles/globals.css:
.floating-card-base {
  @apply relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl;
}

// Use CSS-in-JS for complex animations via Tailwind arbitrary values
<div className="animate-[float_3s_ease-in-out_infinite] hover:scale-[1.02]">
```

**❌ AVOID These Patterns**:

- Creating separate `.css` files for components
- Inline styles (`style={{}}`) except for dynamic values
- CSS modules or styled-components

### Technical Requirements

- **Framework**: React components in Astro project
- **Styling**: Tailwind CSS utilities ONLY (no separate CSS files)
- **UI Components**: shadcn/ui for all interactive elements
- **State Management**: Nano Stores (mandatory for shared state)
- **Performance**: Intersection Observer, virtual scrolling
- **TypeScript**: Full type safety for all components

### Design Specifications

- **Card dimensions**: Variable (small: 200x150, medium: 300x200, large: 400x250)
- **Colors**: Match brand colors from tool illustrations
- **Typography**: Readable fonts optimized for review content
- **Animations**: Subtle, purposeful, 60fps performance
- **Spacing**: Comfortable reading distance, proper visual hierarchy

### MANDATORY: Component Implementation Examples

**FloatingCard Component Structure**:

```tsx
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@nanostores/react";
import { cardInteractions } from "@/stores/cardStore";

export const FloatingCard = ({ review, size = "medium" }) => {
  const $cardInteractions = useStore(cardInteractions);

  return (
    <Card
      className={cn(
        "floating-card-base cursor-pointer",
        size === "small" && "h-40 w-48",
        size === "medium" && "h-52 w-64",
        size === "large" && "h-64 w-80",
        $cardInteractions.hoveredCard === review.id && "scale-105 shadow-2xl",
      )}
    >
      <CardContent className="p-4 h-full relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 pointer-events-none" />
        <Badge variant="secondary" className="mb-2">
          {review.authorName}
        </Badge>
        {/* Review content here */}
      </CardContent>
    </Card>
  );
};
```

**FilterControls Component Structure**:

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@nanostores/react";
import { activeFilters } from "@/stores/filterStore";

export const FilterControls = () => {
  const $filters = useStore(activeFilters);

  return (
    <div className="flex flex-wrap gap-2 p-4 bg-background border-b sticky top-0 z-10">
      <Input
        placeholder="Search reviews..."
        className="max-w-sm"
        value={$filters.searchTerm}
        onChange={(e) => activeFilters.setKey("searchTerm", e.target.value)}
      />
      {/* Filter buttons here */}
    </div>
  );
};
```

### Installation Requirements

**Dependencies already installed**:

- ✅ Nano Stores: `nanostores @nanostores/react`
- ✅ Tailwind v4 configured via Vite plugin

**IMPORTANT: shadcn/ui Setup Required**:

The project uses Tailwind v4 which is incompatible with standard shadcn/ui init. You need to manually set up the shadcn/ui components:

1. **Create `components.json`** manually:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.mjs",
    "css": "src/styles/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

2. **Create required directories**:

```bash
mkdir -p src/components/ui src/lib
```

3. **Add utility functions** in `src/lib/utils.ts`:

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

4. **Install dependencies**:

```bash
pnpm add clsx tailwind-merge lucide-react
```

5. **Add components manually** or use individual `shadcn add` commands after setup

### Quality Gates

- ✅ Uses Nano Stores for ALL shared state
- ✅ Uses shadcn/ui components for ALL interactive elements
- ✅ Uses Tailwind utilities exclusively (no separate CSS files)
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
