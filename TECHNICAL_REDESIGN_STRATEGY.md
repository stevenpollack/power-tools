# Power Tools Blog Redesign: Technical Strategy Document

**Date:** 2025-07-07  
**Project:** Bunnings-Style Review System Implementation  
**Scope:** Complete redesign of `/tool/[id].astro` pages with Features and Reviews sections

## Executive Summary

Transform the current literary review blog into a modern, Bunnings-style product review platform while maintaining the entertainment value of famous authors reviewing power tools. This document outlines the complete technical strategy for implementing pixel-perfect Bunnings UI components with responsive design and enhanced content generation.

## Technical Requirements Analysis

### Current State Assessment

- **12 Authors**: Complete profiles with style analysis
- **35 Tools**: Full specifications and metadata
- **420 Total Combinations**: Potential review matrix
- **Existing Stack**: Astro + TailwindCSS + TypeScript
- **Current Reviews**: Literary format, needs conversion

### Target State Goals

- **Bunnings-Style UI**: Pixel-perfect recreation of Features and Reviews sections
- **Mobile-First Design**: Optimized responsive breakpoints
- **Enhanced Content**: 50-120 word reviews with ratings and use cases
- **Interactive Elements**: Filtering, sorting, pagination
- **Performance**: <2s load times, SEO optimized

## Implementation Strategy

### Phase 1: Foundation & Schema (Week 1)

#### 1.1 Color System Implementation

```typescript
// tailwind.config.mjs additions
const bunningsColors = {
  primary: {
    green: "rgb(13, 82, 87)", // Headers, text
    red: "rgb(218, 41, 28)", // Accent bars
    orange: "rgb(255, 171, 0)", // Buttons, CTAs
  },
  neutral: {
    "dark-gray": "rgb(51, 51, 51)", // Body text
    "medium-gray": "rgb(191, 191, 191)", // Borders
    "light-gray": "rgb(245, 245, 245)", // Background
  },
  rating: {
    "star-yellow": "rgb(255, 171, 0)", // Star ratings
    "progress-bar": "rgb(255, 171, 0)", // Rating bars
  },
};
```

#### 1.2 Typography System

```typescript
// Font configuration matching Bunnings
const bunningsFonts = {
  heading: ["Futura", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
  body: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
};

// Size scale
const bunningsScale = {
  xl: "20px", // Main headings
  "2xl": "26px", // Large headings (desktop)
  base: "16px", // Body text
  sm: "14px", // Secondary text
};
```

#### 1.3 Responsive Breakpoints

```typescript
// Optimized for modern devices
const screens = {
  xs: "375px", // iPhone SE
  sm: "640px", // Large phones
  md: "768px", // Tablets
  lg: "1024px", // Small laptops
  xl: "1280px", // Desktop
  "2xl": "1536px", // Large screens
};
```

#### 1.4 Content Schema Extensions

```typescript
// Enhanced review schema
interface BunningsReview {
  // Existing fields
  slug: string;
  author: reference("authors");
  tool: reference("tools");
  content: string;
  excerpt: string;
  dateCreated: string;

  // New Bunnings-style fields
  rating: number;                    // 1-5 stars
  recommendsProduct: boolean;        // Yes/No recommendation
  helpfulVotes: number;             // Thumbs up count
  unhelpfulVotes: number;           // Thumbs down count
  verifiedPurchaser: boolean;       // Always true for our authors
  displayName: string;              // Author's casual name variation
  useCase: string;                  // Specific usage scenario
  qualityRating: number;            // 1-5 for quality
  valueRating: number;              // 1-5 for value
  userCategory: string;             // e.g., "Construction Professional", "Advanced DIYer"

  // Metadata (hidden from public)
  mood: enum;                       // For generation only
  tone: enum;                       // For generation only
  llm: string;                      // For generation only
}
```

#### 1.5 Author Display Name Logic

```typescript
// Author name variations based on personality
const authorDisplayNames = {
  "ernest-hemingway": "Ernest", // Serious, formal
  "oscar-wilde": "O. Wilde", // Theatrical, abbreviated
  "hp-lovecraft": "howard", // Lowercase, intimate
  "mark-twain": "Mark T.", // Folksy, abbreviated
  "virginia-woolf": "V. Woolf", // Modernist, professional
  "franz-kafka": "F. Kafka", // Bureaucratic, formal
  "charles-dickens": "C. Dickens", // Victorian, proper
  "jane-austen": "J. Austen", // Refined, abbreviated
  "edgar-allan-poe": "E.A. Poe", // Gothic, mysterious
  "jack-kerouac": "jack", // Beat, lowercase
  "george-orwell": "G. Orwell", // Political, serious
  "ayn-rand": "Ayn R.", // Objectivist, decisive
};
```

