# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro v5 project for "Power Tools Reviews" - an entertainment website where famous authors review power tools. The project combines literature with hardware reviews for 12 authors reviewing 20 power tools (240 total review combinations).

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Type checking
pnpm type-check

# Build for production (includes type checking)
pnpm build

# Preview production build
pnpm preview

# Lint code
pnpm lint

# Format code
pnpm format

# Calculate reading time for content
pnpm reading-time
```

## Architecture & Structure

### Technology Stack

- **Framework**: Astro v5.10+ with React islands for interactive components
- **Styling**: Tailwind CSS v4 with custom CSS
- **State Management**: Nanostores for lightweight reactive state
- **Content**: Content Collections for structured data (authors, tools, reviews)
- **Package Manager**: pnpm (required)
- **Deployment**: Vercel (pre-configured)

### Key Directories

- `src/components/` - React components for interactive features (FilterControls, MasonryWall, ReviewCard, etc.)
- `src/content/` - Content collections schema definition
- `src/data/` - Static data and mock content
- `src/layouts/` - Astro layout components
- `src/pages/` - File-based routing with dynamic routes
- `src/stores/` - Nanostores for state management
- `src/lib/` - Utility functions and type definitions
- `src/images/` - Static images for authors and tools
- `public/` - Static assets

### Content Collections Schema

The project uses three main content collections:

1. **Authors**: Literary figures with style analysis, portraits, and metadata
2. **Tools**: Power tools with specifications, pricing, and images
3. **Reviews**: Generated content linking authors to tools with mood/tone metadata

### State Management

Uses Nanostores for:

- `cardStore.ts` - Card display and interaction state
- `filterStore.ts` - Search and filtering state
- `uiStore.ts` - UI component state

### Component Architecture

- **Astro components** (.astro) for static content and layouts
- **React components** (.tsx) for interactive features requiring client-side state
- **UI components** in `src/components/ui/` follow shadcn/ui patterns
- **Icon components** in `src/components/icons/` for social media icons

### Dynamic Routing

- `/author/[id].astro` - Individual author pages
- `/tool/[id].astro` - Individual tool pages
- `/review/[slug].astro` - Individual review pages with SEO-friendly slugs

## Development Guidelines

### Code Style

- Follow existing TypeScript patterns and import conventions
- Use Tailwind CSS classes for styling
- Maintain component separation between Astro (static) and React (interactive)
- Follow the established file naming conventions

### Content Management

- All content should go through Content Collections
- Images should be placed in `src/images/` with appropriate subdirectories
- Use the helper functions in `src/lib/helpers.ts` for common operations

### Commit Messages

Must follow Conventional Commits specification as defined in `.cursor/rules/conventional-commits.mdc`:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code restructuring
- `test:` for testing changes
- `chore:` for maintenance tasks

Use imperative mood in commit descriptions and include scope when applicable (e.g., `feat(ui): add new filter component`).

### Testing & Quality

- Always run `pnpm type-check` before committing
- Use `pnpm lint` to check code quality
- Use `pnpm format` to format code consistently
- Build must pass: `pnpm build`

## Common Tasks

### Adding New Components

1. Create in appropriate directory (`src/components/` for React, layouts for Astro)
2. Follow existing naming conventions
3. Import and use existing UI components from `src/components/ui/`
4. Add to relevant stores if state management is needed

### Working with Content Collections

1. Check schema in `src/content.config.ts`
2. Add content files to appropriate `src/content/` subdirectories
3. Use `getCollection()` and `getEntry()` helpers in pages

### Styling Guidelines

- Use Tailwind CSS classes primarily
- Custom CSS goes in `src/styles/globals.css`
- Follow responsive-first design principles
- Use the established design system patterns

### Performance Considerations

- Leverage Astro's island architecture - keep React components minimal and focused
- Use static generation where possible
- Optimize images using Astro's built-in image optimization
- Consider lazy loading for large content sets

## Project Status

Currently in Phase 1 (Technical Setup Complete). The project is ready for content integration and enhanced UI implementation. The floating wall interface and content generation phases are upcoming.

## Cursor Rules Integration

This project includes specific Cursor IDE rules in `.cursor/rules/` that define coding standards and behavior:

- **`.cursor/rules/meta-reasoning.mdc`**: Core principles for AI assistance including clarity over speed, direct communication, and the "Pause and Verify" loop for understanding user intent before implementation
- **`.cursor/rules/response-guidelines.mdc`**: Communication protocol emphasizing radical conciseness, factual objectivity, and immediate engagement without conversational filler
- **`.cursor/rules/conventional-commits.mdc`**: Detailed specification for commit message formatting using conventional commits standard
- **`.cursor/rules/commit-messages.mdc`**: Directive to always follow the conventional commits format

These rules ensure consistent, high-quality development practices and clear communication during development.

## MCP Server Integration

This project includes MCP (Model Context Protocol) servers configured in `.cursor/mcp.json` for automation tasks:

### Available MCP Servers

- **`puppeteer`**: Basic Puppeteer server using `mcp-pptr` package
- **`puppeteer_npx_headed`**: Headed browser mode with visible UI for debugging
  - Uses `@modelcontextprotocol/server-puppeteer`
  - Viewport: 1280x720
  - Allows dangerous operations for web scraping
- **`puppeteer_npx_headless`**: Headless browser mode for production scraping
  - Uses `@modelcontextprotocol/server-puppeteer`
  - Viewport: 1280x720
  - Restricted dangerous operations
- **`puppeteer_docker_headless`**: Docker-based headless browser for isolated scraping
  - Uses `mcp/puppeteer` Docker image
  - Containerized environment for security

### Common Use Cases

- **Web Scraping**: Extracting product data from e-commerce sites
- **Data Collection**: Gathering content for tool specifications and pricing
- **Automation**: Automated navigation and data extraction workflows
- **Testing**: Browser automation for UI testing and validation

### Best Practices

- Use headed mode for development and debugging
- Use headless mode for production automation
- Consider Docker mode for security-sensitive operations
- Always respect robots.txt and rate limiting
- Implement proper error handling and retries
