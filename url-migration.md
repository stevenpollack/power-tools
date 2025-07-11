# URL Migration: V1 to V2 Website Migration

## **🚀 Migration Progress Status**

### **✅ Phase 1 Complete: V1 Legacy Backup**

**Completed**:
- ✅ Created v1 subdirectories (author/v1, tool/v1, tools/v1, authors/v1)
- ✅ Moved homepage: `index.astro` → `v1.astro`
- ✅ Moved author pages: `author/[id].astro` → `author/v1/[id].astro`
- ✅ Moved tool pages: `tool/[id].astro` → `tool/v1/[id].astro`
- ✅ Moved tools index: `tools/index.astro` → `tools/v1/index.astro`
- ✅ Moved authors page: `authors.astro` → `authors/v1.astro`
- ✅ Fixed import path in `tool/v1/[id].astro`
- ✅ Build passes successfully
- ✅ Preview server running for testing

**Verification Results**:
- V1 legacy URLs now available at `/v1`, `/author/v1/[id]`, etc.
- Build completed without errors
- Files properly preserved with corrected import paths

**Git Status**: Committed with message "refactor(migration): move v1 pages to legacy directories"

### **🔄 Phase 2 In Progress: Promote V2 to Main URLs**

Beginning Phase 2: Creating v2 homepage and moving v2 files to main locations.

---

## Mission Statement

Migrate the Power Tools website so that standard URLs serve the improved v2 design, while maintaining v1 as an intentionally accessible legacy version. The goal is clean URLs without `/v2/` pollution while preserving backward compatibility.

## Current State Analysis

### Current URL Structure:
- **V1 (Current "Standard")**: `/author/[id]`, `/tool/[id]`, `/tools/`, `/authors`
- **V2 (Current "New")**: `/author/v2/[id]`, `/tool/v2/[id]`, `/tools/v2`, `/authors/v2`

### File Structure:
```
src/pages/
├── index.astro (v1 - references reviews/v1/)
├── author/
│   ├── [id].astro (v1)
│   └── v2/[id].astro (v2)
├── tool/
│   ├── [id].astro (v1)
│   └── v2/[id].astro (v2)
├── tools/
│   ├── index.astro (v1)
│   └── v2.astro (v2)
├── authors/
│   └── v2.astro (v2)
└── authors.astro (v1)
```

### Review Data Structure:
```
reviews/
├── v1/ (legacy reviews - referenced by current index.astro)
└── v2/ (new reviews - should be used by new homepage)
```

## Migration Strategy: File Replacement

**Goal**: Standard URLs serve v2 content, v1 becomes legacy at `/v1/` URLs.

**Result**:
- `/` → serves v2 homepage (new reviews)
- `/author/[id]` → serves current v2 content
- `/author/v1/[id]` → serves current v1 content
- `/v1` → serves v1 homepage (legacy reviews)  
- Clean URLs with no `/v2/` visible to users

## Phase 1: Backup & Prepare V1 Legacy

### 1.1 Create V1 Subdirectories
Create these new directories:
```bash
mkdir -p src/pages/author/v1
mkdir -p src/pages/tool/v1
mkdir -p src/pages/tools/v1
mkdir -p src/pages/authors/v1
```

### 1.2 Move V1 Files to Legacy Locations
Move existing v1 files to v1 subdirectories:

```bash
# Homepage (v1 reviews)
mv src/pages/index.astro src/pages/v1.astro

# Author pages
mv src/pages/author/[id].astro src/pages/author/v1/[id].astro

# Tool pages  
mv src/pages/tool/[id].astro src/pages/tool/v1/[id].astro

# Tools index
mv src/pages/tools/index.astro src/pages/tools/v1/index.astro

# Authors page
mv src/pages/authors.astro src/pages/authors/v1.astro
```

### 1.3 Verification: Test V1 Legacy URLs
After moving files, verify these URLs work:
- `http://localhost:4321/v1` - Legacy homepage with v1 reviews
- `http://localhost:4321/author/v1/hemingway`
- `http://localhost:4321/tool/v1/dewalt-18v-165mm-xr-brushless-circular-saw`
- `http://localhost:4321/tools/v1/`
- `http://localhost:4321/authors/v1`

