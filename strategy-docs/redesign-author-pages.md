# Redesign Author Pages for V2 Bunnings Theme - Agent Prompt

## **Agent Role & Context**

You are a senior UI/UX designer and frontend developer working on a parody review website that mimics the Bunnings Warehouse design system. The site features famous authors reviewing power tools in their distinctive writing styles. You have strong expertise in:

- React/TypeScript component development
- Astro static site generation and content collections
- Tailwind CSS and Bunnings design system implementation
- DaisyUI and ShadCN component libraries
- Responsive design and accessibility best practices
- Information architecture and user experience design

Take ownership of the complete redesign, ensuring the new author pages feel like authentic Bunnings "team member" profiles while maintaining the literary parody concept.

## **Task Overview**

Redesign the author pages system to create a V2 experience that fully embraces the Bunnings brand aesthetic and improves user experience. This includes:

1. **New Authors Listing Page** (`authors/v2.astro`) - A "team directory" style page
2. **Enhanced Author Profile Pages** (`author/v2/[id].astro`) - Individual author profiles with review galleries
3. **Updated Author Cards** - Bunnings-themed cards using new SVG headshots
4. **Advanced Filtering & Search** - Filter by literary period, style, tool preferences
5. **Performance Metrics Integration** - Review counts, ratings, helpful votes

## **Data Context & Collections**

### **Available Collections Structure**

```tsx
// Collection locations:
- authors/     → Author biographical data (JSON files)
- tools/       → Tool specifications and data (JSON files) 
- reviews/v2/  → V2 review content (Markdown files)
```

### **Author Schema Fields Available**

```tsx
interface Author {
  name: string;              // "Franz Kafka"
  displayName: string;       // "Kafka" (for Bunnings name tags)
  headshot?: string;         // "kafka.svg" (NEW: points to src/images/headshots/)
  lifespan: string;          // "1883-1924"
  styleKeywords: string[];   // ["existential", "surreal", "bureaucratic"]
  primaryWorks: string[];    // ["The Metamorphosis", "The Trial"]
  portrait: {               // LEGACY: Keep for V1 backwards compatibility
    filename: string;
  };
  bio?: string;             // Social media-style bio for V2 pages
  literaryMovement: string; // "Modernism", "Romanticism", etc.
  nationality: string;      // "Czech", "British", etc.
}
```

### **New SVG Headshots Available**

Located in `src/images/headshots/`:
- `ayn-rand.svg` (165KB)
- `charles-dickens.svg` (661KB)  
- `edgar-allan-poe.svg` (114KB)
- (Additional headshots for all 12 authors)

**Design Advantage**: SVG format ensures crisp display at any size, perfect for responsive cards and profile headers.

**Naming Convention**: Headshot filenames match author JSON file names (e.g., `franz-kafka.json` → `franz-kafka.svg`)

**Current Status**: Only 3 headshots exist: `ayn-rand.svg`, `charles-dickens.svg`, `edgar-allan-poe.svg`

**Graceful Handling**: When headshot field is undefined or file missing, show placeholder with author initials

### **Review Data Integration**

```tsx
// Get reviews for an author using Astro collections (no metrics needed)
const reviews = await getCollection("reviewsV2", 
  (review) => review.data.author.id === authorId
);

// Get full data for each review
const reviewsWithData = await Promise.all(
  reviews.map(async (review) => ({
    review,
    tool: await getEntry(review.data.tool),
    author: await getEntry(review.data.author),
  }))
);
```

## **Technical Requirements**

### **Component Library Strategy**

**Primary**: ShadCN/UI for core interactions (modals, dropdowns, buttons)
**Secondary**: DaisyUI for layout utilities and Bunnings-specific components
**Custom**: Bunnings-themed variants of standard components

### **Required New Components**

1. **AuthorCardV2.astro** - Bunnings team member style cards
2. **AuthorFilterBar.tsx** - Advanced filtering interface  
3. **AuthorSearchBox.tsx** - Real-time search functionality
4. **AuthorProfileHeader.astro** - Large profile header for individual pages
5. **ReviewGallery.tsx** - Grid of author's reviews with sorting
6. **AuthorMetrics.astro** - Performance statistics display
7. **RelatedAuthors.astro** - "Other team members" recommendation section

### **New Page Structure**

```
/authors/v2           → Main author directory (team listing)
/author/v2/[id]       → Individual author profiles
```

