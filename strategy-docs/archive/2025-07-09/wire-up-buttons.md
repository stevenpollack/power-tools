### **Prompt for UI Interactivity Agent**

**Role:** You are a senior front-end developer specializing in creating interactive UIs with Astro, React, and Tailwind CSS. Your task is to wire up existing static UI components to add filtering, sorting, and dynamic content loading.

**Objective:**
Your primary goal is to implement client-side interactivity for the v2 tool listing page (`/tools/v2`) and the tool detail page (`/tool/v2/[id]`). This involves transforming static components into stateful React components, managing user selections, and implementing "load more" functionality to improve user experience.

**Project Context & Constraints:**

- **Frameworks:** Astro, React, Tailwind CSS. Use existing `shadcn/ui` components (`Sheet`, `Dialog`, available in `src/components/ui/`) for interactive elements.
- **Data Source:** All `tools` and `reviews` data is managed via Astro's content collections (`src/content/config.ts`). TypeScript types are defined in `src/lib/types.ts`.
- **State Management:** Use React's built-in hooks (`useState`, `useMemo`, `useEffect`) with URL persistence pattern similar to `MasonryWall.tsx`. Filter/sort state should persist across navigation.
- **Component Library:** Leverage existing components in `src/components/ui/`. Use `lucide-react` for icons.
- **URL State Pattern:** Follow the approach used in `MasonryWall.tsx` for URL-based state persistence using `URLSearchParams` and `window.history.pushState()`.

---

### **Detailed Tasks**

**Task 1: Convert Tool Listing Page to be Interactive**

1.  **Convert `ToolCardV2.astro` to React:** Create `src/components/ui/ToolCard.tsx` (React version of `ToolCardV2.astro`). Since React cannot render Astro components, this conversion is required.
    - **Image Optimization:** Use Astro's `getImage()` function to pre-generate optimized image URLs in the parent Astro component, then pass these URLs as props to React components
    - **Alternative Approach:** Create optimized images at build time and pass the URLs down through the component tree
    - Replace `StarRating` import to use the React version from `src/components/ui/star-rating.tsx`
    - Maintain all existing styling and responsive behavior
2.  **Create a new React component:** `src/components/ui/ToolGrid.tsx`. This component will be responsible for all filtering, sorting, and pagination logic on the client.
3.  **Update `src/pages/tools/v2.astro`:**
    - Remove the direct mapping of `<ToolCardV2 />` and `<FilterSortBar />`.
    - Import and render your new `<ToolGrid client:load />` component.
    - Pass the entire `tools` collection as a prop to `<ToolGrid />`.
    - The `ToolGrid` component will render both the filter/sort controls and the tool cards internally.

**Task 2: Implement Filtering and Sorting in `ToolGrid.tsx`**

1.  **URL State Management:** Follow the pattern from `MasonryWall.tsx`:
    - Initialize state from URL search params on component mount using `useState` with function initializers
    - Use `useEffect` to update URL when filters/sort change via `URLSearchParams` and `window.history.pushState()`
    - Reset visible count when filters change using `useEffect`
2.  **Filter/Sort Controls:** Create a filter bar similar to `MasonryWall.tsx` with:
    - "Sort By" dropdown with options: "Price: Low to High", "Price: High to Low", "Rating: High to Low", "Rating: Low to High"
    - "All Filters" button that opens a `Sheet` component with Brand and Category multi-select checkboxes
    - Results count display that updates to reflect filtered results (e.g., "Showing 10 of 15 filtered results")
3.  **Filtering Logic:**
    - Apply filters first, then sort (filter → sort → paginate order)
    - Filter changes apply instantly as checkboxes are checked/unchecked
    - Sheet should only close when user explicitly closes it or clicks outside
    - Multi-select checkboxes for Brand and Category, dynamically populated from tools data
4.  **"Load More" Functionality:**
    - Initially display **10 tools**, append 10 more on each "Load More" click
    - Respects current filters and sort order
    - Sorting should NOT reset pagination back to 10 tools
    - Button hidden when all matching tools are displayed

