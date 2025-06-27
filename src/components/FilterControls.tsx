import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@nanostores/react";
import { activeFilters } from "@/stores/filterStore";
import { cn } from "@/lib/utils";
import { Search, X, Filter } from "lucide-react";

interface FilterControlsProps {
  availableAuthors: string[];
  availableCategories: string[];
  availableBrands: string[];
}

const MOOD_OPTIONS = [
  { value: "technical", label: "Technical", color: "border-blue-200 text-blue-700" },
  { value: "humorous", label: "Humorous", color: "border-yellow-200 text-yellow-700" },
  { value: "dramatic", label: "Dramatic", color: "border-red-200 text-red-700" },
  { value: "philosophical", label: "Philosophical", color: "border-purple-200 text-purple-700" },
];

export const FilterControls: React.FC<FilterControlsProps> = ({
  availableAuthors,
  availableCategories,
  availableBrands
}) => {
  const $filters = useStore(activeFilters);

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

  const hasActiveFilters = 
    $filters.author || 
    $filters.category || 
    $filters.mood || 
    $filters.brand || 
    $filters.searchTerm;

  return (
    <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Search and Clear Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search reviews..."
              className="pl-10"
              value={$filters.searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              className="shrink-0"
            >
              <X className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          )}
        </div>

        {/* Filter Categories */}
        <div className="space-y-3">
          {/* Mood Filters */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Mood</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {MOOD_OPTIONS.map((mood) => (
                <Badge
                  key={mood.value}
                  variant={$filters.mood === mood.value ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer transition-all hover:scale-105",
                    $filters.mood === mood.value ? "bg-blue-100 text-blue-800" : mood.color
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
            <span className="text-sm font-medium text-gray-700 mb-2 block">Authors</span>
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
            <span className="text-sm font-medium text-gray-700 mb-2 block">Categories</span>
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
            <span className="text-sm font-medium text-gray-700 mb-2 block">Brands</span>
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
  );
}; 