### Phase 2: Component Architecture (Week 1-2)

#### 2.1 Accordion Component System

```typescript
// src/components/ui/Accordion.astro
interface AccordionProps {
  sections: Array<{
    id: string;
    title: string;
    content: string;
    defaultOpen?: boolean;
  }>;
  className?: string;
}

// Implementation using Radix-style data attributes
// - data-state for open/closed states
// - data-orientation for vertical layout
// - Custom animations for slide up/down
```

#### 2.2 Features Section Component

```typescript
// src/components/ToolFeatures.astro
interface ToolFeaturesProps {
  features: string[];
  description: string;
  contents: string;
}

// Uses exact Bunnings HTML structure:
// - Green checkmark icons (SVG or background image)
// - Proper spacing and typography
// - Responsive grid layout
```

#### 2.3 Reviews Section Components

```typescript
// src/components/reviews/ReviewsSection.astro
interface ReviewsSectionProps {
  reviews: BunningsReview[];
  totalReviews: number;
  averageRating: number;
  ratingDistribution: Record<1 | 2 | 3 | 4 | 5, number>;
}

// Child components:
// - RatingSnapshot (distribution bars)
// - ReviewFilters (rating, sort by)
// - ReviewCard (individual review)
// - LoadMoreButton (pagination)
```

#### 2.4 Review Card Component

```typescript
// src/components/reviews/ReviewCard.astro
interface ReviewCardProps {
  review: BunningsReview;
  showShareDialog?: boolean;
}

// Exact Bunnings layout:
// - Star rating display
// - User name and verification badge
// - Time stamp and user category
// - Review content (50-120 words)
// - Recommendation status with icon
// - Helpful voting buttons
// - Share button (replaces Report)
```

#### 2.5 Interactive Elements

```typescript
// src/components/ui/StarRating.astro
interface StarRatingProps {
  rating: number;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
}

// src/components/ui/VotingButtons.astro
interface VotingButtonsProps {
  helpfulCount: number;
  unhelpfulCount: number;
  disabled?: boolean; // For Phase 1
}

// src/components/ui/ShareDialog.astro
interface ShareDialogProps {
  title: string;
  url: string;
  isOpen: boolean;
}
```

### Phase 3: Content Generation Pipeline (Week 2-3)

#### 3.1 Puppeteer Analysis System

```typescript
// scripts/analyze-bunnings-reviews.ts
interface ReviewAnalysis {
  toolId: string;
  commonUseCases: string[];
  averageWordCount: number;
  sentimentDistribution: Record<string, number>;
  featureReferences: string[];
}

// Process:
// 1. Navigate to each tool's Bunnings page
// 2. Extract real user reviews
// 3. Analyze usage patterns and vocabulary
// 4. Identify specific tool features mentioned
// 5. Export analysis for LLM prompt context
```

#### 3.2 Review Generation Strategy

```typescript
// scripts/generate-reviews.ts
interface ReviewGenerationConfig {
  author: Author;
  tool: Tool;
  realWorldContext: ReviewAnalysis;
  targetWordCount: [50, 120];
  ratingRange: [1, 5];
  tone: "exaggerated" | "realistic";
}

// LLM Prompt Template:
const promptTemplate = `
Generate a product review for the {tool.name} in the distinctive voice of {author.name}.

CONTEXT:
- Author Style: {author.styleAnalysis.summary}
- Tool Specifications: {tool.specifications}
- Real Usage Patterns: {realWorldContext.commonUseCases}
- Target Rating: {generatedRating} stars
- Word Count: {randomWordCount} words (between 50-120)
- Tone: Exaggerated {author.tone} for entertainment value

REQUIREMENTS:
- Write in {author.name}'s distinctive style and vocabulary
- Reference specific tool features naturally: {tool.specifications.keyFeatures}
- Include a realistic use case from: {realWorldContext.commonUseCases}
- End with clear recommendation/non-recommendation
- Make it entertaining while staying true to the author's voice
- Include specific details that show actual product knowledge

RATING LOGIC:
- Consider author's typical disposition: {author.personalityBias}
- Factor in tool's actual performance: {tool.popularity.averageRating}
- Add realistic variation for authenticity

OUTPUT FORMAT:
- Review text only (no metadata)
- Natural, conversational tone
- Specific and detailed
- Entertaining but believable
`;
```