**Task 3: Implement "View More" for Reviews**

1.  **Update `src/pages/tool/v2/[id].astro`:**
    - Modify the page to pass the **entire `reviewsWithData` array** to the `<ReviewsSection />` component. Do not slice the array beforehand.
2.  **Update `src/components/reviews/reviews-section.tsx`:**
    - Add internal React state for pagination using `useState` (no URL persistence needed for reviews)
    - Initially display only the first **3 reviews**
    - "View More" button should reveal **3 additional reviews** on each click
    - Button should be hidden once all reviews for that tool are visible
    - Remove the current `currentPage` and `reviewsPerPage` props as these will be managed internally

---

### **Technical Implementation Guidelines**

**Component Architecture:**

- **ToolCard.tsx:** Convert from Astro preserving all responsive behavior and styling. Use Astro's `getImage()` function to generate optimized image URLs for use in standard `img` tags, maintaining image optimization benefits.
- **ToolGrid.tsx:** Single responsibility for tools listing with filtering, sorting, and pagination. Should import and use the new `ToolCard.tsx`.
- **ReviewsSection.tsx:** Minimal changes - only add internal state for pagination, remove external pagination props.

**Error Handling & Edge Cases:**

- Display "No tools match your filters" message when filtered results are empty
- Handle missing or undefined tool properties gracefully
- Ensure all interactive elements have appropriate `aria-label` attributes

**Mobile Responsiveness:**

- Filter sheet should slide in from the right on all screen sizes
- Sort dropdown should be accessible and usable on touch devices
- Maintain existing responsive grid behavior (1 col mobile → 2 col tablet → 3 col desktop → 4 col large)

**Image Optimization Strategy:**

- In `src/pages/tools/v2.astro`, use `getImage()` to pre-process all tool images before passing to React:
  ```typescript
  import { getImage } from "astro:assets";
  const toolsWithOptimizedImages = await Promise.all(
    tools.map(async (tool) => ({
      ...tool,
      optimizedImage: await getImage({
        src: tool.data.thumbnailUrl,
        width: 120,
        height: 120,
      }),
    })),
  );
  ```
- Pass the optimized image URLs to the `ToolGrid` component
- Use standard `img` tags in React components with the pre-optimized URLs

**Performance Considerations:**

- Use `useMemo` for expensive filtering and sorting operations
- Debounce URL updates if implementing search functionality in the future
- Virtual scrolling is not required for the expected data size
- Image optimization happens at build time, reducing client-side processing

---

### **Definition of Done & Testing Instructions**

To confirm the task is complete, perform the following checks:

1.  **Tool Listing Page (`/tools/v2`):**
    - **Initial Load:** Page loads without errors, showing exactly 10 tools with correct results count
    - **Filtering:**
      - "All Filters" button opens Sheet component with Brand and Category multi-select checkboxes
      - Filter selections apply instantly and update results count correctly
      - Sheet closes only when explicitly closed or clicked outside
      - Filtered state persists in URL and survives page refresh
    - **Sorting:**
      - "Sort By" dropdown contains all 4 specified options
      - Sort selection correctly reorders tools and persists in URL
      - Sorting does NOT reset pagination back to 10 tools
    - **Load More:**
      - Button appears only when more tools are available
      - Correctly loads 10 more tools respecting current filters and sort
      - Button disappears when all matching tools are displayed
    - **Integration:** All features work together seamlessly (filter + sort + load more)

2.  **Tool Detail Page (`/tool/v2/[id]`):**
    - **Initial Load:** Shows maximum 3 reviews initially
    - **View More:** Button visible only when more than 3 reviews exist
    - **Pagination:** Each click reveals exactly 3 additional reviews
    - **Completion:** Button disappears when all reviews are visible
    - **No Errors:** Build completes successfully with no console errors

3.  **Cross-Browser & Mobile Testing:**
    - Test responsive behavior on mobile, tablet, and desktop viewports
    - Verify touch interactions work properly on mobile devices
    - Ensure keyboard navigation works for all interactive elements
