### **Prompt for UI Redesign Agent**

**Role:** You are a senior front-end developer specializing in creating pixel-perfect UIs with Astro and Tailwind CSS. Your task is to refactor an existing page to match a design mockup.

**Objective:**
Your task is to modify the tool listing page (`src/pages/tools/v2.astro`) to visually match the provided screenshot (`bunnings_page.png`). This involves creating two new components (`FilterSortBar.astro` and `ToolCard-v2.astro`) and updating the main page layout. This is a parody website, so the existing "Funnings" header must remain untouched.

**Project Context & Constraints:**

- **Frameworks:** Astro, React, Tailwind CSS, DaisyUI available for non-interactive components.
- **Data Source:** Tool data is managed as an Astro collection. You can fetch all tools using `getCollection("tools")`. The data schema is defined in `src/content/config.ts`.
- **Pricing Data:** Price values are stored as numbers in `tool.data.pricing.currentPrice` (e.g., 89 for $89). Display with dollar sign prefix.
- **Routing:** All detail page links should route to `/tool/v2/${tool.id}` for the v2 website version.
- **Star Ratings:** Reuse the existing `StarRating` component from `src/components/ratings/StarRating.tsx`.

**Style Guidelines:**

- **Tailwind First:** Prioritize using Tailwind CSS utility classes for all styling. Avoid writing custom CSS.
- **Component Reuse:** Before creating new elements, inspect `src/components/` (especially `src/components/ui/`) for reusable components or patterns. The existing `button.tsx` is a good reference for component structure.
- **Color Palette:** Use the pre-defined `--color-bunnings-*` variables from `src/styles/globals.css` for colors to ensure consistency with the brand theme.
- **React Best Practices:** Do not use `export default` from React components. Use named exports.
- **Icons:** The project uses `lucide-react` for icons.
- **Mobile First:** Design for mobile first (single column), then expand to responsive grid for wider viewports.
- **Layout Constraints:** Use standard Tailwind container widths (`max-w-6xl` or `max-w-7xl`) with center alignment.
- **DaisyUI:** Use DaisyUI components for non-interactive elements where appropriate (e.g., cards, badges).

**Responsive Design Requirements:**

- **Mobile (up to 640px):** Single column layout
- **Tablet (640px-1024px):** 2-column grid
- **Desktop (1024px+):** 3-column grid
- **Large Desktop (1280px+):** 4-column grid
- **Spacing:** 16px padding, 4px margin between cards in grid layouts
- **Breakpoints:** Use the defined breakpoints from globals.css (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)

**Card Design Specifications (from Bunnings layout analysis):**

- **Card Height:** Auto-fit content with consistent minimum height
- **Image Size:** Approximately 120px x 120px for tool images
- **Card Padding:** 16px internal padding
- **Card Shadow:** Subtle shadow with hover effect for interactivity

**Progress Tracking:**

- This document (`task-plan-and-prompt.md`) is your source of truth.
- As you complete each major task (e.g., creating a component, updating the page), you must update this file to mark the corresponding section as "DONE".

---

### **Detailed Tasks**

**Task 1: Create the Filter & Sort Bar** ✅ DONE

1.  **Create a new file:** `src/components/ui/FilterSortBar.astro`.
2.  **Component Structure:**
    - The component should have a light gray background (`--color-bunnings-neutral-light-gray` or similar) and a top/bottom border.
    - It must contain two sections, separated by a vertical border:
      - **Left Section:** A "Sort By" button. It should display an up/down arrow icon next to the text.
      - **Right Section:** An "All Filters" button. It should display a filter/slider icon next to the text.
3.  **Functionality:** The buttons are for display purposes only. They do not need to have any associated click events or logic.

**Task 2: Create the New Tool Card**

1.  **Create a new file:** `src/components/ToolCard-v2.astro`.
2.  **Component Props:** The component must accept a `tool` object as a prop, which comes from the `tools` Astro collection.
3.  **Visual Layout & Styling (to match screenshot):**
    - **Container:** A white card using DaisyUI card component or `bg-card` with rounded corners and subtle box shadow.
    - **Layout:** Horizontal layout with image on the left (120px), content on the right.
    - **Tool Image:** Display the tool's `thumbnailUrl` on the left side of the card (120px x 120px).
    - **Brand:** Below the image (in the left section), display the `tool.data.brand` text. Style it with a lighter font weight (e.g., `font-medium`) and a muted text color (`text-muted-foreground`).
    - **Name:** In the right section, display the `tool.data.name`. Style it with a bolder font weight (e.g., `font-semibold`).
    - **Rating:** Below the name, import and use the `StarRating` component with `popularity.averageRating`. Display rating and count (e.g., "4.3 (1894)").
    - **Price:** At the bottom-left of the content area, display the `tool.data.pricing.currentPrice` with dollar sign prefix (e.g., "$89").
      - Style it prominently. Use the `font-bunnings-price` class from `globals.css` for the distinctive font.
    - **Action Button:** At the bottom-right, add a button that links to the tool's detail page (`/tool/v2/${tool.id}`).
      - The button should be a square with an orange background (`bg-bunnings-primary-orange`).
      - Use the `Eye` icon from `lucide-react` to imply "view details".

**Task 3: Update the Tools Page**

1.  **Open the file:** `src/pages/tools/v2.astro`.
2.  **Layout Changes:**
    - Set the main container's background to a light gray (`bg-bunnings-neutral-light-gray`).
    - Add max width (`max-w-6xl`) and center alignment to match Bunnings layout style.
    - Import and add the `<FilterSortBar />` component at the top of the content area.
    - Below the filter bar, add a text element to display the results count (e.g., "Showing 36 of 36 results"). Use `tools.length` for the count.
3.  **Responsive Grid:**
    - Implement mobile-first design: single column (default), 2 columns (sm:), 3 columns (lg:), 4 columns (xl:).
    - Use 16px padding and 4px margin between cards: `p-4 gap-1`.
4.  **Render New Cards:**
    - In the `map` function that iterates through the `tools`, replace `<ToolCard />` with your new `<ToolCard-v2 />` component, passing the `tool` prop.

---

### **Definition of Done & Testing Instructions**

To confirm the task is complete, perform the following checks:

1.  **Visual Verification:**
    - Navigate to the `/tools/v2` page.
    - Confirm the "Funnings" header is unchanged.
    - Confirm the new filter/sort bar is present below the header.
    - Confirm the results count is displayed.
    - Confirm the page background is light gray and the tool cards are white.
    - Confirm the new `ToolCard-v2` components have horizontal layout (image left, content right).
    - Confirm responsive behavior: 1 column (mobile), 2 columns (tablet), 3 columns (desktop), 4 columns (large desktop).
    - Confirm the layout matches the screenshot's style with proper spacing and alignment.

2.  **Component & Functionality Verification:**
    - Verify the page loads without any build or console errors.
    - Check that the action button on each `ToolCard-v2` correctly navigates to the corresponding tool's detail page (e.g., `/tool/v2/ryobi-one-plus-18v-drill`).
    - Verify rating displays with decimal values using the reused `StarRating` component.
    - Verify price displays correctly with dollar sign prefix using the `font-bunnings-price` styling.

---

### **Progress Log:**

- [x] Task 1: Create FilterSortBar.astro component - COMPLETED
- [x] Task 2: Create ToolCard-v2.astro component - COMPLETED
- [x] Task 3: Update tools/v2.astro page - COMPLETED
- [x] Testing and verification complete - COMPLETED
