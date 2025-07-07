# Task Plan: Redesign Blog to Mimic Bunnings Product Page (v2)

This document outlines the revised plan to create a parody of the Bunnings website under the `/v2/` route.

## Guiding Principles

- **Mobile-First:** All design and implementation will prioritize mobile viewports and scale up to larger screens.
- **Utility-First:** We will use Tailwind's utility classes as the primary means of styling, avoiding custom CSS and inline styles wherever possible.
- **React for Interactivity:** Any component requiring client-side state or event handling (e.g., hamburger menus) will be built as a React component within Astro.

## Testing & Verification Strategy: "Pixel-Perfect" Parody

To ensure a high-fidelity imitation of the reference design, the following testing strategy will be strictly followed for all v2 components.

### 1. Quantitative Analysis: Data-Driven Theming

- **Action:** During the Analysis Phase, use Puppeteer's `page.evaluate()` to programmatically extract the exact computed CSS properties from the reference URLs (mobile view).
- **Deliverable:** A list of precise values for:
  - **Colors:** `rgb()` or `hsl()` values for primary (green), secondary (grey), text, background, and accent colors.
  - **Typography:** `font-family` names, `font-size` in pixels, and `font-weight` values for all text elements (headings, body, links, etc.).
  - **Spacing:** `px` values for `margin`, `padding`, and `gap` used in key layout components.
- **Outcome:** These values will directly inform the creation of the `tailwind.config.mjs` theme, ensuring a foundational match.

### 2. Qualitative Analysis: Visual Overlay Verification

This is a component-level verification process to be performed during the Implementation Phase.

- **Step 1: Capture Reference:** For each component to be built (e.g., `ToolCard`), use Puppeteer to take a focused screenshot of the corresponding component on the Bunnings mobile site.
- **Step 2: Save Asset:** Save the screenshot to a temporary location accessible by the dev server (e.g., `/public/testing/reference-tool-card.png`).
- **Step 3: Develop with Overlay:** While developing the Astro/React component, embed the reference screenshot as a semi-transparent (`opacity-50`) image.
- **Step 4: Align:** Use absolute positioning (`absolute`, `top-0`, `left-0`, `z-50`, `pointer-events-none`) to overlay the screenshot directly on top of the component being built.
- **Step 5: Refine:** Adjust Tailwind utility classes on the component until it visually matches the overlaid reference image perfectly. All discrepancies in alignment, size, and spacing must be resolved.
- **Step 6: Cleanup:** Once pixel-perfect alignment is confirmed, remove the temporary overlay image tag from the component code.

## Phase 1: Scaffolding (✅ Completed)

1.  **Create New Directory Structure:**
    - **Action:** Create `src/pages/v2/` and `src/pages/v2/tool/`.
2.  **Create Page Placeholders:**
    - **Action:** Create `src/pages/v2/index.astro`, `src/pages/v2/tool/[slug].astro`, and `src/pages/about.astro`.

## Phase 2: Analysis and Discovery (✅ Completed)

1.  **Analyze Bunnings Pages (Mobile View):**
    - **Action:** Use browser automation tools to analyze the mobile versions of the two reference URLs, performing the **Quantitative Analysis** described in the Testing Strategy. (✅ Completed)
    - **Action:** Analyze the mobile layout and component structure, focusing on the tool grid and especially the "Ratings & Reviews" section. The "Features" section is now deprioritized. (✅ Completed)
    - **Action:** Document the structure and interactive behaviors of the "Ratings & Reviews" section, including:
      - Star ratings display
      - Review cards (author, date, text, ratings, etc.)
      - Helpful/Unhelpful button group (leave unwired for now)
      - Replace "Report" with a "Share" button that opens a modal with sharing options (using the existing `ShareButtons.tsx` component and its set of social platforms)
      - Mimic Bunnings' behavior for review pagination (e.g., "Show more" button)
      - Reviews are static, loaded from the `reviews` collection in `content.config.ts`
      - Implement the entire Ratings & Reviews section as a React component
    - **Action:** Note accessibility features and plan improvements where possible, unless it would dramatically diverge from the Bunnings site.
    - **Action:** Only extract and document colors, typography, and layout tokens that will be used in the parody implementation.
    - **Action:** Ensure the tool detail page will read tool data from the schema defined in `content.config.ts`.

