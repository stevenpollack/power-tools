# Wire Up Share Button - Agent Prompt

## **Agent Role & Context**

You are a senior frontend engineer working on a parody review website that mimics the Bunnings Warehouse design system. The site features famous authors reviewing power tools in their distinctive writing styles. You have strong expertise in:

- React/TypeScript component development
- Tailwind CSS and responsive design
- Modal/dialog UX patterns
- Social sharing integrations
- Accessibility best practices

Take ownership of the complete implementation, ensuring code quality, proper TypeScript types, and seamless integration with existing components.

## **Task Overview**

Create a social share modal/dialog component that opens when users click the "Share" button on individual reviews in the V2 tool pages. This should integrate with the existing `ShareButtons.tsx` component while updating it for the Bunnings design system and individual review sharing.

## **Data Context & Collections**

### **Content Collections Structure**

The project uses Astro Content Collections defined in `src/content.config.ts`:

```tsx
// Collection locations:
- authors/     → Author data (JSON files)
- tools/       → Tool data (JSON files)
- reviews/v2/  → V2 review content (Markdown files)
```

### **Key Schema Fields Available**

**ReviewsV2 Schema** (`reviewsV2` collection):

```tsx
{
  slug: string;           // Unique identifier for sharing
  author: reference("authors");
  tool: reference("tools");
  excerpt: string;        // Short preview text
  content: string;        // Full review content (markdown body)
  displayName?: string;   // Override author display name
  dateCreated: string;
  // ... other fields (rating, helpfulVotes, etc.)
}
```

**Author Schema** (`authors` collection):

```tsx
{
  name: string; // Full name (e.g., "Franz Kafka")
  displayName: string; // Bunnings display name (e.g., "Kafka")
  // ... other fields
}
```

**Tool Schema** (`tools` collection):

```tsx
{
  name: string; // Full tool name
  brand: string; // Tool brand
  // ... other fields
}
```

### **Data Access Pattern**

In `tool/v2/[id].astro`, the data is already structured as:

```tsx
const reviewsWithData: ReviewV2WithData[] = [
  {
    review: ReviewV2, // Has .data.slug, .body (content)
    author: Author, // Has .data.name, .data.displayName
    tool: Tool, // Has .data.name, .data.brand
  },
];
```

**Important**: The `author` and `tool` references in review data are resolved via `getEntry()` in the Astro page, so you have full access to all author/tool fields, not just IDs.

## **Technical Requirements**

### **Component Library Guidelines**

**MANDATORY: Use ShadCN/UI Components** - The project already has ShadCN/UI installed. Follow DRY principles:

- **Use existing Dialog component**: `src/components/ui/dialog.tsx` (built on Radix UI)
- **Reference existing pattern**: `src/components/ratings/ShareModal.tsx` shows proper usage
- **DO NOT reinvent**: Leverage existing primitives for consistency

```tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
```

1. **Create a new modal component** (`ReviewShareModal.tsx`) that:
   - Uses the existing ShadCN Dialog component (NOT custom modal)
   - Opens when the Share button is clicked in `review-card.tsx`
   - Follows Bunnings design system (orange/green colors, proper typography)
   - Inherits backdrop click and ESC key behavior from Dialog primitive

2. **Integrate with existing ShareButtons logic**:
   - **Method**: Copy and adapt the logic from `ShareButtons.tsx` into the modal
   - **Platforms**: Twitter/X, Reddit, Bluesky, Threads, Copy Link
   - **URL handling**: Use the same window opening logic and social platform URLs
   - **Don't modify**: Keep existing `ShareButtons.tsx` unchanged for V1 compatibility

3. **Share content options** (implement both, make it easy to switch):
   - **Simple version**: `"What if [Author] reviewed a [Tool]?"` + URL
   - **Excerpt version**: `"[Author]'s review of [Tool]: '[First 50 chars of review]...' Read more:"` + URL