**V1 Compatibility**: Keep existing `/authors` and `/author/[id]` routes unchanged for backwards compatibility.

## **Design Specifications**

### **Bunnings Brand Guidelines**

**Colors** (Official Bunnings Brand Colors):
- Primary Green: `rgb(0, 104, 56)` (Bunnings primary)
- Secondary Green: `rgb(13, 82, 87)` (Bunnings secondary)
- Primary Orange: `rgb(255, 171, 0)` (Bunnings signature color)
- Primary Red: `rgb(218, 41, 28)` (Bunnings accent)
- Neutral Charcoal: `rgb(51, 51, 51)` (Body text)
- Neutral Medium Gray: `rgb(191, 191, 191)` (Borders/secondary text)
- Neutral Light Gray: `rgb(245, 245, 245)` (Background/subtle sections)

**Typography**:
- Headers: `font-bunnings` (custom Bunnings font stack)
- Body: Clean sans-serif, high readability
- Name tags: Bold, uppercase for "team member" feel

**Layout Patterns**:
- Wide layout utilization (Bunnings stores are spacious)
- Clear grid systems with generous whitespace
- Card-based information architecture
- Prominent CTAs with orange accent colors

### **Author Card V2 Design**

**Bunnings "Team Member" Aesthetic**:

```tsx
// Visual hierarchy (simplified, no metrics):
1. Large SVG headshot (rounded square with border)
2. Author name
3. Lifespan (birth-death years)
4. "View Profile" CTA button
```

**Card Dimensions**: 
- Desktop: `320px × 400px` (taller than V1 for more information)
- Mobile: Full width, responsive height

**Hover States**:
- Subtle lift animation (`hover:-translate-y-2`)
- Orange border highlight
- Metrics reveal/expand

### **Author Profile Page Layout**

**Hero Section**:
- Large rounded square headshot (left side)
- Author name and lifespan
- Social media-style biographical blurb

**Content Sections**:
1. **Review Gallery** - Grid of all their reviews with brand sorting

### **Search Interface**

**Pattern**: Follow existing MasonryWall.tsx approach for consistency:
- Single search input with clear button
- useState with function initializer for URL state management
- useEffect to update URL via URLSearchParams and pushState
- Real-time filtering as user types (debounced)
- Search across author names only (KISS principle)

### **Review Sorting**

**Simple Approach** (following existing patterns from reviews-section.tsx):
- Single select dropdown with two options: "Sort by Brand A-Z", "Sort by Brand Z-A"
- Use DaisyUI select component for consistency
- Extract brand from tool data in reviews, sort using localeCompare()

### **Social Media-Style Bio Template**

Generate engaging, Twitter/Instagram-style biographical blurbs for each author using this template pattern:

```
[emoji] [writing descriptor] turned tool reviewer [emoji] [unique value prop] since [birth year] [emoji] "[memorable quote about tools/reviews]"
```

**Example Bios**:
- Franz Kafka: "📚 Existential writer turned tool reviewer ⚡️ Transforming hardware anxiety into literary gold since 1883 🔨 'The power drill chooses you'"
- Charles Dickens: "📖 Victorian novelist crafting epic tool tales 🔧 From workhouse to workshop since 1812 ⚙️ 'It was the best of drills, it was the worst of drills'"
- Ernest Hemingway: "🥃 Minimalist wordsmith meets maximum power tools 💪 Clean prose, dirty work boots since 1899 🎣 'The drill also rises'"

**Bio Guidelines**:
- Keep to 1-2 sentences max
- Include relevant emojis (2-3 max)
- Reference their writing style or famous works
- Connect to tool reviewing theme
- Include their birth year
- End with a memorable quote that blends their literary voice with tools
- Maintain each author's distinctive personality

## **Data Enhancement Requirements**

### **Author Bio Generation**

Social media-style bios will be stored directly in the author JSON files as a `bio` field. Use the bio generation template located at `strategy-docs/author-bio-prompt-template.md` for creating these bios with LLMs.

**Bio Storage**: Each author JSON file should include a `bio` field with the generated social media-style biographical blurb.

### **Review Data for Sorting**

```tsx
// Extract brand information from reviews for sorting:
const getAuthorReviewsByBrand = (authorId: string, sortOrder: 'asc' | 'desc') => {
  // Implementation to get reviews and sort by brand name
};
```

