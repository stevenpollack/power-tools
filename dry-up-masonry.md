# DRY Cleanup: MasonryWall Component Consolidation

## **🤖 Agent Role & Mission**

You are a **Code Quality Engineer** specializing in DRY (Don't Repeat Yourself) principle enforcement and technical debt reduction. Your mission is to eliminate duplicate code in the MasonryWall component ecosystem while maintaining full functionality and improving maintainability.

## **📋 Project Context**

### **Current State Analysis**
The codebase currently violates DRY principles with these components:

**🚨 Duplicate Components:**
- `src/components/MasonryWall.tsx` (356 lines) - Used by `/pages/v1.astro`
- `src/components/MasonryWallV2.tsx` (270+ lines) - Used by `/pages/index.astro`
- `src/components/ReviewCardV2React.tsx` - Used by MasonryWallV2.tsx
- `src/components/ReviewCardV2.astro` - **DEAD CODE** (unused)

**📊 Impact Assessment:**
- **~200+ lines of duplicate code** between MasonryWall components
- **90%+ duplicate logic**: filtering, sorting, URL management, pagination
- **Dead code**: ReviewCardV2.astro has zero usages
- **Maintenance burden**: Bug fixes require changes in multiple places

### **Usage Patterns:**
```
/pages/index.astro → MasonryWallV2.tsx → ReviewCardV2React.tsx
/pages/v1.astro → MasonryWall.tsx → ReviewCard.tsx
```

## **🎯 Cleanup Strategy & Tasks**

### **Phase 1: Dead Code Elimination**
**Task**: Remove completely unused components
- [ ] Delete `src/components/ReviewCardV2.astro` (confirmed 0 usages)
- [ ] Verify no hidden imports or references
- [ ] Test build to ensure no breakage

### **Phase 2: Shared Logic Extraction**
**Task**: Extract duplicate logic into reusable hook
- [ ] Create `src/hooks/useMasonryWall.ts` custom hook containing:
  - URL parameter initialization and synchronization
  - Filter state management (search, author, mood, brand, sort)
  - Filtering and sorting logic
  - Pagination logic (visibleCount, loadMore)
  - Results computation
- [ ] Type definitions for shared interfaces
- [ ] Comprehensive JSDoc documentation

### **Phase 3: Component Consolidation**
**Task**: Evaluate consolidation options

**Option A: Single Component with Theme Prop**
```typescript
interface MasonryWallProps {
  reviewsWithData: ReviewWithData[];
  theme: 'v1' | 'v2';
  initialCount?: number;
}
```

**Option B: Shared Logic, Separate UI**
- Keep separate components but use shared `useMasonryWall()` hook
- Maintain distinct styling/theming per version

**Decision Criteria:**
- Which approach reduces code duplication most?
- Which maintains clearer separation of concerns?
- Which is easier to maintain long-term?

### **Phase 4: ReviewCard Standardization**
**Task**: Consolidate ReviewCard implementations
- [ ] Analyze differences between `ReviewCard.tsx` and `ReviewCardV2React.tsx`
- [ ] Determine if single component with theme variants is viable
- [ ] Consider props-based customization vs separate components

### **Phase 5: Testing & Validation**
**Task**: Ensure no functionality regression
- [ ] Test filtering functionality on both pages
- [ ] Test sorting functionality
- [ ] Test pagination (Load More)
- [ ] Test URL state management
- [ ] Test responsive design
- [ ] Test search functionality
- [ ] Performance comparison (before/after)

## **📐 Technical Requirements**

### **Constraints:**
- **Zero functionality regression**: All current features must work identically
- **Maintain existing URLs**: No breaking changes to routing
- **Preserve styling**: V1 and V2 themes must remain distinct
- **Type safety**: Full TypeScript support throughout

### **Code Quality Standards:**
- **DRY**: Eliminate all duplicate logic
- **SOLID**: Single responsibility, interface segregation
- **Clean Code**: Clear naming, proper abstractions
- **Documentation**: JSDoc for all public interfaces

## **🔍 Implementation Guidelines**

### **Custom Hook Structure:**
```typescript
// Example structure for useMasonryWall hook
interface UseMasonryWallOptions {
  reviewsWithData: ReviewWithData[];
  initialCount?: number;
}

interface UseMasonryWallReturn {
  // Filter state
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedAuthor: string;
  setSelectedAuthor: (author: string) => void;
  // ... other filters
  
  // Computed results
  filteredReviews: ReviewWithData[];
  visibleReviews: ReviewWithData[];
  availableAuthors: string[];
  availableMoods: string[];
  availableBrands: string[];
  
  // Actions
  handleLoadMore: () => void;
  clearFilters: () => void;
}

export function useMasonryWall(options: UseMasonryWallOptions): UseMasonryWallReturn
```

### **Testing Strategy:**
1. **Unit Tests**: Test the `useMasonryWall` hook in isolation
2. **Integration Tests**: Test both MasonryWall components
3. **Visual Regression**: Screenshots before/after
4. **Performance Tests**: Bundle size, runtime performance

## **📊 Success Metrics**

### **Quantitative Goals:**
- [ ] **Reduce codebase by 100-200 lines**
- [ ] **Eliminate 90%+ duplicate logic**
- [ ] **Maintain 100% functionality**
- [ ] **Zero new TypeScript errors**
- [ ] **Build time unchanged or improved**

### **Qualitative Goals:**
- [ ] **Improved maintainability**: Single source of truth for shared logic
- [ ] **Better developer experience**: Clear abstractions, good documentation
- [ ] **Future-proof**: Easy to add new features or themes

## **📝 Progress Tracking**

### **Instructions for This Document:**
1. **Update this file** as you complete each task
2. **Mark checkboxes** [x] when tasks are completed
3. **Add notes** about any challenges or decisions made
4. **Document any deviations** from the original strategy
5. **Record performance measurements** before and after

### **Current Status:** 
- [ ] Phase 1: Dead Code Elimination
- [ ] Phase 2: Shared Logic Extraction  
- [ ] Phase 3: Component Consolidation
- [ ] Phase 4: ReviewCard Standardization
- [ ] Phase 5: Testing & Validation

---

## **📚 Additional Context**

### **Project Background:**
This is a power tools review website where famous literary authors review hardware tools. The site has both v1 (legacy) and v2 (current) versions with different design systems:
- **V1**: Original design with gray theme
- **V2**: Bunnings design system (orange/green theme)

### **Related Files to Review:**
- `src/lib/types.ts` - Type definitions
- `src/pages/index.astro` - V2 homepage
- `src/pages/v1.astro` - V1 homepage  
- `tailwind.config.mjs` - Design system tokens

### **Key Principles:**
- **KISS**: Keep it simple
- **DRY**: Don't repeat yourself  
- **YAGNI**: You aren't gonna need it
- **SOLID**: Object-oriented design principles
- **Clean up after yourself**: Remove dead code, organize imports

---

**Remember**: The goal is not just to reduce lines of code, but to create a more maintainable, scalable, and bug-resistant architecture. Quality over quick fixes. 
