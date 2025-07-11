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

### **Review Data Integration**

```tsx
// Calculate author metrics from reviews/v2/
const authorMetrics = {
  totalReviews: number;
  averageRating: number;
  totalHelpfulVotes: number;
  toolCategories: string[];     // ["drills", "saws", "sanders"]
  favoriteTools: string[];      // Top 3 most-reviewed tools
  recentActivity: Date;
};
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
// Visual hierarchy:
1. Large SVG headshot (circle crop with orange border)
2. "Name tag" style display name
3. Literary period badge (like department badges)
4. Tool specialization icons
5. Performance metrics (review count, avg rating)
6. "Years of service" (literary career span)
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

**Search Implementation**:
- Simple search bar on authors listing page
- Search across: author names
- Real-time search as user types

### **Review Sorting**

**Sort Options**:
- Sort by Brand A-Z
- Sort by Brand Z-A

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

### **AuthorSearchBox.tsx Props**

```tsx
interface AuthorSearchBoxProps {
  authors: Author[];
  onSearch: (filtered: Author[]) => void;
  placeholder?: string;
}
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

## **Implementation Roadmap (Simplified)**

### **Phase 1: Core Functionality (MVP)**
- [ ] Update author JSON files with `headshot` property
- [ ] Create `authors/v2.astro` page with basic grid layout
- [ ] Build `AuthorCardV2.astro` component (headshot, name, lifespan, CTA only)
- [ ] Integrate SVG headshots from `src/images/headshots/` (rounded squares)
- [ ] Add simple search functionality (author names only)

### **Phase 2: Individual Profiles**
- [ ] Create `author/v2/[id].astro` individual profile pages
- [ ] Generate social media-style bios for each author using `author-bio-prompt-template.md`
- [ ] Update author JSON files with `bio` and `headshot` fields
- [ ] Build review gallery with brand sorting (A-Z, Z-A)

### **Phase 3: Polish Only**
- [ ] Responsive design testing and fixes
- [ ] Accessibility improvements (keyboard nav, screen readers)  
- [ ] Performance optimization (lazy loading for images)

## **Files to Create/Modify**

### **New Files**
- `src/pages/authors/v2.astro` - Main author directory
- `src/pages/author/v2/[id].astro` - Individual author profiles
- `src/components/AuthorCardV2.astro` - Simplified author cards
- `src/components/AuthorSearchBox.tsx` - Search functionality
- `src/components/ReviewGallery.tsx` - Author's review showcase
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
