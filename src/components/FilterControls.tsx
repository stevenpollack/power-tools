import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@nanostores/react";
import { activeFilters } from "@/stores/filterStore";
import { uiState } from "@/stores/uiStore";
import { cn } from "@/lib/utils";
import { Search, X, Filter, ChevronDown, ChevronUp } from "lucide-react";

interface FilterControlsProps {
  availableAuthors: string[];
  availableCategories: string[];
  availableBrands: string[];
}

// WCAG AA compliant color schemes
const MOOD_OPTIONS = [
  { value: "technical", label: "Technical", color: "border-blue-600 text-blue-800 bg-blue-50" },
  { value: "humorous", label: "Humorous", color: "border-amber-600 text-amber-800 bg-amber-50" },
  { value: "dramatic", label: "Dramatic", color: "border-red-600 text-red-800 bg-red-50" },
  { value: "philosophical", label: "Philosophical", color: "border-purple-600 text-purple-800 bg-purple-50" },
];

export const FilterControls: React.FC<FilterControlsProps> = ({
  availableAuthors,
  availableCategories,
  availableBrands
}) => {
  const $filters = useStore(activeFilters);
  const $uiState = useStore(uiState);

  const handleSearchChange = (value: string) => {
    activeFilters.setKey("searchTerm", value);
  };

  const handleFilterChange = (key: keyof typeof $filters, value: string | null) => {
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
    $filters.searchTerm
  ].filter(Boolean).length;

  return (
    <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      {/* Compact header with trigger button */}
      <div className="p-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          {/* Filter trigger button */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFilterPanel}
            className="shrink-0"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-2 px-1.5 py-0.5 text-xs">
                {activeFilterCount}
              </Badge>
            )}
            {$uiState.isFilterPanelOpen ? (
              <ChevronUp className="h-4 w-4 ml-2" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-2" />
            )}
          </Button>

          {/* Search bar */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
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
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Collapsible filter panel */}
      {$uiState.isFilterPanelOpen && (
        <div className="border-t border-gray-200 bg-gray-50/80">
          <div className="max-w-7xl mx-auto p-4">
            <div className="space-y-4">
              {/* Mood Filters */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium text-gray-700">Mood</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {MOOD_OPTIONS.map((mood) => (
                    <Badge
                      key={mood.value}
                      variant={$filters.mood === mood.value ? "default" : "outline"}
                      className={cn(
                        "cursor-pointer transition-all hover:scale-105",
                        $filters.mood === mood.value 
                          ? "bg-gray-900 text-white border-gray-900" 
                          : mood.color
                      )}
                      onClick={() => 
                        handleFilterChange("mood", $filters.mood === mood.value ? null : mood.value)
                      }
                    >
                      {mood.label}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Author Filters */}
              <div>
                <span className="text-sm font-medium text-gray-700 mb-3 block">Authors</span>
                <div className="flex flex-wrap gap-2">
                  {availableAuthors.map((author) => (
                    <Badge
                      key={author}
                      variant={$filters.author === author ? "default" : "outline"}
                      className="cursor-pointer transition-all hover:scale-105"
                      onClick={() => 
                        handleFilterChange("author", $filters.author === author ? null : author)
                      }
                    >
                      {author}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Category Filters */}
              <div>
                <span className="text-sm font-medium text-gray-700 mb-3 block">Categories</span>
                <div className="flex flex-wrap gap-2">
                  {availableCategories.map((category) => (
                    <Badge
                      key={category}
                      variant={$filters.category === category ? "default" : "outline"}
                      className="cursor-pointer transition-all hover:scale-105"
                      onClick={() => 
                        handleFilterChange("category", $filters.category === category ? null : category)
                      }
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Brand Filters */}
              <div>
                <span className="text-sm font-medium text-gray-700 mb-3 block">Brands</span>
                <div className="flex flex-wrap gap-2">
                  {availableBrands.map((brand) => (
                    <Badge
                      key={brand}
                      variant={$filters.brand === brand ? "default" : "outline"}
                      className="cursor-pointer transition-all hover:scale-105"
                      onClick={() => 
                        handleFilterChange("brand", $filters.brand === brand ? null : brand)
                      }
                    >
                      {brand}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 