4. **URL handling**:
   - **Base URL**: Use `window.location.origin + window.location.pathname`
   - **Parameter format**: Append `?review=${reviewSlug}` to the base URL
   - **Example**: `https://site.com/tool/v2/dewalt-drill?review=kafka-dewalt-drill-review`
   - **Full URL construction**:
     ```tsx
     const shareUrl = `${window.location.origin}${window.location.pathname}?review=${reviewData.slug}`;
     ```

5. **Integration points**:
   - **State management**: Add `useState` for modal in `review-card.tsx`:
     ```tsx
     const [isShareModalOpen, setIsShareModalOpen] = useState(false);
     ```
   - **Data passing**: Extract `authorName` and `toolName` from existing props
   - **Replace placeholder**: Update the `onShare` handler to open modal instead of console.log
   - **Modal integration**: Import and render the new `ReviewShareModal` component

## **Design Specifications**

### **ShadCN Dialog Customization**

**Use DialogContent with custom className** - Don't override the existing structure:

```tsx
<Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle className="text-bunnings-xl font-bunnings text-bunnings-secondary-green font-bold">
        Share this review
      </DialogTitle>
    </DialogHeader>
    {/* Content here */}
  </DialogContent>
</Dialog>
```

**Key Customization Areas**:

- **Max width**: `sm:max-w-md` instead of default `sm:max-w-lg`
- **Title styling**: Use Bunnings typography classes
- **Content area**: Standard `p-6` already provided by DialogContent

### **Typography & Colors**

- **Title**: `text-bunnings-xl font-bunnings font-bold text-bunnings-secondary-green mb-4`
- **Body text**: `text-bunnings-base text-bunnings-neutral-dark-gray`
- **Platform labels**: `text-bunnings-sm font-medium`

### **Button Styling (Match Existing Review Buttons)**

```css
className={cn(
  "flex items-center gap-2 rounded-md px-4 py-3 transition-colors",
  "text-bunnings-sm font-medium",
  "bg-white border border-bunnings-neutral-medium-gray",
  "hover:bg-bunnings-neutral-light-gray",
  "focus:ring-2 focus:ring-bunnings-primary-orange focus:ring-offset-2 focus:outline-none"
)}
```

### **Close Button**

- **Use default ShadCN behavior** - DialogContent already includes close button
- No custom close button needed (follows KISS principle)

### **Layout Patterns**

- **Desktop**: Two-column grid for social buttons
- **Mobile**: Single column stack for buttons
- **Button spacing**: `gap-3` between buttons
- **Icon + text spacing**: `gap-2` within buttons

### **Responsive Breakpoints**

```css
grid-cols-1 sm:grid-cols-2
```

### **Animation**

- **Enter**: `transition-all duration-200 ease-out`
- **Exit**: Smooth fade out with backdrop
- **Backdrop click**: Should close modal smoothly

## **Component Interface**

```tsx
interface ReviewShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviewData: {
    slug: string;
    content: string; // For excerpt version
  };
  authorName: string; // Passed separately from parent
  toolName: string; // Passed separately from parent
}
```

**Data Flow Clarification**:

- `review-card.tsx` manages modal state (`useState` for `isOpen`)
- Data extraction in `tool/v2/[id].astro` from `reviewsWithData`:
  ```tsx
  reviewData: {
    slug: r.review.data.slug,
    content: r.review.body || r.review.data.excerpt, // Full content or fallback
  },
  authorName: r.author.data.displayName || r.author.data.name,
  toolName: r.tool.data.name,
  ```
- Pass these through `reviews-section.tsx` → `review-card.tsx` → modal
- Use existing `transformedReviews` structure but add these fields for sharing

## **Success Criteria**