#### 3.3 Rating Generation Algorithm

```typescript
// scripts/rating-algorithm.ts
const generateRating = (author: Author, tool: Tool): number => {
  // Author personality biases
  const authorBiases = {
    "oscar-wilde": -0.5, // Critical, aesthetic standards
    "hp-lovecraft": -0.8, // Pessimistic, finds cosmic horror
    hemingway: 0.3, // Values quality, practical
    "mark-twain": 0.1, // Balanced, folksy wisdom
    "virginia-woolf": 0.2, // Thoughtful, modernist
    kafka: -0.3, // Finds bureaucratic problems
    dickens: 0.4, // Optimistic, sees human potential
    austen: 0.2, // Refined taste, social observer
    poe: -0.6, // Gothic, finds darkness
    kerouac: 0.5, // Beat positivity, road enthusiasm
    orwell: -0.2, // Critical of systems, dystopian
    rand: 0.6, // Objectivist, appreciates excellence
  };

  // Tool quality factor (0-1)
  const toolQuality = tool.popularity.averageRating / 5;

  // Random variation for realism (-0.5 to +0.5)
  const variance = Math.random() - 0.5;

  // Combined score
  const rawScore = toolQuality + authorBiases[author.id] + variance;

  // Convert to 1-5 scale with realistic distribution
  return Math.max(1, Math.min(5, Math.round(rawScore * 5)));
};
```

#### 3.4 Content Review Distribution

```typescript
// Target distribution for realistic reviews
const reviewDistribution = {
  1: 10, // Critical reviews (10%)
  2: 15, // Negative reviews (15%)
  3: 20, // Neutral reviews (20%)
  4: 35, // Positive reviews (35%)
  5: 20, // Excellent reviews (20%)
};

// Ensure each tool has varied ratings
// Each author gets 1 review per tool
// 12 authors × 35 tools = 420 total reviews
```

### Phase 4: Page Implementation (Week 3)

#### 4.1 Tool Page Redesign

```typescript
// src/pages/tool/[id].astro
// New layout structure:

<Layout title={`${tool.name} - Reviews`}>
  <div class="tool-page">
    <!-- Tool Header (existing, minimal changes) -->
    <ToolHeader tool={tool} />

    <!-- New Bunnings-style sections -->
    <div class="bunnings-sections">
      <Accordion sections={[
        {
          id: 'features',
          title: 'Features',
          content: <ToolFeatures {...tool.specifications} />,
          defaultOpen: true
        },
        {
          id: 'specifications',
          title: 'Specifications',
          content: <ToolSpecifications {...tool.specifications} />,
          defaultOpen: false
        },
        {
          id: 'reviews',
          title: 'Ratings & Reviews',
          content: <ReviewsSection reviews={toolReviews} />,
          defaultOpen: false
        }
      ]} />
    </div>
  </div>
</Layout>
```

#### 4.2 Mobile-First Responsive Design

```css
/* Mobile (375px - 640px) */
.tool-page {
  @apply px-4 py-2;
}

.bunnings-sections {
  @apply divide-neutral-medium-gray space-y-0 divide-y;
}

.review-card {
  @apply space-y-3 p-4;
}

.review-grid {
  @apply grid grid-cols-1 gap-4;
}

/* Tablet (640px - 1024px) */
@media (min-width: 640px) {
  .tool-page {
    @apply px-6 py-4;
  }

  .review-grid {
    @apply grid-cols-2 gap-6;
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .tool-page {
    @apply mx-auto max-w-6xl px-8 py-6;
  }

  .review-grid {
    @apply grid-cols-3 gap-8;
  }

  .bunnings-sections {
    @apply max-w-4xl;
  }
}
```

#### 4.3 Load More Implementation

```typescript
// src/components/reviews/LoadMoreButton.astro
interface LoadMoreProps {
  currentPage: number;
  totalPages: number;
  reviewsPerPage: number;
  baseUrl: string;
}

// Server-side pagination for SEO
// URL structure: /tool/[id]?page=2
// Default: Show 6 reviews per page
// Progressive enhancement with JavaScript
```

### Phase 5: Performance & SEO (Week 4)

#### 5.1 Performance Optimizations

```typescript
// Image optimization
const toolImages = {
  formats: ["webp", "avif", "jpeg"],
  sizes: [300, 600, 1200],
  quality: 85,
  loading: "lazy",
};

// Code splitting
const componentLazyLoading = {
  ShareDialog: () => import("./ShareDialog.astro"),
  VotingButtons: () => import("./VotingButtons.astro"),
  ReviewFilters: () => import("./ReviewFilters.astro"),
};
```

