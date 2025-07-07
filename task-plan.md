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

## Phase 1: Scaffolding (Estimated Time: <1 hour)

1.  **Create New Directory Structure:**
    - **Action:** Create `src/pages/v2/` and `src/pages/v2/tool/`.
2.  **Create Page Placeholders:**
    - **Action:** Create `src/pages/v2/index.astro`, `src/pages/v2/tool/[slug].astro`, and `src/pages/about.astro`.

## Phase 2: Analysis and Discovery (Estimated Time: TBD)

1.  **Analyze Bunnings Pages (Mobile View):**
    - **Action:** Use browser automation tools to analyze the mobile versions of the two reference URLs, performing the **Quantitative Analysis** described in the Testing Strategy.
    - **Action:** Analyze the mobile layout and component structure, focusing on the tool grid, "Features," and "Ratings & Reviews" sections.

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

This plan is now complete. I will await your final approval before beginning Phase 1.