**Note**: The main homepage `/` will be broken temporarily until Phase 2.

**Build and test**: `pnpm run build && pnpm run preview`

## Phase 2: Promote V2 to Main URLs

### 2.1 Create New V2 Homepage
Create a new homepage that references v2 reviews:

```bash
# Copy the v1 homepage structure but update it for v2 reviews
cp src/pages/v1.astro src/pages/index.astro
```

**Then manually edit `src/pages/index.astro`** to:
1. Update content collection to reference `reviews/v2/` instead of `reviews/v1/`
2. Update any hardcoded paths or imports that reference v1 data
3. Verify the review data structure matches v2 format

### 2.2 Move V2 Files to Main Locations
Move v2 files to replace main file positions:

```bash
# Author pages
mv src/pages/author/v2/[id].astro src/pages/author/[id].astro

# Tool pages
mv src/pages/tool/v2/[id].astro src/pages/tool/[id].astro

# Tools index  
mv src/pages/tools/v2.astro src/pages/tools/index.astro

# Authors page
mv src/pages/authors/v2.astro src/pages/authors.astro
```

### 2.3 Remove Empty V2 Directories
```bash
rmdir src/pages/author/v2
rmdir src/pages/tool/v2
```

### 2.4 Verification: Test Main URLs Now Serve V2
Verify these URLs now serve the improved v2 design:
- `http://localhost:4321/` (should show v2 homepage with v2 reviews)
- `http://localhost:4321/author/hemingway` (should show v2 design)
- `http://localhost:4321/tool/dewalt-18v-165mm-xr-brushless-circular-saw` (should show v2 design)
- `http://localhost:4321/tools/` (should show v2 design)
- `http://localhost:4321/authors` (should show v2 design)

**Build and test**: `pnpm run build && pnpm run preview`

## Phase 3: Update Internal Links & References

### 3.1 Search for Hardcoded V2 Links & Review References
Search for any hardcoded `/v2/` references and v1 review references that need updating:

```bash
# Search for v2 links in components
grep -r "/v2/" src/components/ --include="*.tsx" --include="*.astro"

# Search for v2 links in pages  
grep -r "/v2/" src/pages/ --include="*.tsx" --include="*.astro"

# Search for v2 links in layouts
grep -r "/v2/" src/layouts/ --include="*.tsx" --include="*.astro"

# Search for references to v1 reviews that should now point to v2
grep -r "reviews/v1" src/ --include="*.tsx" --include="*.astro" --include="*.ts"

# Search for any content collection references that might need updating
grep -r 'getCollection("reviews")' src/ --include="*.tsx" --include="*.astro" --include="*.ts"
```

### 3.2 Update Navigation Components
Look for and update navigation components that might link to `/v2/` URLs:
- Header navigation
- Footer links  
- Breadcrumb components
- Internal page links

**Common patterns to find and replace**:
- `href="/author/v2/` → `href="/author/`
- `href="/tool/v2/` → `href="/tool/`
- `href="/tools/v2"` → `href="/tools/"`
- `href="/authors/v2"` → `href="/authors"`

### 3.3 Update Content Collection Configuration
Check and update content collection references:
- `src/content.config.ts` - Ensure reviews collection points to v2 by default
- Any content collection schemas that reference review paths
- Update import statements that specify review subdirectories

### 3.4 Update Route Constants & Utilities  
Check for hardcoded routes in:
- `src/lib/constants.ts`
- `src/lib/helpers.ts`
- Any utility files that generate URLs
- Any utility files that reference review data paths

## Phase 4: Final Testing & Validation

### 4.1 Comprehensive URL Testing
Test the complete URL structure:

**V2 (Now Main URLs)**:
- `/` - Homepage with v2 reviews
- `/author/hemingway` - Author page
- `/author/dickens` - Another author 
- `/tool/dewalt-18v-165mm-xr-brushless-circular-saw` - Tool page
- `/tools/` - Tools index
- `/authors` - Authors page