- [x] Modal opens/closes smoothly from Share button (ShadCN Dialog implementation)
- [x] All social platforms work correctly with review-specific URLs (URL construction with ?review=slug)
- [x] Design matches Bunnings system (colors, fonts, spacing) (Bunnings CSS classes applied)
- [x] Copy to clipboard shows appropriate feedback (temporary "Copied!" text change)
- [x] Responsive on mobile and desktop (grid-cols-1 sm:grid-cols-2)
- [x] Accessible (keyboard navigation, screen readers) (ShadCN Dialog + aria-labels)
- [x] Easy to switch between simple/excerpt share text (commented excerpt version included)

## **Implementation Progress**

- [x] Create `ReviewShareModal.tsx` component
- [x] Implement social sharing logic (adapted from ShareButtons.tsx)
- [x] Add URL construction with ?review=slug parameter
- [x] Update `review-card.tsx` to integrate modal
- [x] Update `reviews-section.tsx` to pass required data
- [x] Update `tool/v2/[id].astro` to extract sharing data
- [x] Test modal functionality (build test passed - no TypeScript errors)
- [x] Verify responsive design (grid layout with sm:grid-cols-2 breakpoint)
- [x] Test accessibility features (aria-labels, keyboard navigation via ShadCN Dialog)
- [x] **IMPLEMENTATION COMPLETE** ✅

## **Implementation Best Practices**

### **SOLID Principles & Code Quality**

- **Single Responsibility**: Modal handles only display/state, ShareButtons handles sharing logic
- **Open/Closed**: Use composition and props to extend behavior vs modification
- **Dependency Inversion**: Depend on abstractions (props interface) not concrete implementations
- **DRY**: Reuse existing ShadCN Dialog and ShareButtons components
- **KISS**: Keep the modal simple - just open/close state and content display
- **YAGNI**: Don't add features like custom animations or complex state until needed

### **TypeScript & Code Standards**

- Use proper TypeScript interfaces with descriptive names
- Include JSDoc comments for complex functions
- Handle edge cases gracefully (empty content, long tool names)
- Follow existing code patterns in the repository

### **Accessibility**

- Include proper `aria-label` attributes for social buttons
- Support keyboard navigation (Tab, Enter, Escape)
- Focus management (focus modal on open, return focus on close)
- Screen reader announcements for modal state changes

### **Performance**

- Lazy load social platform icons if needed
- Debounce rapid modal open/close actions
- Clean up event listeners on component unmount

### **Error Handling**

- Graceful fallbacks if clipboard API fails
- Console warnings for missing props
- Validate URL construction before sharing

## **Files to Modify**

- Create: `src/components/ReviewShareModal.tsx`
- Update: `src/components/reviews/review-card.tsx` (modal integration)
- Reference: `src/components/ShareButtons.tsx` (for social sharing logic)
- Reference: `src/components/ratings/ShareModal.tsx` (for ShadCN Dialog pattern)
- Reference: `src/components/ui/dialog.tsx` (existing ShadCN components)

## **Testing Strategy**

1. Test all social platform links manually
2. Verify modal behavior on mobile and desktop
3. Test keyboard accessibility
4. Validate clipboard functionality
5. Test with various review content lengths

Start with the simple share text version, then we'll test and potentially switch to excerpt version based on how it feels.

---

## **IMPLEMENTATION COMPLETED SUCCESSFULLY** ✅

**Summary**: Successfully implemented social share modal functionality for V2 tool review pages with:

1. **ReviewShareModal.tsx**: New modal component using ShadCN Dialog with Bunnings design system styling
2. **Social Platforms**: Twitter/X, Reddit, Bluesky, Threads, and Copy Link functionality
3. **URL Construction**: Review-specific sharing URLs with `?review=slug` parameters
4. **Data Flow**: Complete integration from tool/v2/[id].astro → reviews-section.tsx → review-card.tsx → modal
5. **Design System**: Responsive grid layout, proper color schemes, accessibility features
6. **Build Verification**: All TypeScript checks passed, no compilation errors

The share modal opens when users click the "Share" button on any review, constructs proper sharing URLs, and provides platform-specific sharing options while maintaining the existing review highlighting functionality.