#### 5.2 SEO Schema Implementation

```typescript
// JSON-LD structured data
const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: tool.name,
  image: tool.thumbnailUrl,
  description: tool.specifications.keyFeatures.join(", "),
  brand: {
    "@type": "Brand",
    name: tool.brand,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: averageRating,
    reviewCount: totalReviews,
  },
  review: reviews.map((review) => ({
    "@type": "Review",
    author: {
      "@type": "Person",
      name: review.displayName,
    },
    datePublished: review.dateCreated,
    reviewBody: review.content,
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
    },
  })),
};
```

## Risk Assessment & Mitigation

### Technical Risks

1. **Performance Impact**: Large number of reviews per page
   - **Mitigation**: Server-side pagination, lazy loading, image optimization
2. **Content Quality**: Generated reviews may feel artificial
   - **Mitigation**: Extensive real-world context analysis, author style training
3. **Mobile Experience**: Complex layouts on small screens
   - **Mitigation**: Mobile-first design, progressive enhancement

### Timeline Risks

1. **Content Generation Complexity**: LLM prompts may need iteration
   - **Mitigation**: Start with smaller sample, iterate based on results
2. **Component Integration**: Astro + TailwindCSS compatibility
   - **Mitigation**: Prototype core components first, test thoroughly

## Success Metrics

### Technical KPIs

- Page load time: <2 seconds
- Mobile PageSpeed score: >90
- Desktop PageSpeed score: >95
- Accessibility score: >95 (WCAG 2.1 AA)

### User Experience KPIs

- Mobile usability: No layout shifts
- Review readability: Clear author voice distinction
- Visual accuracy: >95% match to Bunnings design system

### Content Quality KPIs

- Review word count: 50-120 words (95% compliance)
- Author voice recognition: Distinctive style maintenance
- Rating distribution: Realistic spread across 1-5 stars

## Implementation Timeline

### Week 1: Foundation

- [x] Set up Bunnings color system and typography _(IN PROGRESS)_
- [ ] Create core component architecture
- [ ] Implement accordion system
- [ ] Extend content schema

### Week 2: Components & Content

- [ ] Build all review components
- [ ] Set up Puppeteer analysis pipeline
- [ ] Generate first batch of reviews (120 reviews)
- [ ] Implement responsive design

### Week 3: Integration & Polish

- [ ] Complete tool page redesign
- [ ] Generate remaining reviews (300 reviews)
- [ ] Implement pagination and filtering
- [ ] Performance optimization

### Week 4: Testing & Deployment

- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] SEO optimization
- [ ] Production deployment

## Current Progress Tracking

### Active Tasks (2025-07-07)

1. **[COMPLETED]** Set up Bunnings color system and typography in Tailwind config
2. **[COMPLETED]** Research and implement accordion component (ShadCN or Astro library)
3. **[COMPLETED]** Extend content schema for Bunnings-style review fields
4. **[COMPLETED]** Create mobile-first review card components
5. **[COMPLETED]** Implement rating system with star displays
6. **[COMPLETED]** Build functional voting buttons (helpful/unhelpful)
7. **[PENDING]** Create placeholder review content for testing

### Completed Components

- **Tailwind Config**: Added Bunnings color system, typography, and responsive breakpoints
- **Accordion Component**: Radix UI based accordion with Bunnings styling and red accent bars
- **Star Rating Component**: Configurable star display with Bunnings colors
- **Voting Buttons Component**: Helpful/unhelpful voting with hover states
- **Review Card Component**: Mobile-first review card matching Bunnings design
- **Rating Snapshot Component**: Rating distribution bars and overall rating display
- **Review Filters Component**: Mobile-friendly filter dropdowns
- **Reviews Section Component**: Main container component combining all review elements
- **Author Schema**: Extended with displayName and ratingBias fields for all 12 authors
- **Review Schema**: Extended with Bunnings-style fields (rating, recommendsProduct, etc.)

## Conclusion

This strategy provides a comprehensive approach to recreating the Bunnings review experience while maintaining the entertainment value of famous authors reviewing power tools. The implementation prioritizes performance, accessibility, and user experience while ensuring pixel-perfect design recreation.

The phased approach allows for iterative testing and refinement, reducing risk while maintaining development velocity. All components are designed to be reusable and maintainable for future enhancements.

**Ready for review and approval.**