**V1 (Now Legacy URLs)**:
- `/v1` - Legacy homepage with v1 reviews
- `/author/v1/hemingway` - Legacy author page
- `/tool/v1/dewalt-18v-165mm-xr-brushless-circular-saw` - Legacy tool page  
- `/tools/v1/` - Legacy tools index
- `/authors/v1` - Legacy authors page

### 4.2 Build Verification
```bash
pnpm run build
```
Ensure no build errors related to missing files or broken imports.

### 4.3 Navigation Testing
- Click through all navigation menus
- Test internal page links
- Verify breadcrumbs work correctly
- Test any "Back" or "Continue" buttons

### 4.4 Content Verification
Verify that review data is loading correctly:
- **V2 Homepage**: Should display reviews from `reviews/v2/` directory
- **V1 Homepage**: Should display reviews from `reviews/v1/` directory  
- **Review counts**: Ensure review counts match expected data (v2 should have 174+ reviews)
- **Review content**: Spot-check that review content, authors, and tools are displaying correctly

### 4.5 Performance Check
Compare v2 page load times to ensure no performance regressions from the migration.

## Expected Outcomes

### ✅ Success Criteria:
1. **Clean URLs**: `/` and `/author/[id]` serve v2 design (no `/v2/` visible)
2. **Legacy Access**: `/v1` and `/author/v1/[id]` serve v1 design for intentional access
3. **Review Data**: Homepage loads v2 reviews, legacy homepage loads v1 reviews
4. **No Broken Links**: All internal navigation works correctly
5. **Build Success**: `pnpm run build` completes without errors
6. **Performance**: No significant performance degradation

### 🚫 Failure Prevention:
- **Do NOT** delete v1 files - move them to v1 subdirectories
- **Do NOT** create redirects that expose `/v2/` in URLs
- **Always test** after each phase before proceeding
- **Backup approach**: If issues arise, v1 files can be restored from v1 directories

## Emergency Rollback Plan

If critical issues arise:
1. Stop the migration
2. Restore original homepage: `mv src/pages/v1.astro src/pages/index.astro`
3. Move v1 files back to main locations: `mv src/pages/author/v1/[id].astro src/pages/author/[id].astro`
4. Move v2 files back to v2 subdirectories: `mv src/pages/author/[id].astro src/pages/author/v2/[id].astro`
5. Restore original file structure
6. Test and rebuild

## Additional Considerations

### SEO Implications:
- V2 pages should have better SEO (improved design/performance)
- No URL changes means no SEO impact from redirects
- Consider updating sitemap if one exists

### Analytics:
- No URL changes means existing analytics continue to work
- Consider setting up tracking to compare v1 vs v2 usage

### Deployment:
- Test on staging environment first
- Consider a gradual rollout if possible
- Monitor error rates post-deployment

---

## **Development Guidelines & Standards**

### **Git Workflow & Commit Strategy**

Follow conventional commits specification for all migration work:

```bash
# Phase 1 commits
git commit -m "refactor(migration): move v1 pages to legacy directories"
git commit -m "test(migration): verify v1 legacy URLs functionality"

# Phase 2 commits  
git commit -m "feat(migration): promote v2 pages to main URLs"
git commit -m "refactor(migration): update homepage to use v2 reviews"

# Phase 3 commits
git commit -m "fix(migration): update hardcoded v2 URL references"
git commit -m "docs(migration): update navigation and internal links"

# Final verification
git commit -m "test(migration): complete URL migration verification"
```

**Commit Strategy**:
- **One commit per logical step** - don't combine file moves with URL updates
- **Descriptive commit messages** - include what changed and why
- **Atomic commits** - each commit should be independently testable
- **Progressive commits** - commit after each verification step passes

### **Comprehensive Testing Requirements**

