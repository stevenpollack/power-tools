import { useState, useEffect, useMemo } from "react";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { ToolCard } from "./ToolCard";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "./sheet";
import type { Tool } from "@/lib/types";

const TOOLS_PER_PAGE = 8;

type SortOrder = "default" | "price-low" | "price-high" | "rating-low" | "rating-high";

interface ToolWithOptimizedImage extends Tool {
  optimizedImageUrl: string;
}

interface ToolGridProps {
  tools: ToolWithOptimizedImage[];
}

export function ToolGrid({ tools }: ToolGridProps) {
  // Initialize state from URL search params on component mount (following MasonryWall pattern)
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");

  const [visibleCount, setVisibleCount] = useState(TOOLS_PER_PAGE);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  // Initialize state from URL params after component mounts (client-side only)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const brands = params.get("brands");
    const categories = params.get("categories");
    const sort = params.get("sort") as SortOrder;
    
    if (brands) setSelectedBrands(brands.split(","));
    if (categories) setSelectedCategories(categories.split(","));
    if (sort) setSortOrder(sort);
  }, []);

  // Effect to update URL when filters or sort order change (following MasonryWall pattern)
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedBrands.length > 0) params.set("brands", selectedBrands.join(","));
    if (selectedCategories.length > 0) params.set("categories", selectedCategories.join(","));
    if (sortOrder !== "default") params.set("sort", sortOrder);

    const queryString = params.toString();
    const newUrl = queryString
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname;

    window.history.pushState({}, "", newUrl);
  }, [selectedBrands, selectedCategories, sortOrder]);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(TOOLS_PER_PAGE);
  }, [selectedBrands, selectedCategories]);

  // Extract unique values for filter options
  const availableBrands = useMemo(
    () => [...new Set(tools.map((tool) => tool.data.brand))].sort(),
    [tools]
  );

  const availableCategories = useMemo(
    () => [...new Set(tools.map((tool) => tool.data.category))].sort(),
    [tools]
  );

  // Filter and sort tools
  const filteredAndSortedTools = useMemo(() => {
    // Filter first
    let filtered = tools.filter((tool) => {
      const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(tool.data.brand);
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(tool.data.category);
      return brandMatch && categoryMatch;
    });

    // Then sort
    const sorted = [...filtered];
    switch (sortOrder) {
      case "price-low":
        sorted.sort((a, b) => a.data.pricing.currentPrice - b.data.pricing.currentPrice);
        break;
      case "price-high":
        sorted.sort((a, b) => b.data.pricing.currentPrice - a.data.pricing.currentPrice);
        break;
      case "rating-low":
        sorted.sort((a, b) => a.data.popularity.averageRating - b.data.popularity.averageRating);
        break;
      case "rating-high":
        sorted.sort((a, b) => b.data.popularity.averageRating - a.data.popularity.averageRating);
        break;
      case "default":
      default:
        // Keep original order
        break;
    }

    return sorted;
  }, [tools, selectedBrands, selectedCategories, sortOrder]);

  const visibleTools = useMemo(
    () => filteredAndSortedTools.slice(0, visibleCount),
    [filteredAndSortedTools, visibleCount]
  );

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + TOOLS_PER_PAGE);
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    setSelectedBrands((prev) =>
      checked ? [...prev, brand] : prev.filter((b) => b !== brand)
    );
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories((prev) =>
      checked ? [...prev, category] : prev.filter((c) => c !== category)
    );
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
  };

  const hasActiveFilters = selectedBrands.length > 0 || selectedCategories.length > 0;

  return (
    <>
      {/* Filter/Sort Bar */}
      <div className="border-border grid grid-cols-2 border-t border-b bg-gray-50">
        <div className="p-3 text-center">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            className="flex w-full items-center justify-center gap-2 text-sm font-medium text-gray-700 bg-transparent border-none focus:outline-none cursor-pointer"
          >
            <option value="default">Sort By: Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating-low">Rating: Low to High</option>
            <option value="rating-high">Rating: High to Low</option>
          </select>
        </div>
        <div className="border-l-border border-l p-3 text-center">
          <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
            <SheetTrigger asChild>
              <button className="flex w-full items-center justify-center gap-2 text-sm font-medium text-gray-700">
                <SlidersHorizontal className="h-4 w-4" />
                All Filters
                {hasActiveFilters && (
                  <span className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                    {selectedBrands.length + selectedCategories.length}
                  </span>
                )}
              </button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Tools</SheetTitle>
              </SheetHeader>
              
              <div className="space-y-6 p-4">
                {/* Clear all filters */}
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Clear all filters
                  </button>
                )}

                {/* Brand filters */}
                <div>
                  <h3 className="mb-3 font-medium">Brand</h3>
                  <div className="space-y-2">
                    {availableBrands.map((brand) => (
                      <label key={brand} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={(e) => handleBrandChange(brand, e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Category filters */}
                <div>
                  <h3 className="mb-3 font-medium">Category</h3>
                  <div className="space-y-2">
                    {availableCategories.map((category) => (
                      <label key={category} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={(e) => handleCategoryChange(category, e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Results Count */}
      <div className="mx-auto max-w-6xl py-4">
        <p className="text-center text-sm text-gray-600">
          Showing {Math.min(visibleCount, filteredAndSortedTools.length)} of {filteredAndSortedTools.length} results
          {filteredAndSortedTools.length !== tools.length && " (filtered)"}
        </p>
      </div>

      {/* Tools Grid */}
      <div className="mx-auto max-w-6xl pb-8">
        {filteredAndSortedTools.length === 0 ? (
          <div className="flex min-h-96 items-center justify-center">
            <div className="text-center">
              <p className="mb-2 text-lg text-gray-500">
                No tools match your filters
              </p>
              <p className="text-sm text-gray-400">
                Try adjusting your filter criteria
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                optimizedImageUrl={tool.optimizedImageUrl}
              />
            ))}
          </div>
        )}
      </div>

      {/* Load More Button */}
      {visibleCount < filteredAndSortedTools.length && (
        <div className="pb-16 text-center">
          <button
            onClick={handleLoadMore}
            className="rounded-lg bg-bunnings-primary-orange px-8 py-3 font-medium text-black transition-colors hover:bg-bunnings-primary-orange/90"
          >
            Load More Tools
          </button>
        </div>
      )}
    </>
  );
} 