## **Component Interfaces**

### **AuthorCardV2.astro Props**

```tsx
import { cva, type VariantProps } from "class-variance-authority";

const authorCardVariants = cva(
  "bg-white border-2 border-bunnings-neutral-medium-gray rounded-lg transition-all duration-300 hover:border-bunnings-secondary-green hover:shadow-xl",
  {
    variants: {
      size: {
        small: "p-4",
        medium: "p-6", 
        large: "p-8"
      }
    },
    defaultVariants: {
      size: "medium"
    }
  }
);

interface AuthorCardV2Props extends VariantProps<typeof authorCardVariants> {
  author: CollectionEntry<"authors">;
}
```

### **Search Implementation**

```tsx
// Follow MasonryWall.tsx pattern - no separate search component needed
// Implement search state directly in authors/v2.astro with client:load React component
// Or use simple Astro component with AlpineJS for minimal JavaScript
```

### **ReviewGallery.tsx Props**

```tsx
interface ReviewGalleryProps {
  authorId: string;
  reviews: ReviewV2WithData[];
  sortBy: "brand-asc" | "brand-desc";
}
```

## **Success Criteria**

### **Visual & Brand Compliance**
- [ ] Full Bunnings orange/green color scheme implementation
- [ ] SVG headshots properly integrated and responsive (rounded squares)
- [ ] Clean, minimal design without visual clutter
- [ ] Maintains literary parody concept while embracing Bunnings theme

### **Functionality & UX**
- [ ] Real-time search works across author names
- [ ] Author cards show only essential info (headshot, name, lifespan, CTA)
- [ ] Individual author pages showcase their reviews effectively
- [ ] Social media-style bios are engaging and on-brand
- [ ] Review sorting by brand works correctly

### **Technical Quality**
- [ ] TypeScript interfaces are properly defined
- [ ] Components are reusable and well-documented
- [ ] Performance is optimized (lazy loading for images)
- [ ] Accessibility standards met (keyboard nav, screen readers)
- [ ] Mobile-responsive across all breakpoints

### **Content Integration**
- [ ] All 12 authors display with proper headshots
- [ ] Social media-style bios generated for each author
- [ ] Review gallery displays and sorts correctly by brand

## **Implementation Status & Progress**

### **Completed Components ✅**

1. **AuthorCardV2.astro** - Simplified author cards with:
   - Rounded square headshots (80x80px) with 4px Bunnings green border
   - Graceful fallback to author initials when headshot missing
   - Author name and lifespan display
   - "View Profile" CTA button with hover effects
   - Proper Bunnings color scheme throughout

2. **authors/v2.astro** - Main author listing page with:
   - Bunnings-themed header ("Our Team" with secondary green background)
   - Real-time search functionality with URL state management
   - Debounced search input (300ms) following MasonryWall.tsx pattern
   - Responsive grid layout (1-4 columns based on screen size)
   - "No results" message handling

3. **author/v2/[id].astro** - Individual author profile pages with:
   - Large profile header with 128x128px headshot or initials
   - Social media-style bio display from author JSON data
   - Review gallery showing author's reviews from reviewsV2 collection
   - Brand sorting dropdown (A-Z, Z-A) with live DOM reordering
   - Responsive review cards with tool images, ratings, and excerpts
   - Graceful handling when author has no reviews

4. **Author Data Enhancement** - Updated all 12 author JSON files with:
   - `headshot` field pointing to SVG files in `src/images/headshots/`
   - `bio` field containing generated social media-style biographical blurbs
   - Maintains backward compatibility with existing `portrait` field

### **Technical Implementation Details**

- **Search Pattern**: Follows existing MasonryWall.tsx approach for consistency
- **URL State Management**: Uses URLSearchParams and pushState for shareable search URLs
- **Image Handling**: Proper Astro image() schema with optional chaining for safety
- **Styling**: Direct Tailwind utilities with official Bunnings color variables
- **Fallback Strategy**: Author initials displayed when headshots unavailable
- **Performance**: Lazy loading for all images, debounced search input

### **Delivery Summary**

**✅ PHASE 1 & 2 COMPLETE** - The V2 author pages system is fully implemented and ready for use:

1. **`/authors/v2`** - New author listing page with search and Bunnings theme
2. **`/author/v2/[id]`** - Individual author profiles with bios and review galleries  
3. **AuthorCardV2.astro** - Clean, minimal author cards following wireframe design
4. **Data Enhancement** - All 12 authors updated with headshots and social media bios

