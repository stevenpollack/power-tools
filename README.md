# Power Tools Reviews

An entertainment website where famous authors review power tools - when literature meets hardware.

## Project Status

**Current Phase**: Phase 1 - Technical Setup (✅ Complete)
**Next Phase**: Content Integration from Streams 1 & 2

## Project Overview

This Astro v5 project provides the technical foundation for the Power Tools Reviews website. The site will feature reviews written by 12 famous authors covering 20 popular Home Depot tools, generating 240 unique review combinations.

### Core Features

- 🎨 Enhanced floating wall of cards UI
- 📚 12 literary authors with distinctive writing styles
- 🔧 20 power tools from Home Depot
- 📝 240 pre-generated reviews (12 × 20)
- 📱 Mobile-first responsive design
- ⚡ Lightning-fast static site generation

## Technology Stack

- **Framework**: Astro v5.10+ with React islands
- **Styling**: Tailwind CSS v4 + custom CSS
- **TypeScript**: Strict configuration with ES2022
- **Package Manager**: pnpm v10.12.4
- **Deployment**: Vercel (configured)
- **Code Quality**: ESLint v9 + Prettier

## Project Structure

```
power-tools-reviews/
├── .github/workflows/        # CI/CD configuration
├── .vscode/                  # VS Code settings
├── public/                   # Static assets
│   ├── images/
│   │   ├── authors/         # Author portraits (Stream 1)
│   │   └── tools/           # Tool images (Stream 2)
├── src/
│   ├── components/           # React + Astro components
│   │   ├── FloatingCard.tsx  # Individual card component
│   │   ├── CardWall.astro    # Main wall container
│   │   └── FilterControls.tsx # Filtering UI
│   ├── content/             # Content collections
│   │   ├── authors/         # Author data (Stream 1)
│   │   ├── tools/           # Tool data (Stream 2)
│   │   └── reviews/         # Generated reviews (Phase 2)
│   ├── layouts/
│   │   └── ReviewLayout.astro # Main layout
│   ├── pages/               # Route pages
│   │   ├── index.astro      # Floating wall homepage
│   │   ├── [author].astro   # Author detail pages
│   │   ├── [tool].astro     # Tool detail pages
│   │   └── review/[slug].astro # Individual reviews
│   ├── styles/              # Global styles
│   └── utils/               # Helper functions
├── astro.config.mjs         # Astro configuration
├── package.json             # Dependencies
├── tailwind.config.mjs      # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
├── eslint.config.js         # ESLint configuration
└── prettier.config.js       # Prettier configuration
```

## Content Collections Schema

### Authors Collection

```typescript
{
  name: string;
  slug: string;
  lifespan: string;
  nationality: string;
  primaryWorks: string[];
  styleKeywords: string[];
  literaryMovement: string;
  portrait: {
    filename: string;
    source: string;
    license: string;
  };
  styleAnalysis: {
    summary: string;
    detailed: string;
    vocabulary: string;
    sentenceStructure: string;
    themes: string[];
    quirks: string[];
  };
}
```

### Tools Collection

```typescript
{
  name: string;
  slug: string;
  brand: string;
  category: string;
  subcategory?: string;
  homeDepotSku: string;
  homeDepotUrl: string;
  image: {
    filename: string;
    originalUrl: string;
    license: string;
  };
  specifications: {
    power: string;
    weight: string;
    dimensions: string;
    keyFeatures: string[];
    batteryLife?: string;
    cordless: boolean;
  };
  pricing: {
    currentPrice: number;
    msrp?: number;
    onSale: boolean;
  };
  popularity: {
    reviewCount: number;
    averageRating: number;
    homeDepotRank?: number;
  };
}
```

### Reviews Collection

```typescript
{
  authorId: string;
  toolId: string;
  featured: boolean;
  mood: "humorous" | "dramatic" | "technical" | "philosophical";
  tone: "formal" | "casual" | "satirical" | "earnest";
  readingTime: number;
  shareCount: number;
  dateCreated: string;
  lastUpdated: string;
}
```

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Type check
pnpm type-check

# Lint code
pnpm lint

# Format code
pnpm format

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Integration Requirements

### Stream 1: Author Research Agent

**Expected Deliverable**: `authors-research-package.zip`

- Place author JSON files in `src/content/authors/`
- Place author portraits in `public/images/authors/`
- Ensure data matches the Authors Collection schema

### Stream 2: Tool Collection Agent

**Expected Deliverable**: `tools-research-package.zip`

- Place tool JSON files in `src/content/tools/`
- Place tool images in `public/images/tools/`
- Ensure data matches the Tools Collection schema

## Current Implementation Status

### ✅ Completed

- [x] Complete Astro v5 project structure
- [x] All dependencies at latest versions (June 2025)
- [x] Content collections configured for author/tool integration
- [x] Component structure ready for floating wall implementation
- [x] ESLint + Prettier configured and working
- [x] TypeScript strict configuration
- [x] Vercel deployment configuration ready

### 🔄 Ready for Integration

- Dynamic pages configured but awaiting content
- Component skeletons ready for Phase 3 implementation
- Content collections schema validated
- Image directories prepared for assets

### 📋 TODO After Integration

1. **Phase 2**: Content generation using LLM with author styles and tool data
2. **Phase 3**: Enhanced floating wall UI implementation
3. **Phase 4**: Social sharing, filtering, and search functionality

## Quality Gates Achieved

- ✅ Project builds successfully without errors
- ✅ Content collections validate against TypeScript schemas
- ✅ All configuration files properly set up
- ✅ Development environment fully functional
- ✅ Ready for immediate content integration

## Integration Testing

After receiving data from Streams 1 & 2:

1. **Validate Data Integrity**:

   ```bash
   pnpm type-check
   ```

2. **Test Content Loading**:

   ```bash
   pnpm dev
   # Navigate to localhost:4321 to test content collections
   ```

3. **Verify Build Process**:
   ```bash
   pnpm build
   ```

## Next Steps

1. **Await Stream 1 & 2 Completion**: Author research and tool collection
2. **Integrate Content**: Place data files in appropriate content directories
3. **Generate Reviews**: Use LLM to create 240 review combinations
4. **Implement Enhanced UI**: Build the floating wall interface
5. **Deploy**: Push to Vercel for live preview

## Support

For technical questions or integration issues, contact the project coordinator immediately.

---

**Status**: ✅ Technical Setup Complete - Ready for Content Integration