**Phase-Level Testing**:
```bash
# After each phase, run complete test suite:
pnpm type-check          # TypeScript validation
pnpm lint               # Code quality
pnpm build              # Production build test  
pnpm preview            # Local server verification

# Additional browser testing:
# Test in Chrome (mobile + desktop)
# Test in Firefox (mobile + desktop)  
# Test in Safari (mobile + desktop)
```

**Content Validation Testing**:
- **Review Data Integrity**: Spot-check 5 random reviews load correctly
- **Image Loading**: Verify author and tool images display
- **Navigation Flow**: Test all internal page transitions
- **Mobile Responsiveness**: Verify layouts work on mobile viewports
- **Performance**: Compare page load times (should be ≤5% degradation)

**SEO & Analytics Testing**:
- **Meta Tags**: Verify page titles, descriptions unchanged
- **URL Structure**: Confirm clean URLs work correctly
- **Internal Links**: Ensure no broken links in content
- **Sitemap**: Update and verify if sitemap.xml exists

### **Error Handling & Debugging Protocols**

**Diagnostic Commands**:
```bash
# If builds fail:
pnpm type-check --verbose     # Detailed TypeScript errors
pnpm build --verbose          # Detailed build errors

# If pages don't load:
grep -r "getCollection" src/   # Find content collection issues
grep -r "404" .astro/         # Check for routing errors

# If links break:
find src/ -name "*.astro" -exec grep -l "/v2/" {} \;  # Find remaining v2 links
```

**Issue Escalation Process**:
1. **Document the specific error** with exact commands and outputs
2. **Identify the phase** where the error occurred
3. **Check emergency rollback** if issue blocks progress
4. **Report with context**: What you were doing, what happened, what you expected

**Common Issues & Solutions**:
- **Build Errors**: Usually TypeScript or missing imports - check file paths
- **404s**: Often routing issues - verify file structure matches URLs
- **Content Loading**: Usually content collection path issues - check imports
- **Performance**: Often missing optimizations - check image loading

### **Progress Communication Standards**

**Regular Updates Required**:
- **Phase Start**: "Beginning Phase X: [brief description]"
- **Phase Complete**: "Phase X Complete: [verification results]"  
- **Blockers**: "Blocked on: [specific issue] - investigating [approach]"
- **Completion**: "Migration Complete: [summary of changes and testing]"

**Status Report Format**:
```markdown
## Migration Progress: Phase X

**Completed**:
- [Specific accomplishment]
- [Verification results]

**In Progress**:
- [Current task]
- [Expected completion]

**Blockers**:
- [None / specific issue]

**Next Steps**:
- [Next task]
- [Dependencies]
```

### **Definition of Done Criteria**

**Phase Completion Requirements**:
- ✅ All commands executed successfully
- ✅ Build passes without errors or warnings
- ✅ Manual URL testing complete
- ✅ No broken internal links found
- ✅ Performance within acceptable range
- ✅ Changes committed with proper messages

**Migration Completion Requirements**:
- ✅ All 6 success criteria met
- ✅ Browser testing complete (3 browsers minimum)
- ✅ Content integrity verified (review data loads correctly)
- ✅ SEO impact verified (no ranking loss indicators)
- ✅ Analytics continuity verified (tracking still works)
- ✅ Documentation updated
- ✅ Team notified of completion

### **Quality Assurance Standards**

**Code Quality**:
- **TypeScript strict mode** compliance required
- **ESLint** must pass with zero warnings
- **Prettier** formatting must be consistent
- **No console.log** statements in production code

**Performance Standards**:
- **Build time** should not increase >10%
- **Page load time** should not increase >5%  
- **Bundle size** should not increase significantly
- **Lighthouse scores** should remain stable

**Accessibility Requirements**:
- **Navigation** must remain keyboard accessible
- **Links** must have proper focus indicators
- **Images** must retain alt text
- **Headings** must maintain proper hierarchy

---

**Remember**: This migration promotes the superior v2 design to standard URLs while preserving v1 as an intentionally accessible legacy version. The result is a cleaner, more professional URL structure that doesn't expose version numbers to users. 
