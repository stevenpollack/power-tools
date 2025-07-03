import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FilterBadgeGroup } from "@/components/ui/filter-badge-group";
import { useStore } from "@nanostores/react";
import { activeFilters } from "@/stores/filterStore";
import { uiState } from "@/stores/uiStore";
import { MOOD_OPTIONS } from "@/lib/constants";
import { Search, X, Filter, ChevronDown, ChevronUp } from "lucide-react";

interface FilterControlsProps {
  availableAuthors: string[];
  availableCategories: string[];
  availableBrands: string[];
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  availableAuthors,
  availableCategories,
  availableBrands,
}) => {
  const $filters = useStore(activeFilters);
  const $uiState = useStore(uiState);

  // Convert arrays to FilterOption format
  const authorOptions = useMemo(
    () => availableAuthors.map((author) => ({ value: author, label: author })),
    [availableAuthors],
  );

  const categoryOptions = useMemo(
    () =>
      availableCategories.map((category) => ({
        value: category,
        label: category,
      })),
    [availableCategories],
  );

  const brandOptions = useMemo(
    () => availableBrands.map((brand) => ({ value: brand, label: brand })),
    [availableBrands],
  );

  const handleSearchChange = (value: string) => {
    activeFilters.setKey("searchTerm", value);
  };

  const handleFilterChange = (
    key: keyof typeof $filters,
    value: string | null,
  ) => {
    activeFilters.setKey(key, value);
  };

  const clearAllFilters = () => {
    activeFilters.set({
      author: null,
      category: null,
      mood: null,
      brand: null,
      searchTerm: "",
    });
  };

  const toggleFilterPanel = () => {
    uiState.setKey("isFilterPanelOpen", !$uiState.isFilterPanelOpen);
  };

  const hasActiveFilters =
    $filters.author ||
    $filters.category ||
    $filters.mood ||
    $filters.brand ||
    $filters.searchTerm;

  const activeFilterCount = [
    $filters.author,
    $filters.category,
    $filters.mood,
    $filters.brand,
    $filters.searchTerm,
  ].filter(Boolean).length;

  return (
    <div className="border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      {/* Compact header with trigger button */}
      <div className="p-4">
        <div className="mx-auto flex max-w-7xl items-center gap-4">
          {/* Filter trigger button */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFilterPanel}
            className="shrink-0"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-2 px-1.5 py-0.5 text-xs">
                {activeFilterCount}
              </Badge>
            )}
            {$uiState.isFilterPanelOpen ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : (
              <ChevronDown className="ml-2 h-4 w-4" />
            )}
          </Button>

          {/* Search bar */}
          <div className="relative max-w-sm flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              placeholder="Search reviews..."
              className="pl-10"
              value={$filters.searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>

          {/* Clear filters button */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="shrink-0 text-gray-600 hover:text-gray-900"
            >
              <X className="mr-2 h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Collapsible filter panel */}
      {$uiState.isFilterPanelOpen && (
        <div className="border-t border-gray-200 bg-gray-50/80">
          <div className="mx-auto max-w-7xl p-4">
            <div className="space-y-4">
              {/* Mood Filters */}
              <FilterBadgeGroup
                title="Mood"
                options={MOOD_OPTIONS}
                activeValue={$filters.mood}
                onValueChange={(value) => handleFilterChange("mood", value)}
              />

              {/* Author Filters */}
              <FilterBadgeGroup
                title="Authors"
                options={authorOptions}
                activeValue={$filters.author}
                onValueChange={(value) => handleFilterChange("author", value)}
              />

              {/* Category Filters */}
              <FilterBadgeGroup
                title="Categories"
                options={categoryOptions}
                activeValue={$filters.category}
                onValueChange={(value) => handleFilterChange("category", value)}
              />

              {/* Brand Filters */}
              <FilterBadgeGroup
                title="Brands"
                options={brandOptions}
                activeValue={$filters.brand}
                onValueChange={(value) => handleFilterChange("brand", value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