2.  **Ratings & Reviews section analysis (in-progress):**
    - **Findings:**
      - **Ratings Summary Block:**
        - Flex row with SVG star rating (yellow: rgb(255, 180, 0)), average rating, and review count (charcoal: rgb(51, 51, 51)).
        - Font: "Helvetica Neue", Helvetica, Arial, sans-serif; 16px for stars, 12px for review count.
        - Accessibility: Uses `aria-label` for star ratings.
      - **Review This Product:**
        - Static component, visually mimics the interactive hover effect (hovering a star highlights all stars up to it).
        - Displays the message: "Adding a review will require a valid email for verification."
        - No actual review submission logic.
      - **Review Cards:**
        - Author display name, date, review text, star rating, "Helpful"/"Unhelpful" button group (unwired), and "Share" button (opens modal with ShareButtons).
        - Card-like layout, clear separation, consistent font.
        - Per-review horizontal bar ratings for quality and value, using the reusable BarRating component.
      - **Pagination/Show More:**
        - Subset of reviews shown by default; "Show more" button reveals more.
      - **Interactivity:**
        - "Helpful"/"Unhelpful" buttons present but not wired.
        - "Share" button opens modal using ShareButtons.tsx.
        - "Review This Product" stars have hover effect but are unwired.
      - **Data Source:**
        - Reviews loaded from the `reviews` collection in `content.config.ts`.
      - **Implementation:**
        - Entire section is a React component, styled with Tailwind utility classes.
        - Accessibility improved where possible, but not at the expense of visual fidelity.
    - **Proposed Component Design:**
      - **Component Tree:**
        - `RatingsAndReviews`
          - `RatingsSnapshot` (bar chart for each star rating)
          - `RatingsSummary` (overall rating, star display, review count)
          - `AverageCustomerRatings`
            - `BarRating` (Quality, average)
            - `BarRating` (Value, average)
          - `ReviewThisProduct`
            - `StarRatingInput` (static, hover effect only)
            - `VerificationMessage`
          - `ReviewsList`
            - `ReviewCard` (repeated)
              - `StarRating` (per review)
              - `BarRating` (Quality, per review)
              - `BarRating` (Value, per review)
              - `HelpfulButtonGroup` (unwired)
              - `ShareButton` (opens `ShareModal`)
            - `ShowMoreButton`
          - `ShareModal` (uses `ShareButtons.tsx`)
      - **Component API Sketch:**
        - `RatingsAndReviews`: `{ toolSlug: string }` — loads and aggregates review data for the tool.
        - `RatingsSnapshot`: `{ counts: { 5: number, 4: number, 3: number, 2: number, 1: number } }`
        - `RatingsSummary`: `{ averageRating: number, reviewCount: number }`
        - `AverageCustomerRatings`: `{ quality: number, value: number }`
        - `BarRating`: `{ label: string, value: number, max?: number }` — used for both average and per-review bars.
        - `ReviewThisProduct`: `{}` — contains `StarRatingInput` and `VerificationMessage`.
        - `StarRatingInput`: `{}` — 5 stars, static, hover effect only.
        - `VerificationMessage`: `{}` — static text.
        - `ReviewsList`: `{ reviews: ReviewData[], onShare: (review: ReviewData) => void }`
        - `ReviewCard`: `{ review: ReviewData, onShare: () => void }`
        - `StarRating`: `{ rating: number }` — 5 SVG stars, filled to rating.
        - `HelpfulButtonGroup`: `{}` — unwired.
        - `ShareButton`: `{ onClick: () => void }`
        - `ShareModal`: `{ open: boolean, onClose: () => void, review: ReviewData }`
        - `ShareButtons`: `{ toolName: string, authorName: string }` (already implemented)
      - **Component Reuse:**
        - `BarRating` is used for both average and per-review quality/value bars.
        - `StarRating` is used for both summary and per-review star displays.
        - All components use Tailwind utility classes for styling.
      - **Notes:**
        - All review and tool data is loaded from the content collections defined in `content.config.ts`.
        - The "Review This Product" component is static, with only a hover effect for stars.
        - The section is mobile-first and prioritizes accessibility where possible.
    - **Next step:** Begin implementation of the Ratings & Reviews section, starting with the static and interactive UI components as described. (✅ Completed)

## Phase 3: Design System & Theming (Estimated Time: TBD)

1.  **Define a "Bunnings Parody" Tailwind CSS Design System:**
    - **Action:** Use the deliverables from the Quantitative Analysis to update `tailwind.config.mjs`.

## Phase 4: Implementation (Estimated Time: TBD)

1.  **Create v2 Layout & Core Components:**
    - **Action:** Create `src/layouts/V2Layout.astro`.
    - **Action:** Create a `Header.tsx` React component.
      - **Testing:** Apply the **Visual Overlay Verification** method.
    - **Action:** Update the existing footer component to align with the new color scheme.
    - **Action:** Create a `ToolCard.astro` component for the tool grid.
      - **Testing:** Apply the **Visual Overlay Verification** method.

2.  **Build the v2 Home Page (`/v2/`):**
    - **Action:** On `src/pages/v2/index.astro`, fetch all `tools` and render them in a responsive grid using the verified `ToolCard.astro` component.

3.  **Build the v2 Tool Detail Page (`/v2/tool/[slug]`):**
    - **Action:** On `src/pages/v2/tool/[slug].astro`, fetch tool and review data.
    - **Action:** Build the "Features" and "Ratings & Reviews" sections as distinct components.
      - **Testing:** Apply the **Visual Overlay Verification** method to each section.
    - **Action:** Implement the Ratings & Reviews section as a directory of React components, using schemas from `content.config.ts`/`types.ts` for data, `ShareButtons.tsx` for sharing, and the shadcn/ui Dialog (`dialog.tsx`) for the Share modal. Track component implementation progress below.

### Ratings & Reviews Implementation Progress

- [x] Directory structure created: `src/components/ratings/`
- [x] `RatingsAndReviews` root component
- [x] `RatingsSnapshot`
- [x] `RatingsSummary`
- [x] `AverageCustomerRatings`
- [x] `BarRating`
- [x] `ReviewThisProduct`
- [x] `StarRatingInput`
- [x] `VerificationMessage`
- [x] `ReviewsList`
- [x] `ReviewCard`
- [x] `StarRating`
- [x] `HelpfulButtonGroup`
- [x] `ShareButton` (uses Dialog)
- [x] `ShareModal` (uses Dialog + ShareButtons)
- [x] Integration with tool/review data
- [ ] Visual Overlay Verification

This plan is now complete. I will await your final approval before beginning Phase 1.