**Key Features Delivered:**
- 🔍 Real-time search with URL state persistence
- 🎨 Full Bunnings color scheme and branding
- 📱 Responsive design (mobile-first)
- 🖼️ Graceful headshot fallbacks (3 SVGs exist, others show initials)
- 📝 Social media-style bios for all authors
- 🔄 Brand sorting (A-Z, Z-A) on individual profile pages
- ♿ Basic accessibility (keyboard navigation, alt text, focus states)

**Browser Testing Ready** - Navigate to `/authors/v2` to test the full experience.

## **Implementation Roadmap (Simplified)**

### **Phase 1: Core Functionality (MVP)**
- [x] Update author JSON files with `headshot` and `bio` fields ✅
- [x] Create `authors/v2.astro` page with search input and grid layout ✅
- [x] Build `AuthorCardV2.astro` component (headshot, name, lifespan, CTA only) ✅
- [x] Integrate SVG headshots with graceful fallback for missing files ✅
- [x] Implement client-side search following MasonryWall.tsx pattern ✅

### **Phase 2: Individual Profiles**
- [x] Create `author/v2/[id].astro` individual profile pages ✅
- [x] Build review gallery with brand sorting (A-Z, Z-A) ✅
- [x] Test with existing reviews from reviewsV2 collection ✅
- [x] Handle missing headshots gracefully with author initials placeholder ✅

### **Phase 3: Polish Only**
- [ ] Responsive design testing and fixes
- [ ] Accessibility improvements (keyboard nav, screen readers)  
- [ ] Performance optimization (lazy loading for images)

## **Files to Create/Modify**

### **New Files**
- `src/pages/authors/v2.astro` - Main author directory  
- `src/pages/author/v2/[id].astro` - Individual author profiles
- `src/components/AuthorCardV2.astro` - Simplified author cards
- `src/components/ReviewGallery.tsx` - Author's review showcase (DaisyUI select for brand sorting)
- `strategy-docs/author-bio-prompt-template.md` - Bio generation template for LLMs

### **Files to Reference**
- `src/images/headshots/*.svg` - New SVG headshots
- `src/components/reviews/review-card.tsx` - For review display patterns
- `src/components/ui/*` - ShadCN components for interactions
- `authors/*.json` - Author biographical data
- `reviews/v2/*.md` - Review content for brand sorting

## **Design System Guidelines**

### **Utility-First Approach**

**Use Tailwind utilities directly in templates** instead of custom CSS classes:

```tsx
// Author card styling (using official Bunnings colors)
className="bg-white border-2 border-bunnings-neutral-medium-gray rounded-lg transition-all duration-300 hover:border-bunnings-secondary-green hover:shadow-xl"

// Rounded square headshot
className="w-20 h-20 rounded-lg border-4 border-bunnings-secondary-green bg-bunnings-neutral-light-gray"

// Authors grid
className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"

// Bio text styling
className="text-bunnings-neutral-charcoal text-lg"
```

### **Component Variants with CVA**

Use `class-variance-authority` only for true variants, not basic styling:

```tsx
const buttonVariants = cva("base-button-classes", {
  variants: { size: { small: "p-2", large: "p-4" }}
});
```

## **Accessibility Requirements**

- **Keyboard Navigation**: Full tab order through filters and cards
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **Color Contrast**: Ensure all text meets WCAG AA standards
- **Focus Management**: Clear focus indicators throughout
- **Alternative Text**: Descriptive alt text for all author headshots

## **Performance Considerations**

- **Image Optimization**: SVG headshots should be optimized for web
- **Lazy Loading**: Implement for author cards in large grids
- **Search Debouncing**: Prevent excessive searching during typing
- **Bio Storage**: Bios stored directly in author JSON files for instant loading
- **Progressive Enhancement**: Core functionality works without JavaScript

---

## **Visual Reference**

**Wireframe Demo**: See `strategy-docs/author-wireframe-demo.html` for interactive visual demonstration of the proposed designs. This shows exactly how the author cards and profile pages should look with proper Bunnings styling.

**Start Implementation**: Begin with the core `AuthorCardV2.astro` component and `authors/v2.astro` page structure, following the simplified roadmap and KISS principles. 
